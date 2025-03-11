<?php

namespace SilverStripe\CampaignAdmin\Extensions;

use SilverStripe\AssetAdmin\Forms\FileFormFactory;
use SilverStripe\Assets\File;
use SilverStripe\Core\Extension;
use SilverStripe\Forms\FormAction;
use SilverStripe\Security\Permission;

/**
 * Extension that updates the Popover menu of `FileFormFactory`.
 *
 * @extends Extension<FileFormFactory>
 */
class FileFormFactoryExtension extends Extension
{
    /**
     * Update the Popover menu of `FileFormFactory` with the "Add to campaign" button.
     *
     * @param array $actions
     * @param File $record
     */
    protected function updatePopoverActions(&$actions, $record)
    {
        if (!Permission::check('CMS_ACCESS_CampaignAdmin')) {
            return;
        }

        if ($record && $record->canPublish()) {
            $action = FormAction::create(
                'addtocampaign',
                _t(__CLASS__ . '.ADDTOCAMPAIGN', 'Add to campaign')
            )->setIcon('page-multiple');
            array_unshift($actions, $action);
        }
    }
}
