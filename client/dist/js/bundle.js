/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = SilverStripeComponent;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = i18n;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  SET_CAMPAIGN_ACTIVE_CHANGESET: 'SET_CAMPAIGN_ACTIVE_CHANGESET',
  SET_CAMPAIGN_SELECTED_CHANGESETITEM: 'SET_CAMPAIGN_SELECTED_CHANGESETITEM',
  PUBLISH_CAMPAIGN_REQUEST: 'PUBLISH_CAMPAIGN_REQUEST',
  PUBLISH_CAMPAIGN_SUCCESS: 'PUBLISH_CAMPAIGN_SUCCESS',
  PUBLISH_CAMPAIGN_FAILURE: 'PUBLISH_CAMPAIGN_FAILURE',
  SET_NEW_CAMPAIGN: 'SET_NEW_CAMPAIGN'
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectChangeSetItem = selectChangeSetItem;
exports.showCampaignView = showCampaignView;
exports.publishCampaign = publishCampaign;
exports.setNewItem = setNewItem;

var _CampaignActionTypes = __webpack_require__(3);

var _CampaignActionTypes2 = _interopRequireDefault(_CampaignActionTypes);

var _RecordsActionTypes = __webpack_require__(29);

var _RecordsActionTypes2 = _interopRequireDefault(_RecordsActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function selectChangeSetItem(changeSetItemId) {
  return {
    type: _CampaignActionTypes2.default.SET_CAMPAIGN_SELECTED_CHANGESETITEM,
    payload: { changeSetItemId: changeSetItemId }
  };
}

function showCampaignView(campaignId, view) {
  return function (dispatch) {
    dispatch({
      type: _CampaignActionTypes2.default.SET_CAMPAIGN_ACTIVE_CHANGESET,
      payload: { campaignId: campaignId, view: view }
    });
  };
}

function publishCampaign(publishApi, recordType, campaignId) {
  return function (dispatch) {
    dispatch({
      type: _CampaignActionTypes2.default.PUBLISH_CAMPAIGN_REQUEST,
      payload: { campaignId: campaignId }
    });

    publishApi({ id: campaignId }).then(function (data) {
      dispatch({
        type: _CampaignActionTypes2.default.PUBLISH_CAMPAIGN_SUCCESS,
        payload: { campaignId: campaignId }
      });
      dispatch({
        type: _RecordsActionTypes2.default.FETCH_RECORD_SUCCESS,
        payload: { recordType: recordType, data: data }
      });
    }).catch(function (error) {
      dispatch({
        type: _CampaignActionTypes2.default.PUBLISH_CAMPAIGN_FAILURE,
        payload: { error: error }
      });
    });
  };
}

function setNewItem(itemId) {
  return {
    type: _CampaignActionTypes2.default.SET_NEW_CAMPAIGN,
    payload: { newItem: itemId }
  };
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = Breadcrumb;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = BreadcrumbsActions;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = FormAction;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = ReactRedux;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = ReactRouter;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = Redux;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = Toolbar;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _reactRouter = __webpack_require__(9);

var _Config = __webpack_require__(21);

var _Config2 = _interopRequireDefault(_Config);

var _Injector = __webpack_require__(24);

var _Injector2 = _interopRequireDefault(_Injector);

var _ReactRouteRegister = __webpack_require__(28);

var _ReactRouteRegister2 = _interopRequireDefault(_ReactRouteRegister);

var _CampaignAdmin = __webpack_require__(14);

var _CampaignAdmin2 = _interopRequireDefault(_CampaignAdmin);

var _CampaignReducer = __webpack_require__(17);

var _CampaignReducer2 = _interopRequireDefault(_CampaignReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var sectionConfig = _Config2.default.getSection('SilverStripe\\CampaignAdmin\\CampaignAdmin');
  _ReactRouteRegister2.default.add({
    path: sectionConfig.url,
    component: (0, _reactRouter.withRouter)(_CampaignAdmin2.default),
    childRoutes: [{ path: ':type/:id/:view', component: _CampaignAdmin2.default }, { path: 'set/:id/:view', component: _CampaignAdmin2.default }]
  });

  _Injector2.default.reducer.register('campaign', _CampaignReducer2.default);
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(12);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(8);

var _reduxForm = __webpack_require__(31);

var _redux = __webpack_require__(10);

var _reactRouter = __webpack_require__(9);

var _getFormState = __webpack_require__(34);

var _getFormState2 = _interopRequireDefault(_getFormState);

var _Backend = __webpack_require__(20);

var _Backend2 = _interopRequireDefault(_Backend);

var _CampaignActions = __webpack_require__(4);

var campaignActions = _interopRequireWildcard(_CampaignActions);

var _BreadcrumbsActions = __webpack_require__(6);

var breadcrumbsActions = _interopRequireWildcard(_BreadcrumbsActions);

var _Breadcrumb = __webpack_require__(5);

var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);

var _SilverStripeComponent = __webpack_require__(1);

var _SilverStripeComponent2 = _interopRequireDefault(_SilverStripeComponent);

var _FormAction = __webpack_require__(7);

var _FormAction2 = _interopRequireDefault(_FormAction);

var _i18n = __webpack_require__(2);

var _i18n2 = _interopRequireDefault(_i18n);

var _Toolbar = __webpack_require__(11);

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _FormBuilderLoader = __webpack_require__(23);

var _FormBuilderLoader2 = _interopRequireDefault(_FormBuilderLoader);

var _CampaignAdminList = __webpack_require__(16);

var _CampaignAdminList2 = _interopRequireDefault(_CampaignAdminList);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sectionConfigKey = 'SilverStripe\\CampaignAdmin\\CampaignAdmin';

var CampaignAdmin = function (_SilverStripeComponen) {
  _inherits(CampaignAdmin, _SilverStripeComponen);

  function CampaignAdmin(props) {
    _classCallCheck(this, CampaignAdmin);

    var _this = _possibleConstructorReturn(this, (CampaignAdmin.__proto__ || Object.getPrototypeOf(CampaignAdmin)).call(this, props));

    _this.publishApi = _Backend2.default.createEndpointFetcher({
      url: _this.props.sectionConfig.publishEndpoint.url,
      method: _this.props.sectionConfig.publishEndpoint.method,
      defaultData: { SecurityID: _this.props.securityId },
      payloadSchema: {
        id: { urlReplacement: ':id', remove: true }
      }
    });

    _this.handleBackButtonClick = _this.handleBackButtonClick.bind(_this);
    _this.handleCreateCampaignSubmit = _this.handleCreateCampaignSubmit.bind(_this);
    _this.handleFormAction = _this.handleFormAction.bind(_this);
    return _this;
  }

  _createClass(CampaignAdmin, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          breadcrumbs = _props.breadcrumbs,
          title = _props.title,
          _props$params = _props.params,
          view = _props$params.view,
          id = _props$params.id;

      if (breadcrumbs.length === 0) {
        this.setBreadcrumbs(view, id, title);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var title = props.title,
          _props$params2 = props.params,
          id = _props$params2.id,
          view = _props$params2.view;

      var hasChangedRoute = this.props.params.id !== id || this.props.params.view !== view || this.props.title !== title;
      if (hasChangedRoute) {
        this.setBreadcrumbs(view, id, title);
      }
    }
  }, {
    key: 'setBreadcrumbs',
    value: function setBreadcrumbs(view, id, title) {
      var breadcrumbs = [{
        text: _i18n2.default._t('CampaignAdmin.CAMPAIGN', 'Campaigns'),
        href: this.props.sectionConfig.url
      }];
      switch (view) {
        case 'show':
          break;
        case 'edit':
          breadcrumbs.push({
            text: title,
            href: this.getActionRoute(id, view)
          });
          break;
        case 'create':
          breadcrumbs.push({
            text: _i18n2.default._t('CampaignAdmin.ADD_CAMPAIGN', 'Add Campaign'),
            href: this.getActionRoute(id, view)
          });
          break;
        default:
          break;
      }

      this.props.breadcrumbsActions.setBreadcrumbs(breadcrumbs);
    }
  }, {
    key: 'handleBackButtonClick',
    value: function handleBackButtonClick(event) {
      if (this.props.breadcrumbs.length > 1) {
        var last = this.props.breadcrumbs[this.props.breadcrumbs.length - 2];
        if (last && last.href) {
          event.preventDefault();
          this.props.router.push(last.href);
        }
      }
    }
  }, {
    key: 'handleCreateCampaignSubmit',
    value: function handleCreateCampaignSubmit(data, action, submitFn) {
      var _this2 = this;

      var promise = submitFn();
      if (!promise) {
        throw new Error('Promise was not returned for submitting');
      }
      return promise.then(function (response) {
        var hasErrors = response.errors && response.errors.length > 0;
        if (action === 'action_save' && !hasErrors) {
          var sectionUrl = _this2.props.sectionConfig.url;
          var id = response.record.id;
          _this2.props.campaignActions.setNewItem(id);
          _this2.props.router.push(sectionUrl + '/set/' + id + '/show');
        }

        return response;
      });
    }
  }, {
    key: 'handleFormAction',
    value: function handleFormAction(event) {
      var name = event.currentTarget.name;

      if (name === 'action_cancel') {
        var url = this.props.sectionConfig.url;
        this.props.router.push(url);
        event.preventDefault();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var view = null;

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
  }, {
    key: 'renderIndexView',
    value: function renderIndexView() {
      var schemaUrl = this.props.sectionConfig.form.EditForm.schemaUrl;
      var formActionProps = {
        title: _i18n2.default._t('CampaignAdmin.ADDCAMPAIGN'),
        icon: 'plus',
        extraClass: 'btn-primary',
        handleClick: this.addCampaign.bind(this)
      };
      var formBuilderProps = {
        createFn: this.campaignListCreateFn.bind(this),
        schemaUrl: schemaUrl,
        identifier: 'Campaign.IndexView'
      };

      return _react2.default.createElement(
        'div',
        { className: 'fill-height', 'aria-expanded': 'true' },
        _react2.default.createElement(
          _Toolbar2.default,
          null,
          _react2.default.createElement(_Breadcrumb2.default, { multiline: true })
        ),
        _react2.default.createElement(
          'div',
          { className: 'panel panel--padded panel--scrollable flexbox-area-grow' },
          _react2.default.createElement(
            'div',
            { className: 'toolbar toolbar--content' },
            _react2.default.createElement(
              'div',
              { className: 'btn-toolbar' },
              _react2.default.createElement(_FormAction2.default, formActionProps)
            )
          ),
          _react2.default.createElement(_FormBuilderLoader2.default, formBuilderProps)
        )
      );
    }
  }, {
    key: 'renderItemListView',
    value: function renderItemListView() {
      var props = {
        sectionConfig: this.props.sectionConfig,
        campaignId: this.props.params.id,
        itemListViewEndpoint: this.props.sectionConfig.itemListViewEndpoint,
        publishApi: this.publishApi,
        handleBackButtonClick: this.handleBackButtonClick.bind(this)
      };

      return _react2.default.createElement(_CampaignAdminList2.default, props);
    }
  }, {
    key: 'renderDetailEditView',
    value: function renderDetailEditView() {
      if (this.props.params.id <= 0) {
        return this.renderCreateView();
      }
      var baseSchemaUrl = this.props.sectionConfig.form.campaignEditForm.schemaUrl;
      var schemaUrl = baseSchemaUrl + '/' + this.props.params.id;

      return _react2.default.createElement(
        'div',
        { className: 'fill-height' },
        _react2.default.createElement(
          _Toolbar2.default,
          { showBackButton: true, handleBackButtonClick: this.handleBackButtonClick },
          _react2.default.createElement(_Breadcrumb2.default, { multiline: true })
        ),
        _react2.default.createElement(
          'div',
          { className: 'panel panel--padded panel--scrollable flexbox-area-grow form--inline' },
          _react2.default.createElement(_FormBuilderLoader2.default, {
            handleAction: this.handleFormAction,
            schemaUrl: schemaUrl,
            identifier: 'Campaign.EditView'
          })
        )
      );
    }
  }, {
    key: 'renderCreateView',
    value: function renderCreateView() {
      var schemaUrl = this.props.sectionConfig.form.campaignCreateForm.schemaUrl;
      return _react2.default.createElement(
        'div',
        { className: 'fill-height' },
        _react2.default.createElement(
          _Toolbar2.default,
          { showBackButton: true, handleBackButtonClick: this.handleBackButtonClick },
          _react2.default.createElement(_Breadcrumb2.default, { multiline: true })
        ),
        _react2.default.createElement(
          'div',
          { className: 'panel panel--padded panel--scrollable flexbox-area-grow form--inline' },
          _react2.default.createElement(_FormBuilderLoader2.default, {
            handleSubmit: this.handleCreateCampaignSubmit,
            handleAction: this.handleFormAction,
            schemaUrl: schemaUrl,
            identifier: 'Campaign.CreateView'
          })
        )
      );
    }
  }, {
    key: 'campaignEditCreateFn',
    value: function campaignEditCreateFn(Component, props) {
      var _this3 = this;

      var url = this.props.sectionConfig.url;

      if (props.name === 'action_cancel') {
        var extendedProps = Object.assign({}, props, {
          handleClick: function handleClick(event) {
            event.preventDefault();
            _this3.props.router.push(url);
          }
        });

        return _react2.default.createElement(Component, _extends({ key: props.id }, extendedProps));
      }

      return _react2.default.createElement(Component, _extends({ key: props.id }, props));
    }
  }, {
    key: 'campaignAddCreateFn',
    value: function campaignAddCreateFn(Component, props) {
      var _this4 = this;

      var url = this.props.sectionConfig.url;

      if (props.name === 'action_cancel') {
        var extendedProps = Object.assign({}, props, {
          handleClick: function handleClick(event) {
            event.preventDefault();
            _this4.props.router.push(url);
          }
        });

        return _react2.default.createElement(Component, _extends({ key: props.name }, extendedProps));
      }

      return _react2.default.createElement(Component, _extends({ key: props.name }, props));
    }
  }, {
    key: 'campaignListCreateFn',
    value: function campaignListCreateFn(Component, props) {
      var _this5 = this;

      var sectionUrl = this.props.sectionConfig.url;
      var typeUrlParam = 'set';

      if (props.schemaComponent === 'GridField') {
        var extendedProps = Object.assign({}, props, {
          data: Object.assign({}, props.data, {
            handleDrillDown: function handleDrillDown(event, record) {
              _this5.props.router.push(sectionUrl + '/' + typeUrlParam + '/' + record.ID + '/show');
            },
            handleEditRecord: function handleEditRecord(event, id) {
              _this5.props.router.push(sectionUrl + '/' + typeUrlParam + '/' + id + '/edit');
            }
          })
        });

        return _react2.default.createElement(Component, _extends({ key: extendedProps.name }, extendedProps));
      }

      return _react2.default.createElement(Component, _extends({ key: props.name }, props));
    }
  }, {
    key: 'addCampaign',
    value: function addCampaign() {
      var path = this.getActionRoute(0, 'create');
      this.props.router.push(path);
    }
  }, {
    key: 'getActionRoute',
    value: function getActionRoute(id, view) {
      return this.props.sectionConfig.url + '/set/' + id + '/' + view;
    }
  }]);

  return CampaignAdmin;
}(_SilverStripeComponent2.default);

CampaignAdmin.propTypes = {
  breadcrumbsActions: _react2.default.PropTypes.object.isRequired,
  campaignId: _react2.default.PropTypes.string,
  sectionConfig: _react2.default.PropTypes.shape({
    publishEndpoint: _react2.default.PropTypes.shape({
      url: _react2.default.PropTypes.string,
      method: _react2.default.PropTypes.string
    }),
    form: _react2.default.PropTypes.shape({
      EditForm: _react2.default.PropTypes.shape({
        schemaUrl: _react2.default.PropTypes.string
      }),
      campaignEditForm: _react2.default.PropTypes.shape({
        schemaUrl: _react2.default.PropTypes.string
      }),
      campaignCreateForm: _react2.default.PropTypes.shape({
        schemaUrl: _react2.default.PropTypes.string
      })
    })
  }),
  securityId: _react2.default.PropTypes.string.isRequired,
  view: _react2.default.PropTypes.string
};

function mapStateToProps(state, ownProps) {
  var title = null;
  var sectionConfig = state.config.sections.find(function (section) {
    return section.name === sectionConfigKey;
  });

  if (ownProps.params.id > 0) {
    var selector = (0, _reduxForm.formValueSelector)('Campaign.EditView', _getFormState2.default);
    title = selector(state, 'Name');
  }

  return {
    config: state.config,
    campaignId: state.campaign.campaignId,
    view: state.campaign.view,
    breadcrumbs: state.breadcrumbs,
    sectionConfig: sectionConfig,
    securityId: state.config.SecurityID,
    title: title
  };
}

function mapDispatchToProps(dispatch) {
  return {
    breadcrumbsActions: (0, _redux.bindActionCreators)(breadcrumbsActions, dispatch),
    campaignActions: (0, _redux.bindActionCreators)(campaignActions, dispatch)
  };
}

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CampaignAdmin));

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SilverStripeComponent = __webpack_require__(1);

