import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import backend from 'lib/Backend';
import * as breadcrumbsActions from 'state/breadcrumbs/BreadcrumbsActions';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import SilverStripeComponent from 'lib/SilverStripeComponent';
import FormAction from 'components/FormAction/FormAction';
import i18n from 'i18n';
import Toolbar from 'components/Toolbar/Toolbar';
import FormBuilderLoader from 'containers/FormBuilderLoader/FormBuilderLoader';
import CampaignAdminList from './CampaignAdminList';

const sectionConfigKey = 'SilverStripe\\CampaignAdmin\\CampaignAdmin';

class CampaignAdmin extends SilverStripeComponent {

  constructor(props) {
    super(props);

    this.publishApi = backend.createEndpointFetcher({
      url: this.props.sectionConfig.publishEndpoint.url,
      method: this.props.sectionConfig.publishEndpoint.method,
      defaultData: { SecurityID: this.props.securityId },
      payloadSchema: {
        id: { urlReplacement: ':id', remove: true },
      },
    });

    // Bind
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleCreateCampaignSubmit = this.handleCreateCampaignSubmit.bind(this);
    this.handleFormAction = this.handleFormAction.bind(this);
  }

  componentWillMount() {
    // Ensure default breadcrumbs are setup
    if (this.props.breadcrumbs.length === 0) {
      this.setBreadcrumbs(this.props.params.view, this.props.params.id);
    }
  }

  componentWillReceiveProps(props) {
    const hasChangedRoute = (
      this.props.params.id !== props.params.id ||
      this.props.params.view !== props.params.view
    );
    if (hasChangedRoute) {
      this.setBreadcrumbs(props.params.view, props.params.id);
    }
  }

  setBreadcrumbs(view, id) {
    // Set root breadcrumb
    const breadcrumbs = [{
      text: i18n._t('CampaignAdmin.CAMPAIGN', 'Campaigns'),
      href: this.props.sectionConfig.url,
    }];
    switch (view) {
      case 'show':
        // NOOP - Lazy loaded in CampaignAdminList.js
        break;
      case 'edit':
        // @todo - Lazy load in FormBuilderLoader / GridField
        breadcrumbs.push({
          text: i18n._t('CampaignAdmin.EDIT_CAMPAIGN', 'Editing Campaign'),
          href: this.getActionRoute(id, view),
        });
        break;
      case 'create':
        breadcrumbs.push({
          text: i18n._t('CampaignAdmin.ADD_CAMPAIGN', 'Add Campaign'),
          href: this.getActionRoute(id, view),
        });
        break;
      default:
        // NOOP
        break;
    }

    this.props.breadcrumbsActions.setBreadcrumbs(breadcrumbs);
  }

  handleBackButtonClick(event) {
    // Go back to second from last breadcrumb (where last item is current)
    if (this.props.breadcrumbs.length > 1) {
      const last = this.props.breadcrumbs[this.props.breadcrumbs.length - 2];
      if (last && last.href) {
        event.preventDefault();
        this.props.router.push(last.href);
      }
    }
  }


  /**
   * Handler for creating campaign, will redirect to edit form
   *
   * @param {object} data
   * @param {string} action
   * @param {function} submitFn
   * @returns {Promise}
   */
  handleCreateCampaignSubmit(data, action, submitFn) {
    const promise = submitFn();
    if (!promise) {
      throw new Error('Promise was not returned for submitting');
    }
    return promise
      .then((response) => {
        if (action === 'action_save') {
          // open the new folder in edit mode after save completes
          const sectionUrl = this.props.sectionConfig.url;
          const id = response.record.id;
          this.props.router.push(`${sectionUrl}/set/${id}/edit`);
        }
        return response;
      });
  }

  handleFormAction(event) {
    const name = event.currentTarget.name;
    // intercept the Add to Campaign submit and open the modal dialog instead
    if (name === 'action_cancel') {
      const url = this.props.sectionConfig.url;
      this.props.router.push(url);
      event.preventDefault();
    }
  }

  render() {
    let view = null;

    switch (this.props.params.view) {
      case 'show':
        view = this.renderItemListView();
        break;
      case 'edit':
        view = this.renderDetailEditView();
        break;
      case 'create':
        view = this.renderCreateView();
        break;
      default:
        view = this.renderIndexView();
    }

    return view;
  }

  /**
   * Renders the default view which displays a list of Campaigns.
   *
   * @return object
   */
  renderIndexView() {
    const schemaUrl = this.props.sectionConfig.form.EditForm.schemaUrl;
    const formActionProps = {
      title: i18n._t('CampaignAdmin.ADDCAMPAIGN'),
      icon: 'plus',
      handleClick: this.addCampaign.bind(this),
    };
    const formBuilderProps = {
      createFn: this.campaignListCreateFn.bind(this),
      schemaUrl,
    };

    return (
      <div className="fill-height" aria-expanded="true">
        <Toolbar>
          <Breadcrumb multiline />
        </Toolbar>
        <div className="panel panel--padded panel--scrollable flexbox-area-grow">
          <div className="toolbar toolbar--content">
            <div className="btn-toolbar">
              <FormAction {...formActionProps} />
            </div>
          </div>
          <FormBuilderLoader {...formBuilderProps} />
        </div>
      </div>
    );
  }

  /**
   * Renders a list of items in a Campaign.
   *
   * @return object
   */
  renderItemListView() {
    const props = {
      sectionConfig: this.props.sectionConfig,
      campaignId: this.props.params.id,
      itemListViewEndpoint: this.props.sectionConfig.itemListViewEndpoint,
      publishApi: this.publishApi,
      handleBackButtonClick: this.handleBackButtonClick.bind(this),
    };

    return (
      <CampaignAdminList {...props} />
    );
  }

