var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)},t=function(){return(t=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function r(e){return Object.keys(e).some(function(t){var r=e[t];if(!r)return!1;switch(r.constructor.name){case"Array":case"Object":case"Date":case"Function":case"Boolean":case"String":case"Number":return!1;default:return!0}})}function n(e){var t={};return Object.keys(e).forEach(function(r){var n=e[r];if(n||0===n||"boolean"==typeof n||"string"==typeof n){var o;switch(n.constructor.name){case"Array":o=n[0]&&n[0].constructor&&"Object"===n[0].constructor.name?JSON.stringify(n):n.join(",");break;case"Object":o=JSON.stringify(n);break;case"Date":o=n.valueOf();break;case"Function":o=null;break;case"Boolean":o=n+"";break;default:o=n}(o||0===o||"string"==typeof o)&&(t[r]=o)}}),t}function o(e){var t=n(e);return Object.keys(t).map(function(e){return function(e,t){return encodeURIComponent(e)+"="+encodeURIComponent(t)}(e,t[e])}).join("&")}var s=function(e,t,r,n,o){e=e||"UNKNOWN_ERROR",t=t||"UNKNOWN_ERROR_CODE",this.name="ArcGISRequestError",this.message="UNKNOWN_ERROR_CODE"===t?e:t+": "+e,this.originalMessage=e,this.code=t,this.response=r,this.url=n,this.options=o};s.prototype=Object.create(Error.prototype),s.prototype.constructor=s;var i="@esri/arcgis-rest-js";function a(e,a){void 0===a&&(a={params:{f:"json"}});var h=t({httpMethod:"POST"},a),c=[],p=[];if(h.fetch||"undefined"==typeof fetch?(c.push("`fetch`"),p.push("`isomorphic-fetch`")):h.fetch=fetch.bind(Function("return this")()),"undefined"==typeof Promise&&(c.push("`Promise`"),p.push("`es6-promise`")),"undefined"==typeof FormData&&(c.push("`FormData`"),p.push("`isomorphic-form-data`")),!h.fetch||"undefined"==typeof Promise||"undefined"==typeof FormData)throw new Error("`arcgis-rest-request` requires global variables for `fetch`, `Promise` and `FormData` to be present in the global scope. You are missing "+c.join(", ")+". We recommend installing the "+p.join(", ")+" modules at the root of your application to add these to the global scope. See https://bit.ly/2KNwWaJ for more info.");var f=h.httpMethod,l=h.authentication,d=h.rawResponse,k=t({f:"json"},a.params),m={method:f,credentials:"same-origin"};return(l?l.getToken(e,{fetch:h.fetch}):Promise.resolve("")).then(function(s){if(s.length&&(k.token=s),"GET"===m.method){var u=""===o(k)?e:e+"?"+o(k);h.maxUrlLength&&u.length>h.maxUrlLength?m.method="POST":e=u}return"POST"===m.method&&(m.body=function(e){var t=r(e),s=n(e);if(t){var i=new FormData;return Object.keys(s).forEach(function(e){"undefined"!=typeof Blob&&s[e]instanceof Blob?i.append(e,s[e],s.fileName||s[e].name||e):i.append(e,s[e])}),i}return o(e)}(k)),m.headers=t({},a.headers),"undefined"!=typeof window||m.headers.referer||(m.headers.referer=i),r(k)||(m.headers["Content-Type"]="application/x-www-form-urlencoded"),h.fetch(e,m)}).then(function(t){if(!t.ok)throw new s(t.statusText,"HTTP "+t.status,t,e,h);if(d)return t;switch(k.f){case"json":case"geojson":return t.json();case"html":case"text":return t.text();default:return t.blob()}}).then(function(t){return"json"!==k.f&&"geojson"!==k.f||d?t:function(e,t,r,n){if(e.code>=400)throw new s(i=e.message,a=e.code,e,t,n);if(e.error){var o=e.error,i=o.message,a=o.code,h=o.messageCode,c=h||a||"UNKNOWN_ERROR_CODE";if(498===a||499===a||"GWM_0003"===h||400===a&&"Unable to generate token."===i)throw new u(i,c,e,t,n);throw new s(i,c,e,t,n)}if("failed"===e.status||"failure"===e.status){i=void 0,a="UNKNOWN_ERROR_CODE";try{i=JSON.parse(e.statusMessage).message,a=JSON.parse(e.statusMessage).code}catch(t){i=e.statusMessage||e.message}throw new s(i,a,e,t,n)}return e}(t,e,0,h)})}var h,u=function(r){function n(e,t,n,o,s){void 0===e&&(e="AUTHENTICATION_ERROR"),void 0===t&&(t="AUTHENTICATION_ERROR_CODE");var i=r.call(this,e,t,n,o,s)||this;return i.name="ArcGISAuthError",i.message="AUTHENTICATION_ERROR_CODE"===t?e:t+": "+e,i}return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}(n,r),n.prototype.retry=function(e,r){var n=this;void 0===r&&(r=3);var o=0,s=function(i,h){e(n.url,n.options).then(function(e){var r=t({},n.options,{authentication:e});return o+=1,a(n.url,r)}).then(function(e){i(e)}).catch(function(e){"ArcGISAuthError"===e.name&&o<r?s(i,h):h("ArcGISAuthError"===e.name&&o>=r?n:e)})};return new Promise(function(e,t){s(e,t)})},n}(s);function c(e){return"/"===(e=e.trim())[e.length-1]&&(e=e.slice(0,-1)),e}function p(e){return void 0===e&&(e={}),e.portal?c(e.portal):e.authentication?e.authentication.portal:"https://www.arcgis.com/sharing/rest"}function f(e,r){var n=e||"self";return a(p(r)+"/portals/"+n,t({httpMethod:"GET"},r))}function l(e,t){Object.keys(e).forEach(function(r){"url"!==r&&"params"!==r&&"authentication"!==r&&"httpMethod"!==r&&"fetch"!==r&&"portal"!==r&&"maxUrlLength"!==r&&"headers"!==r&&"endpoint"!==r&&"decodeValues"!==r&&(t.params[r]=e[r])})}function d(e,t){var r=t.params?t:{params:t};return r.rawResponse=!1,a(e,r).then(function(e){var t={token:e.access_token,username:e.username,expires:new Date(Date.now()+(1e3*e.expires_in-1e3)),ssl:!0===e.ssl};return e.refresh_token&&(t.refreshToken=e.refresh_token),t})}function k(e,t){var r=t.params?t:{params:t};return r.params.referer="undefined"!=typeof window&&window.location&&window.location.host?window.location.host:i,a(e,r)}!function(e){e.ArcGISRequestError="ArcGISRequestError",e.ArcGISAuthError="ArcGISAuthError"}(h||(h={}));var m=function(){function e(e){if(this.clientId=e.clientId,this._refreshToken=e.refreshToken,this._refreshTokenExpires=e.refreshTokenExpires,this.username=e.username,this.password=e.password,this._token=e.token,this._tokenExpires=e.tokenExpires,this.portal=e.portal?c(e.portal):"https://www.arcgis.com/sharing/rest",this.ssl=e.ssl,this.provider=e.provider||"arcgis",this.tokenDuration=e.tokenDuration||20160,this.redirectUri=e.redirectUri,this.refreshTokenTTL=e.refreshTokenTTL||1440,this.trustedServers={},e.server){var t=e.server.toLowerCase().split(/\/rest(\/admin)?\/services\//)[0];this.trustedServers[t]={token:e.token,expires:e.tokenExpires}}this._pendingTokenRequests={}}return e.beginOAuth2=function(r,n){void 0===n&&(n=window);var o,s=t({portal:"https://www.arcgis.com/sharing/rest",provider:"arcgis",duration:20160,popup:!0,state:r.clientId,locale:""},r),i=s.portal,a=s.provider,h=s.clientId,c=s.duration,p=s.redirectUri,f=s.popup,l=s.state,d=s.locale;if(o="arcgis"===a?i+"/oauth2/authorize?client_id="+h+"&response_type=token&expiration="+c+"&redirect_uri="+encodeURIComponent(p)+"&state="+l+"&locale="+d:i+"/oauth2/social/authorize?client_id="+h+"&socialLoginProviderName="+a+"&autoAccountCreateForSocial=true&response_type=token&expiration="+c+"&redirect_uri="+encodeURIComponent(p)+"&state="+l+"&locale="+d,f){var k,m=((k={promise:null,resolve:null,reject:null}).promise=new Promise(function(e,t){k.resolve=e,k.reject=t}),k);return n["__ESRI_REST_AUTH_HANDLER_"+h]=function(t,r){if(t){var n=JSON.parse(t);m.reject(new u(n.errorMessage,n.error))}else if(r){var o=JSON.parse(r);m.resolve(new e({clientId:h,portal:i,ssl:o.ssl,token:o.token,tokenExpires:new Date(o.expires),username:o.username}))}},n.open(o,"oauth-window","height=400,width=600,menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes"),m.promise}n.location.href=o},e.completeOAuth2=function(r,n){void 0===n&&(n=window);var o=t({portal:"https://www.arcgis.com/sharing/rest"},r),s=o.portal,i=o.clientId;function a(t,r){if(n.opener&&n.opener.parent)return n.opener.parent["__ESRI_REST_AUTH_HANDLER_"+i](t?JSON.stringify(t):void 0,JSON.stringify(r)),void n.close();if(n!==n.parent)return n.parent["__ESRI_REST_AUTH_HANDLER_"+i](t?JSON.stringify(t):void 0,JSON.stringify(r)),void n.close();if(t)throw new u(t.errorMessage,t.error);return new e({clientId:i,portal:s,ssl:r.ssl,token:r.token,tokenExpires:r.expires,username:r.username})}var h=n.location.href.match(/access_token=(.+)&expires_in=(.+)&username=([^&]+)/);if(!h){var c=n.location.href.match(/error=(.+)&error_description=(.+)/);return a({error:c[1],errorMessage:decodeURIComponent(c[2])})}var p=h[1],f=new Date(Date.now()+1e3*parseInt(h[2],10)-6e4),l=decodeURIComponent(h[3]);return a(void 0,{token:p,expires:f,ssl:n.location.href.indexOf("&ssl=true")>-1||n.location.href.indexOf("#ssl=true")>-1,username:l})},e.authorize=function(e,r){var n=t({portal:"https://arcgis.com/sharing/rest",duration:20160},e);r.writeHead(301,{Location:n.portal+"/oauth2/authorize?client_id="+n.clientId+"&duration="+n.duration+"&response_type=code&redirect_uri="+encodeURIComponent(n.redirectUri)}),r.end()},e.exchangeAuthorizationCode=function(r,n){var o=t({portal:"https://www.arcgis.com/sharing/rest",refreshTokenTTL:1440},r),s=o.portal,i=o.clientId,a=o.redirectUri,h=o.refreshTokenTTL;return d(s+"/oauth2/token",{grant_type:"authorization_code",client_id:i,redirect_uri:a,code:n}).then(function(t){return new e({clientId:i,portal:s,ssl:t.ssl,redirectUri:a,refreshToken:t.refreshToken,refreshTokenTTL:h,refreshTokenExpires:new Date(Date.now()+1e3*(h-1)),token:t.token,tokenExpires:t.expires,username:t.username})})},e.deserialize=function(t){var r=JSON.parse(t);return new e({clientId:r.clientId,refreshToken:r.refreshToken,refreshTokenExpires:new Date(r.refreshTokenExpires),username:r.username,password:r.password,token:r.token,tokenExpires:new Date(r.tokenExpires),portal:r.portal,ssl:r.ssl,tokenDuration:r.tokenDuration,redirectUri:r.redirectUri,refreshTokenTTL:r.refreshTokenTTL})},e.fromCredential=function(t){return new e({portal:t.server.includes("sharing/rest")?t.server:t.server+"/sharing/rest",ssl:t.ssl,token:t.token,username:t.userId,tokenExpires:new Date(t.expires)})},Object.defineProperty(e.prototype,"token",{get:function(){return this._token},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"tokenExpires",{get:function(){return this._tokenExpires},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"refreshToken",{get:function(){return this._refreshToken},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"refreshTokenExpires",{get:function(){return this._refreshTokenExpires},enumerable:!0,configurable:!0}),e.prototype.toCredential=function(){return{expires:this.tokenExpires.getTime(),server:this.portal,ssl:this.ssl,token:this.token,userId:this.username}},e.prototype.getUser=function(e){var r=this;return this._user&&this._user.username===this.username?Promise.resolve(this._user):a(this.portal+"/community/users/"+encodeURIComponent(this.username),t({httpMethod:"GET",authentication:this},e,{rawResponse:!1})).then(function(e){return r._user=e,e})},e.prototype.getToken=function(e,t){return/^https?:\/\/\S+\.arcgis\.com\/sharing\/rest/.test(this.portal)&&/^https?:\/\/\S+\.arcgis\.com.+/.test(e)?this.getFreshToken(t):new RegExp(this.portal,"i").test(e)?this.getFreshToken(t):this.getTokenForServer(e,t)},e.prototype.toJSON=function(){return{clientId:this.clientId,refreshToken:this.refreshToken,refreshTokenExpires:this.refreshTokenExpires,username:this.username,password:this.password,token:this.token,tokenExpires:this.tokenExpires,portal:this.portal,ssl:this.ssl,tokenDuration:this.tokenDuration,redirectUri:this.redirectUri,refreshTokenTTL:this.refreshTokenTTL}},e.prototype.serialize=function(){return JSON.stringify(this)},e.prototype.refreshSession=function(e){return this._user=null,this.username&&this.password?this.refreshWithUsernameAndPassword(e):this.clientId&&this.refreshToken?this.refreshWithRefreshToken():Promise.reject(new u("Unable to refresh token."))},e.prototype.getTokenForServer=function(e,t){var r=this,n=e.toLowerCase().split(/\/rest(\/admin)?\/services\//)[0],o=this.trustedServers[n];return o&&o.expires&&o.expires.getTime()>Date.now()?Promise.resolve(o.token):this._pendingTokenRequests[n]?this._pendingTokenRequests[n]:(this._pendingTokenRequests[n]=a(n+"/rest/info").then(function(o){if(o.owningSystemUrl){if(new RegExp(o.owningSystemUrl,"i").test(r.portal))return a(o.owningSystemUrl+"/sharing/rest/info",t);throw new u(e+" is not federated with "+r.portal+".","NOT_FEDERATED")}if(o.authInfo&&void 0!==r.trustedServers[n])return Promise.resolve({authInfo:o.authInfo});throw new u(e+" is not federated with any portal and is not explicitly trusted.","NOT_FEDERATED")}).then(function(e){return e.authInfo.tokenServicesUrl}).then(function(t){return r.token&&r.tokenExpires.getTime()>Date.now()?k(t,{params:{token:r.token,serverUrl:e,expiration:r.tokenDuration,client:"referer"}}):k(t,{params:{username:r.username,password:r.password,expiration:r.tokenDuration,client:"referer"}}).then(function(e){return r._token=e.token,r._tokenExpires=new Date(e.expires),e})}).then(function(e){return r.trustedServers[n]={expires:new Date(e.expires),token:e.token},e.token}),this._pendingTokenRequests[n])},e.prototype.getFreshToken=function(e){var t=this;return this.token&&this.tokenExpires&&this.tokenExpires.getTime()>Date.now()?Promise.resolve(this.token):(this._pendingTokenRequests[this.portal]||(this._pendingTokenRequests[this.portal]=this.refreshSession(e).then(function(e){return t._pendingTokenRequests[t.portal]=null,e.token})),this._pendingTokenRequests[this.portal])},e.prototype.refreshWithUsernameAndPassword=function(e){var r=this,n=t({params:{username:this.username,password:this.password,expiration:this.tokenDuration}},e);return k(this.portal+"/generateToken",n).then(function(e){return r._token=e.token,r._tokenExpires=new Date(e.expires),r})},e.prototype.refreshWithRefreshToken=function(e){var r=this;if(this.refreshToken&&this.refreshTokenExpires&&this.refreshTokenExpires.getTime()<Date.now())return this.refreshRefreshToken(e);var n=t({params:{client_id:this.clientId,refresh_token:this.refreshToken,grant_type:"refresh_token"}},e);return d(this.portal+"/oauth2/token",n).then(function(e){return r._token=e.token,r._tokenExpires=e.expires,r})},e.prototype.refreshRefreshToken=function(e){var r=this,n=t({params:{client_id:this.clientId,refresh_token:this.refreshToken,redirect_uri:this.redirectUri,grant_type:"exchange_refresh_token"}},e);return d(this.portal+"/oauth2/token",n).then(function(e){return r._token=e.token,r._tokenExpires=e.expires,r._refreshToken=e.refreshToken,r._refreshTokenExpires=new Date(Date.now()+60*(r.refreshTokenTTL-1)*1e3),r})},e}();function T(e){return p(e)+"/community/users/"+encodeURIComponent(e.username)}const w=()=>{const e=document.cookie.match("(^|[^;]+)\\s*arcgis_hub_component_auth\\s*=\\s*([^;]+)");return e?e.pop():void 0},g=e=>{let t=new Date;t.setTime(t.getTime()+12096e5),document.cookie=`arcgis_hub_component_auth=${e.serialize()} ; expires=${t.toUTCString()} path=/`};export{t as a,p as b,a as c,l as d,c as e,w as f,m as g,g as h,f as i,T as j};