var _SilverStripeComponent2 = _interopRequireDefault(_SilverStripeComponent);

var _i18n = __webpack_require__(2);

var _i18n2 = _interopRequireDefault(_i18n);

var _reactBootstrapSs = __webpack_require__(27);

var _formatWrittenNumber = __webpack_require__(33);

var _formatWrittenNumber2 = _interopRequireDefault(_formatWrittenNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CampaignAdminItem = function (_SilverStripeComponen) {
  _inherits(CampaignAdminItem, _SilverStripeComponen);

  function CampaignAdminItem() {
    _classCallCheck(this, CampaignAdminItem);

    return _possibleConstructorReturn(this, (CampaignAdminItem.__proto__ || Object.getPrototypeOf(CampaignAdminItem)).apply(this, arguments));
  }

  _createClass(CampaignAdminItem, [{
    key: 'getNumReferTo',
    value: function getNumReferTo() {
      var numReferTo = this.props.item._links && this.props.item._links.references && this.props.item._links.references.length;

      return numReferTo || 0;
    }
  }, {
    key: 'getNumReferredBy',
    value: function getNumReferredBy() {
      var numReferredBy = this.props.item._links && this.props.item._links.referenced_by && this.props.item._links.referenced_by.length;

      return numReferredBy || 0;
    }
  }, {
    key: 'getReferToTooltipText',
    value: function getReferToTooltipText() {
      var numReferTo = this.getNumReferTo();
      return _i18n2.default.sprintf(_i18n2.default._t('CampaignAdmin.LINKED_TO', 'Requires %s item(s)'), (0, _formatWrittenNumber2.default)(numReferTo));
    }
  }, {
    key: 'getReferredByTooltipText',
    value: function getReferredByTooltipText() {
      var numReferredBy = this.getNumReferredBy();

      return _i18n2.default.sprintf(_i18n2.default._t('CampaignAdmin.LINKED_FROM', 'Required by %s item(s)'), (0, _formatWrittenNumber2.default)(numReferredBy));
    }
  }, {
    key: 'render',
    value: function render() {
      var thumbnail = null;
      var badge = {};
      var item = this.props.item;
      var campaign = this.props.campaign;

      if (campaign.State === 'open') {
        switch (item.ChangeType) {
          case 'created':
            badge.className = 'label label-warning list-group-item__status';
            badge.Title = _i18n2.default._t('CampaignAdmin.DRAFT', 'Draft');
            break;
          case 'modified':
            badge.className = 'label label-warning list-group-item__status';
            badge.Title = _i18n2.default._t('CampaignAdmin.MODIFIED', 'Modified');
            break;
          case 'deleted':
            badge.className = 'label label-error list-group-item__status';
            badge.Title = _i18n2.default._t('CampaignAdmin.REMOVED', 'Removed');
            break;
          case 'none':
          default:
            badge.className = 'label label-success list-group-item__status';
            badge.Title = _i18n2.default._t('CampaignAdmin.NO_CHANGES', 'No changes');
            break;
        }
      }

      var links = this.renderLinks();

      if (item.Thumbnail) {
        thumbnail = _react2.default.createElement(
          'span',
          { className: 'list-group-item__thumbnail' },
          _react2.default.createElement('img', { alt: item.Title, src: item.Thumbnail })
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'fill-width' },
        thumbnail,
        _react2.default.createElement(
          'div',
          { className: 'list-group-item__details' },
          _react2.default.createElement(
            'h4',
            { className: 'list-group-item__heading' },
            item.Title
          ),
          links,
          badge.className && badge.Title && _react2.default.createElement(
            'span',
            { className: badge.className },
            badge.Title
          )
        )
      );
    }
  }, {
    key: 'renderLinks',
    value: function renderLinks() {
      var numReferTo = this.getNumReferTo();
      var numReferredBy = this.getNumReferredBy();

      var tooltipTexts = [];
      if (numReferTo > 0) {
        tooltipTexts.push(this.getReferToTooltipText());
      }
      if (numReferredBy > 0) {
        tooltipTexts.push(_i18n2.default.sprintf(tooltipTexts.length === 0 ? this.getReferredByTooltipText() : this.getReferredByTooltipText().toLocaleLowerCase(), (0, _formatWrittenNumber2.default)(numReferredBy)));
      }

      var tooltip = _react2.default.createElement(
        _reactBootstrapSs.Tooltip,
        { id: 'campaign-tooltip-' + this.props.item.ID },
        tooltipTexts.join(', ')
      );

      var links = null;
      if (this.props.selected && numReferTo + numReferredBy > 0 || this.props.isLinked) {
        var linksClasses = ['list-group-item__info', 'campaign-admin__item-links', this.props.isLinked ? 'campaign-admin__item-links--is-linked' : 'campaign-admin__item-links--has-links'];

        links = _react2.default.createElement(
          'div',
          { className: linksClasses.join(' ') },
          _react2.default.createElement(
            _reactBootstrapSs.OverlayTrigger,
            { placement: 'left', overlay: tooltip },
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(
                'span',
                { className: 'campaign-admin__item-links__number' },
                numReferTo + numReferredBy
              ),
              _react2.default.createElement('span', { className: 'font-icon-link' })
            )
          )
        );
      }

      return links;
    }
  }]);

  return CampaignAdminItem;
}(_SilverStripeComponent2.default);

