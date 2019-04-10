arcgishub.loadBundle("qky8xmvw",["exports","./chunk-c680a525.js"],function(e,t){var r=window.arcgishub.h;function n(e){var r={httpMethod:"GET",params:{}};"string"==typeof e?r.params.q=e:(r=t.__assign({},r,e)).params=t.__assign({},e.params,e.searchForm);var n=t.getPortalUrl(r)+"/search";return t.request(n,r)}function i(e,t,r,i){var a=[],s=[],u=[],o=(new Date).getTime(),l="";if(e.forEach(function(e){var r=e.attributes,n=e.geometry,u=null;if(r.imageAttributes){var c=JSON.parse(r.imageAttributes);c.crop&&(u=t+"/"+r.OBJECTID+"/attachments/"+c.crop+"?v="+o,i&&(u+="&token="+i))}s.push({id:r.OBJECTID,type:"events",imageUrl:u,attributes:r,geometry:n});var g=r.siteId;null!=g&&-1===a.indexOf(g)&&(a.push(g),l+=l.length>0?" OR id:":"id:",l+=g)}),0===a.length)return{included:u,data:s};var c=r;return c.searchForm={q:l},n(c).then(function(e){return e.results.forEach(function(e){u.push({id:e.id,type:"sites",attributes:{id:e.id,url:e.url}})}),{included:u,data:s}})}var a=function(){function e(){var e=this;this.orgurl="https://www.arcgis.com",this.callToActionText="Attend",this.triggerRegister=function(){if(e.session)return e.toggleRegister();t.UserSession.beginOAuth2({clientId:e.clientid,portal:e.orgurl+"/sharing/rest",redirectUri:window.location+"authenticate.html"}).then(function(t){return e.session=t.serialize(),e.toggleRegister()})},this.toggleRegister=function(){return e.attending?(r={groupId:e.eventGroupId,authentication:t.UserSession.deserialize(e.session)},function(e){var r=t.getPortalUrl(e)+"/community/groups/"+e.id+"/leave";return t.request(r,e)}({id:r.groupId,authentication:r.authentication})).then(function(t){return!0===t.success?(e.callToActionText="Attend",e.attending=!1,{success:!0}):{success:!1}}):function(e){return function(e){var r=t.getPortalUrl(e)+"/community/groups/"+e.id+"/join";return t.request(r,e)}({id:e.groupId,authentication:e.authentication})}({groupId:e.eventGroupId,authentication:t.UserSession.deserialize(e.session)}).then(function(e){if(!0===e.success)return Promise.resolve()}).catch(function(e){if("User is already a member of group."===e.originalMessage)return Promise.resolve();throw e}).then(function(){return e.callToActionText="Attending",e.attending=!0,{success:!0}});var r}}return e.prototype.componentDidLoad=function(){var e=this;t.getPortal(null,{portal:this.orgurl+"/sharing/rest/"}).then(function(r){var a;(a=r.id,n(t.__assign({searchForm:{q:"typekeywords:hubEventsLayer AND orgid:"+a}},void 0)).then(function(e){if(e.results&&e.results.length>0){var t=void 0;if(1===e.results.length)t=e.results[0];else if(e.results.length>1){var r=e.results.reduce(function(e,t){return t.typeKeywords.includes("View Service")?"public"===t.access?e.public=t:e.org=t:e.admin=t,e},{});t=r.admin||r.org||r.public}var n=t.url+"/0";return n.replace(/^http:/gi,"https:")}throw Error("No events service found. Events are likely not enabled.")})).then(function(r){var n,a;e.eventServiceUrl=r,(n={url:e.eventServiceUrl},a=t.__assign({returnGeometry:!0},n),function(e){var r=t.__assign({params:{},httpMethod:"GET",url:e.url},e);return t.appendCustomParams(e,r),r.params.where||(r.params.where="1=1"),r.params.outFields||(r.params.outFields="*"),t.request(t.cleanUrl(r.url)+"/query",r)}(a).then(function(e){return e.features.length<=0?{data:[],included:[]}:a.authentication?a.authentication.getToken(a.url).then(function(t){return i(e.features,a.url,n,t)}):i(e.features,a.url,n)})).then(function(t){if(t.data.length>0)for(var r=0;r<t.data.length;r++)if(t.data[r].attributes.title===e.eventtitle){var n=t.data[r].attributes;e.eventDate=new Date(n.startDate).toString(),e.eventGroupId=n.groupId,e.eventOrganizer=e.digOutContactInfo(n);break}})})})},e.prototype.digOutContactInfo=function(e){var t=JSON.parse(e.organizers);if(t.length>0)return r("p",null,"organized by: ",r("a",{href:"mailto:"+t[0].contact},t[0].name))},e.prototype.render=function(){return r("div",{class:"hub-event-details"},r("div",{class:"hub-event-background-image"}),r("div",{class:"hub-event-content"},r("h2",null,this.eventtitle),r("p",null,this.eventDate),r("p",null,this.eventOrganizer)),r("div",{class:"hub-event-footer"},r("hub-button",{text:this.callToActionText,action:this.triggerRegister})))},Object.defineProperty(e,"is",{get:function(){return"hub-event-details"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{attending:{type:Boolean,attr:"attending",mutable:!0},callToActionText:{state:!0},clientid:{type:String,attr:"clientid"},eventDate:{type:String,attr:"event-date",mutable:!0},eventGroupId:{type:String,attr:"event-group-id",mutable:!0},eventOrganizer:{type:"Any",attr:"event-organizer",mutable:!0},eventServiceUrl:{type:String,attr:"event-service-url",mutable:!0},eventtitle:{type:String,attr:"eventtitle"},orgurl:{type:String,attr:"orgurl"},session:{type:String,attr:"session",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".hub-event-details{border:1px solid #ccc;border-radius:4px;width:100%;color:#323232;font-size:14px;width:380px;height:400px;font-family:Courier New,Courier,monospace;display:grid;grid-template-columns:10% auto;grid-template-rows:40% 40% 20%;grid-template-areas:\"header header\" \". main\" \". footer\"}.hub-event-background-image{background-color:#ffae00;grid-area:header}.hub-event-content{grid-area:main}.hub-event-footer{grid-area:footer}"},enumerable:!0,configurable:!0}),e}();e.HubEventDetails=a,Object.defineProperty(e,"__esModule",{value:!0})});