<?php

namespace SilverStripe\CampaignAdmin\Tests\CampaignAdminTest;

use SilverStripe\Dev\TestOnly;
use SilverStripe\ORM\DataObject;
use SilverStripe\Versioned\Versioned;
use SilverStripe\Versioned\Tests\ChangeSetTest\Permissions;
use SilverStripe\CampaignAdmin\Tests\CampaignAdminTest\BaseObject;

class OtherObject extends DataObject implements TestOnly
{
    use Permissions;

    private static $table_name = 'ChangeSetTest_OtherObject';

    private static $db = [
        'Foo' => 'Int',
    ];

    private static $has_one = [
        'BaseObject' => BaseObject::class,
    ];

    private static $extensions = [
        Versioned::class,
    ];
}
