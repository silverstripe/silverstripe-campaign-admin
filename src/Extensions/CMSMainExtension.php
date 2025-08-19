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
<<<<<<< HEAD
        $inChangeSetList = ChangeSetItem::get()->filter([
=======
        /** @var DataObject $record */
        $record = func_get_arg(2);
        // Get all changesets including for the current record
        $descendants[] = $record->ID;
        $inChangeSetIDs = ChangeSetItem::get()->filter([
>>>>>>> 3.0
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
