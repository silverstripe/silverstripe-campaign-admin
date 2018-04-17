/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import * as breadcrumbsActions from 'state/breadcrumbs/BreadcrumbsActions';
import * as recordActions from 'state/records/RecordsActions';
import * as campaignActions from 'state/campaign/CampaignActions';
import Accordion from 'components/Accordion/Accordion';
import AccordionBlock from 'components/Accordion/AccordionBlock';
import ListGroupItem from 'components/ListGroup/ListGroupItem';
import Toolbar from 'components/Toolbar/Toolbar';
import CampaignAdminItem from './CampaignAdminItem';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import { DropdownItem } from 'reactstrap';
import i18n from 'i18n';
import { inject } from 'lib/Injector';
import classNames from 'classnames';

/**
 * Represents a campaign list view
 */
class CampaignAdminList extends Component {
  constructor(props) {
    super(props);

    this.handlePublish = this.handlePublish.bind(this);
    this.handleItemSelected = this.handleItemSelected.bind(this);
    this.setBreadcrumbs = this.setBreadcrumbs.bind(this);
    this.handleCloseItem = this.handleCloseItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.renderCampaignAdminListDetail = this.renderCampaignAdminListDetail.bind(this);

    if (!this.isRecordLoaded(props)) {
      this.state = {
        loading: true,
      };
    } else {
      this.state = {
        loading: false,
      };
    }
  }

  componentDidMount() {
    const { campaignId, itemListViewEndpoint, recordActions: actions, treeClass } = this.props;
    const fetchURL = itemListViewEndpoint.url.replace(/:id/, campaignId);

    this.setBreadcrumbs();

    // Only load record if not already present
    if (!this.isRecordLoaded()) {
      actions
        .fetchRecord(treeClass, 'get', fetchURL)
        .then(() => {
          this.setBreadcrumbs();
          this.setState({ loading: false });
        });
    }
  }

  componentWillUnmount() {
    // Reset new create flag
    this.props.campaignActions.setNewItem(null);
  }

  /**
   * Update breadcrumbs for this view
   */
  setBreadcrumbs() {
    const { breadcrumbsActions: actions, campaignId, record, sectionConfig: { url } } = this.props;

    // Setup breadcrumbs if record is loaded
    if (!record) {
      return;
    }

    // Push breadcrumb
    const breadcrumbs = [{
      text: i18n._t('CampaignAdmin.CAMPAIGN', 'Campaigns'),
      href: url,
    }];
    breadcrumbs.push({
      text: record.Name,
      href: `${url}/set/${campaignId}/show`,
    });

    actions.setBreadcrumbs(breadcrumbs);
  }

  getSelectedItem() {
    const { campaign: { changeSetItemId } } = this.props;
    const items = this.getItems() || [];
    let selected = null;

    if (changeSetItemId) {
      selected = items.find(item => changeSetItemId === item.ID);
    }

    // If there's no user-selected item, select the first item in the first
    // non-empty display group
    if (!selected) {
      const groups = this.groupItemsForSet();

      // Find the first group name that has at least one item
      const nonEmptyGroupName = Object.keys(groups).find(name =>
        groups[name] && groups[name].items.length > 0
      );

      selected = nonEmptyGroupName ? groups[nonEmptyGroupName].items[0] : null;
    }

    return selected;
  }

  /**
   * @return {array}
   */
  getMoreActions() {
    const selectedItem = this.getSelectedItem();

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
        <DropdownItem
          key="remove_action"
          className="btn btn-secondary action"
          onClick={this.handleRemoveItem}
        >
          {i18n._t(
            'CampaignAdmin.REMOVE',
            'Remove'
          )}
        </DropdownItem>
      )
      : (
        <DropdownItem
          tag="p"
          key="unremoveable_info"
          className="alert alert-info campaign-admin__unremoveable-item"
        >
          <span className="font-icon-link" />
          {i18n.inject(unremoveableInfoText, { number: requiredByNum })}
        </DropdownItem>
      );

