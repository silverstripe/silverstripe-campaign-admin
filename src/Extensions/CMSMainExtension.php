<?php

namespace SilverStripe\CampaignAdmin\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\Versioned\ChangeSet;
use SilverStripe\Versioned\ChangeSetItem;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\ORM\DataObject;

class CMSMainExtension extends Extension
{
    function updateArchiveWarningMessage(string &$message, array $descendants)
    {
        /** @var DataObject $record */
        $record = func_get_arg(2);
        // Get all changesets including for the current record
        $descendants[] = $record->ID;
        $inChangeSetIDs = ChangeSetItem::get()->filter([
            'ObjectID' => $descendants,
            'ObjectClass' => SiteTree::class
        ])->column('ChangeSetID');
        $affectedChangeSetCount = 0;
        if (count($inChangeSetIDs ?? []) > 0) {
            $affectedChangeSetCount = ChangeSet::get()
                ->filter(['ID' => $inChangeSetIDs, 'State' => ChangeSet::STATE_OPEN])
                ->count();
        }
        if ($affectedChangeSetCount === 0) {
            return;
        }
        $numCampaigns = ChangeSet::singleton()->i18n_pluralise($affectedChangeSetCount);
        $numCampaigns = mb_strtolower($numCampaigns ?? '');
        if (count($descendants) > 1) {
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
