!function(e){function t(a){if(n[a])return n[a].exports;var i=n[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s="./client/src/bundles/bundle.js")}({"./client/src/boot/applyConditionals.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),i=function(e){return e&&e.__esModule?e:{default:e}}(a),r=function(){i.default.transform("add-to-campaign",function(e){e.form.alterSchema("*.AddToCampaign",function(e){if(!e.getFieldByName("AddNewSelect"))return e.getState();var t=e.getValue("AddNewSelect");return e.setFieldClass("NewTitle","show",t).setFieldClass("NewTitle","hide",!t).getState()})})};t.default=r},"./client/src/boot/index.js":function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var i=n(14),r=a(i),o=n(3),l=a(o),s=n(19),c=a(s),u=n("./client/src/containers/CampaignAdmin/CampaignAdmin.js"),d=a(u),m=n("./client/src/state/campaign/CampaignReducer.js"),p=a(m),f=n("./client/src/boot/applyConditionals.js"),g=a(f);document.addEventListener("DOMContentLoaded",function(){var e=r.default.getSection("SilverStripe\\CampaignAdmin\\CampaignAdmin");c.default.add({path:"/",routes:[{path:"/"+e.url+"/set/:id/:view",component:d.default},{path:"/"+e.url+"/:type/:id/:view",component:d.default},{path:"/"+e.url,component:d.default}]}),l.default.reducer.register("campaign",p.default),(0,g.default)()})},"./client/src/bundles/bundle.js":function(e,t,n){"use strict";n("./client/src/boot/index.js")},"./client/src/components/IntroScreen/IntroScreen.js":function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),s=n(2),c=a(s),u=n(1),d=a(u),m=n(0),p=a(m),f=n("./client/src/constants/index.js"),g=a(f),h=function(){return null},b=function(e){function t(e){i(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleClose=n.handleClose.bind(n),n}return o(t,e),l(t,[{key:"handleClose",value:function(e){this.props.onClose(e)}},{key:"renderContent",value:function(){var e=g.default.infoScreen.callToAction,t=g.default.infoScreen.links;return c.default.createElement("div",{className:"flexbox-area-grow campaign-info__content"},c.default.createElement("h3",null,p.default._t("CampaignAdmin.InfoScreenHeader","How do campaigns work?")),c.default.createElement("p",null,p.default._t("CampaignAdmin.InfoScreenContent","Campaigns allow multiple users to publish large amounts of content (pages, files, etc.) all at once from one place.")),c.default.createElement("div",{className:"campaign-info__links"},t.map(function(e){return c.default.createElement("a",{key:e.text,href:e.link,target:"_blank",rel:"noopener noreferrer"},e.text)})),c.default.createElement("div",{className:"campaign-info__content-buttons"},e&&c.default.createElement("a",{className:"btn btn-outline-secondary",href:e.link,target:"_blank",rel:"noopener noreferrer"},e.text)))}},{key:"render",value:function(){return this.props.show?c.default.createElement("div",{className:"fill-width campaign-info"},c.default.createElement("div",{className:"campaign-info__icon"},c.default.createElement("span",{className:"font-icon-white-question icon btn--icon-xl btn--no-text"})),this.renderContent(),c.default.createElement("div",{className:"campaign-info__banner-image"}),c.default.createElement("div",{className:"campaign-info__buttons"},c.default.createElement("a",{className:"btn campaign-info__close btn--no-text font-icon-cancel btn--icon-xl",onClick:this.handleClose,role:"button","aria-label":p.default._t("CampaignAdmin.HELP_HIDE","Hide help"),tabIndex:0}))):null}}]),t}(s.Component);b.propTypes={show:d.default.bool,onClose:d.default.func},b.defaultProps={show:!1,onClose:h},t.default=b},"./client/src/constants/index.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a="https://userhelp.silverstripe.org/en/4/creating_pages_and_content/campaigns/";t.default={infoScreen:{links:[{text:"Creating a new campaign",link:a+"#creating-a-new-campaign"},{text:"Editing details/settings",link:a+"#editing-details-settings"},{text:"Adding items to a campaign",link:a+"#adding-items-to-a-campaign"},{text:"Managing items in a campaign",link:a+"#managing-items-in-a-campaign"},{text:"Publishing a campaign",link:a+"#publishing-a-campaign"}],callToAction:null}}},"./client/src/containers/CampaignAdmin/CampaignAdmin.js":function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e,t){var n=null,a=e.config.sections.find(function(e){return e.name===K}),i=e.viewMode;if(t.match.params.id>0){var r=a.form.campaignEditForm.schemaUrl+"/"+t.match.params.id,o=e.form.formSchemas[r],l=o&&o.name,s=l&&(0,b.formValueSelector)(o.name,E.default);n=s&&s(e,"Name")}return{previewState:i.activeState,config:e.config,campaignId:e.campaign.campaignId,view:e.campaign.view,breadcrumbs:e.breadcrumbs,sectionConfig:a,securityId:e.config.SecurityID,title:n,showMessage:e.campaign.showMessage}}function c(e){return{breadcrumbsActions:(0,C.bindActionCreators)(k,e),campaignActions:(0,C.bindActionCreators)(w,e),recordActions:(0,C.bindActionCreators)(M,e),onResize:function(t){e(z.enableOrDisableSplitMode(t))}}}Object.defineProperty(t,"__esModule",{value:!0}),t.Component=void 0;var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},d=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),m=n(2),p=i(m),f=n(1),g=i(f),h=n(6),b=n(22),C=n(9),_=n(20),v=n(28),E=i(v),y=n(13),A=i(y),I=n("./client/src/state/campaign/CampaignActions.js"),w=a(I),S=n(5),k=a(S),N=n(8),M=a(N),T=n(4),P=i(T),R=n(16),O=i(R),x=n(0),j=i(x),B=n(10),G=i(B),L=n(17),D=i(L),U=n("./client/src/containers/CampaignAdmin/CampaignAdminList.js"),F=i(U),H=n("./client/src/components/IntroScreen/IntroScreen.js"),V=i(H),q=n(23),W=i(q),Q=n(25),z=a(Q),K="SilverStripe\\CampaignAdmin\\CampaignAdmin",Y=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));n.state={loading:!1};var a={SecurityID:e.securityId};return n.publishApi=A.default.createEndpointFetcher(u({},e.sectionConfig.publishEndpoint,{defaultData:a,payloadSchema:{id:{urlReplacement:":id",remove:!0}}})),n.removeCampaignItemApi=A.default.createEndpointFetcher(u({},e.sectionConfig.removeCampaignItemEndpoint,{defaultData:a,payloadSchema:{id:{urlReplacement:":id",remove:!0},itemId:{urlReplacement:":itemId",remove:!0}}})),n.handleBackButtonClick=n.handleBackButtonClick.bind(n),n.handleCreateCampaignSubmit=n.handleCreateCampaignSubmit.bind(n),n.handleFormAction=n.handleFormAction.bind(n),n.hasErrors=n.hasErrors.bind(n),n.handleRemoveCampaignItem=n.handleRemoveCampaignItem.bind(n),n.addCampaign=n.addCampaign.bind(n),n.handleHideMessage=n.handleHideMessage.bind(n),n.handleToggleMessage=n.handleToggleMessage.bind(n),n}return l(t,e),d(t,[{key:"componentWillMount",value:function(){var e=this.props,t=e.breadcrumbs,n=e.title,a=e.match.params,i=a.id,r=a.view;0===t.length&&this.setBreadcrumbs(r,i,n)}},{key:"componentWillReceiveProps",value:function(e){var t=e.title,n=e.match.params,a=n.id,i=n.view;(this.props.match.params.id!==a||this.props.match.params.view!==i||this.props.title!==t)&&this.setBreadcrumbs(i,a,t)}},{key:"setBreadcrumbs",value:function(e,t,n){var a=this.props.sectionConfig.url,i=[{text:j.default._t("CampaignAdmin.CAMPAIGN","Campaigns"),href:a}];switch(e){case"show":break;case"edit":i.push({text:n,href:this.getActionRoute(t,e)});break;case"create":i.push({text:j.default._t("CampaignAdmin.ADDCAMPAIGN","Add campaign"),href:this.getActionRoute(t,e)})}this.props.breadcrumbsActions.setBreadcrumbs(i)}},{key:"getActionRoute",value:function(e,t){return"/"+this.props.sectionConfig.url+"/set/"+e+"/"+t}},{key:"handleBackButtonClick",value:function(e){var t=this.props,n=t.breadcrumbs,a=t.history;if(n.length>1){var i=n[n.length-2];i&&i.href&&(e.preventDefault(),a.push(i.href))}}},{key:"handleCreateCampaignSubmit",value:function(e,t,n){var a=this,i=n();if(!i)throw new Error("Promise was not returned for submitting");return i.then(function(e){var n=a.hasErrors(e);if("action_save"===t&&!n){var i=a.props.sectionConfig.url,r=e.record.id;a.props.campaignActions.setNewItem(r),a.props.history.push("/"+i+"/set/"+r+"/show")}return e})}},{key:"handleFormAction",value:function(e){var t=this.props,n=t.history,a=t.sectionConfig.url;"action_cancel"===e.currentTarget.name&&(n.push("/"+a),e.preventDefault())}},{key:"handleRemoveCampaignItem",value:function(e,t){var n=this,a=j.default._t("CampaignAdmin.REMOVE_ITEM_MESSAGE","Are you sure you want to remove this item?\n\nBy removing this item all linked items will be removed unless used elsewhere.");return window.confirm(a)?(this.setState({loading:!0}),this.removeCampaignItem(e,t).then(this.fetchCampaignsList.bind(this)).then(function(){return n.setState({loading:!1})}).then(function(){n.props.campaignActions.selectChangeSetItem(null),window.document.body.click()})):null}},{key:"handleToggleMessage",value:function(){this.props.campaignActions.setShowMessage(!this.props.showMessage)}},{key:"handleHideMessage",value:function(){this.props.campaignActions.setShowMessage(!1)}},{key:"removeCampaignItem",value:function(e,t){return this.props.campaignActions.removeCampaignItem(this.removeCampaignItemApi,e,t)}},{key:"fetchCampaignsList",value:function(){var e=this.props.sectionConfig.readCampaignsEndpoint,t=e.url;return this.props.recordActions.fetchRecords(this.props.sectionConfig.treeClass,e.method,t)}},{key:"hasErrors",value:function(e){if(e.errors&&e.errors.length)return!0;var t=e.state;if(!t)return!1;if(t.messages&&t.messages.find(function(e){return"good"!==e.type}))return!0;var n=t.fields&&t.fields.find(function(e){return e.message&&"good"!==e.message.type});return Boolean(n)}},{key:"campaignEditCreateFn",value:function(e,t){var n=this.props,a=n.sectionConfig.url,i=n.history;if("action_cancel"===t.name){var r=u({},t,{onClick:function(e){e.preventDefault(),i.push("/"+a)}});return p.default.createElement(e,u({key:t.id},r))}return p.default.createElement(e,u({key:t.id},t))}},{key:"campaignAddCreateFn",value:function(e,t){var n=this.props,a=n.history,i=n.sectionConfig.url;if("action_cancel"===t.name){var r=u({},t,{onClick:function(e){e.preventDefault(),a.push("/"+i)}});return p.default.createElement(e,u({key:t.name},r))}return p.default.createElement(e,u({key:t.name},t))}},{key:"campaignListCreateFn",value:function(e,t){var n=this.props,a=n.history,i=n.sectionConfig.url;if("GridField"===t.schemaComponent){var r=u({},t,{data:u({},t.data,{onDrillDown:function(e,t){a.push("/"+i+"/set/"+t.ID+"/show")},onEditRecord:function(e,t){a.push("/"+i+"/set/"+t+"/edit")}})});return p.default.createElement(e,u({key:r.name},r))}return p.default.createElement(e,u({key:t.name},t))}},{key:"addCampaign",value:function(){var e=this.getActionRoute(0,"create");this.props.history.push(e)}},{key:"renderDetailEditView",value:function(){if(this.props.match.params.id<=0)return this.renderCreateView();var e=this.props.sectionConfig.form.campaignEditForm.schemaUrl,t=e+"/"+this.props.match.params.id;return p.default.createElement("div",{className:"fill-height"},p.default.createElement(G.default,{showBackButton:!0,onBackButtonClick:this.handleBackButtonClick},p.default.createElement(P.default,{multiline:!0})),p.default.createElement(D.default,{fieldHolder:{className:"panel panel--padded panel--scrollable flexbox-area-grow form--inline"},actionHolder:{className:"toolbar--south"},onAction:this.handleFormAction,schemaUrl:t,identifier:"Campaign.EditView"}))}},{key:"renderCreateView",value:function(){var e=this.props.sectionConfig.form.campaignCreateForm.schemaUrl;return p.default.createElement("div",{className:"fill-height"},p.default.createElement(G.default,{showBackButton:!0,onBackButtonClick:this.handleBackButtonClick},p.default.createElement(P.default,{multiline:!0})),p.default.createElement(D.default,{fieldHolder:{className:"panel panel--padded panel--scrollable flexbox-area-grow form--inline"},actionHolder:{className:"toolbar--south"},onSubmit:this.handleCreateCampaignSubmit,onAction:this.handleFormAction,schemaUrl:e,identifier:"Campaign.CreateView"}))}},{key:"renderIndexView",value:function(){var e=this.props.showMessage,t=this.props.sectionConfig.form.EditForm.schemaUrl,n={title:j.default._t("CampaignAdmin.ADDCAMPAIGN","Add campaign"),icon:"plus",extraClass:"btn-primary",onClick:this.addCampaign},a={createFn:this.campaignListCreateFn.bind(this),schemaUrl:t,identifier:"Campaign.IndexView"};return p.default.createElement("div",{className:"fill-height","aria-expanded":"true"},p.default.createElement(G.default,null,p.default.createElement(P.default,{multiline:!0})),p.default.createElement("div",{className:"panel panel--scrollable flexbox-area-grow"},p.default.createElement(V.default,{show:e,onClose:this.handleHideMessage}),p.default.createElement("div",{className:"panel panel--padded flexbox-area-grow"},p.default.createElement("div",{className:"toolbar toolbar--content"},p.default.createElement("div",{className:"btn-toolbar fill-width"},p.default.createElement("div",{className:"btn-toolbar__left-panel flexbox-area-grow"},p.default.createElement(O.default,n)),p.default.createElement("div",{className:"btn-toolbar__left-panel"},p.default.createElement("a",{role:"button","aria-label":j.default._t("CampaignAdmin.HELP_SHOW","Show help"),tabIndex:0,onClick:this.handleToggleMessage,className:"btn btn-secondary font-icon-white-question btn--icon-xl btn--no-text"})))),p.default.createElement(D.default,a))))}},{key:"renderItemListView",value:function(){var e=this,t=this.props,n=t.sectionConfig,a=t.previewState,i=t.match.params.id,r=this.state.loading,o={sectionConfig:n,campaignId:i,itemListViewEndpoint:n.itemListViewEndpoint,publishApi:this.publishApi,onBackButtonClick:this.handleBackButtonClick,onRemoveCampaignItem:this.handleRemoveCampaignItem,loading:r,previewState:a};return p.default.createElement(W.default,{style:{position:"relative"},className:"flexbox-area-grow fill-height",onResize:function(t){var n=t.width;return e.props.onResize(n)}},p.default.createElement(F.default,o))}},{key:"render",value:function(){var e=null;switch(this.props.match.params.view){case"show":e=this.renderItemListView();break;case"edit":e=this.renderDetailEditView();break;case"create":e=this.renderCreateView();break;default:e=this.renderIndexView()}return e}}]),t}(m.Component);Y.propTypes={breadcrumbsActions:g.default.object.isRequired,campaignId:g.default.string,sectionConfig:g.default.shape({publishEndpoint:g.default.shape({url:g.default.string,method:g.default.string}),form:g.default.shape({EditForm:g.default.shape({schemaUrl:g.default.string}),campaignEditForm:g.default.shape({schemaUrl:g.default.string}),campaignCreateForm:g.default.shape({schemaUrl:g.default.string})})}),securityId:g.default.string.isRequired,view:g.default.string,params:g.default.shape({view:g.default.string,id:g.default.number}),showMessage:g.default.bool,previewState:g.default.oneOf(["edit","preview","split"]),onResize:g.default.func.isRequired},Y.defaultProps={sectionConfig:{},params:{},view:"show",breadcrumbs:[]},t.Component=Y,t.default=(0,_.withRouter)((0,h.connect)(s,c)(Y))},"./client/src/containers/CampaignAdmin/CampaignAdminItem.js":function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),s=n(2),c=a(s),u=n(0),d=a(u),m=n(7),p=n(27),f=a(p),g=n(1),h=a(g),b=function(e){function t(){return i(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),l(t,[{key:"getNumReferTo",value:function(){var e=this.props.item;return e._links&&e._links.references&&e._links.references.length||0}},{key:"getNumReferredBy",value:function(){var e=this.props.item;return e._links&&e._links.referenced_by&&e._links.referenced_by.length||0}},{key:"getReferToTooltipText",value:function(){var e=this.getNumReferTo();return d.default.inject(d.default._t("CampaignAdmin.LINKED_TO","Requires {number} item(s)"),{number:(0,f.default)(e)})}},{key:"getReferredByTooltipText",value:function(){var e=this.getNumReferredBy();return d.default.inject(d.default._t("CampaignAdmin.LINKED_FROM","Required by {number} item(s)"),{number:(0,f.default)(e)})}},{key:"renderLinks",value:function(){var e=this.props,t=e.isLinked,n=e.selected,a=e.item.ID,i=this.getNumReferTo(),r=this.getNumReferredBy(),o=[];i>0&&o.push(this.getReferToTooltipText()),r>0&&o.push(d.default.sprintf(0===o.length?this.getReferredByTooltipText():this.getReferredByTooltipText().toLocaleLowerCase(),(0,f.default)(r)));var l=null;if(n&&i+r>0||t){var s=["list-group-item__info","campaign-admin__item-links",t?"campaign-admin__item-links--is-linked":"campaign-admin__item-links--has-links"];l=c.default.createElement("div",{className:s.join(" ")},c.default.createElement("span",{id:"campaign-tooltip-"+a},c.default.createElement("span",{className:"campaign-admin__item-links__number"},i+r),c.default.createElement("span",{className:"font-icon-link"})),c.default.createElement(m.UncontrolledTooltip,{placement:"left",target:"campaign-tooltip-"+a},o.join(", ")))}return l}},{key:"render",value:function(){var e=null,t={},n=this.props,a=n.campaign,i=n.item;if("open"===a.State)switch(i.ChangeType){case"created":t.className="badge badge-warning list-group-item__status",t.Title=d.default._t("CampaignAdmin.DRAFT","Draft");break;case"modified":t.className="badge badge-warning list-group-item__status",t.Title=d.default._t("CampaignAdmin.MODIFIED","Modified");break;case"deleted":t.className="badge badge-error list-group-item__status",t.Title=d.default._t("CampaignAdmin.REMOVED","Removed");break;case"none":default:t.className="badge badge-success list-group-item__status",t.Title=d.default._t("CampaignAdmin.NO_CHANGES","No changes")}var r=this.renderLinks();i.Thumbnail&&(e=c.default.createElement("span",{className:"list-group-item__thumbnail"},c.default.createElement("img",{alt:i.Title,src:i.Thumbnail})));var o=i.Title?i.Title:d.default._t("CampaignAdmin.UNTITLED","Untitled");return c.default.createElement("div",{className:"fill-width"},e,c.default.createElement("div",{className:"list-group-item__details"},c.default.createElement("h4",{className:"list-group-item__heading",title:o},o),r,t.className&&t.Title&&c.default.createElement("span",{className:t.className},t.Title)))}}]),t}(s.Component);b.propTypes={campaign:h.default.object.isRequired,item:h.default.object.isRequired,isLinked:h.default.bool,selected:h.default.bool},t.default=b},"./client/src/containers/CampaignAdmin/CampaignAdminList.js":function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function i(e){return e&&e.__esModule?e:{default:e}}function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function c(e,t){var n=t.sectionConfig.treeClass,a=parseInt(t.campaignId,10),i=e.records[n]||[],r=i.find(function(e){return e.ID===a})||{};return{config:e.config,record:r,campaign:e.campaign,treeClass:n,newItem:e.campaign.newItem}}function u(e){return{breadcrumbsActions:(0,b.bindActionCreators)(v,e),recordActions:(0,b.bindActionCreators)(y,e),campaignActions:(0,b.bindActionCreators)(I,e)}}Object.defineProperty(t,"__esModule",{value:!0}),t.Component=void 0;var d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},m=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),p=n(2),f=i(p),g=n(1),h=i(g),b=n(9),C=n(6),_=n(5),v=a(_),E=n(8),y=a(E),A=n("./client/src/state/campaign/CampaignActions.js"),I=a(A),w=n(11),S=i(w),k=n(12),N=i(k),M=n(18),T=i(M),P=n(10),R=i(P),O=n("./client/src/containers/CampaignAdmin/CampaignAdminItem.js"),x=i(O),j=n(4),B=i(j),G=n(7),L=n(0),D=i(L),U=n(3),F=n(26),H=i(F),V=function(e){function t(e){o(this,t);var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handlePublish=n.handlePublish.bind(n),n.handleItemSelected=n.handleItemSelected.bind(n),n.setBreadcrumbs=n.setBreadcrumbs.bind(n),n.handleCloseItem=n.handleCloseItem.bind(n),n.handleRemoveItem=n.handleRemoveItem.bind(n),n.renderCampaignAdminListDetail=n.renderCampaignAdminListDetail.bind(n),n.isRecordLoaded(e)?n.state={loading:!1,error:!1,errorCode:0}:n.state={loading:!0,error:!1,errorCode:0},n}return s(t,e),m(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props,n=t.campaignId,a=t.itemListViewEndpoint,i=t.recordActions,r=t.treeClass,o=a.url.replace(/:id/,n);this.setBreadcrumbs(),this.isRecordLoaded()||i.fetchRecord(r,"get",o).then(function(){e.setBreadcrumbs(),e.setState({loading:!1})}).catch(function(t){e.setState({loading:!1,error:!0,errorCode:t.response.status})})}},{key:"componentWillUnmount",value:function(){this.props.campaignActions.setNewItem(null)}},{key:"setBreadcrumbs",value:function(){var e=this.props,t=e.breadcrumbsActions,n=e.campaignId,a=e.record,i=e.sectionConfig.url;if(a){var r=[{text:D.default._t("CampaignAdmin.CAMPAIGN","Campaigns"),href:i}];r.push({text:a.Name,href:i+"/set/"+n+"/show"}),t.setBreadcrumbs(r)}}},{key:"getSelectedItem",value:function(){var e=this.props.campaign.changeSetItemId,t=this.getItems()||[],n=null;if(e&&(n=t.find(function(t){return e===t.ID})),!n){var a=this.groupItemsForSet(),i=Object.keys(a).find(function(e){return a[e]&&a[e].items.length>0});n=i?a[i].items[0]:null}return n}},{key:"getMoreActions",value:function(){var e=this.getSelectedItem();if(!e)return null;var t=e._links&&e._links.referenced_by,n=t&&t.length||0,a=D.default._t("CampaignAdmin.UNREMOVEABLE_INFO","Required by {number} item(s), and cannot be removed directly.");return["explicitly"===e.Added?f.default.createElement(G.DropdownItem,{key:"remove_action",className:"btn btn-secondary action",onClick:this.handleRemoveItem},D.default._t("CampaignAdmin.REMOVE","Remove")):f.default.createElement(G.DropdownItem,{tag:"p",key:"unremoveable_info",className:"alert alert-info campaign-admin__unremoveable-item"},f.default.createElement("span",{className:"font-icon-link"}),D.default.inject(a,{number:n}))]}},{key:"getItems",value:function(){var e=this.props.record;return e&&e._embedded?e._embedded.items:null}},{key:"getPlaceholderGroups",value:function(){var e={},t=this.props.record;return t&&t.placeholderGroups&&t.placeholderGroups.forEach(function(t){e[t.baseClass]=d({},t),e[t.baseClass].items=[].concat(r(t.items))}),e}},{key:"groupItemsForSet",value:function(){var e=this.getPlaceholderGroups(),t=this.getItems();return t?(t.forEach(function(t){var n=t.BaseClass;e[n]||(e[n]={singular:t.Singular,plural:t.Plural,items:[]}),e[n].items.push(t)}),e):e}},{key:"isRecordLoaded",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.props;return 0!==Object.keys(e.record).length}},{key:"handleRemoveItem",value:function(){var e=this.props,t=e.campaignId,n=e.onRemoveCampaignItem;"function"==typeof n&&n(t,this.getSelectedItem().ID)}},{key:"handleItemSelected",value:function(e,t){this.props.campaignActions.selectChangeSetItem(t)}},{key:"handleCloseItem",value:function(){this.props.campaignActions.selectChangeSetItem(null)}},{key:"handlePublish",value:function(e){var t=this.props,n=t.campaignId,a=t.campaignActions.publishCampaign,i=t.publishApi,r=t.treeClass;e.preventDefault();var o=D.default._t("CampaignAdmin.PUBLISH_CAMPAIGN_CONFIRM","Are you sure you want to publish this campaign?");window.confirm(o)&&a(i,r,n)}},{key:"renderButtonToolbar",value:function(){var e=this.props,t=e.ViewModeComponent,n=e.FormActionComponent,a=e.record,i=e.campaign.isPublishing,r=this.getItems(),o=!r||0===r.length,l=null;return o?l={title:D.default._t("CampaignAdmin.PUBLISHCAMPAIGN","Publish campaign"),buttonStyle:"outline-secondary",icon:"rocket",disabled:!0}:"open"===a.State&&(l={title:D.default._t("CampaignAdmin.PUBLISHCAMPAIGN","Publish campaign"),buttonStyle:"primary",loading:i,onClick:this.handlePublish,icon:"rocket"}),l?f.default.createElement("div",{className:"btn-toolbar"},f.default.createElement(n,l),!o&&f.default.createElement(t,{id:"view-mode-toggle-in-edit-nb",area:"edit"})):null}},{key:"renderErrorMessage",value:function(e){switch(e){case 403:return f.default.createElement("p",null,D.default._t("CampaignAdmin.FORBIDDEN","You do not have access to view this campaign"));case 404:return f.default.createElement("p",null,D.default._t("CampaignAdmin.PAGE_NOT_FOUND","The campaign you are looking for can not be found"));default:return f.default.createElement("p",null,D.default._t("CampaignAdmin.SOMETHING_WENT_WRONG","Something went wrong"))}}},{key:"renderPreview",value:function(e,t){var n=this.props,a=n.PreviewComponent,i=n.previewState,r=this.state,o=r.loading,l=r.error,s=r.errorCode,c=["flexbox-area-grow","fill-height","preview","campaign-admin__campaign-preview","campaign-admin__campaign-preview--empty"];switch(i){case"preview":c.push("preview-only");break;case"edit":return null}if(c=(0,H.default)(c),o)return f.default.createElement("div",{className:c},f.default.createElement("p",null,D.default._t("CampaignAdmin.LOADING","Loading...")));if(l)return f.default.createElement("div",{className:c},this.renderErrorMessage(s));if(!this.getItems()||0===this.getItems().length){var u=D.default._t("CampaignAdmin.SELECTFROMSECTIONS",'Select "Add to Campaign" from pages, files, and other admin sections with content types');return f.default.createElement("div",{className:c},f.default.createElement("h2",{className:"campaign-admin__empty-heading"},D.default._t("CampaignAdmin.GETTINGSTARTED","Getting started")),f.default.createElement("p",{className:"campaign-admin__empty-info"},u))}return f.default.createElement(a,{itemLinks:e,itemId:t,onBack:this.handleCloseItem,moreActions:this.getMoreActions(),className:c})}},{key:"renderCampaignAdminListDetail",value:function(e){var t=this.props,n=t.previewState,a=t.onBackButtonClick,i=t.newItem,r=(0,H.default)("panel","panel--padded","panel--scrollable","flexbox-area-grow"),o=i?f.default.createElement("p",{className:"alert alert-success alert--no-border",role:"alert"},D.default._t("CampaignAdmin.NEWCAMPAIGNSUCCESS","Nice one! You have successfully created a campaign.")):null;if("preview"===n)return null;var l=(0,H.default)("fill-height","campaign-admin__campaign-items",{"fill-height":"edit"===n,"campaign-admin__campaign-items-edit":"edit"===n});return f.default.createElement("div",{className:l,"aria-expanded":"true"},f.default.createElement(R.default,{showBackButton:!0,onBackButtonClick:a},f.default.createElement(B.default,{multiline:!0})),o,f.default.createElement("div",{className:r},e),f.default.createElement("div",{className:"toolbar toolbar--south"},this.renderButtonToolbar()))}},{key:"render",value:function(){var e=this,t=this.props,n=t.campaign.changeSetItemId,a=t.campaignId,i=t.record,r=n,o=null,l=r?"":"campaign-admin__campaign--hide-preview",s=this.groupItemsForSet(),c=[],u=this.getSelectedItem(),d=u&&u._links&&u._links.references||[],m=u&&u._links&&u._links.referenced_by||[];Object.keys(s).forEach(function(t){var n=s[t],l=n.items.length,u=[],p="\n        "+(0===l?"":l)+"\n        "+(1===l?n.singular:n.plural)+"\n      ",g="Set_"+a+"_Group_"+t;n.items.forEach(function(t,n){r||(r=t.ID);var a=r===t.ID;a&&t._links&&(o=t._links);var l=(0,H.default)({"list-group-item--inactive":"none"===t.ChangeType||"published"===i.State,active:a}),s=!!d.find(function(e){return e.ChangeSetItemID===parseInt(t.ID,10)});s=s||m.find(function(e){return e.ChangeSetItemID===t.ID}),u.push(f.default.createElement(T.default,{key:t.ID||n,className:l,onClick:e.handleItemSelected,onClickArg:t.ID},f.default.createElement(x.default,{item:t,campaign:e.props.record,selected:a,isLinked:s})))});var h=(0,H.default)("list-group-wrapper",{"list-group-wrapper--empty":0===u.length});c.push(f.default.createElement("div",{className:h,key:g},f.default.createElement(N.default,{groupid:g,title:p},u.length>0?u:f.default.createElement("p",{className:"list-group-item"},n.noItemsText))))});var p=f.default.createElement(S.default,null,c),g=this.props.loading&&[f.default.createElement("div",{key:"overlay",className:"cms-content-loading-overlay ui-widget-overlay-light"}),f.default.createElement("div",{key:"spinner",className:"cms-content-loading-spinner"})];return f.default.createElement("div",{className:"fill-width campaign-admin__campaign "+l},g,this.renderCampaignAdminListDetail(p,o),this.renderPreview(o,r))}}]),t}(p.Component);V.propTypes={campaign:h.default.shape({isPublishing:h.default.bool,changeSetItemId:h.default.number}),publishApi:h.default.func.isRequired,record:h.default.object.isRequired,sectionConfig:h.default.object.isRequired,onBackButtonClick:h.default.func,onRemoveCampaignItem:h.default.func,breadcrumbsActions:h.default.object.isRequired,campaignActions:h.default.object.isRequired,recordActions:h.default.object.isRequired,PreviewComponent:h.default.oneOfType([h.default.node,h.default.func]),ViewModeComponent:h.default.oneOfType([h.default.node,h.default.func]),FormActionComponent:h.default.oneOfType([h.default.node,h.default.func]),previewState:h.default.oneOf(["edit","preview","split"])},V.defaultProps={},t.Component=V,t.default=(0,b.compose)((0,C.connect)(c,u),(0,U.inject)(["FormAction","ViewModeToggle","Preview"],function(e,t,n){return{FormActionComponent:e,ViewModeComponent:t,PreviewComponent:n}},function(){return"CampaignAdmin.CampaignAdmin.List"}))(V)},"./client/src/state/campaign/CampaignActionTypes.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={SET_CAMPAIGN_ACTIVE_CHANGESET:"SET_CAMPAIGN_ACTIVE_CHANGESET",SET_CAMPAIGN_SELECTED_CHANGESETITEM:"SET_CAMPAIGN_SELECTED_CHANGESETITEM",PUBLISH_CAMPAIGN_REQUEST:"PUBLISH_CAMPAIGN_REQUEST",PUBLISH_CAMPAIGN_SUCCESS:"PUBLISH_CAMPAIGN_SUCCESS",PUBLISH_CAMPAIGN_FAILURE:"PUBLISH_CAMPAIGN_FAILURE",SET_NEW_CAMPAIGN:"SET_NEW_CAMPAIGN",REMOVE_CAMPAIGN_ITEM_REQUEST:"REMOVE_CAMPAIGN_ITEM_REQUEST",REMOVE_CAMPAIGN_ITEM_SUCCESS:"REMOVE_CAMPAIGN_ITEM_SUCCESS",REMOVE_CAMPAIGN_ITEM_FAILURE:"REMOVE_CAMPAIGN_ITEM_FAILURE",SET_SHOW_MESSAGE:"SET_SHOW_MESSAGE"}},"./client/src/state/campaign/CampaignActions.js":function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function i(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.localStorage).setItem("campaign.showMessage",e),{type:d.default.SET_SHOW_MESSAGE,payload:{show:e}}}function r(e){return{type:d.default.SET_CAMPAIGN_SELECTED_CHANGESETITEM,payload:{changeSetItemId:e}}}function o(e,t){return function(n){n({type:d.default.SET_CAMPAIGN_ACTIVE_CHANGESET,payload:{campaignId:e,view:t}})}}function l(e,t,n){return function(a){a({type:d.default.PUBLISH_CAMPAIGN_REQUEST,payload:{campaignId:n}}),e({id:n}).then(function(e){a({type:d.default.PUBLISH_CAMPAIGN_SUCCESS,payload:{campaignId:n}}),a({type:p.default.FETCH_RECORD_SUCCESS,payload:{recordType:t,data:e}});var i=b.default._t("CampaignAdmin.PUBLISH_SUCCESS",'Published "%s" successfully.');a(g.success(b.default.sprintf(i,e.Name)))}).catch(function(e){a({type:d.default.PUBLISH_CAMPAIGN_FAILURE,payload:{error:e}});var t="string"==typeof e?e:b.default._t("CampaignAdmin.PUBLISH_FAIL","Campaign could not be published.");a(g.error(t))})}}function s(e){return{type:d.default.SET_NEW_CAMPAIGN,payload:{newItem:e}}}function c(e,t,n){return function(a){return a({type:d.default.REMOVE_CAMPAIGN_ITEM_REQUEST,payload:{campaignId:t,itemId:n}}),e({id:t,itemId:n}).then(function(){a({type:d.default.REMOVE_CAMPAIGN_ITEM_SUCCESS,payload:{campaignId:t,itemId:n}})}).catch(function(e){a({type:d.default.REMOVE_CAMPAIGN_ITEM_FAILURE,payload:{error:e}})})}}Object.defineProperty(t,"__esModule",{value:!0}),t.setShowMessage=i,t.selectChangeSetItem=r,t.showCampaignView=o,t.publishCampaign=l,t.setNewItem=s,t.removeCampaignItem=c;var u=n("./client/src/state/campaign/CampaignActionTypes.js"),d=a(u),m=n(21),p=a(m),f=n(24),g=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(f),h=n(0),b=a(h)},"./client/src/state/campaign/CampaignReducer.js":function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments[1];switch(t.type){case c.default.SET_CAMPAIGN_SELECTED_CHANGESETITEM:return(0,l.default)(Object.assign({},e,{changeSetItemId:t.payload.changeSetItemId}));case c.default.SET_CAMPAIGN_ACTIVE_CHANGESET:return(0,l.default)(Object.assign({},e,{campaignId:t.payload.campaignId,view:t.payload.view,changeSetItemId:null}));case c.default.PUBLISH_CAMPAIGN_REQUEST:return(0,l.default)(Object.assign({},e,{isPublishing:!0}));case c.default.PUBLISH_CAMPAIGN_SUCCESS:case c.default.PUBLISH_CAMPAIGN_FAILURE:return(0,l.default)(Object.assign({},e,{isPublishing:!1}));case c.default.SET_NEW_CAMPAIGN:return(0,l.default)(r({},e,{newItem:t.payload.newItem}));case c.default.SET_SHOW_MESSAGE:return(0,l.default)(r({},e,{showMessage:t.payload.show}));default:return e}}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o=n(15),l=a(o),s=n("./client/src/state/campaign/CampaignActionTypes.js"),c=a(s),u=window.localStorage.getItem("campaign.showMessage"),d=(0,l.default)({campaignId:null,changeSetItemId:null,isPublishing:!1,view:null,newItem:null,showMessage:null===u});t.default=i},0:function(e,t){e.exports=i18n},1:function(e,t){e.exports=PropTypes},10:function(e,t){e.exports=Toolbar},11:function(e,t){e.exports=Accordion},12:function(e,t){e.exports=AccordionBlock},13:function(e,t){e.exports=Backend},14:function(e,t){e.exports=Config},15:function(e,t){e.exports=DeepFreezeStrict},16:function(e,t){e.exports=FormAction},17:function(e,t){e.exports=FormBuilderLoader},18:function(e,t){e.exports=ListGroupItem},19:function(e,t){e.exports=ReactRouteRegister},2:function(e,t){e.exports=React},20:function(e,t){e.exports=ReactRouterDom},21:function(e,t){e.exports=RecordsActionTypes},22:function(e,t){e.exports=ReduxForm},23:function(e,t){e.exports=ResizeAware},24:function(e,t){e.exports=ToastsActions},25:function(e,t){e.exports=ViewModeActions},26:function(e,t){e.exports=classnames},27:function(e,t){e.exports=formatWrittenNumber},28:function(e,t){e.exports=getFormState},3:function(e,t){e.exports=Injector},4:function(e,t){e.exports=Breadcrumb},5:function(e,t){e.exports=BreadcrumbsActions},6:function(e,t){e.exports=ReactRedux},7:function(e,t){e.exports=Reactstrap},8:function(e,t){e.exports=RecordsActions},9:function(e,t){e.exports=Redux}});