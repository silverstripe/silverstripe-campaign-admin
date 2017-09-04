<?php

namespace SilverStripe\CampaignAdmin;

use SilverStripe\Core\Extension;
use SilverStripe\Core\Manifest\ModuleLoader;
use SilverStripe\View\Requirements;

class CampaignAdminExtension extends Extension
{
    public function init()
    {
        $module = ModuleLoader::getModule('silverstripe/campaign-admin');
        Requirements::add_i18n_javascript($module->getRelativeResourcePath('client/lang'), false, true);
        Requirements::javascript($module->getRelativeResourcePath("client/dist/js/bundle.js"));
        Requirements::css($module->getRelativeResourcePath("client/dist/styles/bundle.css"));
    }
}