  /**
   * Renders the Detail Edit Form for a Campaign.
   */
  renderDetailEditView() {
    if (this.props.params.id <= 0) {
      return this.renderCreateView();
    }
    const baseSchemaUrl = this.props.sectionConfig.form.campaignEditForm.schemaUrl;
    const schemaUrl = `${baseSchemaUrl}/${this.props.params.id}`;

    return (
      <div className="fill-height">
        <Toolbar showBackButton handleBackButtonClick={this.handleBackButtonClick}>
          <Breadcrumb multiline />
        </Toolbar>

        <div className="panel panel--padded panel--scrollable flexbox-area-grow form--inline">
          <FormBuilderLoader
            handleAction={this.handleFormAction}
            schemaUrl={schemaUrl}
          />
        </div>
      </div>
    );
  }

  /**
   * Render the view for creating a new Campaign.
   */
  renderCreateView() {
    const schemaUrl = this.props.sectionConfig.form.campaignCreateForm.schemaUrl;
    return (
      <div className="fill-height">
        <Toolbar showBackButton handleBackButtonClick={this.handleBackButtonClick}>
          <Breadcrumb multiline />
        </Toolbar>
        <div className="panel panel--padded panel--scrollable flexbox-area-grow form--inline">
          <FormBuilderLoader
            handleSubmit={this.handleCreateCampaignSubmit}
            handleAction={this.handleFormAction}
            schemaUrl={schemaUrl}
          />
        </div>
      </div>
    );
  }

  /**
   * Hook to allow customisation of components being constructed
   * by the Campaign DetailEdit FormBuilderLoader.
   *
   * @param {Object} Component - Component constructor.
   * @param {Object} props - Props passed from FormBuilderLoader.
   *
   * @return {Object} - Instanciated React component
   */
  campaignEditCreateFn(Component, props) {
    const url = this.props.sectionConfig.url;

    // Route to the Campaigns index view when 'Cancel' is clicked.
    if (props.name === 'action_cancel') {
      const extendedProps = Object.assign({}, props, {
        handleClick: (event) => {
          event.preventDefault();
          this.props.router.push(url);
        },
      });

      return <Component key={props.id} {...extendedProps} />;
    }

    return <Component key={props.id} {...props} />;
  }

  /**
   * Hook to allow customisation of components being constructed
   * by the Campaign creation FormBuilderLoader.
   *
   * @param {Object} Component - Component constructor.
   * @param {Object} props - Props passed from FormBuilderLoader.
   *
   * @return {Object} - Instanciated React component
   */
  campaignAddCreateFn(Component, props) {
    const url = this.props.sectionConfig.url;

    // Route to the Campaigns index view when 'Cancel' is clicked.
    if (props.name === 'action_cancel') {
      const extendedProps = Object.assign({}, props, {
        handleClick: (event) => {
          event.preventDefault();
          this.props.router.push(url);
        },
      });

      return <Component key={props.name} {...extendedProps} />;
    }

    return <Component key={props.name} {...props} />;
  }

  /**
   * Hook to allow customisation of components being constructed
   * by the Campaign list FormBuilderLoader.
   *
   * @param {Object} Component - Component constructor.
   * @param {Object} props - Props passed from FormBuilderLoader.
   *
   * @return object - Instanciated React component
   */
  campaignListCreateFn(Component, props) {
    const sectionUrl = this.props.sectionConfig.url;
    const typeUrlParam = 'set';

    if (props.schemaComponent === 'GridField') {
      const extendedProps = Object.assign({}, props, {
        data: Object.assign({}, props.data, {
          handleDrillDown: (event, record) => {
            this.props.router.push(`${sectionUrl}/${typeUrlParam}/${record.ID}/show`);
          },
          handleEditRecord: (event, id) => {
            this.props.router.push(`${sectionUrl}/${typeUrlParam}/${id}/edit`);
          },
        }),
      });

      return <Component key={extendedProps.name} {...extendedProps} />;
    }

    return <Component key={props.name} {...props} />;
  }

  addCampaign() {
    const path = this.getActionRoute(0, 'create');
    this.props.router.push(path);
  }

  /**
   * Generate route with the given id and view
   *
   * @param {Number} id
   * @param {String} view
   * @return {String}
   */
  getActionRoute(id, view) {
    return `${this.props.sectionConfig.url}/set/${id}/${view}`;
  }
}

CampaignAdmin.propTypes = {
  breadcrumbsActions: React.PropTypes.object.isRequired,
  campaignId: React.PropTypes.string,
  sectionConfig: React.PropTypes.shape({
    publishEndpoint: React.PropTypes.shape({
      url: React.PropTypes.string,
      method: React.PropTypes.string,
    }),
    form: React.PropTypes.shape({
      EditForm: React.PropTypes.shape({
        schemaUrl: React.PropTypes.string,
      }),
      campaignEditForm: React.PropTypes.shape({
        schemaUrl: React.PropTypes.string,
      }),
      campaignCreateForm: React.PropTypes.shape({
        schemaUrl: React.PropTypes.string,
      }),
    }),
  }),
  securityId: React.PropTypes.string.isRequired,
  view: React.PropTypes.string,
};

function mapStateToProps(state) {
  return {
    config: state.config,
    campaignId: state.campaign.campaignId,
    view: state.campaign.view,
    breadcrumbs: state.breadcrumbs,
    sectionConfig: state.config.sections.find((section) => section.name === sectionConfigKey),
    securityId: state.config.SecurityID,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    breadcrumbsActions: bindActionCreators(breadcrumbsActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampaignAdmin));
