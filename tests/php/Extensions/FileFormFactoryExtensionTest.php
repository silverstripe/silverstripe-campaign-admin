<?php

namespace SilverStripe\CampaignAdmin\Tests\Extensions;

use SilverStripe\Dev\SapphireTest;
use SilverStripe\AssetAdmin\Forms\FileFormFactory;
use SilverStripe\AssetAdmin\Controller\AssetAdmin;
use SilverStripe\AssetAdmin\Tests\Forms\FileFormBuilderTest\FileExtension;
use SilverStripe\Assets\File;
use Silverstripe\Assets\Dev\TestAssetStore;

class FileFormFactoryExtensionTest extends SapphireTest
{
    protected static $fixture_file = 'FileFormFactoryExtensionTest.yml';

    protected function setUp(): void
    {
        parent::setUp();
        TestAssetStore::activate('FileFormFactoryExtensionTest');
        /** @var File $testfile */
        $testfile = $this->objFromFixture(File::class, 'file1');
        $testfile->setFromLocalFile(__DIR__ . '/fixtures/testfile.txt', 'files/testfile.txt');
        $testfile->write();
    }

    /**
     * This is adapted from AssetAdminTest::testEditFileForm()
     */
    public function testEditFileForm()
    {
        $controller = new AssetAdmin();
        $builder = new FileFormFactory();
        $file = $this->objFromFixture(File::class, 'file1');
        $form = $builder->getForm($controller, 'EditForm', ['Record' => $file, 'RequireLinkText' => false]);
        // Add to campaign should be available
        $this->assertNotNull($form->Actions()->fieldByName('PopoverActions.action_addtocampaign'));
    }

    /**
     * This is adapted from AssetAdminTest::testEditFileFormWithPermissions() to test
     * the CMS_ACCESS_CampaignAdmin permission
     */
    public function testEditFileFormWithPermissions()
    {
        // Add extension to simulate different permissions
        File::add_extension(FileExtension::class);

        $this->logInWithPermission('CMS_ACCESS_CampaignAdmin');

        /** @var File $file */
        $file = $this->objFromFixture(File::class, 'file1');
        $controller = new AssetAdmin();
        $builder = new FileFormFactory();

        FileExtension::$canDelete = false;
        FileExtension::$canPublish = false;
        FileExtension::$canEdit = false;
        $form = $builder->getForm($controller, 'EditForm', ['Record' => $file, 'RequireLinkText' => false]);
        $this->assertNull($form->Actions()->fieldByName('PopoverActions.action_addtocampaign'));

        FileExtension::$canDelete = false;
        FileExtension::$canPublish = true;
        FileExtension::$canEdit = false;
        $form = $builder->getForm($controller, 'EditForm', ['Record' => $file, 'RequireLinkText' => false]);
        $this->assertNotNull($form->Actions()->fieldByName('PopoverActions.action_addtocampaign'));

        FileExtension::$canDelete = true;
        FileExtension::$canPublish = false;
        FileExtension::$canEdit = false;
        $form = $builder->getForm($controller, 'EditForm', ['Record' => $file]);
        $this->assertNull($form->Actions()->fieldByName('PopoverActions.action_addtocampaign'));

        FileExtension::$canDelete = false;
        FileExtension::$canPublish = false;
        FileExtension::$canEdit = true;
        $form = $builder->getForm($controller, 'EditForm', ['Record' => $file]);
        $this->assertNull($form->Actions()->fieldByName('PopoverActions.action_addtocampaign'));

        FileExtension::$canDelete = true;
        FileExtension::$canPublish = true;
        FileExtension::$canUnpublish = true;
        FileExtension::$canEdit = true;
        $file->publishSingle();
        $form = $builder->getForm($controller, 'EditForm', ['Record' => $file, 'RequireLinkText' => false]);
        $this->assertNotNull($form->Actions()->fieldByName('PopoverActions.action_addtocampaign'));

        File::remove_extension(FileExtension::class);
    }
}
