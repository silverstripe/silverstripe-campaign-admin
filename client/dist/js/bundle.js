!function(e){function t(n){if(a[n])return a[n].exports
var r=a[n]={exports:{},id:n,loaded:!1}
return e[n].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var a={}
return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){"use strict"
a(1)},function(e,t,a){"use strict"
function n(e){return e&&e.__esModule?e:{default:e}}var r=a(2),i=a(3),o=n(i),l=a(4),s=n(l),u=a(5),c=n(u),p=a(6),d=n(p),f=a(28),m=n(f)
document.addEventListener("DOMContentLoaded",function(){var e=o.default.getSection("SilverStripe\\CampaignAdmin\\CampaignAdmin")
c.default.add({path:e.url,component:(0,r.withRouter)(d.default),childRoutes:[{path:":type/:id/:view",component:d.default},{path:"set/:id/:view",component:d.default}]}),s.default.add("campaign",m.default)

})},function(e,t){e.exports=ReactRouter},function(e,t){e.exports=Config},function(e,t){e.exports=ReducerRegister},function(e,t){e.exports=ReactRouteRegister},function(e,t,a){"use strict"
function n(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])
return t.default=e,t}function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")


return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{config:e.config,
campaignId:e.campaign.campaignId,view:e.campaign.view,breadcrumbs:e.breadcrumbs,sectionConfig:e.config.sections["SilverStripe\\CampaignAdmin\\CampaignAdmin"],securityId:e.config.SecurityID}}function u(e){
return{breadcrumbsActions:(0,h.bindActionCreators)(v,e)}}Object.defineProperty(t,"__esModule",{value:!0})
var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},p=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),d=a(7),f=r(d),m=a(8),h=a(9),b=a(2),g=a(10),y=r(g),_=a(11),v=n(_),C=a(12),E=r(C),I=a(13),A=r(I),P=a(14),S=r(P),k=a(15),w=r(k),T=a(16),N=r(T),B=a(17),O=r(B),M=a(18),j=r(M),R=function(e){
function t(e){i(this,t)
var a=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return a.publishApi=y.default.createEndpointFetcher({url:a.props.sectionConfig.publishEndpoint.url,method:a.props.sectionConfig.publishEndpoint.method,defaultData:{SecurityID:a.props.securityId},payloadSchema:{
id:{urlReplacement:":id",remove:!0}}}),a.handleBackButtonClick=a.handleBackButtonClick.bind(a),a}return l(t,e),p(t,[{key:"componentWillMount",value:function e(){0===this.props.breadcrumbs.length&&this.setBreadcrumbs(this.props.params.view,this.props.params.id)

}},{key:"componentWillReceiveProps",value:function e(t){var a=this.props.params.id!==t.params.id||this.props.params.view!==t.params.view
a&&this.setBreadcrumbs(t.params.view,t.params.id)}},{key:"setBreadcrumbs",value:function e(t,a){var n=[{text:w.default._t("Campaigns.CAMPAIGN","Campaigns"),href:this.props.sectionConfig.url}]
switch(t){case"show":break
case"edit":n.push({text:w.default._t("Campaigns.EDIT_CAMPAIGN","Editing Campaign"),href:this.getActionRoute(a,t)})
break
case"create":n.push({text:w.default._t("Campaigns.ADD_CAMPAIGN","Add Campaign"),href:this.getActionRoute(a,t)})}this.props.breadcrumbsActions.setBreadcrumbs(n)}},{key:"handleBackButtonClick",value:function e(t){
if(this.props.breadcrumbs.length>1){var a=this.props.breadcrumbs[this.props.breadcrumbs.length-2]
a&&a.href&&(t.preventDefault(),this.props.router.push(a.href))}}},{key:"render",value:function e(){var t=null
switch(this.props.params.view){case"show":t=this.renderItemListView()
break
case"edit":t=this.renderDetailEditView()
break
case"create":t=this.renderCreateView()
break
default:t=this.renderIndexView()}return t}},{key:"renderIndexView",value:function e(){var t=this.props.sectionConfig.form.EditForm.schemaUrl,a={title:w.default._t("Campaigns.ADDCAMPAIGN"),icon:"plus",handleClick:this.addCampaign.bind(this)
},n={createFn:this.campaignListCreateFn.bind(this),schemaUrl:t}
return f.default.createElement("div",{className:"fill-height","aria-expanded":"true"},f.default.createElement(N.default,null,f.default.createElement(E.default,{multiline:!0})),f.default.createElement("div",{
className:"panel panel--padded panel--scrollable flexbox-area-grow"},f.default.createElement("div",{className:"toolbar toolbar--content"},f.default.createElement("div",{className:"btn-toolbar"},f.default.createElement(S.default,a))),f.default.createElement(O.default,n)))

}},{key:"renderItemListView",value:function e(){var t={sectionConfig:this.props.sectionConfig,campaignId:this.props.params.id,itemListViewEndpoint:this.props.sectionConfig.itemListViewEndpoint,publishApi:this.publishApi,
handleBackButtonClick:this.handleBackButtonClick.bind(this)}
return f.default.createElement(j.default,t)}},{key:"renderDetailEditView",value:function e(){var t=this.props.sectionConfig.form.DetailEditForm.schemaUrl,a=t
this.props.params.id>0&&(a=t+"/"+this.props.params.id)
var n={createFn:this.campaignEditCreateFn.bind(this),schemaUrl:a}
return f.default.createElement("div",{className:"fill-height"},f.default.createElement(N.default,{showBackButton:!0,handleBackButtonClick:this.handleBackButtonClick},f.default.createElement(E.default,{
multiline:!0})),f.default.createElement("div",{className:"panel panel--padded panel--scrollable flexbox-area-grow form--inline"},f.default.createElement(O.default,n)))}},{key:"renderCreateView",value:function e(){
var t=this.props.sectionConfig.form.DetailEditForm.schemaUrl,a=t
this.props.params.id>0&&(a=t+"/"+this.props.params.id)
var n={createFn:this.campaignAddCreateFn.bind(this),schemaUrl:a}
return f.default.createElement("div",{className:"fill-height"},f.default.createElement(N.default,{showBackButton:!0,handleBackButtonClick:this.handleBackButtonClick},f.default.createElement(E.default,{
multiline:!0})),f.default.createElement("div",{className:"panel panel--padded panel--scrollable flexbox-area-grow form--inline"},f.default.createElement(O.default,n)))}},{key:"campaignEditCreateFn",value:function e(t,a){
var n=this,r=this.props.sectionConfig.url
if("action_cancel"===a.name){var i=c({},a,{handleClick:function e(t){t.preventDefault(),n.props.router.push(r)}})
return f.default.createElement(t,c({key:a.id},i))}return f.default.createElement(t,c({key:a.id},a))}},{key:"campaignAddCreateFn",value:function e(t,a){var n=this,r=this.props.sectionConfig.url
if("action_cancel"===a.name){var i=c({},a,{handleClick:function e(t){t.preventDefault(),n.props.router.push(r)}})
return f.default.createElement(t,c({key:a.name},i))}return f.default.createElement(t,c({key:a.name},a))}},{key:"campaignListCreateFn",value:function e(t,a){var n=this,r=this.props.sectionConfig.url,i="set"


if("GridField"===a.schemaComponent){var o=c({},a,{data:c({},a.data,{handleDrillDown:function e(t,a){n.props.router.push(r+"/"+i+"/"+a.ID+"/show")},handleEditRecord:function e(t,a){n.props.router.push(r+"/"+i+"/"+a+"/edit")

}})})
return f.default.createElement(t,c({key:o.name},o))}return f.default.createElement(t,c({key:a.name},a))}},{key:"addCampaign",value:function e(){var t=this.getActionRoute(0,"create")
this.props.router.push(t)}},{key:"getActionRoute",value:function e(t,a){return this.props.sectionConfig.url+"/set/"+t+"/"+a}}]),t}(A.default)
R.propTypes={breadcrumbsActions:f.default.PropTypes.object.isRequired,campaignId:f.default.PropTypes.string,sectionConfig:f.default.PropTypes.object.isRequired,securityId:f.default.PropTypes.string.isRequired,
view:f.default.PropTypes.string},t.default=(0,b.withRouter)((0,m.connect)(s,u)(R))},function(e,t){e.exports=React},function(e,t){e.exports=ReactRedux},function(e,t){e.exports=Redux},function(e,t){e.exports=Backend

},function(e,t){e.exports=BreadcrumbsActions},function(e,t){e.exports=Breadcrumb},function(e,t){e.exports=SilverStripeComponent},function(e,t){e.exports=FormAction},function(e,t){e.exports=i18n},function(e,t){
e.exports=Toolbar},function(e,t){e.exports=FormBuilderLoader},function(e,t,a){"use strict"
function n(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])
return t.default=e,t}function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")


