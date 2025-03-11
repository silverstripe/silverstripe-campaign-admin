<?php

namespace SilverStripe\CampaignAdmin\Extensions;

use SilverStripe\Core\Extension;

class HideInCampaignsExtension extends Extension
{
    /**
     * Don't show this model in campaign admin as part of implicit change sets
     */
    private static bool $hide_in_campaigns = true;
}