CampaignAdminItem.propTypes = {
  campaign: _react2.default.PropTypes.object.isRequired,
  item: _react2.default.PropTypes.object.isRequired,
  isLinked: _react2.default.PropTypes.bool
};

exports.default = CampaignAdminItem;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(8);

var _BreadcrumbsActions = __webpack_require__(6);

var breadcrumbsActions = _interopRequireWildcard(_BreadcrumbsActions);

var _RecordsActions = __webpack_require__(30);

var recordActions = _interopRequireWildcard(_RecordsActions);

var _CampaignActions = __webpack_require__(4);

var campaignActions = _interopRequireWildcard(_CampaignActions);

var _SilverStripeComponent = __webpack_require__(1);

var _SilverStripeComponent2 = _interopRequireDefault(_SilverStripeComponent);

var _Accordion = __webpack_require__(18);

var _Accordion2 = _interopRequireDefault(_Accordion);

var _AccordionBlock = __webpack_require__(19);

var _AccordionBlock2 = _interopRequireDefault(_AccordionBlock);

var _ListGroupItem = __webpack_require__(25);

var _ListGroupItem2 = _interopRequireDefault(_ListGroupItem);

var _Toolbar = __webpack_require__(11);

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _FormAction = __webpack_require__(7);

var _FormAction2 = _interopRequireDefault(_FormAction);

