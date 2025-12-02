<?php

namespace SilverStripe\CampaignAdmin\Tests\Extensions;

use ReflectionMethod;
use SilverStripe\CampaignAdmin\Extensions\CMSMainExtension;
use SilverStripe\CMS\Controllers\CMSMain;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Versioned\ChangeSet;

class CMSMainExtensionTest extends SapphireTest
{
    protected static $required_extensions = [
        CMSMain::class => [CMSMainExtension::class],
    ];

    public function testGetArchiveWarningMessage(): void
    {
        $controller = new CMSMain();
        $reflectionMethod = new ReflectionMethod($controller, 'getArchiveWarningMessage');
        $page = new SiteTree(['Title' => 'my page']);
        $page->write();

        // Not in a campaign
        $this->assertStringNotContainsString(
            'changeset',
            $reflectionMethod->invoke($controller, $page)
        );

        $changeset = new ChangeSet();
        $changeset->write();
        $changeset->addObject($page);
        $this->assertSame(
            'Warning: This page will be unpublished and automatically removed from their associated a changeset before being sent to the archive.\n\nAre you sure you want to proceed?',
            $reflectionMethod->invoke($controller, $page)
        );

        $childPage = new SiteTree(['ParentID' => $page->ID]);
        $childPage->write();

        $this->assertSame(
            'Warning: This page and all of its child pages will be unpublished and automatically removed from their associated a changeset before being sent to the archive.\n\nAre you sure you want to proceed?',
            $reflectionMethod->invoke($controller, $page)
        );
    }
}
