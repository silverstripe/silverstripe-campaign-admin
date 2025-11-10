import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { bindActionCreators } from 'redux';
import getFormState from 'lib/getFormState';
import backend from 'lib/Backend';
import * as campaignActionsImport from 'state/campaign/CampaignActions';
import * as breadcrumbsActionsImport from 'state/breadcrumbs/BreadcrumbsActions';
import * as recordActionsImport from 'state/records/RecordsActions';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import FormAction from 'components/FormAction/FormAction';
import Search, { hasFilters } from 'components/Search/Search';
import SearchToggle from 'components/Search/SearchToggle';
import i18n from 'i18n';
import Toolbar from 'components/Toolbar/Toolbar';
import FormBuilderLoader from 'containers/FormBuilderLoader/FormBuilderLoader';
import IntroScreen from 'components/IntroScreen/IntroScreen';
import ResizeAware from 'components/ResizeAware/ResizeAware';
import withRouter, { routerPropTypes } from 'lib/withRouter';
import * as viewModeActions from 'state/viewMode/ViewModeActions';
import { joinUrlPaths } from 'lib/urls';
import CampaignAdminList from './CampaignAdminList';

const sectionConfigKey = 'SilverStripe\\CampaignAdmin\\CampaignAdmin';

const CampaignAdmin = ({
  breadcrumbsActions,
  campaignActions,
  recordActions,
  breadcrumbs = [],
  sectionConfig = {},
  securityId,
  router = { params: {} },
  showMessage,
  previewState,
  onResize,
  FormBuilderLoaderComponent = FormBuilderLoader,
  BreadcrumbComponent = Breadcrumb,
  title,
}) => {
  const [loading, setLoading] = useState(false);
  const [focusIntroCloseButton, setFocusIntroCloseButton] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [filters, setFilters] = useState({});

  const helpButtonRef = useRef();

  const defaultData = { SecurityID: securityId };

  const publishApi = backend.createEndpointFetcher({
    ...sectionConfig.publishEndpoint,
    defaultData,
    payloadSchema: {
      id: { urlReplacement: ':id', remove: true },
    },
  });

  const removeCampaignItemApi = backend.createEndpointFetcher({
    ...sectionConfig.removeCampaignItemEndpoint,
    defaultData,
    payloadSchema: {
      id: { urlReplacement: ':id', remove: true },
      itemId: { urlReplacement: ':itemId', remove: true },
    },
  });

  const searchCampaignsApi = backend.createEndpointFetcher({
    ...sectionConfig.searchCampaignsEndpoint,
    payloadSchema: {},
  });

  /**
   * Generate route with the given id and view
   *
   * @param {number} id
   * @param {string} view
   * @return {string}
   */
  const getActionRoute = (id, view) => {
    const { reactRoutePath } = sectionConfig;
    return joinUrlPaths('/', reactRoutePath, `/set/${id}/${view}`);
  };

  const setBreadcrumbs = (view, id, breadcrumbTitle) => {
    const { reactRoutePath } = sectionConfig;

    // Set root breadcrumb
    const newBreadcrumbs = [{
      text: i18n._t('CampaignAdmin.CAMPAIGN', 'Campaigns'),
      href: joinUrlPaths('/', reactRoutePath),
    }];
    switch (view) {
      case 'show':
        // NOOP - Lazy loaded in CampaignAdminList.js
        break;
      case 'edit':
        newBreadcrumbs.push({
          text: breadcrumbTitle,
          href: getActionRoute(id, view),
        });
        break;
      case 'create':
        newBreadcrumbs.push({
          text: i18n._t('CampaignAdmin.ADDNEWCAMPAIGN', 'Add new campaign'),
          href: getActionRoute(id, view),
        });
        break;
      default:
        // NOOP
        break;
    }
    breadcrumbsActions.setBreadcrumbs(newBreadcrumbs);
  };

  const fetchCampaignsList = () => {
    const endpoint = sectionConfig.readCampaignsEndpoint;
    const fetchURL = endpoint.url;
    return recordActions.fetchRecords(
      sectionConfig.treeClass,
      endpoint.method,
      fetchURL
    );
  };

  const handleDoSearch = (filtersParam) => {
    setFilters(filtersParam);
    // If there are no filters, or the filter values are empty, just fetch everything
    if (!hasFilters(filtersParam) || Object.values(filtersParam).filter((val) => val || val === 0).length === 0) {
      return fetchCampaignsList();
    }
    return campaignActions.searchCampaigns(
      sectionConfig.treeClass,
      searchCampaignsApi,
      filtersParam
    );
  };

  const toggleSearch = () => {
    setShowSearch(prevShowSearch => !prevShowSearch);
  };

  const handleClearSearch = () => {
    setShowSearch(false);
    handleDoSearch({});
  };

  const handleBackButtonClick = (event) => {
    // Go back to second from last breadcrumb (where last item is current)
    if (breadcrumbs.length > 1) {
      const last = breadcrumbs[breadcrumbs.length - 2];
      if (last && last.href) {
        event.preventDefault();
        router.navigate(last.href);
      }
    }
  };

  /**
   * @param {object} response
   * @returns {boolean}
   */
  const hasErrors = (response) => {
    if (response.errors && response.errors.length) {
      return true;
    }
    const responseState = response.state;
    if (!responseState) {
      return false;
    }
    // Check global messages
    if (responseState.messages && responseState.messages.find((message) => message.type !== 'good')) {
      return true;
    }
    // Find first field message
    const message = responseState.fields && responseState.fields.find((field) => field.message && field.message.type !== 'good');
    return Boolean(message);
  };

  /**
   * Handler for creating campaign, will redirect to edit form
   *
   * @param {object} data
   * @param {string} action
   * @param {function} submitFn
   * @returns {Promise}
   */
  const handleCreateCampaignSubmit = (data, action, submitFn) => {
    const promise = submitFn();
    if (!promise) {
      throw new Error('Promise was not returned for submitting');
    }
    return promise
      .then((response) => {
        const hasErrorsResult = hasErrors(response);
        if (action === 'action_save' && !hasErrorsResult) {
          // open the new campaign in edit mode after save completes
          const id = response.record.id;
          campaignActions.setNewItem(id);
          router.navigate(getActionRoute(id, 'show'));
        }
        return response;
      });
  };

  const handleFormAction = (event) => {
    const name = event.currentTarget.name;
    // intercept the Add to Campaign submit and open the modal dialog instead
    if (name === 'action_cancel') {
      router.navigate(joinUrlPaths('/', sectionConfig.reactRoutePath));
      event.preventDefault();
    }
  };

  const removeCampaignItemHelper = (campaignId, itemId) => campaignActions.removeCampaignItem(
    removeCampaignItemApi,
    campaignId,
    itemId
  );

  /**
   * @param {number} campaignId
   * @param {number} itemId
   * @returns {Promise|null}
   */
  const handleRemoveCampaignItem = (campaignId, itemId) => {
    const fallbackMsg = `Are you sure you want to remove this item?

By removing this item all linked items will be removed unless used elsewhere.`;
    const msg = i18n._t('CampaignAdmin.REMOVE_ITEM_MESSAGE', fallbackMsg);
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(msg);
    if (!confirmed) {
      return null;
    }
    setLoading(true);
    return removeCampaignItemHelper(campaignId, itemId)
      .then(fetchCampaignsList)
      .then(() => setLoading(false))
      .then(() => {
        campaignActions.selectChangeSetItem(null);
        // Workaround to hide more actions popover
        window.document.body.click();
      });
  };

  const handleToggleMessage = () => {
    campaignActions.setShowMessage(!showMessage);
    setFocusIntroCloseButton(true);
  };

  const handleHideMessage = () => {
    campaignActions.setShowMessage(false);
    setFocusIntroCloseButton(false);
  };

  /**
   * Hook to allow customisation of components being constructed
   * by the Campaign list FormBuilderLoader.
   *
   * @param {object} Custom Component constructor.
   * @param {object} props Props passed from FormBuilderLoader.
   *
   * @return {object} Instantiated React component
   */
  const campaignListCreateFn = (Custom, props) => {
    const typeUrlParam = 'set';
    if (props.schemaComponent === 'GridField') {
      const extendedProps = {
        ...props,
        data: {
          ...props.data,
          onDrillDown: (event, record) => {
            router.navigate(joinUrlPaths('/', sectionConfig.reactRoutePath, `${typeUrlParam}/${record.ID}/show`));
          },
          onEditRecord: (event, id) => {
            router.navigate(joinUrlPaths('/', sectionConfig.reactRoutePath, `${typeUrlParam}/${id}/edit`));
          },
        },
      };
      return <Custom key={extendedProps.name} {...extendedProps} />;
    }
    return <Custom key={props.name} {...props} />;
  };

  const addCampaign = () => {
    const path = getActionRoute(0, 'create');
    router.navigate(path);
  };

  // Set breadcrumbs when route or title changes
  useEffect(() => {
    setBreadcrumbs(router.params.view, router.params.id, title);
  }, [router.params.id, router.params.view, title]);

  // Focus help button when showMessage toggles from true to false
  useEffect(() => {
    if (!showMessage && helpButtonRef.current) {
      helpButtonRef.current.focus();
    }
  }, [showMessage]);

  /**
   * Render the view for creating a new Campaign.
   *
   * @returns {object}
   */
  const renderCreateView = () => {
    const { schemaUrl } = sectionConfig.form.campaignCreateForm;
    return (
      <div className="fill-height">
        <Toolbar showBackButton onBackButtonClick={handleBackButtonClick}>
          <BreadcrumbComponent multiline />
        </Toolbar>
        <FormBuilderLoaderComponent
          fieldHolder={{ className: 'panel panel--padded panel--scrollable flexbox-area-grow form--inline' }}
          actionHolder={{ className: 'toolbar--south' }}
          onSubmit={handleCreateCampaignSubmit}
          onAction={handleFormAction}
          schemaUrl={schemaUrl}
          identifier="Campaign.CreateView"
        />
      </div>
    );
  };

  /**
   * Renders the Detail Edit Form for a Campaign.
   *
   * @returns {object}
   */
  const renderDetailEditView = () => {
    if (router.params.id <= 0) {
      return renderCreateView();
    }
    const baseSchemaUrl = sectionConfig.form.campaignEditForm.schemaUrl;
    const schemaUrl = joinUrlPaths(baseSchemaUrl, '/', router.params.id);
    return (
      <div className="fill-height">
        <Toolbar showBackButton onBackButtonClick={handleBackButtonClick}>
          <BreadcrumbComponent multiline />
        </Toolbar>

        <FormBuilderLoaderComponent
          fieldHolder={{ className: 'panel panel--padded panel--scrollable flexbox-area-grow form--inline' }}
          actionHolder={{ className: 'toolbar--south' }}
          onAction={handleFormAction}
          schemaUrl={schemaUrl}
          identifier="Campaign.EditView"
        />
      </div>
    );
  };

  /**
   * Renders the default view which displays a list of Campaigns.
   *
   * @returns {object}
   */
  const renderIndexView = () => {
    const formActionProps = {
      title: i18n._t('CampaignAdmin.ADDNEWCAMPAIGN', 'Add new campaign'),
      icon: 'plus',
      extraClass: 'btn-primary',
      onClick: addCampaign,
    };
    const formBuilderProps = {
      createFn: campaignListCreateFn,
      schemaUrl: sectionConfig.form.EditForm.schemaUrl,
      identifier: 'Campaign.IndexView',
    };
    const showSearchDisplay = hasFilters(filters) || showSearch;
    return (
      <div className="fill-height" aria-expanded="true">
        <Toolbar>
          <BreadcrumbComponent multiline />
          <div className="campaign--toolbar__extra pull-xs-right fill-width vertical-align-items">
            <SearchToggle toggled={showSearchDisplay} onToggle={toggleSearch} />
          </div>
        </Toolbar>
        {showSearchDisplay && <Search
          onSearch={handleDoSearch}
          id="CampaignSearchForm"
          formSchemaUrl={sectionConfig.form.campaignSearchForm.schemaUrl}
          onHide={handleClearSearch}
          displayBehavior="HIDEABLE"
          filters={filters}
          filterPrefix="Search__"
          addFilterPrefix
          name={sectionConfig.searchCampaignsGeneralField}
        />}
        <div className="panel panel--scrollable flexbox-area-grow">
          <IntroScreen
            show={showMessage}
            onClose={handleHideMessage}
            focusCloseButton={focusIntroCloseButton}
          />
          <div className="panel panel--padded flexbox-area-grow">
            <div className="toolbar toolbar--content">
              <div className="btn-toolbar fill-width campaign-toolbar">
                { !showMessage && <div className="btn-toolbar__left-panel">
                  <button
                    aria-label={i18n._t('CampaignAdmin.HELP_SHOW', 'Show help')}
                    aria-expanded={showMessage}
                    aria-controls="campaign-info"
                    onClick={handleToggleMessage}
                    className="btn btn-secondary font-icon-white-question btn--icon-xl btn--no-text"
                    ref={helpButtonRef}
                  />
                </div> }
                <div className="btn-toolbar__left-panel flexbox-area-grow">
                  <FormAction {...formActionProps} />
                </div>
              </div>
            </div>
            <FormBuilderLoaderComponent {...formBuilderProps} />
          </div>
        </div>
      </div>
    );
  };

  /**
   * Renders a list of items in a Campaign.
   *
   * @returns {object}
   */
  const renderItemListView = () => {
    const props = {
      sectionConfig,
      campaignId: router.params.id,
      itemListViewEndpoint: sectionConfig.itemListViewEndpoint,
      publishApi,
      onBackButtonClick: handleBackButtonClick,
      onRemoveCampaignItem: handleRemoveCampaignItem,
      loading,
      previewState,
    };
    return (
      <ResizeAware style={{ position: 'relative' }} className="flexbox-area-grow fill-height" onResize={({ width }) => onResize(width)} >
        <CampaignAdminList {...props} />
      </ResizeAware>
    );
  };
  let view = null;
  switch (router.params.view) {
    case 'show':
      view = renderItemListView();
      break;
    case 'edit':
      view = renderDetailEditView();
      break;
    case 'create':
      view = renderCreateView();
      break;
    default:
      view = renderIndexView();
  }
  return view;
};

