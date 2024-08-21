<?php

namespace SilverStripe\CampaignAdmin;

use SilverStripe\Admin\LeftAndMain;
use SilverStripe\Core\Extension;
use SilverStripe\Dev\Deprecation;
use SilverStripe\View\Requirements;

/**
 * @extends Extension<LeftAndMain>
 * @deprecated 5.3.0 Will be replaced with YAML configuration
 */
class CampaignAdminExtension extends Extension
{
    public function __construct()
    {
        Deprecation::withNoReplacement(
            fn () => Deprecation::notice('5.3.0', 'Will be replaced with YAML configuration', Deprecation::SCOPE_CLASS)
        );
        parent::__construct();
    }

    public function init()
    {
        Requirements::add_i18n_javascript('silverstripe/campaign-admin: client/lang', false);
        Requirements::javascript('silverstripe/campaign-admin: client/dist/js/bundle.js');
        Requirements::css('silverstripe/campaign-admin: client/dist/styles/bundle.css');
    }
}
