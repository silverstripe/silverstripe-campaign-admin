/* global window */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import * as breadcrumbsActionsImport from 'state/breadcrumbs/BreadcrumbsActions';
import * as recordActionsImport from 'state/records/RecordsActions';
import * as campaignActionsImport from 'state/campaign/CampaignActions';
import Accordion from 'components/Accordion/Accordion';
import AccordionBlock from 'components/Accordion/AccordionBlock';
import ListGroupItem from 'components/ListGroup/ListGroupItem';
import Toolbar from 'components/Toolbar/Toolbar';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import { DropdownItem } from 'reactstrap';
import i18n from 'i18n';
import { inject } from 'lib/Injector';
import classNames from 'classnames';
import { joinUrlPaths } from 'lib/urls';
import CampaignAdminItem from './CampaignAdminItem';

/**
 * Represents a campaign list view
 */
const CampaignAdminList = ({
  breadcrumbsActions,
  campaign,
  campaignActions,
  campaignId,
  itemListViewEndpoint,
  newItem,
  onBackButtonClick,
  onRemoveCampaignItem,
  previewState,
  publishApi,
  record,
  recordActions,
  sectionConfig,
  treeClass,
  BreadcrumbComponent = Breadcrumb,
  DropdownItemComponent = DropdownItem,
  FormActionComponent,
  PreviewComponent,
  ViewModeComponent,
}) => {
  const [stateError, setError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);

  const loading = Object.keys(record).length === 0;

  const setBreadcrumbs = () => {
    // Setup breadcrumbs if record is loaded
    if (!record) {
      return;
    }

    // Push breadcrumb
    const breadcrumbs = [{
      text: i18n._t('CampaignAdmin.CAMPAIGN', 'Campaigns'),
      href: joinUrlPaths('/', sectionConfig.reactRoutePath),
    }];
    breadcrumbs.push({
      text: record.Name,
      href: joinUrlPaths('/', sectionConfig.reactRoutePath, `set/${campaignId}/show`),
    });

    breadcrumbsActions.setBreadcrumbs(breadcrumbs);
  };

  const getItems = () => {
    if (record && record._embedded) {
      return record._embedded.items;
    }
    return null;
  };

  const getPlaceholderGroups = () => {
    const groups = {};

    if (record && record.placeholderGroups) {
      record.placeholderGroups.forEach((group) => {
        groups[group.baseClass] = { ...group };
        groups[group.baseClass].items = [...group.items];
      });
    }

    return groups;
  };

  /**
   * Group items for changeset display
   *
   * @return {object}
   */
  const groupItemsForSet = () => {
    const groups = getPlaceholderGroups();
    const items = getItems();
    if (!items) {
      return groups;
    }

    // group by whatever
    items.forEach(item => {
      // Create new group if needed
      const classname = item.BaseClass;

      if (!groups[classname]) {
        groups[classname] = {
          singular: item.Singular,
          plural: item.Plural,
          items: [],
        };
      }

      // Push items
      groups[classname].items.push(item);
    });

    return groups;
  };

  const getSelectedItem = () => {
    const items = getItems() || [];
    let selected = null;

    if (campaign.changeSetItemId) {
      selected = items.find(item => campaign.changeSetItemId === item.ID);
    }

    // If there's no user-selected item, select the first item in the first
    // non-empty display group
    if (!selected) {
      const groups = groupItemsForSet();

      // Find the first group name that has at least one item
      const nonEmptyGroupName = Object.keys(groups).find(name =>
        groups[name] && groups[name].items.length > 0
      );

      selected = nonEmptyGroupName ? groups[nonEmptyGroupName].items[0] : null;
    }

    return selected;
  };

  const handleRemoveItem = () => {
    if (typeof onRemoveCampaignItem === 'function') {
      onRemoveCampaignItem(campaignId, getSelectedItem().ID);
    }
  };

  /**
   * @return {array}
   */
  const getMoreActions = () => {
    const selectedItem = getSelectedItem();

    if (!selectedItem) {
      return null;
    }

    const referencedBy = selectedItem._links && selectedItem._links.referenced_by;
    const requiredByNum = (referencedBy && referencedBy.length) || 0;
    const unremoveableInfoText = i18n._t(
      'CampaignAdmin.UNREMOVEABLE_INFO',
      'Required by {number} item(s), and cannot be removed directly.'
    );
    const removeAction = selectedItem.Added === 'explicitly'
      ? (
        <DropdownItemComponent
          key="remove_action"
          className="btn btn-secondary action"
          onClick={handleRemoveItem}
        >
          {i18n._t(
            'CampaignAdmin.REMOVE',
            'Remove'
          )}
        </DropdownItemComponent>
      )
      : (
        <DropdownItemComponent
          tag="p"
          key="unremoveable_info"
          className="alert alert-info campaign-admin__unremoveable-item"
        >
          <span className="font-icon-link" aria-hidden="true" />
          {i18n.inject(unremoveableInfoText, { number: requiredByNum })}
        </DropdownItemComponent>
      );

    return [
      removeAction,
    ];
  };

  /**
   * Callback for items being clicked on
   *
   * @param {object} event
   * @param {number} itemId
   */
  const handleItemSelected = (event, itemId) => {
    campaignActions.selectChangeSetItem(itemId);
  };

  const handleCloseItem = () => {
    campaignActions.selectChangeSetItem(null);
  };

  const handlePublish = (e) => {
    e.preventDefault();

    const msg = i18n._t('CampaignAdmin.PUBLISH_CAMPAIGN_CONFIRM', 'Are you sure you want to publish this campaign?');

    // eslint-disable-next-line no-alert
    if (window.confirm(msg)) {
      campaignActions.publishCampaign(publishApi, treeClass, campaignId);
    }
  };

  const renderButtonToolbar = () => {
    const items = getItems();
    const empty = !items || items.length === 0;

    let actionProps = null;

    if (empty) {
      actionProps = {
        title: i18n._t('CampaignAdmin.PUBLISHCAMPAIGN', 'Publish campaign'),
        buttonStyle: 'outline-secondary',
        icon: 'rocket',
        disabled: true,
      };
    } else if (record.State === 'open') {
      actionProps = {
        title: i18n._t('CampaignAdmin.PUBLISHCAMPAIGN', 'Publish campaign'),
        buttonStyle: 'primary',
        loading: campaign.isPublishing,
        onClick: handlePublish,
        icon: 'rocket',
      };
    }

    if (!actionProps) {
      return null;
    }
    return (
      <div className="btn-toolbar">
        <FormActionComponent {...actionProps} />
        {!empty && <ViewModeComponent
          id="view-mode-toggle-in-edit-nb"
          area="edit"
        />}
      </div>
    );
  };

  const renderErrorMessage = (code) => {
    switch (code) {
      case 403:
        return (<p>{i18n._t('CampaignAdmin.FORBIDDEN', 'You do not have access to view this campaign.')}</p>);
      case 404:
        return (<p>{i18n._t('CampaignAdmin.PAGE_NOT_FOUND', 'The campaign you are looking for can not be found.')}</p>);
      default:
        return (<p>{i18n._t('CampaignAdmin.SOMETHING_WENT_WRONG', 'Something went wrong.')}</p>);
    }
  };

  const renderPreview = (itemLinks, itemId) => {
    let previewClasses = [
      'flexbox-area-grow',
      'fill-height',
      'preview',
      'campaign-admin__campaign-preview',
      'campaign-admin__campaign-preview--empty',
    ];

    switch (previewState) {
      case 'preview':
        previewClasses.push('preview-only');
        break;
      case 'edit':
        return null;
      default:
        break;
    }

    previewClasses = classNames(previewClasses);

    if (loading) {
      return (
        <div className={previewClasses}>
          <p>{i18n._t('CampaignAdmin.LOADING', 'Loading...')}</p>
        </div>
      );
    }

    if (stateError) {
      return (
        <div className={previewClasses}>
          {
            renderErrorMessage(errorCode)
          }
        </div>
      );
    }

    if (!getItems() || getItems().length === 0) {
      const message = i18n._t(
        'CampaignAdmin.SELECTFROMSECTIONS',
        'Select "Add to Campaign" from pages, files, and other admin sections with content types'
      );
      return (
        <div className={previewClasses}>
          <h2 className="campaign-admin__empty-heading">
            {i18n._t('CampaignAdmin.GETTINGSTARTED', 'Getting started')}
          </h2>
          <p className="campaign-admin__empty-info">
            {message}
          </p>
        </div>
      );
    }
    const props = {
      itemLinks,
      itemId,
      onBack: handleCloseItem,
      className: previewClasses,
    };
    if (record.State === 'open') {
      props.moreActions = getMoreActions();
    }
    return <PreviewComponent {...props}/>;
  };

  /**
   * Renders the details section of the campaign list.
   *
   * @param body
   * @return object
   */
  const renderCampaignAdminListDetail = (body) => {
    const bodyClass = classNames(
      'panel', 'panel--padded', 'panel--scrollable', 'flexbox-area-grow',
    );

    const newItemInfo = newItem
      ? (
        <p className="alert alert-success alert--no-border" role="alert">
          {i18n._t(
            'CampaignAdmin.NEWCAMPAIGNSUCCESS',
            'Nice one! You have successfully created a campaign.'
          )}
        </p>
      )
      : null;

    // Hide when the preview mode is explicitly enabled
    if (previewState === 'preview') {
      return null;
    }

    const itemClass = classNames(
      'fill-height',
      'campaign-admin__campaign-items',
      {
        'fill-height': (previewState === 'edit'),
        'campaign-admin__campaign-items-edit': (previewState === 'edit'),
      }
    );

    return (
      <div className={itemClass} aria-expanded="true">
        <Toolbar showBackButton onBackButtonClick={onBackButtonClick}>
          <BreadcrumbComponent multiline />
        </Toolbar>
        {newItemInfo}
        <div className={bodyClass}>
          {body}
        </div>
        <div className="toolbar toolbar--south">
          {renderButtonToolbar()}
        </div>
      </div>
    );
  };

  useEffect(() => {
    setBreadcrumbs();
    // Only load record if not already present
    if (loading) {
      const fetchURL = itemListViewEndpoint.url.replace(/:id/, campaignId);
      recordActions
        .fetchRecord(treeClass, 'get', fetchURL)
        .then(() => {
          setBreadcrumbs();
        })
        // Catch error and set Error code
        .catch((e) => {
          setError(true);
          setErrorCode(e.response.status);
        });
    }
    // Return cleanup function to reset new create flag on unmount
    return () => {
      campaignActions.setNewItem(null);
    };
  }, []);

  /**
   * Renders a list of items in a Campaign.
   *
   * @return object
   */
  let itemId = campaign.changeSetItemId;

  let itemLinks = null;
  const selectedClass = (!itemId) ? 'campaign-admin__campaign--hide-preview' : '';

  // Trigger different layout when preview is enabled
  const itemGroups = groupItemsForSet();

  // Get items in this set
  const accordionBlocks = [];

  const selectedItem = getSelectedItem();
  const selectedItemsLinkedTo = (
    selectedItem && selectedItem._links && selectedItem._links.references
  ) || [];
  const selectedItemsLinkedFrom = (
    selectedItem && selectedItem._links && selectedItem._links.referenced_by
  ) || [];

  Object.keys(itemGroups).forEach(className => {
    const group = itemGroups[className];
    const groupCount = group.items.length;

    const listGroupItems = [];
    const title = `
      ${groupCount === 0 ? '' : groupCount}
      ${groupCount === 1 ? group.singular : group.plural}
    `;
    const groupid = `Set_${campaignId}_Group_${className}`;

    // Create items for this group
    group.items.forEach((item, index) => {
      // Auto-select first item
      if (!itemId) {
        itemId = item.ID;
      }
      const selected = (itemId === item.ID);

      // Check links
      if (selected && item._links) {
        itemLinks = item._links;
      }

      // Add extra css class for published items
      const itemClassNames = classNames({
        'list-group-item--inactive': (item.ChangeType === 'none' || record.State === 'published'),
        active: (selected),
      });

      let isLinked = !!selectedItemsLinkedTo.find(
        linkToObj => linkToObj.ChangeSetItemID === parseInt(item.ID, 10));

      isLinked = isLinked || selectedItemsLinkedFrom.find(linkFromObj => (
        linkFromObj.ChangeSetItemID === item.ID
      ));

      listGroupItems.push(
        <ListGroupItem
          key={item.ID || index}
          className={itemClassNames}
          onClick={handleItemSelected}
          onClickArg={item.ID}
        >
          <CampaignAdminItem
            item={item}
            campaign={record}
            selected={selected}
            isLinked={isLinked}
          />
        </ListGroupItem>
      );
    });

    const wrapperClassnames = classNames('list-group-wrapper', {
      'list-group-wrapper--empty': listGroupItems.length === 0,
    });

    // Merge into group
    accordionBlocks.push(
      <div className={wrapperClassnames} key={groupid}>
        <AccordionBlock groupid={groupid} title={title}>
          {
            listGroupItems.length > 0
              ? listGroupItems
              : <p className="list-group-item">{group.noItemsText}</p>
          }
        </AccordionBlock>
      </div>
    );
  });

  const body = <Accordion>{accordionBlocks}</Accordion>;

  const loadingSpinner = loading && [
    <div key="overlay" className="cms-content-loading-overlay ui-widget-overlay-light" />,
    <div key="spinner" className="cms-content-loading-spinner" />,
  ];

  return (
    <div className={`fill-width campaign-admin__campaign ${selectedClass}`}>
      {loadingSpinner}
      {renderCampaignAdminListDetail(body)}
      {renderPreview(itemLinks, itemId)}
    </div>
  );
};