var _CampaignAdminItem = __webpack_require__(15);

var _CampaignAdminItem2 = _interopRequireDefault(_CampaignAdminItem);

var _Breadcrumb = __webpack_require__(5);

var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);

var _Preview = __webpack_require__(26);

var _Preview2 = _interopRequireDefault(_Preview);

var _i18n = __webpack_require__(2);

var _i18n2 = _interopRequireDefault(_i18n);

var _classnames = __webpack_require__(32);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CampaignAdminList = function (_SilverStripeComponen) {
  _inherits(CampaignAdminList, _SilverStripeComponen);

  function CampaignAdminList(props) {
    _classCallCheck(this, CampaignAdminList);

    var _this = _possibleConstructorReturn(this, (CampaignAdminList.__proto__ || Object.getPrototypeOf(CampaignAdminList)).call(this, props));

    _this.handlePublish = _this.handlePublish.bind(_this);
    _this.handleItemSelected = _this.handleItemSelected.bind(_this);
    _this.setBreadcrumbs = _this.setBreadcrumbs.bind(_this);
    _this.handleCloseItem = _this.handleCloseItem.bind(_this);

    if (!_this.isRecordLoaded()) {
      _this.state = {
        loading: true
      };
    } else {
      _this.state = {
        loading: false
      };
    }
    return _this;
  }

  _createClass(CampaignAdminList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var fetchURL = this.props.itemListViewEndpoint.url.replace(/:id/, this.props.campaignId);
      _get(CampaignAdminList.prototype.__proto__ || Object.getPrototypeOf(CampaignAdminList.prototype), 'componentDidMount', this).call(this);
      this.setBreadcrumbs();

      if (!this.isRecordLoaded()) {
        this.props.recordActions.fetchRecord(this.props.treeClass, 'get', fetchURL).then(function () {
          _this2.setBreadcrumbs();
          _this2.setState({ loading: false });
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.campaignActions.setNewItem(null);
    }
  }, {
    key: 'isRecordLoaded',
    value: function isRecordLoaded() {
      return Object.keys(this.props.record).length !== 0;
    }
  }, {
    key: 'setBreadcrumbs',
    value: function setBreadcrumbs() {
      if (!this.props.record) {
        return;
      }

      var breadcrumbs = [{
        text: _i18n2.default._t('CampaignAdmin.CAMPAIGN', 'Campaigns'),
        href: this.props.sectionConfig.url
      }];
      breadcrumbs.push({
        text: this.props.record.Name,
        href: this.props.sectionConfig.url + '/set/' + this.props.campaignId + '/show'
      });

      this.props.breadcrumbsActions.setBreadcrumbs(breadcrumbs);
    }
  }, {
    key: 'getSelectedItem',
    value: function getSelectedItem() {
      var itemId = this.props.campaign.changeSetItemId;
      var items = this.getItems() || [];
      var selected = null;

      if (itemId) {
        selected = items.find(function (item) {
          return itemId === item.ID;
        });
      }

      if (!selected && items.length > 0) {
        selected = items[0];
      }

      return selected;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var itemId = this.props.campaign.changeSetItemId;

      var itemLinks = null;
      var selectedClass = !itemId ? 'campaign-admin__campaign--hide-preview' : '';
      var campaignId = this.props.campaignId;
      var campaign = this.props.record;
      var newItem = this.props.newItem;

      var itemGroups = this.groupItemsForSet();

      var accordionBlocks = [];

      var selectedItem = this.getSelectedItem();
      var selectedItemsLinkedTo = selectedItem && selectedItem._links && selectedItem._links.references || [];
      var selectedItemsLinkedFrom = selectedItem && selectedItem._links && selectedItem._links.referenced_by || [];

      Object.keys(itemGroups).forEach(function (className) {
        var group = itemGroups[className];
        var groupCount = group.items.length;

        var listGroupItems = [];
        var title = '\n        ' + (groupCount === 0 ? '' : groupCount) + '\n        ' + (groupCount === 1 ? group.singular : group.plural) + '\n      ';
        var groupid = 'Set_' + campaignId + '_Group_' + className;

        group.items.forEach(function (item) {
          if (!itemId) {
            itemId = item.ID;
          }
          var selected = itemId === item.ID;

          if (selected && item._links) {
            itemLinks = item._links;
          }

          var itemClassNames = [];
          if (item.ChangeType === 'none' || campaign.State === 'published') {
            itemClassNames.push('list-group-item--inactive');
          }
          if (selected) {
            itemClassNames.push('active');
          }

          var isLinked = !!selectedItemsLinkedTo.find(function (linkToObj) {
            return linkToObj.ChangeSetItemID === parseInt(item.ID, 10);
          });

          isLinked = isLinked || selectedItemsLinkedFrom.find(function (linkFromObj) {
            return linkFromObj.ChangeSetItemID === item.ID;
          });

          listGroupItems.push(_react2.default.createElement(
            _ListGroupItem2.default,
            {
              key: item.ID,
              className: itemClassNames.join(' '),
              handleClick: _this3.handleItemSelected,
              handleClickArg: item.ID
            },
            _react2.default.createElement(_CampaignAdminItem2.default, {
              item: item,
              campaign: _this3.props.record,
              selected: selected,
              isLinked: isLinked
            })
          ));
        });

        var wrapperClassnames = (0, _classnames2.default)('list-group-wrapper', {
          'list-group-wrapper--empty': listGroupItems.length === 0
        });

        accordionBlocks.push(_react2.default.createElement(
          'div',
          { className: wrapperClassnames },
          _react2.default.createElement(
            _AccordionBlock2.default,
            { key: groupid, groupid: groupid, title: title },
            listGroupItems.length > 0 ? listGroupItems : _react2.default.createElement(
              'p',
              { className: 'list-group-item' },
              group.noItemText
            )
          )
        ));
      });

      var newItemInfo = newItem ? _react2.default.createElement(
        'p',
        { className: 'alert alert-success alert--no-border', role: 'alert' },
        'Nice one! You have successfully created a campaign.'
      ) : null;

      var body = _react2.default.createElement(
        _Accordion2.default,
        null,
        accordionBlocks
      );
      var bodyClass = ['panel', 'panel--padded', 'panel--scrollable', 'flexbox-area-grow'];

      return _react2.default.createElement(
        'div',
        { className: 'fill-width campaign-admin__campaign ' + selectedClass },
        _react2.default.createElement(
          'div',
          { className: 'fill-height campaign-admin__campaign-items', 'aria-expanded': 'true' },
          _react2.default.createElement(
            _Toolbar2.default,
            { showBackButton: true, handleBackButtonClick: this.props.handleBackButtonClick },
            _react2.default.createElement(_Breadcrumb2.default, { multiline: true })
          ),
          newItemInfo,
          _react2.default.createElement(
            'div',
            { className: bodyClass.join(' ') },
            body
          ),
          _react2.default.createElement(
            'div',
            { className: 'toolbar toolbar--south' },
            this.renderButtonToolbar()
          )
        ),
        this.renderPreview(itemLinks, itemId)
      );
    }
  }, {
    key: 'renderPreview',
    value: function renderPreview(itemLinks, itemId) {
      var preview = null;
      var previewClasses = (0, _classnames2.default)(['flexbox-area-grow', 'fill-height', 'preview', 'campaign-admin__campaign-preview', 'campaign-admin__campaign-preview--empty']);

      if (this.state.loading) {
        preview = _react2.default.createElement(
          'div',
          { className: previewClasses },
          _react2.default.createElement(
            'p',
            null,
            'Loading...'
          )
        );
      } else if (!this.getItems() || this.getItems().length === 0) {
        preview = _react2.default.createElement(
          'div',
          { className: previewClasses },
          _react2.default.createElement(
            'h2',
            { className: 'campaign-admin__empty-heading' },
            'Getting started'
          ),
          _react2.default.createElement(
            'p',
            { className: 'campaign-admin__empty-info' },
            'Select ',
            _react2.default.createElement(
              'strong',
              null,
              'Add to Campaign'
            ),
            ' from pages, files, and other content types'
          )
        );
      } else {
        preview = _react2.default.createElement(_Preview2.default, { itemLinks: itemLinks, itemId: itemId, onBack: this.handleCloseItem });
      }

      return preview;
    }
  }, {
    key: 'handleItemSelected',
    value: function handleItemSelected(event, itemId) {
      this.props.campaignActions.selectChangeSetItem(itemId);
    }
  }, {
    key: 'handleCloseItem',
    value: function handleCloseItem() {
      this.props.campaignActions.selectChangeSetItem(null);
    }
  }, {
    key: 'renderButtonToolbar',
    value: function renderButtonToolbar() {
      var items = this.getItems();

      var actionProps = {};

      if (!items || items.length === 0) {
        actionProps = Object.assign(actionProps, {
          title: _i18n2.default._t('CampaignAdmin.PUBLISHCAMPAIGN', 'Publish campaign'),
          buttonStyle: 'secondary-outline',
          icon: 'rocket',
          disabled: true
        });
      } else if (this.props.record.State === 'open') {
        actionProps = Object.assign(actionProps, {
          title: _i18n2.default._t('CampaignAdmin.PUBLISHCAMPAIGN', 'Publish campaign'),
          buttonStyle: 'primary',
          loading: this.props.campaign.isPublishing,
          handleClick: this.handlePublish,
          icon: 'rocket'
        });
      } else if (this.props.record.State === 'published') {
        actionProps = Object.assign(actionProps, {
          title: _i18n2.default._t('CampaignAdmin.REVERTCAMPAIGN', 'Revert'),
          buttonStyle: 'secondary-outline',
          icon: 'back-in-time',
          disabled: true
        });
      }

      return _react2.default.createElement(
        'div',
        { className: 'btn-toolbar' },
        _react2.default.createElement(_FormAction2.default, actionProps)
      );
    }
  }, {
    key: 'getItems',
    value: function getItems() {
      if (this.props.record && this.props.record._embedded) {
        return this.props.record._embedded.items;
      }

      return null;
    }
  }, {
    key: 'groupItemsForSet',
    value: function groupItemsForSet() {
      var groups = this.getPlaceholderGroups();
      var items = this.getItems();
      if (!items) {
        return groups;
      }

      items.forEach(function (item) {
        var classname = item.BaseClass;

        if (!groups[classname]) {
          groups[classname] = {
            singular: item.Singular,
            plural: item.Plural,
            items: []
          };
        }

        groups[classname].items.push(item);
      });

      return groups;
    }
  }, {
    key: 'getPlaceholderGroups',
    value: function getPlaceholderGroups() {
      var groups = {};

      if (this.props.record && this.props.record.placeholderGroups) {
        this.props.record.placeholderGroups.forEach(function (group) {
          groups[group.baseClass] = _extends({}, group);
          groups[group.baseClass].items = [].concat(_toConsumableArray(group.items));
        });
      }

      return groups;
    }
  }, {
    key: 'handlePublish',
    value: function handlePublish(e) {
      e.preventDefault();
      this.props.campaignActions.publishCampaign(this.props.publishApi, this.props.treeClass, this.props.campaignId);
    }
  }]);

  return CampaignAdminList;
}(_SilverStripeComponent2.default);

