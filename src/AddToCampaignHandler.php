<?php

namespace SilverStripe\CampaignAdmin;

use SilverStripe\Control\Controller;
use SilverStripe\Control\Director;
use SilverStripe\Control\HTTPResponse_Exception;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Injector\Injectable;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\HiddenField;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\Form;
use SilverStripe\ORM\ArrayList;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\FieldType\DBHTMLText;
use SilverStripe\Versioned\ChangeSet;
use SilverStripe\Versioned\ChangeSetItem;
use SilverStripe\Versioned\Versioned;
use SilverStripe\Core\Convert;

/**
 * Class AddToCampaignHandler - handle the AddToCampaign action.
 *
 * This is a class designed to be delegated to by a Form action handler method in the EditForm of a LeftAndMain
 * child class.
 *
 * Add To Campaign can be seen as an item action like "publish" or "rollback", but unlike those actions
 * it needs one additional piece of information to execute, the ChangeSet ID.
 *
 * So this handler does one of two things to respond to the action request, depending on whether the ChangeSet ID
 * was included in the submitted data
 * - If it was, perform the Add To Campaign action (as per any other action)
 * - If it wasn't, return a form to get the ChangeSet ID and then repeat this action submission
 *
 * To use, you'd add an action to your LeftAndMain subclass, like this:
 *
 *     function addtocampaign($data, $form) {
 *         $handler = AddToCampaignHandler::create($form, $data);
 *         return $handler->handle();
 *     }
 *
 *  and add an AddToCampaignHandler_FormAction to the EditForm, possibly through getCMSActions
 */
class AddToCampaignHandler
{
    use Injectable;

    /**
     * Parent controller for this form
     *
     * @var Controller
     */
    protected $controller;

    /**
     * The submitted form data
     *
     * @var array
     */
    protected $data;

    /**
     * Form name to use
     *
     * @var string
     */
    protected $name;

    /**
     * AddToCampaignHandler constructor.
     *
     * @param Controller $controller Controller for this form
     * @param array|DataObject $data The data submitted as part of that form
     * @param string $name Form name
     */
    public function __construct($controller = null, $data = [], $name = 'AddToCampaignForm')
    {
        $this->controller = $controller;
        if ($data instanceof DataObject) {
            $data = $data->toMap();
        }
        $this->data = $data;
        $this->name = $name;
    }

    /**
     * Perform the action. Either returns a Form or performs the action, as per the class doc
     *
     * @return DBHTMLText|HTTPResponse
     */
    public function handle()
    {
        $object = $this->getObject($this->data['ID'], $this->data['ClassName']);

        if (empty($this->data['Campaign'])) {
            return $this->Form($object)->forTemplate();
        } else {
            return $this->addToCampaign($object, $this->data['Campaign']);
        }
    }

    /**
     * Get what ChangeSets are available for an item to be added to by this user
     *
     * @return ArrayList[ChangeSet]
     */
    protected function getAvailableChangeSets()
    {
        return ChangeSet::get()
            ->filter('State', ChangeSet::STATE_OPEN)
            ->filterByCallback(function ($item) {
                /** @var ChangeSet $item */
                return $item->canView();
            });
    }

    /**
     * Get changesets that a given object is already in
     *
     * @param DataObject
     * @return ArrayList[ChangeSet]
     */
    protected function getInChangeSets($object)
    {
        $inChangeSetIDs = array_unique(ChangeSetItem::get_for_object($object)->column('ChangeSetID'));
        if ($inChangeSetIDs > 0) {
            $changeSets = $this->getAvailableChangeSets()->filter(['ID' => $inChangeSetIDs, 'State' => ChangeSet::STATE_OPEN]);
        } else {
            $changeSets = new ArrayList();
        }

        return $changeSets;
    }

    /**
     * Safely get a DataObject from a client-supplied ID and ClassName, checking: argument
     * validity; existence; and canView permissions.
     *
     * @param int $id The ID of the DataObject
     * @param string $class The Class of the DataObject
     * @return DataObject The referenced DataObject
     * @throws HTTPResponse_Exception
     */
    protected function getObject($id, $class)
    {
        $id = (int)$id;
        $class = ClassInfo::class_name($class);

        if (!$class || !is_subclass_of($class, DataObject::class) || !DataObject::has_extension($class, Versioned::class)) {
            $this->controller->httpError(400, _t(
                __CLASS__.'.ErrorGeneral',
                'We apologise, but there was an error'
            ));
            return null;
        }

        $object = DataObject::get($class)->byID($id);

        if (!$object) {
            $this->controller->httpError(404, _t(
                __CLASS__.'.ErrorNotFound',
                'That {Type} couldn\'t be found',
                '',
                ['Type' => $class]
            ));
            return null;
        }

        if (!$object->canView()) {
            $this->controller->httpError(403, _t(
                __CLASS__.'.ErrorItemPermissionDenied',
                'It seems you don\'t have the necessary permissions to add {ObjectTitle} to a campaign',
                '',
                ['ObjectTitle' => $object->Title]
            ));
            return null;
        }

        return $object;
    }

