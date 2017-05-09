!function(e){function t(a){if(n[a])return n[a].exports
var r=n[a]={exports:{},id:a,loaded:!1}
return e[a].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={}
return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict"
n(1)},function(e,t,n){"use strict"
function a(e){return e&&e.__esModule?e:{default:e}}var r=n(2),i=n(3),o=a(i),l=n(4),s=a(l),u=n(5),c=a(u),p=n(6),d=a(p),f=n(28),m=a(f)
document.addEventListener("DOMContentLoaded",function(){var e=o.default.getSection("SilverStripe\\CampaignAdmin\\CampaignAdmin")
c.default.add({path:e.url,component:(0,r.withRouter)(d.default),childRoutes:[{path:":type/:id/:view",component:d.default},{path:"set/:id/:view",component:d.default}]}),s.default.add("campaign",m.default)

})},function(e,t){e.exports=ReactRouter},function(e,t){e.exports=Config},function(e,t){e.exports=ReducerRegister},function(e,t){e.exports=ReactRouteRegister},function(e,t,n){"use strict"
function a(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])
return t.default=e,t}function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")


return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{config:e.config,
campaignId:e.campaign.campaignId,view:e.campaign.view,breadcrumbs:e.breadcrumbs,sectionConfig:e.config.sections.find(function(e){return e.name===R}),securityId:e.config.SecurityID}}function u(e){return{
breadcrumbsActions:(0,h.bindActionCreators)(v,e)}}Object.defineProperty(t,"__esModule",{value:!0})
var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},p=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n]
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),d=n(7),f=r(d),m=n(8),h=n(9),g=n(2),b=n(10),y=r(b),C=n(11),v=a(C),_=n(12),E=r(_),A=n(13),I=r(A),P=n(14),S=r(P),k=n(15),T=r(k),w=n(16),N=r(w),B=n(17),O=r(B),M=n(18),j=r(M),R="SilverStripe\\CampaignAdmin\\CampaignAdmin",x=function(e){
function t(e){i(this,t)
var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return n.publishApi=y.default.createEndpointFetcher({url:n.props.sectionConfig.publishEndpoint.url,method:n.props.sectionConfig.publishEndpoint.method,defaultData:{SecurityID:n.props.securityId},payloadSchema:{
id:{urlReplacement:":id",remove:!0}}}),n.handleBackButtonClick=n.handleBackButtonClick.bind(n),n.handleCreateCampaignSubmit=n.handleCreateCampaignSubmit.bind(n),n.handleFormAction=n.handleFormAction.bind(n),
n}return l(t,e),p(t,[{key:"componentWillMount",value:function e(){0===this.props.breadcrumbs.length&&this.setBreadcrumbs(this.props.params.view,this.props.params.id)}},{key:"componentWillReceiveProps",
value:function e(t){var n=this.props.params.id!==t.params.id||this.props.params.view!==t.params.view
n&&this.setBreadcrumbs(t.params.view,t.params.id)}},{key:"setBreadcrumbs",value:function e(t,n){var a=[{text:T.default._t("CampaignAdmin.CAMPAIGN","Campaigns"),href:this.props.sectionConfig.url}]
switch(t){case"show":break
case"edit":a.push({text:T.default._t("CampaignAdmin.EDIT_CAMPAIGN","Editing Campaign"),href:this.getActionRoute(n,t)})
break
case"create":a.push({text:T.default._t("CampaignAdmin.ADD_CAMPAIGN","Add Campaign"),href:this.getActionRoute(n,t)})}this.props.breadcrumbsActions.setBreadcrumbs(a)}},{key:"handleBackButtonClick",value:function e(t){
if(this.props.breadcrumbs.length>1){var n=this.props.breadcrumbs[this.props.breadcrumbs.length-2]
n&&n.href&&(t.preventDefault(),this.props.router.push(n.href))}}},{key:"handleCreateCampaignSubmit",value:function e(t,n,a){var r=this,i=a()
if(!i)throw new Error("Promise was not returned for submitting")
return i.then(function(e){if("action_save"===n){var t=r.props.sectionConfig.url,a=e.record.id
r.props.router.push(t+"/set/"+a+"/edit")}return e})}},{key:"handleFormAction",value:function e(t){var n=t.currentTarget.name
if("action_cancel"===n){var a=this.props.sectionConfig.url
this.props.router.push(a),t.preventDefault()}}},{key:"render",value:function e(){var t=null
switch(this.props.params.view){case"show":t=this.renderItemListView()
break
case"edit":t=this.renderDetailEditView()
break
case"create":t=this.renderCreateView()
break
default:t=this.renderIndexView()}return t}},{key:"renderIndexView",value:function e(){var t=this.props.sectionConfig.form.EditForm.schemaUrl,n={title:T.default._t("CampaignAdmin.ADDCAMPAIGN"),icon:"plus",
handleClick:this.addCampaign.bind(this)},a={createFn:this.campaignListCreateFn.bind(this),schemaUrl:t}
return f.default.createElement("div",{className:"fill-height","aria-expanded":"true"},f.default.createElement(N.default,null,f.default.createElement(E.default,{multiline:!0})),f.default.createElement("div",{
className:"panel panel--padded panel--scrollable flexbox-area-grow"},f.default.createElement("div",{className:"toolbar toolbar--content"},f.default.createElement("div",{className:"btn-toolbar"},f.default.createElement(S.default,n))),f.default.createElement(O.default,a)))

}},{key:"renderItemListView",value:function e(){var t={sectionConfig:this.props.sectionConfig,campaignId:this.props.params.id,itemListViewEndpoint:this.props.sectionConfig.itemListViewEndpoint,publishApi:this.publishApi,
handleBackButtonClick:this.handleBackButtonClick.bind(this)}
return f.default.createElement(j.default,t)}},{key:"renderDetailEditView",value:function e(){if(this.props.params.id<=0)return this.renderCreateView()
var t=this.props.sectionConfig.form.campaignEditForm.schemaUrl,n=t+"/"+this.props.params.id
return f.default.createElement("div",{className:"fill-height"},f.default.createElement(N.default,{showBackButton:!0,handleBackButtonClick:this.handleBackButtonClick},f.default.createElement(E.default,{
multiline:!0})),f.default.createElement("div",{className:"panel panel--padded panel--scrollable flexbox-area-grow form--inline"},f.default.createElement(O.default,{handleAction:this.handleFormAction,schemaUrl:n
})))}},{key:"renderCreateView",value:function e(){var t=this.props.sectionConfig.form.campaignCreateForm.schemaUrl
return f.default.createElement("div",{className:"fill-height"},f.default.createElement(N.default,{showBackButton:!0,handleBackButtonClick:this.handleBackButtonClick},f.default.createElement(E.default,{
multiline:!0})),f.default.createElement("div",{className:"panel panel--padded panel--scrollable flexbox-area-grow form--inline"},f.default.createElement(O.default,{handleSubmit:this.handleCreateCampaignSubmit,
handleAction:this.handleFormAction,schemaUrl:t})))}},{key:"campaignEditCreateFn",value:function e(t,n){var a=this,r=this.props.sectionConfig.url
if("action_cancel"===n.name){var i=c({},n,{handleClick:function e(t){t.preventDefault(),a.props.router.push(r)}})
return f.default.createElement(t,c({key:n.id},i))}return f.default.createElement(t,c({key:n.id},n))}},{key:"campaignAddCreateFn",value:function e(t,n){var a=this,r=this.props.sectionConfig.url
if("action_cancel"===n.name){var i=c({},n,{handleClick:function e(t){t.preventDefault(),a.props.router.push(r)}})
return f.default.createElement(t,c({key:n.name},i))}return f.default.createElement(t,c({key:n.name},n))}},{key:"campaignListCreateFn",value:function e(t,n){var a=this,r=this.props.sectionConfig.url,i="set"


if("GridField"===n.schemaComponent){var o=c({},n,{data:c({},n.data,{handleDrillDown:function e(t,n){a.props.router.push(r+"/"+i+"/"+n.ID+"/show")},handleEditRecord:function e(t,n){a.props.router.push(r+"/"+i+"/"+n+"/edit")

}})})
return f.default.createElement(t,c({key:o.name},o))}return f.default.createElement(t,c({key:n.name},n))}},{key:"addCampaign",value:function e(){var t=this.getActionRoute(0,"create")
this.props.router.push(t)}},{key:"getActionRoute",value:function e(t,n){return this.props.sectionConfig.url+"/set/"+t+"/"+n}}]),t}(I.default)
x.propTypes={breadcrumbsActions:f.default.PropTypes.object.isRequired,campaignId:f.default.PropTypes.string,sectionConfig:f.default.PropTypes.shape({publishEndpoint:f.default.PropTypes.shape({url:f.default.PropTypes.string,
method:f.default.PropTypes.string}),form:f.default.PropTypes.shape({EditForm:f.default.PropTypes.shape({schemaUrl:f.default.PropTypes.string}),campaignEditForm:f.default.PropTypes.shape({schemaUrl:f.default.PropTypes.string
}),campaignCreateForm:f.default.PropTypes.shape({schemaUrl:f.default.PropTypes.string})})}),securityId:f.default.PropTypes.string.isRequired,view:f.default.PropTypes.string},t.default=(0,g.withRouter)((0,
m.connect)(s,u)(x))},function(e,t){e.exports=React},function(e,t){e.exports=ReactRedux},function(e,t){e.exports=Redux},function(e,t){e.exports=Backend},function(e,t){e.exports=BreadcrumbsActions},function(e,t){
e.exports=Breadcrumb},function(e,t){e.exports=SilverStripeComponent},function(e,t){e.exports=FormAction},function(e,t){e.exports=i18n},function(e,t){e.exports=Toolbar},function(e,t){e.exports=FormBuilderLoader

},function(e,t,n){"use strict"
function a(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])
return t.default=e,t}function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")


