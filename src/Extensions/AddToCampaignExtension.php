<?php

namespace SilverStripe\CampaignAdmin\Extensions;

use RuntimeException;
use SilverStripe\CampaignAdmin\AddToCampaignHandler;
use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\Core\Extension;
use SilverStripe\Core\Validation\ValidationResult;
use SilverStripe\Forms\Form;
use SilverStripe\ORM\DataObject;
use SilverStripe\Admin\LeftAndMain;

/**
 * Extension applied to a Controller to add the ability to add items to a campaign.
 *
 * @extends Extension<LeftAndMain>
 */
class AddToCampaignExtension extends Extension
{
    private static array $allowed_actions = [
        'addToCampaignForm',
    ];

    /**
     * Data class of managed data objects (e.g. pages, files) that the Controller manages.
     * This is essentially abstract config that must be set via config elsewhere i.e. yml config
     * If it is not set then a RuntimeException will be thrown.
     *
     * For instance, when this extension is applied to AssetAdmin:
     *
     * SilverStripe\AssetAdmin\Controller\AssetAdmin:
     *   campaign_admin_managed_data_class: SilverStripe\Assets\File
     */
    private static ?string $campaign_admin_managed_data_class = null;

    protected function updateClientConfig(array &$clientConfig): void
    {
        $clientConfig['form']['addToCampaignForm']['schemaUrl'] = $this->getOwner()->Link('schema/addToCampaignForm');
    }

    /**
     * Action handler for adding pages to a campaign
     */
    public function addtocampaign(array $data, Form $form): HTTPResponse
    {
        $owner = $this->getOwner();
        $id = $data['ID'];
        $dataClass = $this->getManagedDataClass();
        $record = $dataClass::get()->byID($id);

        $handler = AddToCampaignHandler::create($owner, $record, 'addToCampaignForm');
        $response = $handler->addToCampaign($record, $data);
        $message = $response->getBody();
        if (empty($message)) {
            return $response;
        }

        // Send extra "message" data with schema response
        $extraData = ['message' => $message];
        $schemaId = Controller::join_links($owner->Link('schema/addToCampaignForm'), $id);
        return $owner->getSchemaResponse($schemaId, $form, null, $extraData);
    }

    /**
     * Url handler for add to campaign form
     */
    public function addToCampaignForm(HTTPRequest $request): ?Form
    {
        // Get ID either from posted back value, or url parameter
        $id = $request->param('ID') ?: $request->postVar('ID');
        return $this->getAddToCampaignForm((int) $id);
    }

    /**
     * Get the form for adding an item to a campaign
     */
    public function getAddToCampaignForm(int $id): ?Form
    {
        $owner = $this->getOwner();
        // Get record-specific fields
        $dataClass = $this->getManagedDataClass();
        $record = $dataClass::get()->byID($id);

        if (!$record) {
            $owner->jsonError(404, _t(
                __CLASS__.'.ErrorNotFound',
                "That {Type} couldn't be found",
                ['Type' => $dataClass::singleton()->i18n_singular_name()]
            ));
            return null;
        }
        if (!$record->canView()) {
            $owner->jsonError(403, _t(
                __CLASS__.'.ErrorItemPermissionDenied',
                "You don't have the necessary permissions to modify {ObjectTitle}",
                ['ObjectTitle' => $record->i18n_singular_name()]
            ));
            return null;
        }

        $handler = AddToCampaignHandler::create($owner, $record, 'addToCampaignForm');
        $form = $handler->Form($record);

        $form->setValidationResponseCallback(function (ValidationResult $errors) use ($owner, $form, $id) {
            $schemaId = Controller::join_links($owner->Link('schema/addToCampaignForm'), $id);
            return $owner->getSchemaResponse($schemaId, $form, $errors);
        });

        return $form;
    }

    /**
     * Get the managed data class for this extension
     */
    private function getManagedDataClass(): string
    {
        $owner = $this->getOwner();
        $property = 'campaign_admin_managed_data_class';
        $dataClass = $owner->config()->get($property);
        if (!is_subclass_of($dataClass, DataObject::class, true)) {
            $ownerClass = get_class($owner);
            throw new RuntimeException("$ownerClass.$property is not a DataObject subclass.");
        }
        return $dataClass;
    }
}