    /**
     * Builds a Form that mirrors the parent editForm, but with an extra field to collect the ChangeSet ID
     *
     * @param DataObject $object The object we're going to be adding to whichever ChangeSet is chosen
     * @return Form
     */
    public function Form($object)
    {
        $inChangeSets = $this->getInChangeSets($object);
        $changeSets = $this->getAvailableChangeSets();

        // Remove campaigns that the $object is already in
        foreach ($inChangeSets as $cs) {
            $changeSets->remove($changeSets->find('ID', $cs->ID));
        }

        $inChangeSetsText = "";
        if ($inChangeSets->count() > 0) {
            $inChangeSetNames = implode(', ', $inChangeSets->column('Name'));
            $inChageSetsLabel = _t(
                __CLASS__.'.AddToCampaignInChangsetLabel',
                'Heads up, this item is already in campaign(s):'
            );
            $inChangeSetsText = sprintf(
                '<div class="alert alert-info"><p><strong>%s</strong><br/> %s</p></div>',
                $inChageSetsLabel,
                $inChangeSetNames
            );
        }

        $campaignDropdown = DropdownField::create(
            'Campaign',
            _t(__CLASS__.'.AddToCampaignAvailableLabel', 'Available campaigns'),
            $changeSets
        );
        $campaignDropdown->setEmptyString(_t(__CLASS__.'.AddToCampaignFormFieldLabel', 'Select a Campaign'));
        $campaignDropdown->addExtraClass('noborder');
        $campaignDropdown->addExtraClass('no-chosen');

        $fields = new FieldList([
            LiteralField::create("InChangeSetsText", $inChangeSetsText),
            $campaignDropdown,
            HiddenField::create('ID', null, $this->data['ID']),
            HiddenField::create('ClassName', null, $this->data['ClassName'])
        ]);

        $form = new Form(
            $this->controller,
            $this->name,
            $fields,
            new FieldList(
                $action = AddToCampaignHandler_FormAction::create()
                    ->setTitle(_t(__CLASS__.'.AddToCampaignAddAction', 'Add'))
            )
        );

        // If there's no campaigns to add to, we shouldn't have the dropdown
        // and add button
        if ($changeSets->count() === 0 && $inChangeSets->count() > 0) {
            $campaignAdminUrl = CampaignAdmin::singleton()->config()->get('url_segment');
            $link = Controller::join_links('admin', $campaignAdminUrl);
            $noCampaingsText = _t(
                __CLASS__.'.AddToCampaignNoCampaignsToAdd',
                '<p class="lead text-xs-center">This item has been added to all available campaigns.<br/><a href="{campaignSectionLink}" class="add-to-campaign-modal__nav-link">Create a new campaign?</a></p>',
                null,
                [ 'campaignSectionLink' => $link ]
            );
            $fields->push(LiteralField::create('NoCampaignsText', $noCampaingsText));
            $fields->removeByName('Campaign');
            $form->setActions([]);
        }

        $action->addExtraClass('add-to-campaign__action');

        $form->setHTMLID('Form_EditForm_AddToCampaign');

        $form->loadDataFrom($this->data);
        $form->getValidator()->addRequiredField('Campaign');
        $form->addExtraClass('form--no-dividers add-to-campaign__form');

        return $form;
    }

    /**
     * Performs the actual action of adding the object to the ChangeSet, once the ChangeSet ID is known
     *
     * @param DataObject $object The object to add to the ChangeSet
     * @param int $campaignID The ID of the ChangeSet to add $object to
     * @return HTTPResponse
     * @throws HTTPResponse_Exception
     */
    public function addToCampaign($object, $campaignID)
    {
        /** @var ChangeSet $changeSet */
        $changeSet = ChangeSet::get()->byID($campaignID);

        if (!$changeSet) {
            $this->controller->httpError(404, _t(
                __CLASS__.'.ErrorNotFound',
                'That {Type} couldn\'t be found',
                '',
                ['Type' => 'Campaign']
            ));
            return null;
        }

        if (!$changeSet->canEdit()) {
            $this->controller->httpError(403, _t(
                __CLASS__.'.ErrorCampaignPermissionDenied',
                'It seems you don\'t have the necessary permissions to add {ObjectTitle} to {CampaignTitle}',
                '',
                ['ObjectTitle' => $object->Title, 'CampaignTitle' => $changeSet->Title]
            ));
            return null;
        }

        $changeSet->addObject($object);

        $request = $this->controller->getRequest();
        $message = _t(
            __CLASS__.'.Success',
            'Successfully added <strong>{ObjectTitle}</strong> to <strong>{CampaignTitle}</strong>',
            '',
            [
                'ObjectTitle' => Convert::raw2xml($object->Title),
                'CampaignTitle' => Convert::raw2xml($changeSet->Title)
            ]
        );
        if ($request->getHeader('X-Formschema-Request')) {
            return $message;
        } elseif (Director::is_ajax()) {
            $response = new HTTPResponse($message, 200);

            $response->addHeader('Content-Type', 'text/html; charset=utf-8');
            return $response;
        } else {
            return $this->controller->getController()->redirectBack();
        }
    }
}
