<?php

namespace SilverStripe\CampaignAdmin\Tests;

use SilverStripe\CampaignAdmin\SiteTreeExtension;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Versioned\Versioned;

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
        $page->CanEditType = 'LoggedInUsers';
        $page->write();
        $page->publishRecursive();
        $actions = $page->getCMSActions();

        $addToCampaignAction = $actions->dataFieldByName('action_addtocampaign');
        $this->assertNotNull($addToCampaignAction, 'Add To Campaign button should have been added');
    }

    public function testAddToCampaignButtonIsNotAddedWhenUserDoesNotHavePermission()
    {
        $this->logInWithPermission('EDIT_PERMISSIONS');

        $page = new SiteTree();
        $page->CanEditType = 'LoggedInUsers';
        $page->write();
        $page->publishRecursive();
        $actions = $page->getCMSActions();

        $addToCampaignAction = $actions->dataFieldByName('action_addtocampaign');
        $this->assertNull(
            $addToCampaignAction,
            'Add To Campaign button should not be shown to users without permission'
        );
    }

    public function testActionsDeletedFromStageRecord()
    {
        $this->logInWithPermission();

        $page = new SiteTree();
        $page->CanEditType = 'LoggedInUsers';
        $pageID = $page->write();
        $page->publishRecursive();
        $page->deleteFromStage('Stage');

        // Get the live version of the page
        $page = Versioned::get_one_by_stage(SiteTree::class, "Live", "\"SiteTree\".\"ID\" = $pageID");
        $this->assertInstanceOf(SiteTree::class, $page);

        $actions = $page->getCMSActions();

        // Theoretically allow deletions to be staged via add to campaign
        $this->assertNotNull($actions->dataFieldByName('action_addtocampaign'));
    }

    public function testActionsChangedOnStageRecord()
    {
        $this->logInWithPermission();

        $page = new SiteTree();
        $page->CanEditType = 'LoggedInUsers';
        $page->write();
        $page->publishRecursive();
        $page->Content = 'Changed on Stage';
        $page->write();
        $page->flushCache();

        // Reload latest version
        $page = SiteTree::get()->byID($page->ID);

        $actions = $page->getCMSActions();
        $this->assertNotNull($actions->dataFieldByName('action_addtocampaign'));
    }
}
