<?php

namespace SilverStripe\CampaignAdmin\Tests\CampaignAdminTest;

use SilverStripe\Dev\TestOnly;
use SilverStripe\ORM\DataObject;
use SilverStripe\Versioned\Versioned;
use SilverStripe\Versioned\Tests\ChangeSetTest\Permissions;

class BaseObject extends DataObject implements TestOnly
{
    use Permissions;

    private static $table_name = 'ChangeSetTest_BaseObject';

    private static $db = [
        'Foo' => 'Int',
    ];

    private static $has_many = [
        'OtherObjects' => OtherObject::class,
    ];

    private static $owns = [
        'OtherObjects',
    ];

    private static $extensions = [
        Versioned::class,
    ];
}
