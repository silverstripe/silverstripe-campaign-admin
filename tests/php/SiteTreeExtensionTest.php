<?php

namespace SilverStripe\CampaignAdmin\Tests;

use SilverStripe\CampaignAdmin\SiteTreeExtension;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Dev\SapphireTest;

class SiteTreeExtensionTest extends SapphireTest
{
    protected $usesDatabase = true;

    protected static $required_extensions = [
        SiteTree::class => [
            SiteTreeExtension::class,
        ],
    ];

    public function testAddToCampaignButtonIsAdded()
    {
        $this->logInWithPermission();

        $page = new SiteTree();
        $page->write();
        $actions = $page->getCMSActions();

        $informationField = $actions->fieldByName('ActionMenus.MoreOptions.action_addtocampaign');
        $this->assertNotNull($informationField, 'Add To Campaign button should have been added');
    }

    public function testAddToCampaignButtonIsNotAddedWhenUserDoesNotHavePermission()
    {
        $this->logInWithPermission('EDIT_PERMISSIONS');

        $page = new SiteTree();
        $page->write();
        $page->publishSingle();
        $actions = $page->getCMSActions();

        $informationField = $actions->fieldByName('ActionMenus.MoreOptions.action_addtocampaign');
        $this->assertNull($informationField, 'Add To Campaign button should not have been added when published');
    }
}