    return [
      removeAction,
    ];
  }

  /**
   * @return {array|null}
   */
  getItems() {
    const { record } = this.props;
    if (record && record._embedded) {
      return record._embedded.items;
    }
    return null;
  }

  getPlaceholderGroups() {
    const groups = {};
    const { record } = this.props;

    if (record && record.placeholderGroups) {
      record.placeholderGroups.forEach((group) => {
        groups[group.baseClass] = { ...group };
        groups[group.baseClass].items = [...group.items];
      });
    }

    return groups;
  }

  /**
   * Group items for changeset display
   *
   * @return {object}
   */
  groupItemsForSet() {
    const groups = this.getPlaceholderGroups();
    const items = this.getItems();
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
  }

  /**
   * @return {boolean}
   */
  isRecordLoaded(props = this.props) {
    return Object.keys(props.record).length !== 0;
  }

  handleRemoveItem() {
    const { campaignId, onRemoveCampaignItem } = this.props;

    if (typeof onRemoveCampaignItem === 'function') {
      onRemoveCampaignItem(campaignId, this.getSelectedItem().ID);
    }
  }

  /**
   * Callback for items being clicked on
   *
   * @param {object} event
   * @param {number} itemId
   */
  handleItemSelected(event, itemId) {
    this.props.campaignActions.selectChangeSetItem(itemId);
  }

  handleCloseItem() {
    this.props.campaignActions.selectChangeSetItem(null);
  }

  handlePublish(e) {
    const { campaignId, campaignActions: { publishCampaign }, publishApi, treeClass } = this.props;

    e.preventDefault();

    const msg = i18n._t('CampaignAdmin.PUBLISH_CAMPAIGN_CONFIRM', 'Are you sure you want to publish this campaign?');

    // eslint-disable-next-line no-alert
    if (window.confirm(msg)) {
      publishCampaign(publishApi, treeClass, campaignId);
    }
  }

  renderButtonToolbar() {
    const {
      ViewModeComponent,
      FormActionComponent,
      record,
      campaign: { isPublishing }
    } = this.props;

    const items = this.getItems();
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
        loading: isPublishing,
        onClick: this.handlePublish,
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
          area={'edit'}
        />}
      </div>
    );
  }

  renderPreview(itemLinks, itemId) {
    const { PreviewComponent, previewState } = this.props;
    const { loading } = this.state;

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

    if (!this.getItems() || this.getItems().length === 0) {
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

    return (
      <PreviewComponent
        itemLinks={itemLinks}
        itemId={itemId}
        onBack={this.handleCloseItem}
        moreActions={this.getMoreActions()}
        className={previewClasses}
      />
    );
  }

  /**
   * Renders the details section of the campaign list.
   *
   * @param body
   * @return object
   */
  renderCampaignAdminListDetail(body) {
    const { previewState, onBackButtonClick, newItem } = this.props;

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
          <Breadcrumb multiline />
        </Toolbar>
        {newItemInfo}
        <div className={bodyClass}>
          {body}
        </div>
        <div className="toolbar toolbar--south">
          {this.renderButtonToolbar()}
        </div>
      </div>
    );
  }

  /**
   * Renders a list of items in a Campaign.
   *
   * @return object
   */
  render() {
    const { campaign: { changeSetItemId }, campaignId, record: campaign } = this.props;
    let itemId = changeSetItemId;

    let itemLinks = null;
    const selectedClass = (!itemId) ? 'campaign-admin__campaign--hide-preview' : '';

    // Trigger different layout when preview is enabled
    const itemGroups = this.groupItemsForSet();

    // Get items in this set
    const accordionBlocks = [];

    const selectedItem = this.getSelectedItem();
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
            'list-group-item--inactive': (item.ChangeType === 'none' || campaign.State === 'published'),
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
            onClick={this.handleItemSelected}
            onClickArg={item.ID}
          >
            <CampaignAdminItem
              item={item}
              campaign={this.props.record}
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

    const loading = this.props.loading && [
      <div key="overlay" className="cms-content-loading-overlay ui-widget-overlay-light" />,
      <div key="spinner" className="cms-content-loading-spinner" />,
    ];

    return (
      <div className={`fill-width campaign-admin__campaign ${selectedClass}`}>
        {loading}
        {this.renderCampaignAdminListDetail(body, itemLinks)}
        {this.renderPreview(itemLinks, itemId)}
      </div>
    );
  }
}

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
  PreviewComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  ViewModeComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  FormActionComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  previewState: PropTypes.oneOf(['edit', 'preview', 'split']),
};

CampaignAdminList.defaultProps = {

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
    breadcrumbsActions: bindActionCreators(breadcrumbsActions, dispatch),
    recordActions: bindActionCreators(recordActions, dispatch),
    campaignActions: bindActionCreators(campaignActions, dispatch),
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
