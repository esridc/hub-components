const t=window.arcgishub.h;import{c as i,h as e,f as n}from"./chunk-008f06a0.js";var o=function(t){return"hubInitiativeId|"+t},s=function(t){return e(t)+"/update"},r=function(t,i){return function(t){return t.tags.map(function(t){return t.replace(/^hubInitiativeId\|/,"")})}(t).indexOf(i)>-1};class a{constructor(){this.icon=t("svg",{draggable:"auto",class:"follow-icon",viewBox:"0 0 120 120",width:"100%",height:"100%"},t("circle",{cx:"18.385",cy:"101.615",r:"18.385"}),t("path",{d:"M-1.031 61c32.533 0 59 26.468 59 59s-26.467 59-59 59-59-26.468-59-59 26.467-59 59-59m0-23c-45.288 0-82 36.713-82 82s36.712 82 82 82 82-36.713 82-82-36.712-82-82-82z"}),t("path",{d:"M.154 23.041c53.349 0 96.75 43.402 96.75 96.75s-43.402 96.75-96.75 96.75-96.75-43.402-96.75-96.75 43.402-96.75 96.75-96.75m0-23c-66.136 0-119.75 53.615-119.75 119.75s53.614 119.75 119.75 119.75c66.135 0 119.75-53.615 119.75-119.75S66.289.041.154.041z"})),this.orgurl="https://www.arcgis.com",this.following=!1,this.callToActionText="Follow Our Initiative",this.triggerFollow=(()=>this.session?this.toggleFollow():n.beginOAuth2({clientId:this.clientid,portal:`${this.orgurl}/sharing/rest`,redirectUri:`${window.location}authenticate.html`}).then(t=>(this.session=t.serialize(),this.toggleFollow()))),this.toggleFollow=(()=>this.following?function(t){return i(e(t.authentication),{authentication:t.authentication}).then(function(e){if(!r(e,t.initiativeId))return Promise.reject("user is not following this initiative.");var n=o(t.initiativeId),a=JSON.parse(JSON.stringify(e.tags)),l=a.indexOf(n);return a.splice(l,1),0===a.length&&a.push(","),i(s(t.authentication),{params:{tags:a},authentication:t.authentication})})}({initiativeId:this.initiativeid,authentication:n.deserialize(this.session)}).then(t=>{if(t.success)return Promise.resolve()}).catch(t=>{if("user is not following this initiative."===t)return Promise.resolve()}).then(()=>(this.callToActionText="Follow Our Initiative",this.following=!1,{success:!0})):function(t){return i(e(t.authentication),{authentication:t.authentication}).then(function(e){if(r(e,t.initiativeId))return Promise.reject("user is already following this initiative.");var n=o(t.initiativeId),a=JSON.parse(JSON.stringify(e.tags));return a.push(n),i(s(t.authentication),{params:{tags:a},authentication:t.authentication})})}({initiativeId:this.initiativeid,authentication:n.deserialize(this.session)}).then(t=>{if(t.success)return Promise.resolve(t)}).catch(t=>{if("user is already following this initiative."===t)return Promise.resolve()}).then(()=>(this.callToActionText="Unfollow Our Initiative",this.following=!0,{success:!0})))}render(){return t("hub-button",{text:this.callToActionText,action:this.triggerFollow,icon:this.icon})}static get is(){return"hub-follow-initiative"}static get properties(){return{callToActionText:{state:!0},clientid:{type:String,attr:"clientid"},following:{type:Boolean,attr:"following",mutable:!0},icon:{type:"Any",attr:"icon"},initiativeid:{type:String,attr:"initiativeid"},orgurl:{type:String,attr:"orgurl"},session:{type:String,attr:"session",mutable:!0},user:{type:"Any",attr:"user",mutable:!0}}}static get style(){return".follow-icon{height:15px;width:15px;vertical-align:baseline;padding-right:5px;fill:currentColor}"}}export{a as HubFollowInitiative};