CampaignAdminList.propTypes = {
  campaign: PropTypes.shape({
    isPublishing: PropTypes.bool,
    changeSetItemId: PropTypes.number,
  }),
  publishApi: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired,
  sectionConfig: PropTypes.object.isRequired,
  onBackButtonClick: PropTypes.func,
  onRemoveCampaignItem: PropTypes.func,
  breadcrumbsActions: PropTypes.object.isRequired,
  campaignActions: PropTypes.object.isRequired,
  recordActions: PropTypes.object.isRequired,
  PreviewComponent: PropTypes.elementType,
  ViewModeComponent: PropTypes.elementType,
  FormActionComponent: PropTypes.elementType,
  previewState: PropTypes.oneOf(['edit', 'preview', 'split']),
  BreadcrumbComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  DropdownItemComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

function mapStateToProps(state, ownProps) {
  const treeClass = ownProps.sectionConfig.treeClass;
  const id = parseInt(ownProps.campaignId, 10);
  const records = state.records[treeClass] || [];
  // Find record specific to this item
  const record = records.find(item => item.ID === id) || {};

  return {
    config: state.config,
    record,
    campaign: state.campaign,
    treeClass,
    newItem: state.campaign.newItem,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    breadcrumbsActions: bindActionCreators(breadcrumbsActionsImport, dispatch),
    recordActions: bindActionCreators(recordActionsImport, dispatch),
    campaignActions: bindActionCreators(campaignActionsImport, dispatch),
  };
}

export { CampaignAdminList as Component };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  inject(
    ['FormAction', 'ViewModeToggle', 'Preview'],
    (FormAction, ViewModeToggle, Preview) => ({
      FormActionComponent: FormAction,
      ViewModeComponent: ViewModeToggle,
      PreviewComponent: Preview,
    }),
    () => 'CampaignAdmin.CampaignAdmin.List'
  )
)(CampaignAdminList);