CampaignAdminList.propTypes = {
  campaign: _react2.default.PropTypes.shape({
    isPublishing: _react2.default.PropTypes.bool.isRequired,
    changeSetItemId: _react2.default.PropTypes.number
  }),
  breadcrumbsActions: _react2.default.PropTypes.object.isRequired,
  campaignActions: _react2.default.PropTypes.object.isRequired,
  publishApi: _react2.default.PropTypes.func.isRequired,
  record: _react2.default.PropTypes.object.isRequired,
  recordActions: _react2.default.PropTypes.object.isRequired,
  sectionConfig: _react2.default.PropTypes.object.isRequired,
  handleBackButtonClick: _react2.default.PropTypes.func
};

function mapStateToProps(state, ownProps) {
  var record = null;
  var treeClass = ownProps.sectionConfig.treeClass;
  if (state.records && state.records[treeClass] && ownProps.campaignId) {
    record = state.records[treeClass][parseInt(ownProps.campaignId, 10)];
  }
  return {
    config: state.config,
    record: record || {},
    campaign: state.campaign,
    treeClass: treeClass,
    newItem: state.campaign.newItem
  };
}

function mapDispatchToProps(dispatch) {
  return {
    breadcrumbsActions: (0, _redux.bindActionCreators)(breadcrumbsActions, dispatch),
    recordActions: (0, _redux.bindActionCreators)(recordActions, dispatch),
    campaignActions: (0, _redux.bindActionCreators)(campaignActions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CampaignAdminList);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _deepFreezeStrict = __webpack_require__(22);

var _deepFreezeStrict2 = _interopRequireDefault(_deepFreezeStrict);

var _CampaignActionTypes = __webpack_require__(3);

var _CampaignActionTypes2 = _interopRequireDefault(_CampaignActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = (0, _deepFreezeStrict2.default)({
  campaignId: null,
  changeSetItemId: null,
  isPublishing: false,
  view: null,
  newItem: null
});

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {

    case _CampaignActionTypes2.default.SET_CAMPAIGN_SELECTED_CHANGESETITEM:
      return (0, _deepFreezeStrict2.default)(Object.assign({}, state, {
        changeSetItemId: action.payload.changeSetItemId
      }));

    case _CampaignActionTypes2.default.SET_CAMPAIGN_ACTIVE_CHANGESET:
      return (0, _deepFreezeStrict2.default)(Object.assign({}, state, {
        campaignId: action.payload.campaignId,
        view: action.payload.view,
        changeSetItemId: null
      }));

    case _CampaignActionTypes2.default.PUBLISH_CAMPAIGN_REQUEST:
      return (0, _deepFreezeStrict2.default)(Object.assign({}, state, {
        isPublishing: true
      }));

    case _CampaignActionTypes2.default.PUBLISH_CAMPAIGN_SUCCESS:
    case _CampaignActionTypes2.default.PUBLISH_CAMPAIGN_FAILURE:
      return (0, _deepFreezeStrict2.default)(Object.assign({}, state, {
        isPublishing: false
      }));

    case _CampaignActionTypes2.default.SET_NEW_CAMPAIGN:
      return (0, _deepFreezeStrict2.default)(_extends({}, state, {
        newItem: action.payload.newItem
      }));

    default:
      return state;

  }
}

exports.default = reducer;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = Accordion;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = AccordionBlock;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = Backend;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = Config;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = DeepFreezeStrict;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = FormBuilderLoader;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = Injector;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = ListGroupItem;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = Preview;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = ReactBootstrap;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = ReactRouteRegister;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = RecordsActionTypes;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = RecordsActions;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = ReduxForm;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = classnames;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = formatWrittenNumber;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = getFormState;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map