return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e,t){var n=null,a=t.sectionConfig.treeClass


return e.records&&e.records[a]&&t.campaignId&&(n=e.records[a][parseInt(t.campaignId,10)]),{config:e.config,record:n||{},campaign:e.campaign,treeClass:a}}function u(e){return{breadcrumbsActions:(0,h.bindActionCreators)(y,e),
recordActions:(0,h.bindActionCreators)(v,e),campaignActions:(0,h.bindActionCreators)(E,e)}}Object.defineProperty(t,"__esModule",{value:!0})
var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},p=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n]
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),d=function e(t,n,a){null===t&&(t=Function.prototype)


var r=Object.getOwnPropertyDescriptor(t,n)
if(void 0===r){var i=Object.getPrototypeOf(t)
return null===i?void 0:e(i,n,a)}if("value"in r)return r.value
var o=r.get
if(void 0!==o)return o.call(a)},f=n(7),m=r(f),h=n(9),g=n(8),b=n(11),y=a(b),C=n(19),v=a(C),_=n(20),E=a(_),A=n(13),I=r(A),P=n(23),S=r(P),k=n(24),T=r(k),w=n(25),N=r(w),B=n(16),O=r(B),M=n(14),j=r(M),R=n(26),x=r(R),G=n(12),D=r(G),U=n(27),L=r(U),F=n(15),H=r(F),V="SilverStripe\\CMS\\Controllers\\CMSPagesController",q=function(e){
function t(e){i(this,t)
var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return n.handlePublish=n.handlePublish.bind(n),n.handleItemSelected=n.handleItemSelected.bind(n),n.setBreadcrumbs=n.setBreadcrumbs.bind(n),n.handleCloseItem=n.handleCloseItem.bind(n),n}return l(t,e),p(t,[{
key:"componentDidMount",value:function e(){var n=this.props.itemListViewEndpoint.url.replace(/:id/,this.props.campaignId)
d(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"componentDidMount",this).call(this),this.setBreadcrumbs(),Object.keys(this.props.record).length||this.props.recordActions.fetchRecord(this.props.treeClass,"get",n).then(this.setBreadcrumbs)

}},{key:"setBreadcrumbs",value:function e(){if(this.props.record){var t=[{text:H.default._t("CampaignAdmin.CAMPAIGN","Campaigns"),href:this.props.sectionConfig.url}]
t.push({text:this.props.record.Name,href:this.props.sectionConfig.url+"/set/"+this.props.campaignId+"/show"}),this.props.breadcrumbsActions.setBreadcrumbs(t)}}},{key:"render",value:function e(){var t=this,n=this.props.campaign.changeSetItemId,a=null,r=n?"":"campaign-admin__campaign--hide-preview",i=this.props.campaignId,o=this.props.record,l=this.groupItemsForSet(),s=[]


Object.keys(l).forEach(function(e){var r=l[e],u=r.items.length,c=[],p=u+" "+(1===u?r.singular:r.plural),d="Set_"+i+"_Group_"+e
r.items.forEach(function(e){n||(n=e.ID)
var r=n===e.ID
r&&e._links&&(a=e._links)
var i=[]
"none"!==e.ChangeType&&"published"!==o.State||i.push("list-group-item--inactive"),r&&i.push("active"),c.push(m.default.createElement(N.default,{key:e.ID,className:i.join(" "),handleClick:t.handleItemSelected,
handleClickArg:e.ID},m.default.createElement(x.default,{item:e,campaign:t.props.record})))}),s.push(m.default.createElement(T.default,{key:d,groupid:d,title:p},c))})
var u=[this.props.config.absoluteBaseUrl,this.props.config.sections.find(function(e){return e.name===V}).url].join(""),c=s.length?m.default.createElement(S.default,null,s):m.default.createElement("div",{
className:"alert alert-warning",role:"alert"},m.default.createElement("strong",null,"This campaign is empty.")," You can add items to a campaign by selecting ",m.default.createElement("em",null,"Add to campaign")," from within the ",m.default.createElement("em",null,"More Options "),"popup on ",m.default.createElement("a",{
href:u},"pages")," and files."),p=["panel","panel--padded","panel--scrollable","flexbox-area-grow"]
return m.default.createElement("div",{className:"fill-width campaign-admin__campaign "+r},m.default.createElement("div",{className:"fill-height campaign-admin__campaign-items","aria-expanded":"true"},m.default.createElement(O.default,{
showBackButton:!0,handleBackButtonClick:this.props.handleBackButtonClick},m.default.createElement(D.default,{multiline:!0})),m.default.createElement("div",{className:p.join(" ")},c),m.default.createElement("div",{
className:"toolbar toolbar--south"},this.renderButtonToolbar())),m.default.createElement(L.default,{itemLinks:a,itemId:n,onBack:this.handleCloseItem}))}},{key:"handleItemSelected",value:function e(t,n){
this.props.campaignActions.selectChangeSetItem(n)}},{key:"handleCloseItem",value:function e(){this.props.campaignActions.selectChangeSetItem(null)}},{key:"renderButtonToolbar",value:function e(){var t=this.getItems()


if(!t||!t.length)return m.default.createElement("div",{className:"btn-toolbar"})
var n={}
return"open"===this.props.record.State?n=c(n,{title:H.default._t("CampaignAdmin.PUBLISHCAMPAIGN"),buttonStyle:"primary",loading:this.props.campaign.isPublishing,handleClick:this.handlePublish,icon:"rocket"
}):"published"===this.props.record.State&&(n=c(n,{title:H.default._t("CampaignAdmin.REVERTCAMPAIGN"),buttonStyle:"secondary-outline",icon:"back-in-time",disabled:!0})),m.default.createElement("div",{className:"btn-toolbar"
},m.default.createElement(j.default,n))}},{key:"getItems",value:function e(){return this.props.record&&this.props.record._embedded?this.props.record._embedded.items:null}},{key:"groupItemsForSet",value:function e(){
var t={},n=this.getItems()
return n?(n.forEach(function(e){var n=e.BaseClass
t[n]||(t[n]={singular:e.Singular,plural:e.Plural,items:[]}),t[n].items.push(e)}),t):t}},{key:"handlePublish",value:function e(t){t.preventDefault(),this.props.campaignActions.publishCampaign(this.props.publishApi,this.props.treeClass,this.props.campaignId)

}}]),t}(I.default)
q.propTypes={campaign:m.default.PropTypes.shape({isPublishing:m.default.PropTypes.bool.isRequired,changeSetItemId:m.default.PropTypes.number}),breadcrumbsActions:m.default.PropTypes.object.isRequired,campaignActions:m.default.PropTypes.object.isRequired,
publishApi:m.default.PropTypes.func.isRequired,record:m.default.PropTypes.object.isRequired,recordActions:m.default.PropTypes.object.isRequired,sectionConfig:m.default.PropTypes.object.isRequired,handleBackButtonClick:m.default.PropTypes.func
},t.default=(0,g.connect)(s,u)(q)},function(e,t){e.exports=RecordsActions},function(e,t,n){"use strict"
function a(e){return e&&e.__esModule?e:{default:e}}function r(e){return{type:s.default.SET_CAMPAIGN_SELECTED_CHANGESETITEM,payload:{changeSetItemId:e}}}function i(e,t){return function(n){n({type:s.default.SET_CAMPAIGN_ACTIVE_CHANGESET,
payload:{campaignId:e,view:t}})}}function o(e,t,n){return function(a){a({type:s.default.PUBLISH_CAMPAIGN_REQUEST,payload:{campaignId:n}}),e({id:n}).then(function(e){a({type:s.default.PUBLISH_CAMPAIGN_SUCCESS,
payload:{campaignId:n}}),a({type:c.default.FETCH_RECORD_SUCCESS,payload:{recordType:t,data:e}})}).catch(function(e){a({type:s.default.PUBLISH_CAMPAIGN_FAILURE,payload:{error:e}})})}}Object.defineProperty(t,"__esModule",{
value:!0}),t.selectChangeSetItem=r,t.showCampaignView=i,t.publishCampaign=o
var l=n(21),s=a(l),u=n(22),c=a(u)},function(e,t){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.default={SET_CAMPAIGN_ACTIVE_CHANGESET:"SET_CAMPAIGN_ACTIVE_CHANGESET",SET_CAMPAIGN_SELECTED_CHANGESETITEM:"SET_CAMPAIGN_SELECTED_CHANGESETITEM",PUBLISH_CAMPAIGN_REQUEST:"PUBLISH_CAMPAIGN_REQUEST",
PUBLISH_CAMPAIGN_SUCCESS:"PUBLISH_CAMPAIGN_SUCCESS",PUBLISH_CAMPAIGN_FAILURE:"PUBLISH_CAMPAIGN_FAILURE"}},function(e,t){e.exports=RecordsActionTypes},function(e,t){e.exports=Accordion},function(e,t){e.exports=AccordionBlock

},function(e,t){e.exports=ListGroupItem},function(e,t,n){"use strict"
function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")


return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{
value:!0})
var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n]
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),s=n(7),u=a(s),c=n(13),p=a(c),d=n(15),f=a(d),m=function(e){
function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),l(t,[{key:"render",value:function e(){var t=null,n={},a=this.props.item,r=this.props.campaign


if("open"===r.State)switch(a.ChangeType){case"created":n.className="label label-warning list-group-item__status",n.Title=f.default._t("CampaignAdmin.DRAFT","Draft")
break
case"modified":n.className="label label-warning list-group-item__status",n.Title=f.default._t("CampaignAdmin.MODIFIED","Modified")
break
case"deleted":n.className="label label-error list-group-item__status",n.Title=f.default._t("CampaignAdmin.REMOVED","Removed")
break
case"none":default:n.className="label label-success list-group-item__status",n.Title=f.default._t("CampaignAdmin.NO_CHANGES","No changes")}var i=u.default.createElement("span",{className:"list-group-item__info campaign-admin__item-links--has-links font-icon-link"
},"3 linked items")
return a.Thumbnail&&(t=u.default.createElement("span",{className:"list-group-item__thumbnail"},u.default.createElement("img",{alt:a.Title,src:a.Thumbnail}))),u.default.createElement("div",{className:"fill-width"
},t,u.default.createElement("div",{className:"list-group-item__details"},u.default.createElement("h4",{className:"list-group-item__heading"},a.Title),u.default.createElement("span",{className:"list-group-item__info campaign-admin__item-links--is-linked font-icon-link"
}),i,n.className&&n.Title&&u.default.createElement("span",{className:n.className},n.Title)))}}]),t}(p.default)
m.propTypes={campaign:u.default.PropTypes.object.isRequired,item:u.default.PropTypes.object.isRequired},t.default=m},function(e,t){e.exports=Preview},function(e,t,n){"use strict"
function a(e){return e&&e.__esModule?e:{default:e}}function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c,t=arguments[1]
switch(t.type){case u.default.SET_CAMPAIGN_SELECTED_CHANGESETITEM:return(0,l.default)(i({},e,{changeSetItemId:t.payload.changeSetItemId}))
case u.default.SET_CAMPAIGN_ACTIVE_CHANGESET:return(0,l.default)(i({},e,{campaignId:t.payload.campaignId,view:t.payload.view,changeSetItemId:null}))
case u.default.PUBLISH_CAMPAIGN_REQUEST:return(0,l.default)(i({},e,{isPublishing:!0}))
case u.default.PUBLISH_CAMPAIGN_SUCCESS:case u.default.PUBLISH_CAMPAIGN_FAILURE:return(0,l.default)(i({},e,{isPublishing:!1}))
default:return e}}Object.defineProperty(t,"__esModule",{value:!0})
var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o=n(29),l=a(o),s=n(21),u=a(s),c=(0,l.default)({campaignId:null,changeSetItemId:null,isPublishing:!1,view:null})
t.default=r},function(e,t){e.exports=function e(t){Object.freeze(t)
var n="function"==typeof t,a=Object.prototype.hasOwnProperty
return Object.getOwnPropertyNames(t).forEach(function(r){!a.call(t,r)||n&&("caller"===r||"callee"===r||"arguments"===r)||null===t[r]||"object"!=typeof t[r]&&"function"!=typeof t[r]||Object.isFrozen(t[r])||e(t[r])

}),t}}])