CampaignAdmin.propTypes = {
  breadcrumbsActions: PropTypes.object.isRequired,
  campaignActions: PropTypes.object.isRequired,
  recordActions: PropTypes.object.isRequired,
  sectionConfig: PropTypes.shape({
    publishEndpoint: PropTypes.shape({
      url: PropTypes.string,
      method: PropTypes.string,
    }),
    form: PropTypes.shape({
      EditForm: PropTypes.shape({
        schemaUrl: PropTypes.string,
      }),
      campaignEditForm: PropTypes.shape({
        schemaUrl: PropTypes.string,
      }),
      campaignCreateForm: PropTypes.shape({
        schemaUrl: PropTypes.string,
      }),
    }),
  }),
  securityId: PropTypes.string.isRequired,
  router: routerPropTypes,
  showMessage: PropTypes.bool,
  previewState: PropTypes.oneOf(['edit', 'preview', 'split']),
  onResize: PropTypes.func.isRequired,
  FormBuilderLoaderComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  BreadcrumbComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  breadcrumbs: PropTypes.array,
  title: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  let title = null;
  const sectionConfig = state.config.sections.find((section) => (
    section.name === sectionConfigKey
  ));
  const viewMode = state.viewMode;

  if (ownProps.router.params.id > 0) {
    const schemaUrl = `${sectionConfig.form.campaignEditForm.schemaUrl}/${ownProps.router.params.id}`;
    const schema = state.form.formSchemas[schemaUrl];
    const schemaName = schema && schema.name;
    const selector = schemaName && formValueSelector(schema.name, getFormState);
    title = selector && selector(state, 'Name');
  }

  return {
    previewState: viewMode.activeState,
    config: state.config,
    breadcrumbs: state.breadcrumbs,
    sectionConfig,
    securityId: state.config.SecurityID,
    title,
    showMessage: state.campaign.showMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    breadcrumbsActions: bindActionCreators(breadcrumbsActionsImport, dispatch),
    campaignActions: bindActionCreators(campaignActionsImport, dispatch),
    recordActions: bindActionCreators(recordActionsImport, dispatch),
    onResize(panelWidth) {
      dispatch(viewModeActions.enableOrDisableSplitMode(panelWidth));
    }
  };
}

export { CampaignAdmin as Component };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampaignAdmin));
