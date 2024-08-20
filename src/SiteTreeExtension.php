<?php

namespace SilverStripe\CampaignAdmin;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\Tab;
use SilverStripe\Security\Permission;
use SilverStripe\Core\Extension;

/**
 * Handles adding the "Add to Campaign" button to a page's secondary actions menu
 *
 * @extends Extension<SiteTree>
 */
class SiteTreeExtension extends Extension
{
    protected function updateCMSActions(FieldList $actions)
    {
        // Add to campaign option if not-archived and has publish permission
        if ((!$this->owner->isPublished() && !$this->owner->isOnDraft())
            || !$this->owner->canPublish()
            || !Permission::check('CMS_ACCESS_CampaignAdmin')
        ) {
            return;
        }

        /** @var Tab $moreOptions */
        $moreOptions = $actions->fieldByName('ActionMenus.MoreOptions');
        if (!$moreOptions) {
            return;
        }

        $moreOptions->insertAfter(
            'Information',
            AddToCampaignHandler_FormAction::create()
                ->removeExtraClass('btn-primary')
                ->addExtraClass('btn-secondary')
        );
    }
}
