<?php

namespace SilverStripe\CampaignAdmin\Tests;

use ReflectionClass;
use SilverStripe\CampaignAdmin\CampaignAdmin;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\Dev\FunctionalTest;
use SilverStripe\ORM\DataList;
use SilverStripe\ORM\FieldType\DBDatetime;
use SilverStripe\Security\Group;
use SilverStripe\Security\Member;
use SilverStripe\Security\Permission;
use SilverStripe\Versioned\ChangeSet;
use SilverStripe\Versioned\ChangeSetItem;
use PHPUnit\Framework\Attributes\DataProvider;
use SilverStripe\CampaignAdmin\Tests\CampaignAdminTest\BaseObject;
use SilverStripe\CampaignAdmin\Tests\CampaignAdminTest\OtherObject;

class CampaignAdminTest extends FunctionalTest
{
    protected $extraDataObjects = [
        CampaignAdminTest\InvalidChangeSet::class,
    ];

    protected static $extra_dataobjects = [
        BaseObject::class,
        OtherObject::class,
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
        $this->assertListEquals(
            [
                [ 'Name' => 'changeset 1' ],
            ],
            $results
        );

        // Test published, no inferred
        CampaignAdmin::config()->set('show_published', true);
        $results = $this->callProtectedMethod($admin, 'getListItems');
        $this->assertListEquals(
            [
                [ 'Name' => 'changeset 1' ],
                [ 'Name' => 'changeset 2' ],
            ],
            $results
        );

        // Test published + inferred
        CampaignAdmin::config()->set('show_inferred', true);
        $results = $this->callProtectedMethod($admin, 'getListItems');
        $this->assertListEquals(
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
        $this->assertListEquals(
            [
                [ 'Name' => 'changeset 1' ],
                [ 'Name' => 'changeset 3' ],
            ],
            $results
        );
    }

    public static function readCampaignDataProvider()
    {
        return [
            'valid campaign' => ['change1', 'CMS_ACCESS_CampaignAdmin', 200],
            'non existent campaign' => ['', 'CMS_ACCESS_CampaignAdmin', 404],
            'inferred campaign' => ['change3', 'CMS_ACCESS_CampaignAdmin', 404],
            'not enough permission' => ['change1', 'VIEW_SITE', 403],
        ];
    }

    #[DataProvider('readCampaignDataProvider')]
    public function testReadCampaign(
        string $changesetName,
        string $permission,
        int $expectedResponseCode
    ) {
        $this->logOut();
        $this->logInWithPermission($permission);
        $changeSetID = $changesetName ? $this->idFromFixture(ChangeSet::class, $changesetName) : 12345;
        $response = $this->get("/admin/campaigns/set/$changeSetID/show", null, ['Accept' => 'application/json']);
        $this->assertEquals($expectedResponseCode, $response->getStatusCode());
    }

    public static function provideRemoveCampaignItem(): array
    {
        return [
            'open campaign' => [false, false, 204],
            'published campaign' => [true, false,  400],
            'incorrect campaign ID' => [true, true, 404],
        ];
    }

    #[DataProvider('provideRemoveCampaignItem')]
    public function testRemoveCampaignItem(
        bool $isPublished,
        bool $isWrongID,
        int $expectedResponseCode,
    ): void {
        $item = new SiteTree();
        $item->write();
        $changeset = new ChangeSet();
        $changeset->write();
        $changeset->addObject($item);

        if ($isPublished) {
            $changeset->publish();
        }

        $changesetitemID = ChangeSetItem::get()->where(['"ChangeSetID" = ?' => $changeset->ID])->first()->ID;
        $changesetID =  $isWrongID ? 12345 : $changeset->ID;

        $response = $this->post("/admin/campaigns/removeCampaignItem/$changesetID/$changesetitemID", null);
        $this->assertEquals($expectedResponseCode, $response->getStatusCode());
    }

    /**
     * This test in copied from Versioned ChangeSetTest::testCanPublish() and expanded
     * to test the CMS_ACCESS_CampaignAdmin permission
     *
     * Note that the PERM_canPublish permission is defined in the fixture file
     * and is not a built-in permission.
     */
    public function testChangeSetCanPublish()
    {
        // Create changeset containing all items (unpublished)
        $this->logInWithPermission('ADMIN');
        $changeSet = new ChangeSet();
        $changeSet->write();
        $obj = $this->objFromFixture(BaseObject::class, 'test');
        $changeSet->addObject($obj);
        $changeSet->sync();
        $this->assertEquals(3, $changeSet->Changes()->count());
        // Test un-authenticated user cannot publish
        $this->logOut();
        $this->assertFalse($changeSet->canPublish());
        // With model publish permissions only publish is allowed
        $this->logInWithPermission('PERM_canPublish');
        $this->assertTrue($changeSet->canPublish());
        // Test user with the necessary minimum permissions can login
        $this->logInWithPermission(
            [
                'CMS_ACCESS_CampaignAdmin',
                'PERM_canPublish'
            ]
        );
        $this->assertTrue($changeSet->canPublish());
        // campaign admin only permission doesn't grant publishing rights
        $this->logInWithPermission('CMS_ACCESS_CampaignAdmin');
        $this->assertFalse($changeSet->canPublish());
        // Test that you can still publish a changeset, even if canPublish()
        // returns false (e.g. externally rather than internally enforced)
        $changeSet->publish();
    }

    /**
     * This test in copied from Versioned ChangeSetTest::testCanCreate() and expanded
     * to test the CMS_ACCESS_CampaignAdmin permission
     */
    public function testChangeSetCanCreate()
    {
        $this->logOut();
        $this->assertFalse(ChangeSet::singleton()->canCreate());
        $this->logInWithPermission('SomeWrongPermission');
        $this->assertFalse(ChangeSet::singleton()->canCreate());
        $this->logInWithPermission('CMS_ACCESS_CampaignAdmin');
        $this->assertTrue(ChangeSet::singleton()->canCreate());
    }

    /**
     * This test in copied from Versioned ChangeSetTest::testCanDelete() and expanded
     * to test the CMS_ACCESS_CampaignAdmin permission
     */
    public function testChangeSetCanDelete()
    {
        // Create changeset containing all items (unpublished)
        $this->logInWithPermission('ADMIN');
        $changeSet = new ChangeSet();
        $changeSet->write();
        $obj = $this->objFromFixture(BaseObject::class, 'test');
        $changeSet->addObject($obj);
        $changeSet->sync();
        $this->assertEquals(3, $changeSet->Changes()->count());
        // Check canDelete
        $this->logOut();
        $this->assertFalse($changeSet->canDelete());
        $this->logInWithPermission('SomeWrongPermission');
        $this->assertFalse($changeSet->canDelete());
        $this->logInWithPermission('CMS_ACCESS_CampaignAdmin');
        $this->assertTrue($changeSet->canDelete());
    }

    /**
     * This test in copied from Versioned ChangeSetTest::testCanView() and expanded
     * to test the CMS_ACCESS_CampaignAdmin permission
     */
    public function testChangeSetCanView()
    {
        // Create changeset containing all items (unpublished)
        $this->logInWithPermission('ADMIN');
        $changeSet = new ChangeSet();
        $changeSet->write();
        $obj = $this->objFromFixture(BaseObject::class, 'test');
        $changeSet->addObject($obj);
        $changeSet->sync();
        $this->assertEquals(3, $changeSet->Changes()->count());
        // Check canView
        $this->logOut();
        $this->assertFalse($changeSet->canView());
        $this->logInWithPermission('SomeWrongPermission');
        $this->assertFalse($changeSet->canView());
        $this->logInWithPermission('CMS_ACCESS_CampaignAdmin');
        $this->assertTrue($changeSet->canView());
    }
}
