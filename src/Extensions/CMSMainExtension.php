<?php

namespace SilverStripe\CampaignAdmin\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\Versioned\ChangeSet;
use SilverStripe\Versioned\ChangeSetItem;
use SilverStripe\CMS\Model\SiteTree;

class CMSMainExtension extends Extension
{
    function updateArchiveWarningMessage(string &$message, array $descendants)
    {
        $inChangeSetList = ChangeSetItem::get()->filter([
            'ObjectID' => $descendants,
            'ObjectClass' => SiteTree::class
        ]);
        $affectedChangeSetCount = 0;
        if ($inChangeSetList->exists()) {
            $affectedChangeSetCount = ChangeSet::get()
                ->filter(['State' => ChangeSet::STATE_OPEN])
                ->filterByList($inChangeSetList, 'ID', 'ChangeSetID')
                ->count();
        }
        if ($affectedChangeSetCount === 0) {
            return;
        }
        $numCampaigns = ChangeSet::singleton()->i18n_pluralise($affectedChangeSetCount);
        $numCampaigns = mb_strtolower($numCampaigns ?? '');
        if ($affectedChangeSetCount > 0) {
            $message = _t(
                __CLASS__ . '.ArchiveWarningWithChildrenAndCampaigns',
                'Warning: This page and all of its child pages will be unpublished and automatically removed from'
                . ' their associated {NumCampaigns} before being sent to the archive.\n\nAre you sure you want to'
                . ' proceed?',
                [ 'NumCampaigns' => $numCampaigns ]
            );
        } else {
            $message = _t(
                __CLASS__ . '.ArchiveWarningWithCampaigns',
                'Warning: This page will be unpublished and automatically removed from their associated {NumCampaigns}'
                . ' before being sent to the archive.\n\nAre you sure you want to proceed?',
                [ 'NumCampaigns' => $numCampaigns ]
            );
        }
    }
}