return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e,t){var a=null,n=t.sectionConfig.treeClass


return e.records&&e.records[n]&&t.campaignId&&(a=e.records[n][parseInt(t.campaignId,10)]),{config:e.config,record:a||{},campaign:e.campaign,treeClass:n}}function u(e){return{breadcrumbsActions:(0,h.bindActionCreators)(y,e),
recordActions:(0,h.bindActionCreators)(v,e),campaignActions:(0,h.bindActionCreators)(E,e)}}Object.defineProperty(t,"__esModule",{value:!0})
var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},p=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),d=function e(t,a,n){null===t&&(t=Function.prototype)


var r=Object.getOwnPropertyDescriptor(t,a)
if(void 0===r){var i=Object.getPrototypeOf(t)
return null===i?void 0:e(i,a,n)}if("value"in r)return r.value
var o=r.get
if(void 0!==o)return o.call(n)},f=a(7),m=r(f),h=a(9),b=a(8),g=a(11),y=n(g),_=a(19),v=n(_),C=a(20),E=n(C),I=a(13),A=r(I),P=a(23),S=r(P),k=a(24),w=r(k),T=a(25),N=r(T),B=a(16),O=r(B),M=a(14),j=r(M),R=a(26),x=r(R),G=a(12),D=r(G),L=a(27),U=r(L),F=a(15),H=r(F),V=function(e){
function t(e){i(this,t)
var a=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return a.handlePublish=a.handlePublish.bind(a),a.handleItemSelected=a.handleItemSelected.bind(a),a.setBreadcrumbs=a.setBreadcrumbs.bind(a),a.handleCloseItem=a.handleCloseItem.bind(a),a}return l(t,e),p(t,[{
key:"componentDidMount",value:function e(){var a=this.props.itemListViewEndpoint.url.replace(/:id/,this.props.campaignId)
d(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"componentDidMount",this).call(this),this.setBreadcrumbs(),Object.keys(this.props.record).length||this.props.recordActions.fetchRecord(this.props.treeClass,"get",a).then(this.setBreadcrumbs)

}},{key:"setBreadcrumbs",value:function e(){if(this.props.record){var t=[{text:H.default._t("Campaigns.CAMPAIGN","Campaigns"),href:this.props.sectionConfig.url}]
t.push({text:this.props.record.Name,href:this.props.sectionConfig.url+"/set/"+this.props.campaignId+"/show"}),this.props.breadcrumbsActions.setBreadcrumbs(t)}}},{key:"render",value:function e(){var t=this,a=this.props.campaign.changeSetItemId,n=null,r=a?"":"campaign-admin__campaign--hide-preview",i=this.props.campaignId,o=this.props.record,l=this.groupItemsForSet(),s=[]


Object.keys(l).forEach(function(e){var r=l[e],u=r.items.length,c=[],p=u+" "+(1===u?r.singular:r.plural),d="Set_"+i+"_Group_"+e
r.items.forEach(function(e){a||(a=e.ID)
var r=a===e.ID
r&&e._links&&(n=e._links)
var i=[]
"none"!==e.ChangeType&&"published"!==o.State||i.push("list-group-item--inactive"),r&&i.push("active"),c.push(m.default.createElement(N.default,{key:e.ID,className:i.join(" "),handleClick:t.handleItemSelected,
handleClickArg:e.ID},m.default.createElement(x.default,{item:e,campaign:t.props.record})))}),s.push(m.default.createElement(w.default,{key:d,groupid:d,title:p},c))})
var u=[this.props.config.absoluteBaseUrl,this.props.config.sections["SilverStripe\\CMS\\Controllers\\CMSPagesController"].url].join(""),c=s.length?m.default.createElement(S.default,null,s):m.default.createElement("div",{
className:"alert alert-warning",role:"alert"},m.default.createElement("strong",null,"This campaign is empty.")," You can add items to a campaign by selecting ",m.default.createElement("em",null,"Add to campaign")," from within the ",m.default.createElement("em",null,"More Options "),"popup on ",m.default.createElement("a",{
href:u},"pages")," and files."),p=["panel","panel--padded","panel--scrollable","flexbox-area-grow"]
return m.default.createElement("div",{className:"fill-width campaign-admin__campaign "+r},m.default.createElement("div",{className:"fill-height campaign-admin__campaign-items","aria-expanded":"true"},m.default.createElement(O.default,{
showBackButton:!0,handleBackButtonClick:this.props.handleBackButtonClick},m.default.createElement(D.default,{multiline:!0})),m.default.createElement("div",{className:p.join(" ")},c),m.default.createElement("div",{
className:"toolbar toolbar--south"},this.renderButtonToolbar())),m.default.createElement(U.default,{itemLinks:n,itemId:a,onBack:this.handleCloseItem}))}},{key:"handleItemSelected",value:function e(t,a){
this.props.campaignActions.selectChangeSetItem(a)}},{key:"handleCloseItem",value:function e(){this.props.campaignActions.selectChangeSetItem(null)}},{key:"renderButtonToolbar",value:function e(){var t=this.getItems()


if(!t||!t.length)return m.default.createElement("div",{className:"btn-toolbar"})
var a={}
return"open"===this.props.record.State?a=c(a,{title:H.default._t("Campaigns.PUBLISHCAMPAIGN"),buttonStyle:"primary",loading:this.props.campaign.isPublishing,handleClick:this.handlePublish,icon:"rocket"
}):"published"===this.props.record.State&&(a=c(a,{title:H.default._t("Campaigns.REVERTCAMPAIGN"),buttonStyle:"secondary-outline",icon:"back-in-time",disabled:!0})),m.default.createElement("div",{className:"btn-toolbar"
},m.default.createElement(j.default,a))}},{key:"getItems",value:function e(){return this.props.record&&this.props.record._embedded?this.props.record._embedded.items:null}},{key:"groupItemsForSet",value:function e(){
var t={},a=this.getItems()
return a?(a.forEach(function(e){var a=e.BaseClass
t[a]||(t[a]={singular:e.Singular,plural:e.Plural,items:[]}),t[a].items.push(e)}),t):t}},{key:"handlePublish",value:function e(t){t.preventDefault(),this.props.campaignActions.publishCampaign(this.props.publishApi,this.props.treeClass,this.props.campaignId)

}}]),t}(A.default)
V.propTypes={campaign:m.default.PropTypes.shape({isPublishing:m.default.PropTypes.bool.isRequired,changeSetItemId:m.default.PropTypes.number}),breadcrumbsActions:m.default.PropTypes.object.isRequired,campaignActions:m.default.PropTypes.object.isRequired,
publishApi:m.default.PropTypes.func.isRequired,record:m.default.PropTypes.object.isRequired,recordActions:m.default.PropTypes.object.isRequired,sectionConfig:m.default.PropTypes.object.isRequired,handleBackButtonClick:m.default.PropTypes.func
},t.default=(0,b.connect)(s,u)(V)},function(e,t){e.exports=RecordsActions},function(e,t,a){"use strict"
function n(e){return e&&e.__esModule?e:{default:e}}function r(e){return{type:s.default.SET_CAMPAIGN_SELECTED_CHANGESETITEM,payload:{changeSetItemId:e}}}function i(e,t){return function(a){a({type:s.default.SET_CAMPAIGN_ACTIVE_CHANGESET,
payload:{campaignId:e,view:t}})}}function o(e,t,a){return function(n){n({type:s.default.PUBLISH_CAMPAIGN_REQUEST,payload:{campaignId:a}}),e({id:a}).then(function(e){n({type:s.default.PUBLISH_CAMPAIGN_SUCCESS,
payload:{campaignId:a}}),n({type:c.default.FETCH_RECORD_SUCCESS,payload:{recordType:t,data:e}})}).catch(function(e){n({type:s.default.PUBLISH_CAMPAIGN_FAILURE,payload:{error:e}})})}}Object.defineProperty(t,"__esModule",{
value:!0}),t.selectChangeSetItem=r,t.showCampaignView=i,t.publishCampaign=o
var l=a(21),s=n(l),u=a(22),c=n(u)},function(e,t){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.default={SET_CAMPAIGN_ACTIVE_CHANGESET:"SET_CAMPAIGN_ACTIVE_CHANGESET",SET_CAMPAIGN_SELECTED_CHANGESETITEM:"SET_CAMPAIGN_SELECTED_CHANGESETITEM",PUBLISH_CAMPAIGN_REQUEST:"PUBLISH_CAMPAIGN_REQUEST",
PUBLISH_CAMPAIGN_SUCCESS:"PUBLISH_CAMPAIGN_SUCCESS",PUBLISH_CAMPAIGN_FAILURE:"PUBLISH_CAMPAIGN_FAILURE"}},function(e,t){e.exports=RecordsActionTypes},function(e,t){e.exports=Accordion},function(e,t){e.exports=AccordionBlock

},function(e,t){e.exports=ListGroupItem},function(e,t,a){"use strict"
function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")


return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{
value:!0})
var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),s=a(7),u=n(s),c=a(13),p=n(c),d=a(15),f=n(d),m=function(e){
function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),l(t,[{key:"render",value:function e(){var t=null,a={},n=this.props.item,r=this.props.campaign


if("open"===r.State)switch(n.ChangeType){case"created":a.className="label label-warning list-group-item__status",a.Title=f.default._t("CampaignItem.DRAFT","Draft")
break
case"modified":a.className="label label-warning list-group-item__status",a.Title=f.default._t("CampaignItem.MODIFIED","Modified")
break
case"deleted":a.className="label label-error list-group-item__status",a.Title=f.default._t("CampaignItem.REMOVED","Removed")
break
case"none":default:a.className="label label-success list-group-item__status",a.Title=f.default._t("CampaignItem.NO_CHANGES","No changes")}var i=u.default.createElement("span",{className:"list-group-item__info campaign-admin__item-links--has-links font-icon-link"
},"3 linked items")
return n.Thumbnail&&(t=u.default.createElement("span",{className:"list-group-item__thumbnail"},u.default.createElement("img",{alt:n.Title,src:n.Thumbnail}))),u.default.createElement("div",{className:"fill-width"
},t,u.default.createElement("div",{className:"list-group-item__details"},u.default.createElement("h4",{className:"list-group-item__heading"},n.Title),u.default.createElement("span",{className:"list-group-item__info campaign-admin__item-links--is-linked font-icon-link"
}),i,a.className&&a.Title&&u.default.createElement("span",{className:a.className},a.Title)))}}]),t}(p.default)
m.propTypes={campaign:u.default.PropTypes.object.isRequired,item:u.default.PropTypes.object.isRequired},t.default=m},function(e,t){e.exports=Preview},function(e,t,a){"use strict"
function n(e){return e&&e.__esModule?e:{default:e}}function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c,t=arguments[1]
switch(t.type){case u.default.SET_CAMPAIGN_SELECTED_CHANGESETITEM:return(0,l.default)(i({},e,{changeSetItemId:t.payload.changeSetItemId}))
case u.default.SET_CAMPAIGN_ACTIVE_CHANGESET:return(0,l.default)(i({},e,{campaignId:t.payload.campaignId,view:t.payload.view,changeSetItemId:null}))
case u.default.PUBLISH_CAMPAIGN_REQUEST:return(0,l.default)(i({},e,{isPublishing:!0}))
case u.default.PUBLISH_CAMPAIGN_SUCCESS:case u.default.PUBLISH_CAMPAIGN_FAILURE:return(0,l.default)(i({},e,{isPublishing:!1}))
default:return e}}Object.defineProperty(t,"__esModule",{value:!0})
var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},o=a(29),l=n(o),s=a(21),u=n(s),c=(0,l.default)({campaignId:null,changeSetItemId:null,isPublishing:!1,view:null})
t.default=r},function(e,t){e.exports=function e(t){Object.freeze(t)
var a="function"==typeof t,n=Object.prototype.hasOwnProperty
return Object.getOwnPropertyNames(t).forEach(function(r){!n.call(t,r)||a&&("caller"===r||"callee"===r||"arguments"===r)||null===t[r]||"object"!=typeof t[r]&&"function"!=typeof t[r]||Object.isFrozen(t[r])||e(t[r])

}),t}}])
