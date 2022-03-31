<?php

namespace SilverStripe\CampaignAdmin\Tests;

use ReflectionClass;
use SilverStripe\CampaignAdmin\CampaignAdmin;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\ORM\DataList;
use SilverStripe\ORM\FieldType\DBDatetime;
use SilverStripe\Security\Group;
use SilverStripe\Security\Member;
use SilverStripe\Security\Permission;
use SilverStripe\Versioned\ChangeSet;

class CampaignAdminTest extends SapphireTest
{
    protected $extraDataObjects = [
        CampaignAdminTest\InvalidChangeSet::class,
    ];

    protected static $fixture_file = 'CampaignAdminTest.yml';

    protected function setUp(): void
    {
        parent::setUp();
        DBDatetime::set_mock_now('2011-09-24 11:11:00');
        CampaignAdmin::config()->set('sync_expires', 300);
        CampaignAdmin::config()->set('show_published', false);
        CampaignAdmin::config()->set('show_inferred', false);
        $this->logInWithPermission('ADMIN');
    }

    /**
     * Call a protected method on an object via reflection
     *
     * @param object $object The object to call the method on
     * @param string $method The name of the method
     * @param array $args The arguments to pass to the method
     * @return mixed
     */
    protected function callProtectedMethod($object, $method, $args = [])
    {
        $class = new ReflectionClass(get_class($object));
        $methodObj = $class->getMethod($method);
        $methodObj->setAccessible(true);
        return $methodObj->invokeArgs($object, $args);
    }

    public function testInvalidDataHandling()
    {
        $changeset = new CampaignAdminTest\InvalidChangeSet();
        $admin = new CampaignAdmin();

        $result = $this->callProtectedMethod($admin, 'getChangeSetResource', [$changeset, true]);
        $this->assertEquals('Corrupt database! bad data', $result['Details']);
    }

    /**
     * Test sync
     */
    public function testSync()
    {
        $admin = CampaignAdmin::create();

        /** @var ChangeSet $changeset */
        $changesetID = $this->idFromFixture(ChangeSet::class, 'change1');
        $admin->readCampaigns();

        // Check initial sync date
        $lastSynced = ChangeSet::get()->byID($changesetID)->LastSynced;
        $this->assertEquals('2011-09-24 11:11:00', $lastSynced);

        // After 10 seconds, sync should not be modified when viewing campaigns
        DBDatetime::set_mock_now('2011-09-24 11:11:10');
        $admin->readCampaigns();
        $lastSynced = ChangeSet::get()->byID($changesetID)->LastSynced;
        $this->assertEquals('2011-09-24 11:11:00', $lastSynced);

        // After 7 minutes sync will trigger a refresh
        DBDatetime::set_mock_now('2011-09-24 11:18:00');
        $admin->readCampaigns();
        $lastSynced = ChangeSet::get()->byID($changesetID)->LastSynced;
        $this->assertEquals('2011-09-24 11:18:00', $lastSynced);
    }

    public function testFilters()
    {
        $admin = CampaignAdmin::create();

        // Test limited items
        /** @var DataList $results */
        $results = $this->callProtectedMethod($admin, 'getListItems');
        $this->assertDOSEquals(
            [
                [ 'Name' => 'changeset 1' ],
            ],
            $results
        );

        // Test published, no inferred
        CampaignAdmin::config()->set('show_published', true);
        $results = $this->callProtectedMethod($admin, 'getListItems');
        $this->assertDOSEquals(
            [
                [ 'Name' => 'changeset 1' ],
                [ 'Name' => 'changeset 2' ],
            ],
            $results
        );

        // Test published + inferred
        CampaignAdmin::config()->set('show_inferred', true);
        $results = $this->callProtectedMethod($admin, 'getListItems');
        $this->assertDOSEquals(
            [
                [ 'Name' => 'changeset 1' ],
                [ 'Name' => 'changeset 2' ],
                [ 'Name' => 'changeset 3' ],
                [ 'Name' => 'changeset 4' ],
            ],
            $results
        );

        // Test inferred, no published
        CampaignAdmin::config()->set('show_published', false);
        $results = $this->callProtectedMethod($admin, 'getListItems');
        $this->assertDOSEquals(
            [
                [ 'Name' => 'changeset 1' ],
                [ 'Name' => 'changeset 3' ],
            ],
            $results
        );
    }

    public function testReadCampaignResponse()
    {
        // Login as admin user
        $group = $this->objFromFixture(Group::class, 'admins');
        Permission::grant($group->ID, 'ADMIN');

        $admin = $this->objFromFixture(Member::class, 'admin_user');
        $this->logInAs($admin);

        // Create new ChangeSet object
        $changeset = ChangeSet::create();
        $changeset->ID = '123';
        $changeset->Name = 'changeset 123';
        $changeset->State = 'open';
        $changeset->IsInferred = false;
        
        $changeset->write();

        // ChangeSet should be accessable for Admin
        $this->assertTrue($changeset->canView());

        $expectedStatus = [
            '200' => [
                'ID' => '123',
                'Name' => 'show'
            ],
            '400' => [
                'ID' => '123',
                'Name' => ''
            ],
            '404' => [
                'ID' => '12345',
                'Name' => 'show'
            ]
        ];

        // Create new CampaignAdmin object
        $campaignAdmin = CampaignAdmin::create();

        $request = new HTTPRequest('GET', '/admin/campaigns/set/');
        $request->addHeader('Accept', 'application/json');

        foreach ($expectedStatus as $key => $val) {
            $request->setRouteParams($val);
            $response = $campaignAdmin->readCampaign($request);
            $status = $response->getStatusCode();

            // Method should return correct status
            $this->assertInstanceOf(HTTPResponse::class, $response);
            $this->assertEquals($key, $status);
        }

        // Login as user without admin permissions
        $user = $this->objFromFixture(Member::class, 'mock_user');
        $this->logInAs($user);

        // ChangeSet should not be accessable for Mock User
        $this->assertFalse($changeset->canView());

        $request->setRouteParams([ 'ID' => '1', 'Name' => 'show']);
        $response = $campaignAdmin->readCampaign($request);
        $status = $response->getStatusCode();

        // Method should return correct status if access forbidden
        $this->assertInstanceOf(HTTPResponse::class, $response);
        $this->assertEquals('403', $status);
    }
}
