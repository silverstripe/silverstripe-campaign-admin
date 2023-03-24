!function(){"use strict";var e={558:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,i=(n=a(648))&&n.__esModule?n:{default:n};var r=()=>{i.default.transform("add-to-campaign",(e=>{e.form.alterSchema("*.AddToCampaign",(e=>{if(!e.getFieldByName("AddNewSelect"))return e.getState();const t=e.getValue("AddNewSelect");return e.setFieldClass("NewTitle","show",t).setFieldClass("NewTitle","hide",!t).getState()}))}))};t.default=r},274:function(e,t,a){var n=c(a(510)),i=c(a(648)),r=c(a(873)),o=c(a(646)),s=c(a(277)),l=c(a(558)),d=a(845);function c(e){return e&&e.__esModule?e:{default:e}}document.addEventListener("DOMContentLoaded",(()=>{const e=n.default.getSection("SilverStripe\\CampaignAdmin\\CampaignAdmin").reactRoutePath;r.default.add({path:"/",routes:[{path:(0,d.joinUrlPaths)(e,"set/:id/:view"),component:o.default},{path:(0,d.joinUrlPaths)(e,":type/:id/:view"),component:o.default},{path:e,component:o.default}]}),i.default.reducer.register("campaign",s.default),(0,l.default)()}))},235:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var a=l(t);if(a&&a.has(e))return a.get(e);var n={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if("default"!==r&&Object.prototype.hasOwnProperty.call(e,r)){var o=i?Object.getOwnPropertyDescriptor(e,r):null;o&&(o.get||o.set)?Object.defineProperty(n,r,o):n[r]=e[r]}n.default=e,a&&a.set(e,n);return n}(a(363)),i=s(a(86)),r=s(a(754)),o=s(a(264));function s(e){return e&&e.__esModule?e:{default:e}}function l(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(l=function(e){return e?a:t})(e)}class d extends n.Component{constructor(e){super(e),this.handleClose=this.handleClose.bind(this)}handleClose(e){this.props.onClose(e)}renderContent(){const e=o.default.infoScreen.callToAction,t=o.default.infoScreen.links;return n.default.createElement("div",{className:"flexbox-area-grow campaign-info__content"},n.default.createElement("h3",null,r.default._t("CampaignAdmin.InfoScreenHeader","How do campaigns work?")),n.default.createElement("p",null,r.default._t("CampaignAdmin.InfoScreenContent","Campaigns allow multiple users to publish large amounts of content (pages, files, etc.) all at once from one place.")),n.default.createElement("div",{className:"campaign-info__links"},t.map((e=>n.default.createElement("a",{key:e.text,href:e.link,target:"_blank",rel:"noopener noreferrer"},e.text)))),n.default.createElement("div",{className:"campaign-info__content-buttons"},e&&n.default.createElement("a",{className:"btn btn-outline-secondary",href:e.link,target:"_blank",rel:"noopener noreferrer"},e.text)))}render(){return this.props.show?n.default.createElement("div",{className:"fill-width campaign-info"},n.default.createElement("div",{className:"campaign-info__icon"},n.default.createElement("span",{className:"font-icon-white-question icon btn--icon-xl btn--no-text"})),this.renderContent(),n.default.createElement("div",{className:"campaign-info__banner-image"}),n.default.createElement("div",{className:"campaign-info__buttons"},n.default.createElement("a",{className:"btn campaign-info__close btn--no-text font-icon-cancel btn--icon-xl",onClick:this.handleClose,role:"button","aria-label":r.default._t("CampaignAdmin.HELP_HIDE","Hide help"),tabIndex:0}))):null}}d.propTypes={show:i.default.bool,onClose:i.default.func},d.defaultProps={show:!1,onClose:()=>null};var c=d;t.default=c},264:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;const a="https://userhelp.silverstripe.org/en/4/creating_pages_and_content/campaigns/";var n={infoScreen:{links:[{text:"Creating a new campaign",link:`${a}#creating-a-new-campaign`},{text:"Editing details/settings",link:`${a}#editing-details-settings`},{text:"Adding items to a campaign",link:`${a}#adding-items-to-a-campaign`},{text:"Managing items in a campaign",link:`${a}#managing-items-in-a-campaign`},{text:"Publishing a campaign",link:`${a}#publishing-a-campaign`}],callToAction:null}};t.default=n},646:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.Component=void 0;var n=y(a(363)),i=w(a(86)),r=a(624),o=a(762),s=a(827),l=w(a(720)),d=w(a(159)),c=y(a(466)),u=y(a(674)),m=y(a(826)),p=w(a(803)),f=w(a(13)),h=w(a(754)),g=w(a(71)),C=w(a(238)),_=w(a(235)),E=w(a(104)),b=y(a(432)),A=y(a(108)),I=w(a(379)),v=a(845);function w(e){return e&&e.__esModule?e:{default:e}}function S(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(S=function(e){return e?a:t})(e)}function y(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var a=S(t);if(a&&a.has(e))return a.get(e);var n={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if("default"!==r&&Object.prototype.hasOwnProperty.call(e,r)){var o=i?Object.getOwnPropertyDescriptor(e,r):null;o&&(o.get||o.set)?Object.defineProperty(n,r,o):n[r]=e[r]}return n.default=e,a&&a.set(e,n),n}function M(){return M=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},M.apply(this,arguments)}class N extends n.Component{constructor(e){super(e),this.state={loading:!1};const t={SecurityID:e.securityId};this.publishApi=d.default.createEndpointFetcher({...e.sectionConfig.publishEndpoint,defaultData:t,payloadSchema:{id:{urlReplacement:":id",remove:!0}}}),this.removeCampaignItemApi=d.default.createEndpointFetcher({...e.sectionConfig.removeCampaignItemEndpoint,defaultData:t,payloadSchema:{id:{urlReplacement:":id",remove:!0},itemId:{urlReplacement:":itemId",remove:!0}}}),this.handleBackButtonClick=this.handleBackButtonClick.bind(this),this.handleCreateCampaignSubmit=this.handleCreateCampaignSubmit.bind(this),this.handleFormAction=this.handleFormAction.bind(this),this.hasErrors=this.hasErrors.bind(this),this.handleRemoveCampaignItem=this.handleRemoveCampaignItem.bind(this),this.addCampaign=this.addCampaign.bind(this),this.handleHideMessage=this.handleHideMessage.bind(this),this.handleToggleMessage=this.handleToggleMessage.bind(this)}componentDidMount(){const{breadcrumbs:e,title:t,router:{params:{id:a,view:n}}}=this.props;0===e.length&&this.setBreadcrumbs(n,a,t)}componentDidUpdate(e){const{title:t,router:{params:{id:a,view:n}}}=this.props;(e.router.params.id!==a||e.router.params.view!==n||e.title!==t)&&this.setBreadcrumbs(n,a,t)}setBreadcrumbs(e,t,a){const{sectionConfig:{reactRoutePath:n}}=this.props,i=[{text:h.default._t("CampaignAdmin.CAMPAIGN","Campaigns"),href:(0,v.joinUrlPaths)("/",n)}];switch(e){case"show":default:break;case"edit":i.push({text:a,href:this.getActionRoute(t,e)});break;case"create":i.push({text:h.default._t("CampaignAdmin.ADDCAMPAIGN","Add campaign"),href:this.getActionRoute(t,e)})}this.props.breadcrumbsActions.setBreadcrumbs(i)}getActionRoute(e,t){const{reactRoutePath:a}=this.props.sectionConfig;return(0,v.joinUrlPaths)("/",a,`/set/${e}/${t}`)}handleBackButtonClick(e){const{breadcrumbs:t,router:{navigate:a}}=this.props;if(t.length>1){const n=t[t.length-2];n&&n.href&&(e.preventDefault(),a(n.href))}}handleCreateCampaignSubmit(e,t,a){const n=a();if(!n)throw new Error("Promise was not returned for submitting");return n.then((e=>{const a=this.hasErrors(e);if("action_save"===t&&!a){const t=e.record.id;this.props.campaignActions.setNewItem(t),this.props.router.navigate(this.getActionRoute(t,"show"))}return e}))}handleFormAction(e){const{router:{navigate:t},sectionConfig:{reactRoutePath:a}}=this.props;"action_cancel"===e.currentTarget.name&&(t((0,v.joinUrlPaths)("/",a)),e.preventDefault())}handleRemoveCampaignItem(e,t){const a=h.default._t("CampaignAdmin.REMOVE_ITEM_MESSAGE","Are you sure you want to remove this item?\n\nBy removing this item all linked items will be removed unless used elsewhere.");return window.confirm(a)?(this.setState({loading:!0}),this.removeCampaignItem(e,t).then(this.fetchCampaignsList.bind(this)).then((()=>this.setState({loading:!1}))).then((()=>{this.props.campaignActions.selectChangeSetItem(null),window.document.body.click()}))):null}handleToggleMessage(){this.props.campaignActions.setShowMessage(!this.props.showMessage)}handleHideMessage(){this.props.campaignActions.setShowMessage(!1)}removeCampaignItem(e,t){return this.props.campaignActions.removeCampaignItem(this.removeCampaignItemApi,e,t)}fetchCampaignsList(){const e=this.props.sectionConfig.readCampaignsEndpoint,t=e.url;return this.props.recordActions.fetchRecords(this.props.sectionConfig.treeClass,e.method,t)}hasErrors(e){if(e.errors&&e.errors.length)return!0;const t=e.state;if(!t)return!1;if(t.messages&&t.messages.find((e=>"good"!==e.type)))return!0;const a=t.fields&&t.fields.find((e=>e.message&&"good"!==e.message.type));return Boolean(a)}campaignEditCreateFn(e,t){const{sectionConfig:{reactRoutePath:a},router:{navigate:i}}=this.props;if("action_cancel"===t.name){const r={...t,onClick:e=>{e.preventDefault(),i((0,v.joinUrlPaths)("/",a))}};return n.default.createElement(e,M({key:t.id},r))}return n.default.createElement(e,M({key:t.id},t))}campaignAddCreateFn(e,t){const{router:{navigate:a},sectionConfig:{reactRoutePath:i}}=this.props;if("action_cancel"===t.name){const r={...t,onClick:e=>{e.preventDefault(),a((0,v.joinUrlPaths)("/",i))}};return n.default.createElement(e,M({key:t.name},r))}return n.default.createElement(e,M({key:t.name},t))}campaignListCreateFn(e,t){const{router:{navigate:a},sectionConfig:{reactRoutePath:i}}=this.props;if("GridField"===t.schemaComponent){const r={...t,data:{...t.data,onDrillDown:(e,t)=>{a((0,v.joinUrlPaths)("/",i,`set/${t.ID}/show`))},onEditRecord:(e,t)=>{a((0,v.joinUrlPaths)("/",i,`set/${t}/edit`))}}};return n.default.createElement(e,M({key:r.name},r))}return n.default.createElement(e,M({key:t.name},t))}addCampaign(){const e=this.getActionRoute(0,"create");this.props.router.navigate(e)}renderDetailEditView(){if(this.props.router.params.id<=0)return this.renderCreateView();const e=this.props.sectionConfig.form.campaignEditForm.schemaUrl,t=(0,v.joinUrlPaths)(e,"/",this.props.router.params.id);return n.default.createElement("div",{className:"fill-height"},n.default.createElement(g.default,{showBackButton:!0,onBackButtonClick:this.handleBackButtonClick},n.default.createElement(p.default,{multiline:!0})),n.default.createElement(C.default,{fieldHolder:{className:"panel panel--padded panel--scrollable flexbox-area-grow form--inline"},actionHolder:{className:"toolbar--south"},onAction:this.handleFormAction,schemaUrl:t,identifier:"Campaign.EditView"}))}renderCreateView(){const{schemaUrl:e}=this.props.sectionConfig.form.campaignCreateForm;return n.default.createElement("div",{className:"fill-height"},n.default.createElement(g.default,{showBackButton:!0,onBackButtonClick:this.handleBackButtonClick},n.default.createElement(p.default,{multiline:!0})),n.default.createElement(C.default,{fieldHolder:{className:"panel panel--padded panel--scrollable flexbox-area-grow form--inline"},actionHolder:{className:"toolbar--south"},onSubmit:this.handleCreateCampaignSubmit,onAction:this.handleFormAction,schemaUrl:e,identifier:"Campaign.CreateView"}))}renderIndexView(){const{showMessage:e}=this.props,{schemaUrl:t}=this.props.sectionConfig.form.EditForm,a={title:h.default._t("CampaignAdmin.ADDCAMPAIGN","Add campaign"),icon:"plus",extraClass:"btn-primary",onClick:this.addCampaign},i={createFn:this.campaignListCreateFn.bind(this),schemaUrl:t,identifier:"Campaign.IndexView"};return n.default.createElement("div",{className:"fill-height","aria-expanded":"true"},n.default.createElement(g.default,null,n.default.createElement(p.default,{multiline:!0})),n.default.createElement("div",{className:"panel panel--scrollable flexbox-area-grow"},n.default.createElement(_.default,{show:e,onClose:this.handleHideMessage}),n.default.createElement("div",{className:"panel panel--padded flexbox-area-grow"},n.default.createElement("div",{className:"toolbar toolbar--content"},n.default.createElement("div",{className:"btn-toolbar fill-width"},n.default.createElement("div",{className:"btn-toolbar__left-panel flexbox-area-grow"},n.default.createElement(f.default,a)),n.default.createElement("div",{className:"btn-toolbar__left-panel"},n.default.createElement("a",{role:"button","aria-label":h.default._t("CampaignAdmin.HELP_SHOW","Show help"),tabIndex:0,onClick:this.handleToggleMessage,className:"btn btn-secondary font-icon-white-question btn--icon-xl btn--no-text"})))),n.default.createElement(C.default,i))))}renderItemListView(){const{sectionConfig:e,previewState:t,router:{params:{id:a}}}=this.props,{loading:i}=this.state,r={sectionConfig:e,campaignId:a,itemListViewEndpoint:e.itemListViewEndpoint,publishApi:this.publishApi,onBackButtonClick:this.handleBackButtonClick,onRemoveCampaignItem:this.handleRemoveCampaignItem,loading:i,previewState:t};return n.default.createElement(E.default,{style:{position:"relative"},className:"flexbox-area-grow fill-height",onResize:e=>{let{width:t}=e;return this.props.onResize(t)}},n.default.createElement(I.default,r))}render(){let e=null;switch(this.props.router.params.view){case"show":e=this.renderItemListView();break;case"edit":e=this.renderDetailEditView();break;case"create":e=this.renderCreateView();break;default:e=this.renderIndexView()}return e}}t.Component=N,N.propTypes={breadcrumbsActions:i.default.object.isRequired,campaignId:i.default.string,sectionConfig:i.default.shape({publishEndpoint:i.default.shape({url:i.default.string,method:i.default.string}),form:i.default.shape({EditForm:i.default.shape({schemaUrl:i.default.string}),campaignEditForm:i.default.shape({schemaUrl:i.default.string}),campaignCreateForm:i.default.shape({schemaUrl:i.default.string})})}),securityId:i.default.string.isRequired,view:i.default.string,router:b.routerPropTypes,showMessage:i.default.bool,previewState:i.default.oneOf(["edit","preview","split"]),onResize:i.default.func.isRequired},N.defaultProps={sectionConfig:{},router:{params:{}},view:"show",breadcrumbs:[]};var P=(0,b.default)((0,r.connect)((function(e,t){let a=null;const n=e.config.sections.find((e=>"SilverStripe\\CampaignAdmin\\CampaignAdmin"===e.name)),i=e.viewMode;if(t.router.params.id>0){const i=`${n.form.campaignEditForm.schemaUrl}/${t.router.params.id}`,r=e.form.formSchemas[i],s=r&&r.name&&(0,o.formValueSelector)(r.name,l.default);a=s&&s(e,"Name")}return{previewState:i.activeState,config:e.config,campaignId:e.campaign.campaignId,view:e.campaign.view,breadcrumbs:e.breadcrumbs,sectionConfig:n,securityId:e.config.SecurityID,title:a,showMessage:e.campaign.showMessage}}),(function(e){return{breadcrumbsActions:(0,s.bindActionCreators)(u,e),campaignActions:(0,s.bindActionCreators)(c,e),recordActions:(0,s.bindActionCreators)(m,e),onResize(t){e(A.enableOrDisableSplitMode(t))}}}))(N));t.default=P},326:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var a=d(t);if(a&&a.has(e))return a.get(e);var n={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if("default"!==r&&Object.prototype.hasOwnProperty.call(e,r)){var o=i?Object.getOwnPropertyDescriptor(e,r):null;o&&(o.get||o.set)?Object.defineProperty(n,r,o):n[r]=e[r]}n.default=e,a&&a.set(e,n);return n}(a(363)),i=l(a(754)),r=a(127),o=l(a(742)),s=l(a(86));function l(e){return e&&e.__esModule?e:{default:e}}function d(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(d=function(e){return e?a:t})(e)}class c extends n.Component{getNumReferTo(){const{item:e}=this.props;return e._links&&e._links.references&&e._links.references.length||0}getNumReferredBy(){const{item:e}=this.props;return e._links&&e._links.referenced_by&&e._links.referenced_by.length||0}getReferToTooltipText(){const e=this.getNumReferTo();return i.default.inject(i.default._t("CampaignAdmin.LINKED_TO","Requires {number} item(s)"),{number:(0,o.default)(e)})}getReferredByTooltipText(){const e=this.getNumReferredBy();return i.default.inject(i.default._t("CampaignAdmin.LINKED_FROM","Required by {number} item(s)"),{number:(0,o.default)(e)})}renderLinks(){const{isLinked:e,selected:t,item:{ID:a}}=this.props,s=this.getNumReferTo(),l=this.getNumReferredBy(),d=[];s>0&&d.push(this.getReferToTooltipText()),l>0&&d.push(i.default.sprintf(0===d.length?this.getReferredByTooltipText():this.getReferredByTooltipText().toLocaleLowerCase(),(0,o.default)(l)));let c=null;if(t&&s+l>0||e){const t=["list-group-item__info","campaign-admin__item-links",e?"campaign-admin__item-links--is-linked":"campaign-admin__item-links--has-links"];c=n.default.createElement("div",{className:t.join(" ")},n.default.createElement("span",{id:`campaign-tooltip-${a}`},n.default.createElement("span",{className:"campaign-admin__item-links__number"},s+l),n.default.createElement("span",{className:"font-icon-link"})),n.default.createElement(r.UncontrolledTooltip,{placement:"left",target:`campaign-tooltip-${a}`},d.join(", ")))}return c}render(){let e=null;const t={},{campaign:a,item:r}=this.props;if("open"===a.State)switch(r.ChangeType){case"created":t.className="badge badge-warning list-group-item__status",t.Title=i.default._t("CampaignAdmin.DRAFT","Draft");break;case"modified":t.className="badge badge-warning list-group-item__status",t.Title=i.default._t("CampaignAdmin.MODIFIED","Modified");break;case"deleted":t.className="badge badge-error list-group-item__status",t.Title=i.default._t("CampaignAdmin.REMOVED","Removed");break;default:t.className="badge badge-success list-group-item__status",t.Title=i.default._t("CampaignAdmin.NO_CHANGES","No changes")}const o=this.renderLinks();r.Thumbnail&&(e=n.default.createElement("span",{className:"list-group-item__thumbnail"},n.default.createElement("img",{alt:r.Title,src:r.Thumbnail})));const s=r.Title?r.Title:i.default._t("CampaignAdmin.UNTITLED","Untitled");return n.default.createElement("div",{className:"fill-width"},e,n.default.createElement("div",{className:"list-group-item__details"},n.default.createElement("h4",{className:"list-group-item__heading",title:s},s),o,t.className&&t.Title&&n.default.createElement("span",{className:t.className},t.Title)))}}c.propTypes={campaign:s.default.object.isRequired,item:s.default.object.isRequired,isLinked:s.default.bool,selected:s.default.bool};var u=c;t.default=u},379:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.Component=void 0;var n=v(a(363)),i=A(a(86)),r=a(827),o=a(624),s=v(a(674)),l=v(a(826)),d=v(a(466)),c=A(a(430)),u=A(a(942)),m=A(a(962)),p=A(a(71)),f=A(a(326)),h=A(a(803)),g=a(127),C=A(a(754)),_=a(648),E=A(a(820)),b=a(845);function A(e){return e&&e.__esModule?e:{default:e}}function I(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(I=function(e){return e?a:t})(e)}function v(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var a=I(t);if(a&&a.has(e))return a.get(e);var n={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if("default"!==r&&Object.prototype.hasOwnProperty.call(e,r)){var o=i?Object.getOwnPropertyDescriptor(e,r):null;o&&(o.get||o.set)?Object.defineProperty(n,r,o):n[r]=e[r]}return n.default=e,a&&a.set(e,n),n}class w extends n.Component{constructor(e){super(e),this.handlePublish=this.handlePublish.bind(this),this.handleItemSelected=this.handleItemSelected.bind(this),this.setBreadcrumbs=this.setBreadcrumbs.bind(this),this.handleCloseItem=this.handleCloseItem.bind(this),this.handleRemoveItem=this.handleRemoveItem.bind(this),this.renderCampaignAdminListDetail=this.renderCampaignAdminListDetail.bind(this),this.isRecordLoaded(e)?this.state={loading:!1,error:!1,errorCode:0}:this.state={loading:!0,error:!1,errorCode:0}}componentDidMount(){const{campaignId:e,itemListViewEndpoint:t,recordActions:a,treeClass:n}=this.props,i=t.url.replace(/:id/,e);this.setBreadcrumbs(),this.isRecordLoaded()||a.fetchRecord(n,"get",i).then((()=>{this.setBreadcrumbs(),this.setState({loading:!1})})).catch((e=>{this.setState({loading:!1,error:!0,errorCode:e.response.status})}))}componentWillUnmount(){this.props.campaignActions.setNewItem(null)}setBreadcrumbs(){const{breadcrumbsActions:e,campaignId:t,record:a,sectionConfig:{reactRoutePath:n}}=this.props;if(!a)return;const i=[{text:C.default._t("CampaignAdmin.CAMPAIGN","Campaigns"),href:(0,b.joinUrlPaths)("/",n)}];i.push({text:a.Name,href:(0,b.joinUrlPaths)("/",n,`set/${t}/show`)}),e.setBreadcrumbs(i)}getSelectedItem(){const{campaign:{changeSetItemId:e}}=this.props,t=this.getItems()||[];let a=null;if(e&&(a=t.find((t=>e===t.ID))),!a){const e=this.groupItemsForSet(),t=Object.keys(e).find((t=>e[t]&&e[t].items.length>0));a=t?e[t].items[0]:null}return a}getMoreActions(){const e=this.getSelectedItem();if(!e)return null;const t=e._links&&e._links.referenced_by,a=t&&t.length||0,i=C.default._t("CampaignAdmin.UNREMOVEABLE_INFO","Required by {number} item(s), and cannot be removed directly.");return["explicitly"===e.Added?n.default.createElement(g.DropdownItem,{key:"remove_action",className:"btn btn-secondary action",onClick:this.handleRemoveItem},C.default._t("CampaignAdmin.REMOVE","Remove")):n.default.createElement(g.DropdownItem,{tag:"p",key:"unremoveable_info",className:"alert alert-info campaign-admin__unremoveable-item"},n.default.createElement("span",{className:"font-icon-link"}),C.default.inject(i,{number:a}))]}getItems(){const{record:e}=this.props;return e&&e._embedded?e._embedded.items:null}getPlaceholderGroups(){const e={},{record:t}=this.props;return t&&t.placeholderGroups&&t.placeholderGroups.forEach((t=>{e[t.baseClass]={...t},e[t.baseClass].items=[...t.items]})),e}groupItemsForSet(){const e=this.getPlaceholderGroups(),t=this.getItems();return t?(t.forEach((t=>{const a=t.BaseClass;e[a]||(e[a]={singular:t.Singular,plural:t.Plural,items:[]}),e[a].items.push(t)})),e):e}isRecordLoaded(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.props;return 0!==Object.keys(e.record).length}handleRemoveItem(){const{campaignId:e,onRemoveCampaignItem:t}=this.props;"function"==typeof t&&t(e,this.getSelectedItem().ID)}handleItemSelected(e,t){this.props.campaignActions.selectChangeSetItem(t)}handleCloseItem(){this.props.campaignActions.selectChangeSetItem(null)}handlePublish(e){const{campaignId:t,campaignActions:{publishCampaign:a},publishApi:n,treeClass:i}=this.props;e.preventDefault();const r=C.default._t("CampaignAdmin.PUBLISH_CAMPAIGN_CONFIRM","Are you sure you want to publish this campaign?");window.confirm(r)&&a(n,i,t)}renderButtonToolbar(){const{ViewModeComponent:e,FormActionComponent:t,record:a,campaign:{isPublishing:i}}=this.props,r=this.getItems(),o=!r||0===r.length;let s=null;return o?s={title:C.default._t("CampaignAdmin.PUBLISHCAMPAIGN","Publish campaign"),buttonStyle:"outline-secondary",icon:"rocket",disabled:!0}:"open"===a.State&&(s={title:C.default._t("CampaignAdmin.PUBLISHCAMPAIGN","Publish campaign"),buttonStyle:"primary",loading:i,onClick:this.handlePublish,icon:"rocket"}),s?n.default.createElement("div",{className:"btn-toolbar"},n.default.createElement(t,s),!o&&n.default.createElement(e,{id:"view-mode-toggle-in-edit-nb",area:"edit"})):null}renderErrorMessage(e){switch(e){case 403:return n.default.createElement("p",null,C.default._t("CampaignAdmin.FORBIDDEN","You do not have access to view this campaign."));case 404:return n.default.createElement("p",null,C.default._t("CampaignAdmin.PAGE_NOT_FOUND","The campaign you are looking for can not be found."));default:return n.default.createElement("p",null,C.default._t("CampaignAdmin.SOMETHING_WENT_WRONG","Something went wrong."))}}renderPreview(e,t){const{PreviewComponent:a,previewState:i}=this.props,{loading:r,error:o,errorCode:s}=this.state;let l=["flexbox-area-grow","fill-height","preview","campaign-admin__campaign-preview","campaign-admin__campaign-preview--empty"];switch(i){case"preview":l.push("preview-only");break;case"edit":return null}if(l=(0,E.default)(l),r)return n.default.createElement("div",{className:l},n.default.createElement("p",null,C.default._t("CampaignAdmin.LOADING","Loading...")));if(o)return n.default.createElement("div",{className:l},this.renderErrorMessage(s));if(!this.getItems()||0===this.getItems().length){const e=C.default._t("CampaignAdmin.SELECTFROMSECTIONS",'Select "Add to Campaign" from pages, files, and other admin sections with content types');return n.default.createElement("div",{className:l},n.default.createElement("h2",{className:"campaign-admin__empty-heading"},C.default._t("CampaignAdmin.GETTINGSTARTED","Getting started")),n.default.createElement("p",{className:"campaign-admin__empty-info"},e))}return n.default.createElement(a,{itemLinks:e,itemId:t,onBack:this.handleCloseItem,moreActions:this.getMoreActions(),className:l})}renderCampaignAdminListDetail(e){const{previewState:t,onBackButtonClick:a,newItem:i}=this.props,r=(0,E.default)("panel","panel--padded","panel--scrollable","flexbox-area-grow"),o=i?n.default.createElement("p",{className:"alert alert-success alert--no-border",role:"alert"},C.default._t("CampaignAdmin.NEWCAMPAIGNSUCCESS","Nice one! You have successfully created a campaign.")):null;if("preview"===t)return null;const s=(0,E.default)("fill-height","campaign-admin__campaign-items",{"fill-height":"edit"===t,"campaign-admin__campaign-items-edit":"edit"===t});return n.default.createElement("div",{className:s,"aria-expanded":"true"},n.default.createElement(p.default,{showBackButton:!0,onBackButtonClick:a},n.default.createElement(h.default,{multiline:!0})),o,n.default.createElement("div",{className:r},e),n.default.createElement("div",{className:"toolbar toolbar--south"},this.renderButtonToolbar()))}render(){const{campaign:{changeSetItemId:e},campaignId:t,record:a}=this.props;let i=e,r=null;const o=i?"":"campaign-admin__campaign--hide-preview",s=this.groupItemsForSet(),l=[],d=this.getSelectedItem(),p=d&&d._links&&d._links.references||[],h=d&&d._links&&d._links.referenced_by||[];Object.keys(s).forEach((e=>{const o=s[e],d=o.items.length,c=[],g=`\n        ${0===d?"":d}\n        ${1===d?o.singular:o.plural}\n      `,C=`Set_${t}_Group_${e}`;o.items.forEach(((e,t)=>{i||(i=e.ID);const o=i===e.ID;o&&e._links&&(r=e._links);const s=(0,E.default)({"list-group-item--inactive":"none"===e.ChangeType||"published"===a.State,active:o});let l=!!p.find((t=>t.ChangeSetItemID===parseInt(e.ID,10)));l=l||h.find((t=>t.ChangeSetItemID===e.ID)),c.push(n.default.createElement(m.default,{key:e.ID||t,className:s,onClick:this.handleItemSelected,onClickArg:e.ID},n.default.createElement(f.default,{item:e,campaign:this.props.record,selected:o,isLinked:l})))}));const _=(0,E.default)("list-group-wrapper",{"list-group-wrapper--empty":0===c.length});l.push(n.default.createElement("div",{className:_,key:C},n.default.createElement(u.default,{groupid:C,title:g},c.length>0?c:n.default.createElement("p",{className:"list-group-item"},o.noItemsText))))}));const g=n.default.createElement(c.default,null,l),C=this.props.loading&&[n.default.createElement("div",{key:"overlay",className:"cms-content-loading-overlay ui-widget-overlay-light"}),n.default.createElement("div",{key:"spinner",className:"cms-content-loading-spinner"})];return n.default.createElement("div",{className:`fill-width campaign-admin__campaign ${o}`},C,this.renderCampaignAdminListDetail(g,r),this.renderPreview(r,i))}}t.Component=w,w.propTypes={campaign:i.default.shape({isPublishing:i.default.bool,changeSetItemId:i.default.number}),publishApi:i.default.func.isRequired,record:i.default.object.isRequired,sectionConfig:i.default.object.isRequired,onBackButtonClick:i.default.func,onRemoveCampaignItem:i.default.func,breadcrumbsActions:i.default.object.isRequired,campaignActions:i.default.object.isRequired,recordActions:i.default.object.isRequired,PreviewComponent:i.default.elementType,ViewModeComponent:i.default.elementType,FormActionComponent:i.default.elementType,previewState:i.default.oneOf(["edit","preview","split"])},w.defaultProps={};var S=(0,r.compose)((0,o.connect)((function(e,t){const a=t.sectionConfig.treeClass,n=parseInt(t.campaignId,10),i=(e.records[a]||[]).find((e=>e.ID===n))||{};return{config:e.config,record:i,campaign:e.campaign,treeClass:a,newItem:e.campaign.newItem}}),(function(e){return{breadcrumbsActions:(0,r.bindActionCreators)(s,e),recordActions:(0,r.bindActionCreators)(l,e),campaignActions:(0,r.bindActionCreators)(d,e)}})),(0,_.inject)(["FormAction","ViewModeToggle","Preview"],((e,t,a)=>({FormActionComponent:e,ViewModeComponent:t,PreviewComponent:a})),(()=>"CampaignAdmin.CampaignAdmin.List")))(w);t.default=S},675:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default={SET_CAMPAIGN_ACTIVE_CHANGESET:"SET_CAMPAIGN_ACTIVE_CHANGESET",SET_CAMPAIGN_SELECTED_CHANGESETITEM:"SET_CAMPAIGN_SELECTED_CHANGESETITEM",PUBLISH_CAMPAIGN_REQUEST:"PUBLISH_CAMPAIGN_REQUEST",PUBLISH_CAMPAIGN_SUCCESS:"PUBLISH_CAMPAIGN_SUCCESS",PUBLISH_CAMPAIGN_FAILURE:"PUBLISH_CAMPAIGN_FAILURE",SET_NEW_CAMPAIGN:"SET_NEW_CAMPAIGN",REMOVE_CAMPAIGN_ITEM_REQUEST:"REMOVE_CAMPAIGN_ITEM_REQUEST",REMOVE_CAMPAIGN_ITEM_SUCCESS:"REMOVE_CAMPAIGN_ITEM_SUCCESS",REMOVE_CAMPAIGN_ITEM_FAILURE:"REMOVE_CAMPAIGN_ITEM_FAILURE",SET_SHOW_MESSAGE:"SET_SHOW_MESSAGE"}},466:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.publishCampaign=function(e,t,a){return s=>{s({type:n.default.PUBLISH_CAMPAIGN_REQUEST,payload:{campaignId:a}}),e({id:a}).then((e=>{s({type:n.default.PUBLISH_CAMPAIGN_SUCCESS,payload:{campaignId:a}}),s({type:i.default.FETCH_RECORD_SUCCESS,payload:{recordType:t,data:e}});const l=o.default._t("CampaignAdmin.PUBLISH_SUCCESS",'Published "%s" successfully.');s(r.success(o.default.sprintf(l,e.Name)))})).catch((e=>{s({type:n.default.PUBLISH_CAMPAIGN_FAILURE,payload:{error:e}});const t="string"==typeof e?e:o.default._t("CampaignAdmin.PUBLISH_FAIL","Campaign could not be published.");s(r.error(t))}))}},t.removeCampaignItem=function(e,t,a){return i=>(i({type:n.default.REMOVE_CAMPAIGN_ITEM_REQUEST,payload:{campaignId:t,itemId:a}}),e({id:t,itemId:a}).then((()=>{i({type:n.default.REMOVE_CAMPAIGN_ITEM_SUCCESS,payload:{campaignId:t,itemId:a}})})).catch((e=>{i({type:n.default.REMOVE_CAMPAIGN_ITEM_FAILURE,payload:{error:e}})})))},t.selectChangeSetItem=function(e){return{type:n.default.SET_CAMPAIGN_SELECTED_CHANGESETITEM,payload:{changeSetItemId:e}}},t.setNewItem=function(e){return{type:n.default.SET_NEW_CAMPAIGN,payload:{newItem:e}}},t.setShowMessage=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.localStorage;return t.setItem("campaign.showMessage",e),{type:n.default.SET_SHOW_MESSAGE,payload:{show:e}}},t.showCampaignView=function(e,t){return a=>{a({type:n.default.SET_CAMPAIGN_ACTIVE_CHANGESET,payload:{campaignId:e,view:t}})}};var n=l(a(675)),i=l(a(852)),r=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var a=s(t);if(a&&a.has(e))return a.get(e);var n={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if("default"!==r&&Object.prototype.hasOwnProperty.call(e,r)){var o=i?Object.getOwnPropertyDescriptor(e,r):null;o&&(o.get||o.set)?Object.defineProperty(n,r,o):n[r]=e[r]}n.default=e,a&&a.set(e,n);return n}(a(123)),o=l(a(754));function s(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(s=function(e){return e?a:t})(e)}function l(e){return e&&e.__esModule?e:{default:e}}},277:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(752)),i=r(a(675));function r(e){return e&&e.__esModule?e:{default:e}}const o=window.localStorage.getItem("campaign.showMessage"),s=(0,n.default)({campaignId:null,changeSetItemId:null,isPublishing:!1,view:null,newItem:null,showMessage:null===o});var l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case i.default.SET_CAMPAIGN_SELECTED_CHANGESETITEM:return(0,n.default)(Object.assign({},e,{changeSetItemId:t.payload.changeSetItemId}));case i.default.SET_CAMPAIGN_ACTIVE_CHANGESET:return(0,n.default)(Object.assign({},e,{campaignId:t.payload.campaignId,view:t.payload.view,changeSetItemId:null}));case i.default.PUBLISH_CAMPAIGN_REQUEST:return(0,n.default)(Object.assign({},e,{isPublishing:!0}));case i.default.PUBLISH_CAMPAIGN_SUCCESS:case i.default.PUBLISH_CAMPAIGN_FAILURE:return(0,n.default)(Object.assign({},e,{isPublishing:!1}));case i.default.SET_NEW_CAMPAIGN:return(0,n.default)({...e,newItem:t.payload.newItem});case i.default.SET_SHOW_MESSAGE:return(0,n.default)({...e,showMessage:t.payload.show});default:return e}};t.default=l},430:function(e){e.exports=Accordion},942:function(e){e.exports=AccordionBlock},159:function(e){e.exports=Backend},803:function(e){e.exports=Breadcrumb},674:function(e){e.exports=BreadcrumbsActions},510:function(e){e.exports=Config},752:function(e){e.exports=DeepFreezeStrict},13:function(e){e.exports=FormAction},238:function(e){e.exports=FormBuilderLoader},648:function(e){e.exports=Injector},962:function(e){e.exports=ListGroupItem},86:function(e){e.exports=PropTypes},363:function(e){e.exports=React},624:function(e){e.exports=ReactRedux},873:function(e){e.exports=ReactRouteRegister},127:function(e){e.exports=Reactstrap},852:function(e){e.exports=RecordsActionTypes},826:function(e){e.exports=RecordsActions},827:function(e){e.exports=Redux},762:function(e){e.exports=ReduxForm},104:function(e){e.exports=ResizeAware},123:function(e){e.exports=ToastsActions},71:function(e){e.exports=Toolbar},108:function(e){e.exports=ViewModeActions},820:function(e){e.exports=classnames},742:function(e){e.exports=formatWrittenNumber},720:function(e){e.exports=getFormState},754:function(e){e.exports=i18n},845:function(e){e.exports=ssUrlLib},432:function(e){e.exports=withRouter}},t={};function a(n){var i=t[n];if(void 0!==i)return i.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,a),r.exports}a(274)}();