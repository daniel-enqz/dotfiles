var ct=Object.defineProperty;var S=(le,oe)=>ct(le,"name",{value:oe,configurable:!0});exports.id=457;exports.ids=[457];exports.modules={5186:(le,oe,w)=>{var _=w(3698),K=w(2505),Y=w(6417),G=Function.bind,I=G.bind(G);function re(he,z,ve){var se=I(Y,null).apply(null,ve?[z,ve]:[z]);he.api={remove:se},he.remove=se,["before","error","after","wrap"].forEach(function(ge){var te=ve?[z,ge,ve]:[z,ge];he[ge]=he.api[ge]=I(K,null).apply(null,te)})}S(re,"bindApi");function k(){var he="h",z={registry:{}},ve=_.bind(null,z,he);return re(ve,z,he),ve}S(k,"HookSingular");function fe(){var he={registry:{}},z=_.bind(null,he);return re(z,he),z}S(fe,"HookCollection");var Z=!1;function ue(){return Z||(console.warn('[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4'),Z=!0),fe()}S(ue,"Hook"),ue.Singular=k.bind(),ue.Collection=fe.bind(),le.exports=ue,le.exports.Hook=ue,le.exports.Singular=ue.Singular,le.exports.Collection=ue.Collection},2505:le=>{le.exports=oe;function oe(w,_,K,Y){var G=Y;w.registry[K]||(w.registry[K]=[]),_==="before"&&(Y=S(function(I,re){return Promise.resolve().then(G.bind(null,re)).then(I.bind(null,re))},"hook")),_==="after"&&(Y=S(function(I,re){var k;return Promise.resolve().then(I.bind(null,re)).then(function(fe){return k=fe,G(k,re)}).then(function(){return k})},"hook")),_==="error"&&(Y=S(function(I,re){return Promise.resolve().then(I.bind(null,re)).catch(function(k){return G(k,re)})},"hook")),w.registry[K].push({hook:Y,orig:G})}S(oe,"addHook")},3698:le=>{le.exports=oe;function oe(w,_,K,Y){if(typeof K!="function")throw new Error("method for before hook must be a function");return Y||(Y={}),Array.isArray(_)?_.reverse().reduce(function(G,I){return oe.bind(null,w,I,G,Y)},K)():Promise.resolve().then(function(){return w.registry[_]?w.registry[_].reduce(function(G,I){return I.hook.bind(null,G,Y)},K)():K(Y)})}S(oe,"register")},6417:le=>{le.exports=oe;function oe(w,_,K){if(!!w.registry[_]){var Y=w.registry[_].map(function(G){return G.orig}).indexOf(K);Y!==-1&&w.registry[_].splice(Y,1)}}S(oe,"removeHook")},8026:(le,oe,w)=>{"use strict";w.r(oe),w.d(oe,{GitHubApi:()=>ee});function _(){return typeof navigator=="object"&&"userAgent"in navigator?navigator.userAgent:typeof process=="object"&&"version"in process?`Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})`:"<environment undetectable>"}S(_,"getUserAgent");var K=w(5186);/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */function Y(c){return Object.prototype.toString.call(c)==="[object Object]"}S(Y,"isObject");function G(c){var n,o;return Y(c)===!1?!1:(n=c.constructor,n===void 0?!0:(o=n.prototype,!(Y(o)===!1||o.hasOwnProperty("isPrototypeOf")===!1)))}S(G,"isPlainObject");function I(c){return c?Object.keys(c).reduce((n,o)=>(n[o.toLowerCase()]=c[o],n),{}):{}}S(I,"lowercaseKeys");function re(c,n){const o=Object.assign({},c);return Object.keys(n).forEach(i=>{G(n[i])?i in c?o[i]=re(c[i],n[i]):Object.assign(o,{[i]:n[i]}):Object.assign(o,{[i]:n[i]})}),o}S(re,"mergeDeep");function k(c){for(const n in c)c[n]===void 0&&delete c[n];return c}S(k,"removeUndefinedProperties");function fe(c,n,o){if(typeof n=="string"){let[l,a]=n.split(" ");o=Object.assign(a?{method:l,url:a}:{url:l},o)}else o=Object.assign({},n);o.headers=I(o.headers),k(o),k(o.headers);const i=re(c||{},o);return c&&c.mediaType.previews.length&&(i.mediaType.previews=c.mediaType.previews.filter(l=>!i.mediaType.previews.includes(l)).concat(i.mediaType.previews)),i.mediaType.previews=i.mediaType.previews.map(l=>l.replace(/-preview/,"")),i}S(fe,"merge");function Z(c,n){const o=/\?/.test(c)?"&":"?",i=Object.keys(n);return i.length===0?c:c+o+i.map(l=>l==="q"?"q="+n.q.split("+").map(encodeURIComponent).join("+"):`${l}=${encodeURIComponent(n[l])}`).join("&")}S(Z,"addQueryParameters");const ue=/\{[^}]+\}/g;function he(c){return c.replace(/^\W+|\W+$/g,"").split(/,/)}S(he,"removeNonChars");function z(c){const n=c.match(ue);return n?n.map(he).reduce((o,i)=>o.concat(i),[]):[]}S(z,"extractUrlVariableNames");function ve(c,n){return Object.keys(c).filter(o=>!n.includes(o)).reduce((o,i)=>(o[i]=c[i],o),{})}S(ve,"omit");function se(c){return c.split(/(%[0-9A-Fa-f]{2})/g).map(function(n){return/%[0-9A-Fa-f]/.test(n)||(n=encodeURI(n).replace(/%5B/g,"[").replace(/%5D/g,"]")),n}).join("")}S(se,"encodeReserved");function ge(c){return encodeURIComponent(c).replace(/[!'()*]/g,function(n){return"%"+n.charCodeAt(0).toString(16).toUpperCase()})}S(ge,"encodeUnreserved");function te(c,n,o){return n=c==="+"||c==="#"?se(n):ge(n),o?ge(o)+"="+n:n}S(te,"encodeValue");function be(c){return c!=null}S(be,"isDefined");function Te(c){return c===";"||c==="&"||c==="?"}S(Te,"isKeyOperator");function Le(c,n,o,i){var l=c[o],a=[];if(be(l)&&l!=="")if(typeof l=="string"||typeof l=="number"||typeof l=="boolean")l=l.toString(),i&&i!=="*"&&(l=l.substring(0,parseInt(i,10))),a.push(te(n,l,Te(n)?o:""));else if(i==="*")Array.isArray(l)?l.filter(be).forEach(function(u){a.push(te(n,u,Te(n)?o:""))}):Object.keys(l).forEach(function(u){be(l[u])&&a.push(te(n,l[u],u))});else{const u=[];Array.isArray(l)?l.filter(be).forEach(function(d){u.push(te(n,d))}):Object.keys(l).forEach(function(d){be(l[d])&&(u.push(ge(d)),u.push(te(n,l[d].toString())))}),Te(n)?a.push(ge(o)+"="+u.join(",")):u.length!==0&&a.push(u.join(","))}else n===";"?be(l)&&a.push(ge(o)):l===""&&(n==="&"||n==="?")?a.push(ge(o)+"="):l===""&&a.push("");return a}S(Le,"getValues");function Ye(c){return{expand:qe.bind(null,c)}}S(Ye,"parseUrl");function qe(c,n){var o=["+","#",".","/",";","?","&"];return c.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g,function(i,l,a){if(l){let d="";const g=[];if(o.indexOf(l.charAt(0))!==-1&&(d=l.charAt(0),l=l.substr(1)),l.split(/,/g).forEach(function(p){var b=/([^:\*]*)(?::(\d+)|(\*))?/.exec(p);g.push(Le(n,d,b[1],b[2]||b[3]))}),d&&d!=="+"){var u=",";return d==="?"?u="&":d!=="#"&&(u=d),(g.length!==0?d:"")+g.join(u)}else return g.join(",")}else return se(a)})}S(qe,"expand");function He(c){let n=c.method.toUpperCase(),o=(c.url||"/").replace(/:([a-z]\w+)/g,"{$1}"),i=Object.assign({},c.headers),l,a=ve(c,["method","baseUrl","url","headers","request","mediaType"]);const u=z(o);o=Ye(o).expand(a),/^http/.test(o)||(o=c.baseUrl+o);const d=Object.keys(c).filter(b=>u.includes(b)).concat("baseUrl"),g=ve(a,d);if(!/application\/octet-stream/i.test(i.accept)&&(c.mediaType.format&&(i.accept=i.accept.split(/,/).map(b=>b.replace(/application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/,`application/vnd$1$2.${c.mediaType.format}`)).join(",")),c.mediaType.previews.length)){const b=i.accept.match(/[\w-]+(?=-preview)/g)||[];i.accept=b.concat(c.mediaType.previews).map(x=>{const T=c.mediaType.format?`.${c.mediaType.format}`:"+json";return`application/vnd.github.${x}-preview${T}`}).join(",")}return["GET","HEAD"].includes(n)?o=Z(o,g):"data"in g?l=g.data:Object.keys(g).length?l=g:i["content-length"]=0,!i["content-type"]&&typeof l<"u"&&(i["content-type"]="application/json; charset=utf-8"),["PATCH","PUT"].includes(n)&&typeof l>"u"&&(l=""),Object.assign({method:n,url:o,headers:i},typeof l<"u"?{body:l}:null,c.request?{request:c.request}:null)}S(He,"parse");function J(c,n,o){return He(fe(c,n,o))}S(J,"endpointWithDefaults");function Fe(c,n){const o=fe(c,n),i=J.bind(null,o);return Object.assign(i,{DEFAULTS:o,defaults:Fe.bind(null,o),merge:fe.bind(null,o),parse:He})}S(Fe,"withDefaults");const De=`octokit-endpoint.js/7.0.1 ${_()}`,Me=Fe(null,{method:"GET",baseUrl:"https://api.github.com",headers:{accept:"application/vnd.github.v3+json","user-agent":De},mediaType:{format:"",previews:[]}});var Oe=w(5568);class Ne extends Error{constructor(n){super(n),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor),this.name="Deprecation"}}S(Ne,"Deprecation");var ke=w(778),je=w.n(ke);const Ue=je()(c=>console.warn(c)),Ie=je()(c=>console.warn(c));class Se extends Error{constructor(n,o,i){super(n),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor),this.name="HttpError",this.status=o;let l;"headers"in i&&typeof i.headers<"u"&&(l=i.headers),"response"in i&&(this.response=i.response,l=i.response.headers);const a=Object.assign({},i.request);i.request.headers.authorization&&(a.headers=Object.assign({},i.request.headers,{authorization:i.request.headers.authorization.replace(/ .*$/," [REDACTED]")})),a.url=a.url.replace(/\bclient_secret=\w+/g,"client_secret=[REDACTED]").replace(/\baccess_token=\w+/g,"access_token=[REDACTED]"),this.request=a,Object.defineProperty(this,"code",{get(){return Ue(new Ne("[@octokit/request-error] `error.code` is deprecated, use `error.status`.")),o}}),Object.defineProperty(this,"headers",{get(){return Ie(new Ne("[@octokit/request-error] `error.headers` is deprecated, use `error.response.headers`.")),l||{}}})}}S(Se,"RequestError");const Ve="6.2.1";function M(c){return c.arrayBuffer()}S(M,"getBufferResponse");function me(c){const n=c.request&&c.request.log?c.request.log:console;(G(c.body)||Array.isArray(c.body))&&(c.body=JSON.stringify(c.body));let o={},i,l;return(c.request&&c.request.fetch||globalThis.fetch||Oe.ZP)(c.url,Object.assign({method:c.method,body:c.body,headers:c.headers,redirect:c.redirect},c.request)).then(async u=>{l=u.url,i=u.status;for(const d of u.headers)o[d[0]]=d[1];if("deprecation"in o){const d=o.link&&o.link.match(/<([^>]+)>; rel="deprecation"/),g=d&&d.pop();n.warn(`[@octokit/request] "${c.method} ${c.url}" is deprecated. It is scheduled to be removed on ${o.sunset}${g?`. See ${g}`:""}`)}if(!(i===204||i===205)){if(c.method==="HEAD"){if(i<400)return;throw new Se(u.statusText,i,{response:{url:l,status:i,headers:o,data:void 0},request:c})}if(i===304)throw new Se("Not modified",i,{response:{url:l,status:i,headers:o,data:await Ee(u)},request:c});if(i>=400){const d=await Ee(u);throw new Se(Ae(d),i,{response:{url:l,status:i,headers:o,data:d},request:c})}return Ee(u)}}).then(u=>({status:i,url:l,headers:o,data:u})).catch(u=>{throw u instanceof Se||u.name==="AbortError"?u:new Se(u.message,500,{request:c})})}S(me,"fetchWrapper");async function Ee(c){const n=c.headers.get("content-type");return/application\/json/.test(n)?c.json():!n||/^text\/|charset=utf-8$/.test(n)?c.text():M(c)}S(Ee,"getResponseData");function Ae(c){return typeof c=="string"?c:"message"in c?Array.isArray(c.errors)?`${c.message}: ${c.errors.map(JSON.stringify).join(", ")}`:c.message:`Unknown error: ${JSON.stringify(c)}`}S(Ae,"toErrorMessage");function xe(c,n){const o=c.defaults(n);return Object.assign(S(function(l,a){const u=o.merge(l,a);if(!u.request||!u.request.hook)return me(o.parse(u));const d=S((g,p)=>me(o.parse(o.merge(g,p))),"request");return Object.assign(d,{endpoint:o,defaults:xe.bind(null,o)}),u.request.hook(d,u)},"newApi"),{endpoint:o,defaults:xe.bind(null,o)})}S(xe,"dist_web_withDefaults");const _e=xe(Me,{headers:{"user-agent":`octokit-request.js/${Ve} ${_()}`}}),R="5.0.1";function We(c){return`Request failed due to following response errors:
`+c.errors.map(n=>` - ${n.message}`).join(`
`)}S(We,"_buildMessageForResponseErrors");class L extends Error{constructor(n,o,i){super(We(i)),this.request=n,this.headers=o,this.response=i,this.name="GraphqlResponseError",this.errors=i.errors,this.data=i.data,Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}}S(L,"GraphqlResponseError");const e=["method","baseUrl","url","headers","request","query","mediaType"],r=["query","method","url"],t=/\/api\/v3\/?$/;function s(c,n,o){if(o){if(typeof n=="string"&&"query"in o)return Promise.reject(new Error('[@octokit/graphql] "query" cannot be used as variable name'));for(const u in o)if(!!r.includes(u))return Promise.reject(new Error(`[@octokit/graphql] "${u}" cannot be used as variable name`))}const i=typeof n=="string"?Object.assign({query:n},o):n,l=Object.keys(i).reduce((u,d)=>e.includes(d)?(u[d]=i[d],u):(u.variables||(u.variables={}),u.variables[d]=i[d],u),{}),a=i.baseUrl||c.endpoint.DEFAULTS.baseUrl;return t.test(a)&&(l.url=a.replace(t,"/api/graphql")),c(l).then(u=>{if(u.data.errors){const d={};for(const g of Object.keys(u.headers))d[g]=u.headers[g];throw new L(l,d,u.data)}return u.data.data})}S(s,"graphql");function h(c,n){const o=c.defaults(n);return Object.assign(S((l,a)=>s(o,l,a),"newApi"),{defaults:h.bind(null,o),endpoint:_e.endpoint})}S(h,"graphql_dist_web_withDefaults");const m=h(_e,{headers:{"user-agent":`octokit-graphql.js/${R} ${_()}`},method:"POST",url:"/graphql"});function f(c){return h(c,{method:"POST",url:"/graphql"})}S(f,"withCustomRequest");const v=/^v1\./,C=/^ghs_/,F=/^ghu_/;async function P(c){const n=c.split(/\./).length===3,o=v.test(c)||C.test(c),i=F.test(c);return{type:"token",token:c,tokenType:n?"app":o?"installation":i?"user-to-server":"oauth"}}S(P,"auth");function D(c){return c.split(/\./).length===3?`bearer ${c}`:`token ${c}`}S(D,"withAuthorizationPrefix");async function A(c,n,o,i){const l=n.endpoint.merge(o,i);return l.headers.authorization=D(c),n(l)}S(A,"hook");const H=S(function(n){if(!n)throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");if(typeof n!="string")throw new Error("[@octokit/auth-token] Token passed to createTokenAuth is not a string");return n=n.replace(/^(token|bearer) +/i,""),Object.assign(P.bind(null,n),{hook:A.bind(null,n)})},"createTokenAuth"),W="4.0.5";class E{constructor(n={}){const o=new K.Collection,i={baseUrl:_e.endpoint.DEFAULTS.baseUrl,headers:{},request:Object.assign({},n.request,{hook:o.bind(null,"request")}),mediaType:{previews:[],format:""}};if(i.headers["user-agent"]=[n.userAgent,`octokit-core.js/${W} ${_()}`].filter(Boolean).join(" "),n.baseUrl&&(i.baseUrl=n.baseUrl),n.previews&&(i.mediaType.previews=n.previews),n.timeZone&&(i.headers["time-zone"]=n.timeZone),this.request=_e.defaults(i),this.graphql=f(this.request).defaults(i),this.log=Object.assign({debug:()=>{},info:()=>{},warn:console.warn.bind(console),error:console.error.bind(console)},n.log),this.hook=o,n.authStrategy){const{authStrategy:a,...u}=n,d=a(Object.assign({request:this.request,log:this.log,octokit:this,octokitOptions:u},n.auth));o.wrap("request",d.hook),this.auth=d}else if(!n.auth)this.auth=async()=>({type:"unauthenticated"});else{const a=H(n.auth);o.wrap("request",a.hook),this.auth=a}this.constructor.plugins.forEach(a=>{Object.assign(this,a(this,n))})}static defaults(n){return S(class extends this{constructor(...i){const l=i[0]||{};if(typeof n=="function"){super(n(l));return}super(Object.assign({},n,l,l.userAgent&&n.userAgent?{userAgent:`${l.userAgent} ${n.userAgent}`}:null))}},"OctokitWithDefaults")}static plugin(...n){var o;const i=this.plugins;return o=S(class extends this{},"_a"),o.plugins=i.concat(n.filter(a=>!i.includes(a))),o}}S(E,"Octokit"),E.VERSION=W,E.plugins=[];var N=w(9496),q=w(1149),O=w(4673),U=w(9179),$=w(5396),de=w(5059),V=w(3082),ae=w(7530),ce=w(2436),Ce=w(1999),B=w(7369),Pe=w(9417),ye=w(2971),ze=w(565),Xe=w(8301),Je=Object.defineProperty,at=Object.getOwnPropertyDescriptor,lt=S((c,n,o)=>n in c?Je(c,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):c[n]=o,"__defNormalProp"),ne=S((c,n,o,i)=>{for(var l=i>1?void 0:i?at(n,o):n,a=c.length-1,u;a>=0;a--)(u=c[a])&&(l=(i?u(n,o,l):u(l))||l);return i&&l&&Je(n,o,l),l},"__decorateClass"),Be=S((c,n,o)=>(lt(c,typeof n!="symbol"?n+"":n,o),o),"__publicField");const $e=Object.freeze({values:[]}),Ke=Object.freeze({ranges:[]});class ee{constructor(n){Be(this,"_onDidReauthenticate",new N.EventEmitter),Be(this,"_disposable"),Be(this,"_proxyAgent",null),Be(this,"_enterpriseVersions",new Map),Be(this,"_octokits",new Map),this._disposable=N.Disposable.from(U.DN.onDidChange(o=>{(U.DN.changed(o,"proxy")||U.DN.changed(o,"outputLevel"))&&this.resetCaches()}),U.DN.onDidChangeAny(o=>{(o.affectsConfiguration("http.proxy")||o.affectsConfiguration("http.proxyStrictSSL"))&&this.resetCaches()}))}get onDidReauthenticate(){return this._onDidReauthenticate.event}dispose(){var n;(n=this._disposable)==null||n.dispose()}resetCaches(){this._proxyAgent=null,this._octokits.clear(),this._enterpriseVersions.clear()}get proxyAgent(){if(!O.$L)return this._proxyAgent===null&&(this._proxyAgent=(0,q.Nx)()),this._proxyAgent}async getAccountForCommit(n,o,i,l,a,u){var d,g;const p=(0,B.UH)();try{const b=`query getAccountForCommit(
	$owner: String!
	$repo: String!
	$ref: GitObjectID!
	$avatarSize: Int
) {
	repository(name: $repo, owner: $owner) {
		object(oid: $ref) {
			... on Commit {
				author {
					name
					email
					avatarUrl(size: $avatarSize)
				}
			}
		}
	}
}`,x=await this.graphql(n,o,b,{...u,owner:i,repo:l,ref:a},p),T=(g=(d=x?.repository)==null?void 0:d.object)==null?void 0:g.author;return T==null?void 0:{provider:n,name:T.name??void 0,email:T.email??void 0,avatarUrl:!T.avatarUrl||Qe(u)?T.avatarUrl??void 0:T.email&&u?.baseUrl!=null?await this.createEnterpriseAvatarUrl(n,o,u.baseUrl,T.email,u.avatarSize):void 0}}catch(b){if(b instanceof $.Ww)return;throw this.handleException(b,n,p)}}async getAccountForEmail(n,o,i,l,a,u){var d,g;const p=(0,B.UH)();try{const b=`query getAccountForEmail(
	$emailQuery: String!
	$avatarSize: Int
) {
	search(type: USER, query: $emailQuery, first: 1) {
		nodes {
			... on User {
				name
				email
				avatarUrl(size: $avatarSize)
			}
		}
	}
}`,x=await this.graphql(n,o,b,{...u,owner:i,repo:l,emailQuery:`in:email ${a}`},p),T=(g=(d=x?.search)==null?void 0:d.nodes)==null?void 0:g[0];return T==null?void 0:{provider:n,name:T.name??void 0,email:T.email??void 0,avatarUrl:!T.avatarUrl||Qe(u)?T.avatarUrl??void 0:T.email&&u?.baseUrl!=null?await this.createEnterpriseAvatarUrl(n,o,u.baseUrl,T.email,u.avatarSize):void 0}}catch(b){if(b instanceof $.Ww)return;throw this.handleException(b,n,p)}}async getDefaultBranch(n,o,i,l,a){var u,d;const g=(0,B.UH)();try{const p=`query getDefaultBranch(
	$owner: String!
	$repo: String!
) {
	repository(name: $repo, owner: $owner) {
		defaultBranchRef {
			name
		}
	}
}`,b=await this.graphql(n,o,p,{...a,owner:i,repo:l},g),x=((d=(u=b?.repository)==null?void 0:u.defaultBranchRef)==null?void 0:d.name)??void 0;return x==null?void 0:{provider:n,name:x}}catch(p){if(p instanceof $.Ww)return;throw this.handleException(p,n,g)}}async getIssueOrPullRequest(n,o,i,l,a,u){var d;const g=(0,B.UH)();try{const p=`query getIssueOrPullRequest(
	$owner: String!
	$repo: String!
	$number: Int!
) {
	repository(name: $repo, owner: $owner) {
		issueOrPullRequest(number: $number) {
			__typename
			... on Issue {
				createdAt
				closed
				closedAt
				title
				url
			}
			... on PullRequest {
				createdAt
				closed
				closedAt
				title
				url
			}
		}
	}
}`,b=await this.graphql(n,o,p,{...u,owner:i,repo:l,number:a},g),x=(d=b?.repository)==null?void 0:d.issueOrPullRequest;return x==null?void 0:{provider:n,type:x.type,id:String(a),date:new Date(x.createdAt),title:x.title,closed:x.closed,closedDate:x.closedAt==null?void 0:new Date(x.closedAt),url:x.url}}catch(p){if(p instanceof $.Ww)return;throw this.handleException(p,n,g)}}async getPullRequestForBranch(n,o,i,l,a,u){var d,g,p,b;const x=(0,B.UH)();try{const T=`query getPullRequestForBranch(
	$owner: String!
	$repo: String!
	$branch: String!
	$limit: Int!
	$include: [PullRequestState!]
	$avatarSize: Int
) {
	repository(name: $repo, owner: $owner) {
		refs(query: $branch, refPrefix: "refs/heads/", first: 1) {
			nodes {
				associatedPullRequests(first: $limit, orderBy: {field: UPDATED_AT, direction: DESC}, states: $include) {
					nodes {
						author {
							login
							avatarUrl(size: $avatarSize)
							url
						}
						permalink
						number
						title
						state
						updatedAt
						closedAt
						mergedAt
						repository {
							isFork
							owner {
								login
							}
						}
					}
				}
			}
		}
	}
}`,X=await this.graphql(n,o,T,{...u,owner:i,repo:l,branch:a,limit:10},x),j=(b=(p=(g=(d=X?.repository)==null?void 0:d.refs.nodes[0])==null?void 0:g.associatedPullRequests)==null?void 0:p.nodes)==null?void 0:b.filter(Q=>Q!=null&&(!Q.repository.isFork||Q.repository.owner.login===i));return j==null||j.length===0?void 0:(j.length>1&&j.sort((Q,ie)=>(Q.repository.owner.login===i?-1:1)-(ie.repository.owner.login===i?-1:1)||(Q.state==="OPEN"?-1:1)-(ie.state==="OPEN"?-1:1)||new Date(ie.updatedAt).getTime()-new Date(Q.updatedAt).getTime()),Xe.GitHubPullRequest.from(j[0],n))}catch(T){if(T instanceof $.Ww)return;throw this.handleException(T,n,x)}}async getPullRequestForCommit(n,o,i,l,a,u){var d,g,p,b;const x=(0,B.UH)();try{const T=`query getPullRequestForCommit(
	$owner: String!
	$repo: String!
	$ref: GitObjectID!
	$avatarSize: Int
) {
	repository(name: $repo, owner: $owner) {
		object(oid: $ref) {
			... on Commit {
				associatedPullRequests(first: 2, orderBy: {field: UPDATED_AT, direction: DESC}) {
					nodes {
						author {
							login
							avatarUrl(size: $avatarSize)
							url
						}
						permalink
						number
						title
						state
						updatedAt
						closedAt
						mergedAt
						repository {
							isFork
							owner {
								login
							}
						}
					}
				}
			}
		}
	}
}`,X=await this.graphql(n,o,T,{...u,owner:i,repo:l,ref:a},x),j=(b=(p=(g=(d=X?.repository)==null?void 0:d.object)==null?void 0:g.associatedPullRequests)==null?void 0:p.nodes)==null?void 0:b.filter(Q=>Q!=null&&(!Q.repository.isFork||Q.repository.owner.login===i));return j==null||j.length===0?void 0:(j.length>1&&j.sort((Q,ie)=>(Q.repository.owner.login===i?-1:1)-(ie.repository.owner.login===i?-1:1)||(Q.state==="OPEN"?-1:1)-(ie.state==="OPEN"?-1:1)||new Date(ie.updatedAt).getTime()-new Date(Q.updatedAt).getTime()),Xe.GitHubPullRequest.from(j[0],n))}catch(T){if(T instanceof $.Ww)return;throw this.handleException(T,n,x)}}async getBlame(n,o,i,l,a){var u,d,g,p,b;const x=(0,B.UH)();try{const T=`query getBlameRanges(
	$owner: String!
	$repo: String!
	$ref: String!
	$path: String!
) {
	viewer { name }
	repository(owner: $owner, name: $repo) {
		object(expression: $ref) {
			...on Commit {
				blame(path: $path) {
					ranges {
						startingLine
						endingLine
						commit {
							oid
							parents(first: 3) { nodes { oid } }
							message
							additions
							changedFiles
							deletions
							author {
								avatarUrl
								date
								email
								name
							}
							committer {
								date
								email
								name
							}
						}
					}
				}
			}
		}
	}
}`,X=await this.graphql(void 0,n,T,{owner:o,repo:i,ref:l,path:a},x);if(X==null)return Ke;const j=(g=(d=(u=X.repository)==null?void 0:u.object)==null?void 0:d.blame)==null?void 0:g.ranges;return j==null||j.length===0?{ranges:[],viewer:(p=X.viewer)==null?void 0:p.name}:{ranges:j,viewer:(b=X.viewer)==null?void 0:b.name}}catch(T){if(T instanceof $.Ww)return Ke;throw this.handleException(T,void 0,x)}}async getBranches(n,o,i,l){var a;const u=(0,B.UH)();try{const d=`query getBranches(
	$owner: String!
	$repo: String!
	$branchQuery: String
	$cursor: String
	$limit: Int = 100
) {
	repository(owner: $owner, name: $repo) {
		refs(query: $branchQuery, refPrefix: "refs/heads/", first: $limit, after: $cursor, orderBy: { field: TAG_COMMIT_DATE, direction: DESC }) {
			pageInfo {
				endCursor
				hasNextPage
			}
			nodes {
				name
				target {
					oid
					commitUrl
					...on Commit {
						authoredDate
						committedDate
					}
				}
			}
		}
	}
}`,g=await this.graphql(void 0,n,d,{owner:o,repo:i,branchQuery:l?.query,cursor:l?.cursor,limit:Math.min(100,l?.limit??100)},u);if(g==null)return $e;const p=(a=g.repository)==null?void 0:a.refs;return p==null?$e:{paging:{cursor:p.pageInfo.endCursor,more:p.pageInfo.hasNextPage},values:p.nodes}}catch(d){if(d instanceof $.Ww)return $e;throw this.handleException(d,void 0,u)}}async getCommit(n,o,i,l){var a,u,d,g,p,b,x,T,X,j;const Q=(0,B.UH)();try{const ie=await this.request(void 0,n,"GET /repos/{owner}/{repo}/commits/{ref}",{owner:o,repo:i,ref:l},Q),we=ie?.data;if(we==null)return;const{commit:Re}=we;return{oid:we.sha,parents:{nodes:we.parents.map(Ge=>({oid:Ge.sha}))},message:Re.message,additions:(a=we.stats)==null?void 0:a.additions,changedFiles:(u=we.files)==null?void 0:u.length,deletions:(d=we.stats)==null?void 0:d.deletions,author:{avatarUrl:((g=we.author)==null?void 0:g.avatar_url)??void 0,date:((p=Re.author)==null?void 0:p.date)??new Date().toString(),email:((b=Re.author)==null?void 0:b.email)??void 0,name:((x=Re.author)==null?void 0:x.name)??""},committer:{date:((T=Re.committer)==null?void 0:T.date)??new Date().toString(),email:((X=Re.committer)==null?void 0:X.email)??void 0,name:((j=Re.committer)==null?void 0:j.name)??""},files:we.files}}catch(ie){if(ie instanceof $.Ww)return;throw this.handleException(ie,void 0,Q)}}async getCommitForFile(n,o,i,l,a){if(V.p.isSha(l))return this.getCommit(n,o,i,l);const u=await this.getCommits(n,o,i,l,{limit:1,path:a});return u.values.length===0?void 0:{...await this.getCommit(n,o,i,u.values[0].oid)??u.values[0],viewer:u.viewer}}async getCommitBranches(n,o,i,l,a){var u,d;const g=(0,B.UH)();try{const p=`query getCommitBranches(
	$owner: String!
	$repo: String!
	$since: GitTimestamp!
	$until: GitTimestamp!
) {
	repository(owner: $owner, name: $repo) {
		refs(first: 20, refPrefix: "refs/heads/", orderBy: { field: TAG_COMMIT_DATE, direction: DESC }) {
			nodes {
				name
				target {
					... on Commit {
						history(first: 3, since: $since until: $until) {
							nodes { oid }
						}
					}
				}
			}
		}
	}
}`,b=await this.graphql(void 0,n,p,{owner:o,repo:i,since:a.toISOString(),until:a.toISOString()},g),x=(d=(u=b?.repository)==null?void 0:u.refs)==null?void 0:d.nodes;if(x==null)return[];const T=[];for(const X of x)for(const j of X.target.history.nodes)if(j.oid===l){T.push(X.name);break}return T}catch(p){if(p instanceof $.Ww)return[];throw this.handleException(p,void 0,g)}}async getCommitCount(n,o,i,l){var a,u;const d=(0,B.UH)();try{const g=`query getCommitCount(
	$owner: String!
	$repo: String!
	$ref: String!
) {
	repository(owner: $owner, name: $repo) {
		ref(qualifiedName: $ref) {
			target {
				... on Commit {
					history(first: 1) {
						totalCount
					}
				}
			}
		}
	}
}`,p=await this.graphql(void 0,n,g,{owner:o,repo:i,ref:l},d);return(u=(a=p?.repository)==null?void 0:a.ref)==null?void 0:u.target.history.totalCount}catch(g){if(g instanceof $.Ww)return;throw this.handleException(g,void 0,d)}}async getCommitOnBranch(n,o,i,l,a,u){var d;const g=(0,B.UH)();try{const p=`query getCommitOnBranch(
	$owner: String!
	$repo: String!
	$ref: String!
	$since: GitTimestamp!
	$until: GitTimestamp!
) {
	repository(owner: $owner, name: $repo) {
		ref(qualifiedName: $ref) {
			target {
				... on Commit {
					history(first: 3, since: $since until: $until) {
						nodes { oid }
					}
				}
			}
		}
	}
}`,b=await this.graphql(void 0,n,p,{owner:o,repo:i,ref:`refs/heads/${l}`,since:u.toISOString(),until:u.toISOString()},g),x=(d=b?.repository)==null?void 0:d.ref.target.history.nodes;if(x==null)return[];const T=[];for(const X of x)if(X.oid===a){T.push(l);break}return T}catch(p){if(p instanceof $.Ww)return[];throw this.handleException(p,void 0,g)}}async getCommits(n,o,i,l,a){var u,d,g,p;const b=(0,B.UH)();if(a?.limit===1&&a?.path==null)return this.getCommitsCoreSingle(n,o,i,l);try{const x=`query getCommits(
	$owner: String!
	$repo: String!
	$ref: String!
	$path: String
	$author: CommitAuthor
	$after: String
	$before: String
	$limit: Int = 100
	$since: GitTimestamp
	$until: GitTimestamp
) {
	viewer { name }
	repository(name: $repo, owner: $owner) {
		object(expression: $ref) {
			... on Commit {
				history(first: $limit, author: $author, path: $path, after: $after, before: $before, since: $since, until: $until) {
					pageInfo {
						startCursor
						endCursor
						hasNextPage
						hasPreviousPage
					}
					nodes {
						... on Commit {
							oid
							message
							parents(first: 3) { nodes { oid } }
							additions
							changedFiles
							deletions
							author {
								avatarUrl
								date
								email
								name
							}
							committer {
								 date
								 email
								 name
							 }
						}
					}
				}
			}
		}
	}
}`;let T;if(a?.authors!=null)if(a.authors.length===1){const[Q]=a.authors;T={id:Q.id,emails:Q.email?[Q.email]:void 0}}else{const Q=a.authors.filter(ie=>ie.email).map(ie=>ie.email);T=Q.length?{emails:Q}:void 0}const X=await this.graphql(void 0,n,x,{owner:o,repo:i,ref:l,after:a?.after,before:a?.before,path:a?.path,author:T,limit:Math.min(100,a?.limit??100),since:typeof a?.since=="string"?a?.since:(u=a?.since)==null?void 0:u.toISOString(),until:typeof a?.until=="string"?a?.until:(d=a?.until)==null?void 0:d.toISOString()},b),j=(p=(g=X?.repository)==null?void 0:g.object)==null?void 0:p.history;return j==null?$e:{paging:j.pageInfo.endCursor!=null?{cursor:j.pageInfo.endCursor??void 0,more:j.pageInfo.hasNextPage}:void 0,values:j.nodes,viewer:X?.viewer.name}}catch(x){if(x instanceof $.Ww)return $e;throw this.handleException(x,void 0,b)}}async getCommitsCoreSingle(n,o,i,l){var a;const u=(0,B.UH)();try{const d=`query getCommit(
	$owner: String!
	$repo: String!
	$ref: String!
) {
	viewer { name }
	repository(name: $repo owner: $owner) {
		object(expression: $ref) {
			...on Commit {
				oid
				parents(first: 3) { nodes { oid } }
				message
				additions
				changedFiles
				deletions
				author {
					avatarUrl
					date
					email
					name
				}
				committer {
					date
					email
					name
				}
			}
		}
	}
}`,g=await this.graphql(void 0,n,d,{owner:o,repo:i,ref:l},u);if(g==null)return $e;const p=(a=g.repository)==null?void 0:a.object;return p!=null?{values:[p],viewer:g.viewer.name}:$e}catch(d){if(d instanceof $.Ww)return $e;throw this.handleException(d,void 0,u)}}async getCommitRefs(n,o,i,l,a){var u,d;const g=(0,B.UH)();try{const p=`query getCommitRefs(
	$owner: String!
	$repo: String!
	$ref: String!
	$after: String
	$before: String
	$first: Int
	$last: Int
	$path: String
	$since: GitTimestamp
	$until: GitTimestamp
) {
	repository(name: $repo, owner: $owner) {
		object(expression: $ref) {
			... on Commit {
				history(first: $first, last: $last, path: $path, since: $since, until: $until, after: $after, before: $before) {
					pageInfo { startCursor, endCursor, hasNextPage, hasPreviousPage }
					totalCount
					nodes { oid }
				}
			}
		}
	}
}`,b=await this.graphql(void 0,n,p,{owner:o,repo:i,ref:l,path:a?.path,first:a?.first,last:a?.last,after:a?.after,before:a?.before,since:a?.since,until:a?.until},g),x=(d=(u=b?.repository)==null?void 0:u.object)==null?void 0:d.history;return x==null?void 0:{pageInfo:x.pageInfo,totalCount:x.totalCount,values:x.nodes}}catch(p){if(p instanceof $.Ww)return;throw this.handleException(p,void 0,g)}}async getNextCommitRefs(n,o,i,l,a,u){const d=await this.getCommitDate(n,o,i,u);if(d==null)return[];let g=await this.getCommitRefs(n,o,i,l,{path:a,first:1,since:d});if(g==null)return[];const p=`${g.pageInfo.startCursor.split(" ",1)[0]} ${g.totalCount}`;let b;if([,b]=p.split(" ",2),b=Math.min(parseInt(b,10),5),g=await this.getCommitRefs(n,o,i,l,{path:a,last:b,before:p}),g==null)return[];const x=[];for(const{oid:T}of g.values){if(T===u)break;x.push(T)}return x.reverse()}async getCommitDate(n,o,i,l){var a,u;const d=(0,B.UH)();try{const g=`query getCommitDate(
	$owner: String!
	$repo: String!
	$sha: GitObjectID!
) {
	repository(name: $repo, owner: $owner) {
		object(oid: $sha) {
			... on Commit { committer { date } }
		}
	}
}`,p=await this.graphql(void 0,n,g,{owner:o,repo:i,sha:l},d);return(u=(a=p?.repository)==null?void 0:a.object)==null?void 0:u.committer.date}catch(g){if(g instanceof $.Ww)return;throw this.handleException(g,void 0,d)}}async getContributors(n,o,i){const l=(0,B.UH)();try{const a=await this.request(void 0,n,"GET /repos/{owner}/{repo}/contributors",{owner:o,repo:i,per_page:100},l);return a?.data==null?[]:a.data}catch(a){if(a instanceof $.Ww)return[];throw this.handleException(a,void 0,l)}}async getDefaultBranchName(n,o,i){var l,a;const u=(0,B.UH)();try{const d=`query getDefaultBranch(
	$owner: String!
	$repo: String!
) {
	repository(owner: $owner, name: $repo) {
		defaultBranchRef {
			name
		}
	}
}`,g=await this.graphql(void 0,n,d,{owner:o,repo:i},u);return g==null?void 0:((a=(l=g.repository)==null?void 0:l.defaultBranchRef)==null?void 0:a.name)??void 0}catch(d){if(d instanceof $.Ww)return;throw this.handleException(d,void 0,u)}}async getCurrentUser(n,o,i){var l,a,u,d;const g=(0,B.UH)();try{const p=`query getCurrentUser(
	$owner: String!
	$repo: String!
) {
	viewer { name, email, login, id }
	repository(owner: $owner, name: $repo) { viewerPermission }
}`,b=await this.graphql(void 0,n,p,{owner:o,repo:i},g);return b==null?void 0:{name:(l=b.viewer)==null?void 0:l.name,email:(a=b.viewer)==null?void 0:a.email,username:(u=b.viewer)==null?void 0:u.login,id:(d=b.viewer)==null?void 0:d.id}}catch(p){if(p instanceof $.Ww)return;throw this.handleException(p,void 0,g)}}async getRepositoryVisibility(n,o,i){var l;const a=(0,B.UH)();try{const u=`query getRepositoryVisibility(
	$owner: String!
	$repo: String!
) {
	repository(owner: $owner, name: $repo) {
		visibility
	}
}`,d=await this.graphql(void 0,n,u,{owner:o,repo:i},a);return((l=d?.repository)==null?void 0:l.visibility)==null?void 0:d.repository.visibility==="PUBLIC"?de.q.Public:de.q.Private}catch(u){if(u instanceof $.Ww)return;throw this.handleException(u,void 0,a)}}async getTags(n,o,i,l){var a;const u=(0,B.UH)();try{const d=`query getTags(
	$owner: String!
	$repo: String!
	$tagQuery: String
	$cursor: String
	$limit: Int = 100
) {
	repository(owner: $owner, name: $repo) {
		refs(query: $tagQuery, refPrefix: "refs/tags/", first: $limit, after: $cursor, orderBy: { field: TAG_COMMIT_DATE, direction: DESC }) {
			pageInfo {
				endCursor
				hasNextPage
			}
			nodes {
				name
				target {
					oid
					commitUrl
					...on Commit {
						authoredDate
						committedDate
						message
					}
					...on Tag {
						message
						tagger { date }
					}
				}
			}
		}
	}
}`,g=await this.graphql(void 0,n,d,{owner:o,repo:i,tagQuery:l?.query,cursor:l?.cursor,limit:Math.min(100,l?.limit??100)},u);if(g==null)return $e;const p=(a=g.repository)==null?void 0:a.refs;return p==null?$e:{paging:{cursor:p.pageInfo.endCursor,more:p.pageInfo.hasNextPage},values:p.nodes}}catch(d){if(d instanceof $.Ww)return $e;throw this.handleException(d,void 0,u)}}async resolveReference(n,o,i,l,a){var u,d,g,p,b,x;const T=(0,B.UH)();try{if(!a){const Q=`query resolveReference(
	$owner: String!
	$repo: String!
	$ref: String!
) {
	repository(owner: $owner, name: $repo) {
		object(expression: $ref) {
			oid
		}
	}
}`,ie=await this.graphql(void 0,n,Q,{owner:o,repo:i,ref:l},T);return((d=(u=ie?.repository)==null?void 0:u.object)==null?void 0:d.oid)??void 0}const X=`query resolveReference(
	$owner: String!
	$repo: String!
	$ref: String!
	$path: String!
) {
	repository(owner: $owner, name: $repo) {
		object(expression: $ref) {
			... on Commit {
				history(first: 1, path: $path) {
					nodes { oid }
				}
			}
		}
	}
}`,j=await this.graphql(void 0,n,X,{owner:o,repo:i,ref:l,path:a},T);return((x=(b=(p=(g=j?.repository)==null?void 0:g.object)==null?void 0:p.history.nodes)==null?void 0:b[0])==null?void 0:x.oid)??void 0}catch(X){if(X instanceof $.Ww)return;throw this.handleException(X,void 0,T)}}async searchCommits(n,o,i){const l=(0,B.UH)(),a=Math.min(100,i?.limit??100);let u,d,g;i?.cursor!=null?([u,d,g]=i.cursor.split(" ",3),u=parseInt(u,10),d=parseInt(d,10),g=parseInt(g,10)):(u=1,d=a,g=0);try{const p=await this.request(void 0,n,"GET /search/commits",{q:o,sort:i?.sort,order:i?.order,per_page:d,page:u},l),b=p?.data;if(b==null||b.items.length===0)return;const x=b.items.map(j=>{var Q,ie,we,Re,Ge,Ze,et,tt,rt,nt,it,ot,st;return{oid:j.sha,parents:{nodes:j.parents.map(ut=>({oid:ut.sha}))},message:j.commit.message,author:{avatarUrl:((Q=j.author)==null?void 0:Q.avatar_url)??void 0,date:((ie=j.commit.author)==null?void 0:ie.date)??((we=j.commit.author)==null?void 0:we.date)??new Date().toString(),email:((Re=j.author)==null?void 0:Re.email)??((Ge=j.commit.author)==null?void 0:Ge.email)??void 0,name:((Ze=j.author)==null?void 0:Ze.name)??((et=j.commit.author)==null?void 0:et.name)??""},committer:{date:((tt=j.commit.committer)==null?void 0:tt.date)??((rt=j.committer)==null?void 0:rt.date)??new Date().toString(),email:((nt=j.committer)==null?void 0:nt.email)??((it=j.commit.committer)==null?void 0:it.email)??void 0,name:((ot=j.committer)==null?void 0:ot.name)??((st=j.commit.committer)==null?void 0:st.name)??""}}}),T=g+b.items.length,X=b.incomplete_results||b.total_count>T;return{pageInfo:{startCursor:`${u} ${d} ${g}`,endCursor:X?`${u+1} ${d} ${T}`:void 0,hasPreviousPage:b.total_count>0&&u>1,hasNextPage:X},totalCount:b.total_count,values:x}}catch(p){if(p instanceof $.Ww)return;throw this.handleException(p,void 0,l)}}async getEnterpriseVersion(n,o,i){var l;let a=this._enterpriseVersions.get(o);if(a!=null)return a;if(a===null)return;const u=(0,B.UH)();try{const d=await this.request(n,o,"GET /meta",i,u),g=(l=d?.data)==null?void 0:l.installed_version;a=g?(0,ze.mL)(g):null}catch{a=null}return this._enterpriseVersions.set(o,a),a??void 0}octokit(n,o){let i=this._octokits.get(n);if(i==null){let l;if(O.$L){let a=S(function(u,d){if(d.headers!=null){const{"user-agent":g,...p}=d.headers;g&&(d.headers=p)}return(0,q.he)(u,d)},"fetchCore");l=E.defaults({auth:`token ${n}`,request:{fetch:a}})}else l=E.defaults({auth:`token ${n}`,request:{agent:this.proxyAgent}});i=new l(o),this._octokits.set(n,i),(ce.Y.logLevel===ce.i.Debug||ce.Y.isDebugging)&&i.hook.wrap("request",async(a,u)=>{const d=new Pe.u(`[GITHUB] ${u.method} ${u.url}`,{log:!1});try{return await a(u)}finally{let g;try{if(typeof u.query=="string"){const p=/(^[^({\n]+)/.exec(u.query);g=` ${p?.[1].trim()??u.query}`}}catch{}d.stop({message:g})}})}return i}async graphql(n,o,i,l,a){var u,d,g,p,b;try{return await(0,q.a_)(n?.getIgnoreSSLErrors()??!1,()=>this.octokit(o).graphql(i,l))}catch(x){if(x instanceof L){switch((d=(u=x.errors)==null?void 0:u[0])==null?void 0:d.type){case"NOT_FOUND":throw new $.Ww(x);case"FORBIDDEN":throw new $._7("github",$.Jx.Forbidden,x);case"RATE_LIMITED":{let T;const X=(g=x.headers)==null?void 0:g["x-ratelimit-reset"];throw X!=null&&(T=parseInt(X,10),Number.isNaN(T)&&(T=void 0)),new $.yx(x,o,T)}}ce.Y.isDebugging&&N.window.showErrorMessage(`GitHub request failed: ${((b=(p=x.errors)==null?void 0:p[0])==null?void 0:b.message)??x.message}`)}else x instanceof Se?this.handleRequestError(n,o,x,a):ce.Y.isDebugging&&N.window.showErrorMessage(`GitHub request failed: ${x.message}`);throw x}}async request(n,o,i,l,a){try{return await(0,q.a_)(n?.getIgnoreSSLErrors()??!1,()=>this.octokit(o).request(i,l))}catch(u){throw u instanceof Se?this.handleRequestError(n,o,u,a):ce.Y.isDebugging&&N.window.showErrorMessage(`GitHub request failed: ${u.message}`),u}}handleRequestError(n,o,i,l){var a,u,d,g,p;switch(i.status){case 404:case 410:case 422:throw new $.Ww(i);case 401:throw new $._7("github",$.Jx.Unauthorized,i);case 403:if(i.message.includes("rate limit")){let b;const x=(u=(a=i.response)==null?void 0:a.headers)==null?void 0:u["x-ratelimit-reset"];throw x!=null&&(b=parseInt(x,10),Number.isNaN(b)&&(b=void 0)),new $.yx(i,o,b)}throw new $._7("github",$.Jx.Forbidden,i);case 500:ce.Y.error(i,l),i.response!=null&&(n?.trackRequestException(),(0,Ce.vF)(`${n?.name??"GitHub"} failed to respond and might be experiencing issues.${n?.custom?"":" Please visit the [GitHub status page](https://githubstatus.com) for more information."}`));return;case 502:if(ce.Y.error(i,l),i.message.includes("timeout")){n?.trackRequestException(),(0,Ce.s$)(n?.name??"GitHub");return}break;default:if(i.status>=400&&i.status<500)throw new $.Bn(i);break}ce.Y.error(i,l),ce.Y.isDebugging&&N.window.showErrorMessage(`GitHub request failed: ${((p=(g=(d=i.response)==null?void 0:d.errors)==null?void 0:g[0])==null?void 0:p.message)??i.message}`)}handleException(n,o,i){return ce.Y.error(n,i),n instanceof $._7&&this.showAuthenticationErrorMessage(n,o),n}async showAuthenticationErrorMessage(n,o){if(n.reason===$.Jx.Unauthorized||n.reason===$.Jx.Forbidden){const i="Reauthenticate";await N.window.showErrorMessage(`${n.message}. Would you like to try reauthenticating${n.reason===$.Jx.Forbidden?" to provide additional access":""}?`,i)===i&&(await o?.reauthenticate(),this._onDidReauthenticate.fire())}else N.window.showErrorMessage(n.message)}async createEnterpriseAvatarUrl(n,o,i,l,a){a=a??16;const u=await this.getEnterpriseVersion(n,o,{baseUrl:i});if((0,ze.L5)(u,">= 3.0.0")){let d;const g=(0,ae.at)(l);g!=null&&N.Uri.parse(i).authority===g.authority&&(g.userId!=null?d=`${i}/enterprise/avatars/u/${encodeURIComponent(g.userId)}?s=${a}`:g.login!=null&&(d=`${i}/enterprise/avatars/${encodeURIComponent(g.login)}?s=${a}`)),d==null&&(d=`${i}/enterprise/avatars/u/e?email=${encodeURIComponent(l)}&s=${a}`);const p=await(0,q.a_)(n?.getIgnoreSSLErrors()??!1,()=>(0,q.he)(d,{method:"GET",headers:{Authorization:`Bearer ${o}`}}));if(p.ok){const b=(0,ye.US)(new Uint8Array(await p.arrayBuffer()));return`data:${p.headers.get("content-type")};base64,${b}`}}return`https://avatars.githubusercontent.com/u/e?email=${encodeURIComponent(l)}&s=${a}`}}S(ee,"GitHubApi"),ne([(0,B.fF)({args:{0:c=>c.name,1:"<token>"}})],ee.prototype,"getAccountForCommit",1),ne([(0,B.fF)({args:{0:c=>c.name,1:"<token>"}})],ee.prototype,"getAccountForEmail",1),ne([(0,B.fF)({args:{0:c=>c.name,1:"<token>"}})],ee.prototype,"getDefaultBranch",1),ne([(0,B.fF)({args:{0:c=>c.name,1:"<token>"}})],ee.prototype,"getIssueOrPullRequest",1),ne([(0,B.fF)({args:{0:c=>c.name,1:"<token>"}})],ee.prototype,"getPullRequestForBranch",1),ne([(0,B.fF)({args:{0:c=>c.name,1:"<token>"}})],ee.prototype,"getPullRequestForCommit",1),ne([(0,B.fF)({args:{0:"<token>"}})],ee.prototype,"getBlame",1),ne([(0,B.fF)({args:{0:"<token>"}})],ee.prototype,"getBranches",1),ne([(0,B.fF)({args:{0:"<token>"}})],ee.prototype,"getCommit",1),ne([(0,B.fF)({args:{0:"<token>"}})],ee.prototype,"getCommitForFile",1),ne([(0,B.fF)({args:{0:"<token>"}})],ee.prototype,"getCommitBranches",1),ne([(0,B.fF)({args:{0:"<token>"}})],ee.prototype,"getCommitCount",1),ne([(0,B.fF)({args:{0:"<token>"}})],ee.prototype,"getCommitOnBranch",1),ne([(0,B.fF)({args:{0:"<token>"}})],ee.prototype,"getCommits",1),ne([(0,B.fF)({args:{0:"<token>"}})],ee.prototype,"getCommitRefs",1),ne([(0,B.fF)({args:{0:"<token>"}})],ee.prototype,"getNextCommitRefs",1),ne([(0,B.fF)({args:{0:"<token>"}})],ee.prototype,"getContributors",1),ne([(0,B.fF)({args:{0:"<token>"}})],ee.prototype,"getDefaultBranchName",1),ne([(0,B.fF)({args:{0:"<token>"}})],ee.prototype,"getCurrentUser",1),ne([(0,B.fF)({args:{0:"<token>"}})],ee.prototype,"getRepositoryVisibility",1),ne([(0,B.fF)({args:{0:"<token>"}})],ee.prototype,"getTags",1),ne([(0,B.fF)({args:{0:"<token>"}})],ee.prototype,"resolveReference",1),ne([(0,B.fF)({args:{0:"<token>"}})],ee.prototype,"searchCommits",1),ne([(0,B.fF)({args:{0:"<token>"}})],ee.prototype,"getEnterpriseVersion",1);function Qe(c){return c?.baseUrl==null||c.baseUrl==="https://api.github.com"}S(Qe,"isGitHubDotCom")},3333:(le,oe,w)=>{"use strict";w.r(oe),w.d(oe,{GitHubGitProvider:()=>R});var _=w(9496),K=w(7267),Y=w(9179),G=w(1045),I=w(313),re=w(2721),k=w(5396),fe=w(6532),Z=w(5059),ue=w(2324),he=w(2742),z=w(8031),ve=w(9735),se=w(3901),ge=w(4905),te=w(3082),be=w(2804),Te=w(8991),Le=w(3492),Ye=w(6016),qe=w(189),He=w(3969),J=w(2436),Fe=w(5861),y=w(7369),De=w(2886),pe=w(516),Me=w(680),Oe=w(2378);async function Ne(L){try{const e=_.extensions.getExtension("ms-vscode.remote-repositories")??_.extensions.getExtension("GitHub.remotehub");if(e==null)throw J.Y.log("GitHub Repositories extension is not installed or enabled"),new k.R5("GitHub Repositories","GitHub.remotehub");return e.isActive?e.exports:await e.activate()}catch(e){if(J.Y.error(e,"Unable to get required api from the GitHub Repositories extension"),e instanceof k.R5,L)return;throw e}}S(Ne,"getRemoteHubApi");var ke=(L=>(L[L.Branch=0]="Branch",L[L.RemoteBranch=1]="RemoteBranch",L[L.Tag=2]="Tag",L[L.Commit=3]="Commit",L))(ke||{}),je=(L=>(L[L.Branch=0]="Branch",L[L.Tag=1]="Tag",L[L.Commit=2]="Commit",L[L.PullRequest=3]="PullRequest",L[L.Tree=4]="Tree",L))(je||{}),Ue=w(8301),Ie=Object.defineProperty,Se=Object.getOwnPropertyDescriptor,Ve=S((L,e,r)=>e in L?Ie(L,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):L[e]=r,"__defNormalProp"),M=S((L,e,r,t)=>{for(var s=t>1?void 0:t?Se(e,r):e,h=L.length-1,m;h>=0;h--)(m=L[h])&&(s=(t?m(e,r,s):m(s))||s);return t&&s&&Ie(e,r,s),s},"__decorateClass"),me=S((L,e,r)=>(Ve(L,typeof e!="symbol"?e+"":e,r),r),"__publicField");const Ee=Object.freeze({values:[]}),Ae=Promise.resolve(void 0),xe=["repo","read:user","user:email"],_e=/^[^/](?!.*\/\.)(?!.*\.\.)(?!.*\/\/)(?!.*@\{)[^\000-\037\177 ~^:?*[\\]+[^./]$/;class R{constructor(e){this.container=e,me(this,"descriptor",{id:Z.p.GitHub,name:"GitHub",virtual:!0}),me(this,"supportedSchemes",new Set([G.sN.Virtual,G.sN.GitHub,G.sN.PRs])),me(this,"_onDidChangeRepository",new _.EventEmitter),me(this,"_onDidCloseRepository",new _.EventEmitter),me(this,"_onDidOpenRepository",new _.EventEmitter),me(this,"_branchesCache",new Map),me(this,"_repoInfoCache",new Map),me(this,"_tagsCache",new Map),me(this,"_disposables",[]),me(this,"_github"),me(this,"_remotehub"),me(this,"_remotehubPromise"),me(this,"_sessionPromise"),this._disposables.push(_.authentication.onDidChangeSessions(this.onAuthenticationSessionsChanged,this))}get onDidChangeRepository(){return this._onDidChangeRepository.event}get onDidCloseRepository(){return this._onDidCloseRepository.event}get onDidOpenRepository(){return this._onDidOpenRepository.event}dispose(){this._disposables.forEach(e=>void e.dispose())}onAuthenticationSessionsChanged(e){e.provider.id==="github"&&(this._sessionPromise=void 0,this.ensureSession(!1,!0))}onRepositoryChanged(e,r){this._branchesCache.delete(e.path),this._tagsCache.delete(e.path),this._repoInfoCache.delete(e.path),this._onDidChangeRepository.fire(r)}async discoverRepositories(e){if(!this.supportedSchemes.has(e.scheme))return[];try{const{remotehub:r}=await this.ensureRepositoryContext(e.toString(),!0),t=r.getVirtualWorkspaceUri(e);return t==null?[]:this.openRepository(void 0,t,!0)}catch{return[]}}updateContext(){(0,I.v)(G.zf.HasVirtualFolders,this.container.git.hasOpenRepositories(this.descriptor.id))}openRepository(e,r,t,s,h){return[new Te._j(this.container,this.onRepositoryChanged.bind(this),this.descriptor,e,r,t,s??!_.window.state.focused,h)]}async supports(e){switch(e){case fe.A.Stashes:case fe.A.Worktrees:return!1;default:return!0}}async visibility(e){const r=await this.getRemotes(e);if(r.length===0)return Z.q.Local;const t=r.find(s=>s.name==="origin");return t!=null?this.getRemoteVisibility(t):Z.q.Private}async getRemoteVisibility(e){var r;switch((r=e.provider)==null?void 0:r.id){case"github":{const{github:t,metadata:s,session:h}=await this.ensureRepositoryContext(e.repoPath);return await t.getRepositoryVisibility(h.accessToken,s.repo.owner,s.repo.name)??Z.q.Private}default:return Z.q.Private}}async getOpenScmRepositories(){return[]}async getScmRepository(e){}async getOrOpenScmRepository(e){}canHandlePathOrUri(e,r){if(!!this.supportedSchemes.has(e))return typeof r=="string"?r:r.toString()}getAbsoluteUri(e,r){if(typeof r=="string")if((0,pe.tE)(r))r=_.Uri.parse(r,!0);else throw _.window.showErrorMessage(`Unable to get absolute uri between ${typeof e=="string"?e:e.toString(!0)} and ${r}; Base path '${r}' must be a uri`),new Error(`Base path '${r}' must be a uri`);if(typeof e=="string"&&!(0,pe.tE)(e)&&!(0,pe.YP)(e))return _.Uri.joinPath(r,(0,pe.AH)(e));const t=this.getRelativePath(e,r);return _.Uri.joinPath(r,t)}async getBestRevisionUri(e,r,t){return t?this.createProviderUri(e,t,r):this.createVirtualUri(e,t,r)}getRelativePath(e,r){if(typeof r=="string")if((0,pe.tE)(r))r=_.Uri.parse(r,!0);else throw _.window.showErrorMessage(`Unable to get relative path between ${typeof e=="string"?e:e.toString(!0)} and ${r}; Base path '${r}' must be a uri`),new Error(`Base path '${r}' must be a uri`);let t;if(typeof e=="string")if((0,pe.tE)(e))e=_.Uri.parse(e,!0);else return e=(0,pe.AH)(e),t=(0,pe.YP)(e)&&e.startsWith(r.path)?e.slice(r.path.length):e,t.charCodeAt(0)===G.mN.Slash&&(t=t.slice(1)),t;return t=(0,pe.AH)((0,pe.Gf)(r.path.slice(1),e.path.slice(1))),t}getRevisionUri(e,r,t){const s=this.createProviderUri(e,t,r);return t===te.p.deletedOrMissing?s.with({query:"~"}):s}async getWorkingUri(e,r){return this.createVirtualUri(e,void 0,r.path)}async addRemote(e,r,t){}async pruneRemote(e,r){}async applyChangesToWorkingFile(e,r,t){}async branchContainsCommit(e,r,t){return!1}async checkout(e,r,t){}resetCaches(...e){(e.length===0||e.includes("branches"))&&this._branchesCache.clear(),(e.length===0||e.includes("tags"))&&this._tagsCache.clear(),e.length===0&&this._repoInfoCache.clear()}async excludeIgnoredUris(e,r){return r}async fetch(e,r){}async findRepositoryUri(e,r){const t=(0,y.UH)();try{return(await this.ensureRemoteHubApi()).getProviderRootUri(e).with({scheme:G.sN.Virtual})}catch(s){s instanceof k.R5,J.Y.error(s,t);return}}async getAheadBehindCommitCount(e,r){}async getBlame(e,r){const t=(0,y.UH)();if(r?.isDirty)return;let s="blame";e.sha!=null&&(s+=`:${e.sha}`);const h=await this.container.tracker.getOrAdd(e);if(h.state!=null){const f=h.state.getBlame(s);if(f!=null)return J.Y.debug(t,`Cache hit: '${s}'`),f.item}J.Y.debug(t,`Cache miss: '${s}'`),h.state==null&&(h.state=new Oe.p2);const m=this.getBlameCore(e,h,s,t);if(h.state!=null){J.Y.debug(t,`Cache add: '${s}'`);const f={item:m};h.state.setBlame(s,f)}return m}async getBlameCore(e,r,t,s){var h,m;try{const f=await this.ensureRepositoryContext(e.repoPath);if(f==null)return;const{metadata:v,github:C,remotehub:F,session:P}=f,D=F.getVirtualUri(F.getProviderRootUri(e)),A=this.getRelativePath(e,D);if(e.scheme===G.sN.Virtual){const[U,$]=await Promise.allSettled([_.workspace.fs.stat(e),_.workspace.fs.stat(e.with({scheme:G.sN.GitHub}))]);if(U.status!=="fulfilled"||$.status!=="fulfilled"||U.value.mtime!==$.value.mtime)return}const H=!e.sha||e.sha==="HEAD"?(await v.getRevision()).revision:e.sha,W=await C.getBlame(P.accessToken,v.repo.owner,v.repo.name,H,A),E=new Map,N=new Map,q=[];for(const U of W.ranges){const $=U.commit,{viewer:de=P.account.label}=W,V=de!=null&&$.author.name===de?"You":$.author.name,ae=de!=null&&$.committer.name===de?"You":$.committer.name;let ce=E.get(V);ce==null&&(ce={name:V,lineCount:0},E.set(V,ce)),ce.lineCount+=U.endingLine-U.startingLine+1;let Ce=N.get($.oid);Ce==null&&(Ce=new z.aM(this.container,e.repoPath,$.oid,new z._j(V,$.author.email,new Date($.author.date),$.author.avatarUrl),new z._j(ae,$.committer.email,new Date($.author.date)),$.message.split(`
`,1)[0],(h=$.parents.nodes[0])!=null&&h.oid?[(m=$.parents.nodes[0])==null?void 0:m.oid]:[],$.message,new se.K8(D.toString(),A,se.NV.Modified),{changedFiles:$.changedFiles??0,additions:$.additions??0,deletions:$.deletions??0},[]),N.set($.oid,Ce));for(let B=U.startingLine;B<=U.endingLine;B++){const Pe={sha:$.oid,originalLine:B,line:B};Ce.lines.push(Pe),q[B-1]=Pe}}const O=new Map([...E.entries()].sort((U,$)=>$[1].lineCount-U[1].lineCount));return{repoPath:e.repoPath,authors:O,commits:N,lines:q}}catch(f){if(r.state!=null&&!String(f).includes("No provider registered with")){const v=f?.toString()??"";J.Y.debug(s,`Cache replace (with empty promise): '${t}'`);const C={item:Ae,errorMessage:v};return r.state.setBlame(t,C),r.setBlameFailure(),Ae}return}}async getBlameContents(e,r){}async getBlameForLine(e,r,t,s){var h,m;const f=(0,y.UH)();if(!t?.isDirty){if(!s?.forceSingleLine){const v=await this.getBlame(e);if(v==null)return;let C=v.lines[r];if(C==null){if(v.lines.length!==r)return;C=v.lines[r-1]}const F=v.commits.get(C.sha);return F==null?void 0:{author:{...v.authors.get(F.author.name),lineCount:F.lines.length},commit:F,line:C}}try{const v=await this.ensureRepositoryContext(e.repoPath);if(v==null)return;const{metadata:C,github:F,remotehub:P,session:D}=v,A=P.getVirtualUri(P.getProviderRootUri(e)),H=this.getRelativePath(e,A),W=!e.sha||e.sha==="HEAD"?(await C.getRevision()).revision:e.sha,E=await F.getBlame(D.accessToken,C.repo.owner,C.repo.name,W,H),N=r+1,q=E.ranges.find(ae=>ae.startingLine===N);if(q==null)return;const O=q.commit,{viewer:U=D.account.label}=E,$=U!=null&&O.author.name===U?"You":O.author.name,de=U!=null&&O.committer.name===U?"You":O.committer.name,V=new z.aM(this.container,e.repoPath,O.oid,new z._j($,O.author.email,new Date(O.author.date),O.author.avatarUrl),new z._j(de,O.committer.email,new Date(O.author.date)),O.message.split(`
`,1)[0],(h=O.parents.nodes[0])!=null&&h.oid?[(m=O.parents.nodes[0])==null?void 0:m.oid]:[],O.message,new se.K8(A.toString(),H,se.NV.Modified),{changedFiles:O.changedFiles??0,additions:O.additions??0,deletions:O.deletions??0},[]);for(let ae=q.startingLine;ae<=q.endingLine;ae++){const ce={sha:O.oid,originalLine:ae,line:ae};V.lines.push(ce)}return{author:{name:$,lineCount:q.endingLine-q.startingLine+1},commit:V,line:{sha:O.oid,originalLine:q.startingLine,line:q.startingLine}}}catch(v){J.Y.error(f,v);return}}}async getBlameForLineContents(e,r,t,s){}async getBlameForRange(e,r){const t=await this.getBlame(e);if(t!=null)return this.getBlameRange(t,e,r)}async getBlameForRangeContents(e,r,t){const s=await this.getBlameContents(e,t);if(s!=null)return this.getBlameRange(s,e,r)}getBlameRange(e,r,t){if(e.lines.length===0)return{allLines:e.lines,...e};if(t.start.line===0&&t.end.line===e.lines.length-1)return{allLines:e.lines,...e};const s=e.lines.slice(t.start.line,t.end.line+1),h=new Set(s.map(P=>P.sha)),m=t.start.line+1,f=t.end.line+1,v=new Map,C=new Map;for(const P of e.commits.values()){if(!h.has(P.sha))continue;const D=P.with({lines:P.lines.filter(H=>H.line>=m&&H.line<=f)});C.set(P.sha,D);let A=v.get(D.author.name);A==null&&(A={name:D.author.name,lineCount:0},v.set(A.name,A)),A.lineCount+=D.lines.length}const F=new Map([...v.entries()].sort((P,D)=>D[1].lineCount-P[1].lineCount));return{repoPath:r.repoPath,authors:F,commits:C,lines:s,allLines:e.lines}}async getBranch(e){const{values:[r]}=await this.getBranches(e,{filter:t=>t.current});return r}async getBranches(e,r){if(e==null)return Ee;const t=(0,y.UH)();let s=r?.cursor?void 0:this._branchesCache.get(e);if(s==null){async function m(){var f;try{const{metadata:v,github:C,session:F}=await this.ensureRepositoryContext(e),P=await v.getRevision(),D=P.type===0?P.name:void 0,A=[];let H=r?.cursor;const W=H==null;for(;;){const E=await C.getBranches(F.accessToken,v.repo.owner,v.repo.name,{cursor:H});for(const N of E.values){const q=new Date(Y.DN.get("advanced.commitOrdering")==="author-date"?N.target.authoredDate:N.target.committedDate),O=N.target.oid;A.push(new he.XI(e,N.name,!1,N.name===D,q,O,{name:`origin/${N.name}`,missing:!1}),new he.XI(e,`origin/${N.name}`,!0,!1,q,O))}if(!((f=E.paging)!=null&&f.more)||!W)return{...E,values:A};H=E.paging.cursor}}catch(v){return J.Y.error(v,t),this._branchesCache.delete(e),Ee}}S(m,"load"),s=m.call(this),r?.cursor==null&&this._branchesCache.set(e,s)}let h=await s;return r?.filter!=null&&(h={...h,values:h.values.filter(r.filter)}),r?.sort!=null&&(0,he.YF)(h.values,typeof r.sort=="boolean"?void 0:r.sort),h}async getChangedFilesCount(e,r){if(!r)return;const t=await this.getCommit(e,r);if(t?.stats==null)return;const{stats:s}=t,h=typeof s.changedFiles=="number"?s.changedFiles:s.changedFiles.added+s.changedFiles.changed+s.changedFiles.deleted;return{additions:s.additions,deletions:s.deletions,changedFiles:h}}async getCommit(e,r){var t;if(e==null)return;const s=(0,y.UH)();try{const{metadata:h,github:m,session:f}=await this.ensureRepositoryContext(e),v=await m.getCommit(f.accessToken,h.repo.owner,h.repo.name,r);if(v==null)return;const{viewer:C=f.account.label}=v,F=C!=null&&v.author.name===C?"You":v.author.name,P=C!=null&&v.committer.name===C?"You":v.committer.name;return new z.aM(this.container,e,v.oid,new z._j(F,v.author.email,new Date(v.author.date),v.author.avatarUrl),new z._j(P,v.committer.email,new Date(v.committer.date)),v.message.split(`
`,1)[0],v.parents.nodes.map(D=>D.oid),v.message,((t=v.files)==null?void 0:t.map(D=>new se.K8(e,D.filename??"",(0,Ue.fromCommitFileStatus)(D.status)??se.NV.Modified,D.previous_filename,void 0,{additions:D.additions??0,deletions:D.deletions??0,changes:D.changes??0})))??[],{changedFiles:v.changedFiles??0,additions:v.additions??0,deletions:v.deletions??0},[])}catch(h){J.Y.error(h,s);return}}async getCommitBranches(e,r,t){if(e==null||t?.commitDate==null)return[];const s=(0,y.UH)();try{const{metadata:h,github:m,session:f}=await this.ensureRepositoryContext(e);let v;return t?.branch?v=await m.getCommitOnBranch(f.accessToken,h.repo.owner,h.repo.name,t?.branch,r,t?.commitDate):v=await m.getCommitBranches(f.accessToken,h.repo.owner,h.repo.name,r,t?.commitDate),v}catch(h){return J.Y.error(h,s),[]}}async getCommitCount(e,r){if(e==null)return;const t=(0,y.UH)();try{const{metadata:s,github:h,session:m}=await this.ensureRepositoryContext(e);return await h.getCommitCount(m?.accessToken,s.repo.owner,s.repo.name,r)}catch(s){J.Y.error(s,t);return}}async getCommitForFile(e,r,t){var s;if(e==null)return;const h=(0,y.UH)();try{const{metadata:m,github:f,remotehub:v,session:C}=await this.ensureRepositoryContext(e),F=this.getRelativePath(r,v.getProviderRootUri(r)),P=!t?.ref||t.ref==="HEAD"?(await m.getRevision()).revision:t.ref,D=await f.getCommitForFile(C.accessToken,m.repo.owner,m.repo.name,P,F);if(D==null)return;const{viewer:A=C.account.label}=D,H=A!=null&&D.author.name===A?"You":D.author.name,W=A!=null&&D.committer.name===A?"You":D.committer.name,E=(s=D.files)==null?void 0:s.map(q=>new se.K8(e,q.filename??"",(0,Ue.fromCommitFileStatus)(q.status)??se.NV.Modified,q.previous_filename,void 0,{additions:q.additions??0,deletions:q.deletions??0,changes:q.changes??0})),N=E?.find(q=>q.path===F);return new z.aM(this.container,e,D.oid,new z._j(H,D.author.email,new Date(D.author.date),D.author.avatarUrl),new z._j(W,D.committer.email,new Date(D.committer.date)),D.message.split(`
`,1)[0],D.parents.nodes.map(q=>q.oid),D.message,{file:N,files:E},{changedFiles:D.changedFiles??0,additions:D.additions??0,deletions:D.deletions??0},[])}catch(m){J.Y.error(m,h);return}}async getCommitsForGraph(e,r,t){var s,h;const[m,f,v,C]=await Promise.allSettled([this.getLog(e,{all:!0,ordering:"date",limit:t?.limit}),this.getBranch(e),this.getRemotes(e),this.getTags(e)]);return this.getCommitsForGraphCore(e,r,(0,Me.Sb)(m),(0,Me.Sb)(f),(s=(0,Me.Sb)(v))==null?void 0:s[0],(h=(0,Me.Sb)(C))==null?void 0:h.values,t)}async getCommitsForGraphCore(e,r,t,s,h,m,f){var v,C,F,P,D,A;if(t==null)return{repoPath:e,rows:[]};const H=(C=((v=t.pagedCommits)==null?void 0:v.call(t))??t.commits)==null?void 0:C.values();if(H==null)return{repoPath:e,rows:[]};const W=[];let E,N,q;const O=s?.sha!=null&&h!=null;for(const U of H)O&&U.sha===s.sha?(E=[{name:s.name,isCurrentHead:!0}],N=[{name:s.name,owner:h.name,url:h.url,avatarUrl:(P=((F=h.provider)==null?void 0:F.avatarUri)??(0,be.dM)(this.container,h,r))==null?void 0:P.toString(!0)}]):(E=[],N=[]),m!=null?q=[...(0,De.DZ)(m,$=>{if($.sha===U.sha)return{name:$.name,annotated:Boolean($.message)}})]:q=[],W.push({sha:U.sha,parents:U.parents,author:U.author.name,avatarUrl:(D=await U.getAvatarUri())==null?void 0:D.toString(!0),email:U.author.email??"",date:U.committer.date.getTime(),message:(0,re.X)(U.message&&String(U.message).length?U.message:U.summary),type:U.parents.length>1?ge.e.MergeCommit:ge.e.Commit,heads:E,remotes:N,tags:q});return f?.ref==="HEAD"?f.ref=(A=(0,De.Ps)(t.commits.values()))==null?void 0:A.sha:f?.ref!=null&&(f.ref=void 0),{repoPath:e,paging:{limit:t.limit,endingCursor:t.endingCursor,startingCursor:t.startingCursor,more:t.hasMore},rows:W,sha:f?.ref,more:async U=>{var $;const de=await(($=t.more)==null?void 0:$.call(t,U));return this.getCommitsForGraphCore(e,r,de,s,h,m,f)}}}async getOldestUnpushedRefForFile(e,r){}async getContributors(e,r){if(e==null)return[];const t=(0,y.UH)();try{const{metadata:s,github:h,session:m}=await this.ensureRepositoryContext(e),f=await h.getContributors(m.accessToken,s.repo.owner,s.repo.name),v=await this.getCurrentUser(e),C=[];for(const F of f)F.type==="User"&&C.push(new ve.V(e,F.name,F.email,F.contributions,void 0,(0,Ye.o)(v,F.name,F.email,F.login),void 0,F.login,F.avatar_url,F.node_id));return C}catch(s){return J.Y.error(s,t),[]}}async getCurrentUser(e){if(!e)return;const r=(0,y.UH)(),t=this._repoInfoCache.get(e);let s=t?.user;if(s!=null)return s;if(s!==null)try{const{metadata:h,github:m,session:f}=await this.ensureRepositoryContext(e);return s=await m.getCurrentUser(f.accessToken,h.repo.owner,h.repo.name),this._repoInfoCache.set(e,{...t,user:s??null}),s}catch(h){J.Y.error(h,r),this._repoInfoCache.set(e,{...t,user:null});return}}async getDefaultBranchName(e,r){if(e==null)return;const t=(0,y.UH)();try{const{metadata:s,github:h,session:m}=await this.ensureRepositoryContext(e);return await h.getDefaultBranchName(m.accessToken,s.repo.owner,s.repo.name)}catch(s){J.Y.error(s,t);return}}async getDiffForFile(e,r,t){}async getDiffForFileContents(e,r,t){}async getDiffForLine(e,r,t,s){}async getDiffStatus(e,r,t,s){}async getFileStatusForCommit(e,r,t){if(t===te.p.deletedOrMissing||te.p.isUncommitted(t))return;const s=await this.getCommitForFile(e,r,{ref:t});if(s!=null)return s.findFile(r)}async getLastFetchedTimestamp(e){}async getLog(e,r){var t,s,h;if(e==null)return;const m=(0,y.UH)(),f=this.getPagingLimit(r?.limit);try{const{metadata:v,github:C,session:F}=await this.ensureRepositoryContext(e),P=!r?.ref||r.ref==="HEAD"?(await v.getRevision()).revision:r.ref,D=await C.getCommits(F.accessToken,v.repo.owner,v.repo.name,P,{all:r?.all,authors:r?.authors,after:r?.cursor,limit:f,since:r?.since?new Date(r.since):void 0}),A=new Map,{viewer:H=F.account.label}=D;for(const E of D.values){const N=H!=null&&E.author.name===H?"You":E.author.name,q=H!=null&&E.committer.name===H?"You":E.committer.name;let O=A.get(E.oid);O==null&&(O=new z.aM(this.container,e,E.oid,new z._j(N,E.author.email,new Date(E.author.date),E.author.avatarUrl),new z._j(q,E.committer.email,new Date(E.committer.date)),E.message.split(`
`,1)[0],E.parents.nodes.map(U=>U.oid),E.message,(t=E.files)==null?void 0:t.map(U=>new se.K8(e,U.filename??"",(0,Ue.fromCommitFileStatus)(U.status)??se.NV.Modified,U.previous_filename,void 0,{additions:U.additions??0,deletions:U.deletions??0,changes:U.changes??0})),{changedFiles:E.changedFiles??0,additions:E.additions??0,deletions:E.deletions??0},[]),A.set(E.oid,O))}const W={repoPath:e,commits:A,sha:P,range:void 0,count:A.size,limit:f,hasMore:((s=D.paging)==null?void 0:s.more)??!1,endingCursor:(h=D.paging)==null?void 0:h.cursor,query:E=>this.getLog(e,{...r,limit:E})};return W.hasMore&&(W.more=this.getLogMoreFn(W,r)),W}catch(v){J.Y.error(v,m);return}}async getLogRefsOnly(e,r){const t=await this.getLog(e,r);if(t!=null)return new Set([...t.commits.values()].map(s=>s.ref))}getLogMoreFn(e,r){return async t=>{var s;const h=t!=null&&typeof t=="object"?t.until:void 0;let m=typeof t=="number"?t:void 0;if(h&&(0,De.G)(e.commits.values(),F=>F.ref===h))return e;m=this.getPagingLimit(m);const f=await this.getLog(e.repoPath,{...r,limit:m,cursor:e.endingCursor});if(f==null)return{...e,hasMore:!1,more:void 0};const v=new Map([...e.commits,...f.commits]),C={repoPath:e.repoPath,commits:v,sha:e.sha,range:void 0,count:v.size,limit:h==null?(e.limit??0)+m:void 0,hasMore:h==null?f.hasMore:!0,startingCursor:(s=(0,De.Z$)(e.commits))==null?void 0:s[0],endingCursor:f.endingCursor,pagedCommits:()=>{for(const F of e.commits.keys())f.commits.delete(F);return f.commits},query:e.query};return C.hasMore&&(C.more=this.getLogMoreFn(C,r)),C}}async getLogForSearch(e,r,t){var s,h,m;if(e==null)return;const f=(0,y.UH)(),v=He.n.parseSearchOperations(r.pattern);let C,F=v.get("commit:");if(F!=null){const A=await this.getCommit(e,F[0]);return A==null?void 0:{repoPath:e,commits:new Map([[A.sha,A]]),sha:A.sha,range:void 0,count:1,limit:1,hasMore:!1}}const P=[];for([C,F]of v.entries())switch(C){case"message:":P.push(...F.map(A=>A.replace(/ /g,"+")));break;case"author:":P.push(...F.map(A=>(A=A.replace(/ /g,"+"),A.startsWith("@")?`author:${A.slice(1)}`:A.startsWith('"@')?`author:"${A.slice(2)}`:A.includes("@")?`author-email:${A}`:`author-name:${A}`)));break}if(P.length===0)return;const D=this.getPagingLimit(t?.limit);try{const{metadata:A,github:H,session:W}=await this.ensureRepositoryContext(e),E=await H.searchCommits(W.accessToken,`repo:${A.repo.owner}/${A.repo.name}+${P.join("+").trim()}`,{cursor:t?.cursor,limit:D,sort:t?.ordering==="date"?"committer-date":t?.ordering==="author-date"?"author-date":void 0});if(E==null)return;const N=new Map,q=W.account.label;for(const U of E.values){const $=q!=null&&U.author.name===q?"You":U.author.name,de=q!=null&&U.committer.name===q?"You":U.committer.name;let V=N.get(U.oid);V==null&&(V=new z.aM(this.container,e,U.oid,new z._j($,U.author.email,new Date(U.author.date),U.author.avatarUrl),new z._j(de,U.committer.email,new Date(U.committer.date)),U.message.split(`
`,1)[0],U.parents.nodes.map(ae=>ae.oid),U.message,(s=U.files)==null?void 0:s.map(ae=>new se.K8(e,ae.filename??"",(0,Ue.fromCommitFileStatus)(ae.status)??se.NV.Modified,ae.previous_filename,void 0,{additions:ae.additions??0,deletions:ae.deletions??0,changes:ae.changes??0})),{changedFiles:U.changedFiles??0,additions:U.additions??0,deletions:U.deletions??0},[]),N.set(U.oid,V))}const O={repoPath:e,commits:N,sha:void 0,range:void 0,count:N.size,limit:D,hasMore:((h=E.pageInfo)==null?void 0:h.hasNextPage)??!1,endingCursor:((m=E.pageInfo)==null?void 0:m.endCursor)??void 0,query:U=>this.getLog(e,{...t,limit:U})};return O.hasMore&&(O.more=this.getLogForSearchMoreFn(O,r,t)),O}catch(A){J.Y.error(A,f);return}}getLogForSearchMoreFn(e,r,t){return async s=>{s=this.getPagingLimit(s);const h=await this.getLogForSearch(e.repoPath,r,{...t,limit:s,cursor:e.endingCursor});if(h==null)return{...e,hasMore:!1,more:void 0};const m=new Map([...e.commits,...h.commits]),f={repoPath:e.repoPath,commits:m,sha:e.sha,range:void 0,count:m.size,limit:(e.limit??0)+s,hasMore:h.hasMore,endingCursor:h.endingCursor,query:e.query};return f.hasMore&&(f.more=this.getLogForSearchMoreFn(f,r,t)),f}}async getLogForFile(e,r,t){if(e==null)return;const s=(0,y.UH)(),h=this.getRelativePath(r,e);if(e!=null&&e===h)throw new Error(`File name cannot match the repository path; path=${h}`);t={reverse:!1,...t},t.renames=!1,t.all=!1;let m="log";t.ref!=null&&(m+=`:${t.ref}`),t.limit=this.getPagingLimit(t?.limit),t.limit&&(m+=`:n${t.limit}`),t.renames&&(m+=":follow"),t.reverse&&(m+=":reverse"),t.since&&(m+=`:since=${t.since}`),t.skip&&(m+=`:skip${t.skip}`),t.cursor&&(m+=`:cursor=${t.cursor}`);const f=await this.container.tracker.getOrAdd(ue.YY.fromFile(h,e,t.ref));if(!t.force&&t.range==null){if(f.state!=null){const C=f.state.getLog(m);if(C!=null)return J.Y.debug(s,`Cache hit: '${m}'`),C.item;if(t.ref!=null||t.limit!=null){const F=f.state.getLog(`log${t.renames?":follow":""}${t.reverse?":reverse":""}`);if(F!=null){if(t.ref==null)return J.Y.debug(s,`Cache hit: ~'${m}'`),F.item;J.Y.debug(s,`Cache ?: '${m}'`);let P=await F.item;if(P!=null&&!P.hasMore&&P.commits.has(t.ref)){J.Y.debug(s,`Cache hit: '${m}'`);let D=!0,A=0;const H=new Map((0,De.DZ)(P.commits.entries(),([E,N])=>{if(D){if(E!==t?.ref)return;D=!1}if(A++,!(t?.limit!=null&&A>t.limit))return[E,N]})),W={...t};return P={...P,limit:t.limit,count:H.size,commits:H,query:E=>this.getLogForFile(e,r,{...W,limit:E})},P}}}}J.Y.debug(s,`Cache miss: '${m}'`),f.state==null&&(f.state=new Oe.p2)}const v=this.getLogForFileCore(e,h,f,m,s,t);if(f.state!=null&&t.range==null){J.Y.debug(s,`Cache add: '${m}'`);const C={item:v};f.state.setLog(m,C)}return v}async getLogForFileCore(e,r,t,s,h,m){var f,v,C;if(e==null)return;const F=this.getPagingLimit(m?.limit);try{const P=await this.ensureRepositoryContext(e);if(P==null)return;const{metadata:D,github:A,remotehub:H,session:W}=P,E=this.getAbsoluteUri(r,e),N=this.getRelativePath(E,H.getProviderRootUri(E)),q=!m?.ref||m.ref==="HEAD"?(await D.getRevision()).revision:m.ref,O=await A.getCommits(W.accessToken,D.repo.owner,D.repo.name,q,{all:m?.all,after:m?.cursor,path:N,limit:F,since:m?.since?new Date(m.since):void 0}),U=new Map,{viewer:$=W.account.label}=O;for(const V of O.values){const ae=$!=null&&V.author.name===$?"You":V.author.name,ce=$!=null&&V.committer.name===$?"You":V.committer.name;let Ce=U.get(V.oid);if(Ce==null){const B=(f=V.files)==null?void 0:f.map(ye=>new se.K8(e,ye.filename??"",(0,Ue.fromCommitFileStatus)(ye.status)??se.NV.Modified,ye.previous_filename,void 0,{additions:ye.additions??0,deletions:ye.deletions??0,changes:ye.changes??0})),Pe=(0,pe.Mh)(N)?void 0:B?.find(ye=>ye.path===N)??new se.K8(e,N,se.NV.Modified,void 0,void 0,V.changedFiles===1?{additions:V.additions??0,deletions:V.deletions??0,changes:0}:void 0);Ce=new z.aM(this.container,e,V.oid,new z._j(ae,V.author.email,new Date(V.author.date),V.author.avatarUrl),new z._j(ce,V.committer.email,new Date(V.committer.date)),V.message.split(`
`,1)[0],V.parents.nodes.map(ye=>ye.oid),V.message,{file:Pe,files:B},{changedFiles:V.changedFiles??0,additions:V.additions??0,deletions:V.deletions??0},[]),U.set(V.oid,Ce)}}const de={repoPath:e,commits:U,sha:q,range:void 0,count:U.size,limit:F,hasMore:((v=O.paging)==null?void 0:v.more)??!1,endingCursor:(C=O.paging)==null?void 0:C.cursor,query:V=>this.getLogForFile(e,r,{...m,limit:V})};return de.hasMore&&(de.more=this.getLogForFileMoreFn(de,r,m)),de}catch(P){if(t.state!=null&&m?.range==null&&!m?.reverse){const D=P?.toString()??"";J.Y.debug(h,`Cache replace (with empty promise): '${s}'`);const A={item:Ae,errorMessage:D};return t.state.setLog(s,A),Ae}return}}getLogForFileMoreFn(e,r,t){return async s=>{const h=s!=null&&typeof s=="object"?s.until:void 0;let m=typeof s=="number"?s:void 0;if(h&&(0,De.G)(e.commits.values(),F=>F.ref===h))return e;m=this.getPagingLimit(m);const f=await this.getLogForFile(e.repoPath,r,{...t,limit:h==null?m:0,cursor:e.endingCursor});if(f==null)return{...e,hasMore:!1,more:void 0};const v=new Map([...e.commits,...f.commits]),C={repoPath:e.repoPath,commits:v,sha:e.sha,range:e.range,count:v.size,limit:h==null?(e.limit??0)+m:void 0,hasMore:h==null?f.hasMore:!0,endingCursor:f.endingCursor,query:e.query};return C.hasMore&&(C.more=this.getLogForFileMoreFn(C,r,t)),C}}async getMergeBase(e,r,t,s){}async getMergeStatus(e){}async getRebaseStatus(e){}async getNextComparisonUris(e,r,t,s=0){if(!t)return;const h=(0,y.UH)();try{const m=await this.ensureRepositoryContext(e);if(m==null)return;const{metadata:f,github:v,remotehub:C,session:F}=m,P=this.getRelativePath(r,C.getProviderRootUri(r)),D=(await f.getRevision()).revision;t==="HEAD"&&(t=D);const A=await v.getNextCommitRefs(F.accessToken,f.repo.owner,f.repo.name,D,P,t);return{current:s===0?ue.YY.fromFile(P,e,t):new ue.YY(await this.getBestRevisionUri(e,P,A[s-1])),next:new ue.YY(await this.getBestRevisionUri(e,P,A[s]))}}catch(m){throw J.Y.error(m,h),m}}async getPreviousComparisonUris(e,r,t,s=0,h=!1){var m,f;if(t===te.p.deletedOrMissing)return;const v=(0,y.UH)();t===te.p.uncommitted&&(t=void 0);try{const C=await this.ensureRepositoryContext(e);if(C==null)return;const{metadata:F,github:P,remotehub:D,session:A}=C,H=this.getRelativePath(r,D.getProviderRootUri(r)),W=t!=null?1:0,E=await P.getCommitRefs(A.accessToken,F.repo.owner,F.repo.name,!t||t==="HEAD"?(await F.getRevision()).revision:t,{path:H,first:W+s+1});if(E==null)return;const N=s===0?ue.YY.fromFile(H,e,t):new ue.YY(await this.getBestRevisionUri(e,H,((m=E.values[W+s-1])==null?void 0:m.oid)??te.p.deletedOrMissing));return N==null||N.sha===te.p.deletedOrMissing?void 0:{current:N,previous:new ue.YY(await this.getBestRevisionUri(e,H,((f=E.values[W+s])==null?void 0:f.oid)??te.p.deletedOrMissing))}}catch(C){throw J.Y.error(C,v),C}}async getPreviousComparisonUrisForLine(e,r,t,s,h=0){var m,f;if(s===te.p.deletedOrMissing)return;const v=(0,y.UH)();try{const C=await this.ensureRepositoryContext(e);if(C==null)return;const{remotehub:F}=C;let P=this.getRelativePath(r,F.getProviderRootUri(r)),D=ue.YY.fromFile(P,e,s),A=t,H,W=t,E=t;for(let N=0;N<Math.max(0,h)+2;N++){const q=await this.getBlameForLine(H??D,E,void 0,{forceSingleLine:!0});if(q==null)break;s=q.commit.sha,P=((m=q.commit.file)==null?void 0:m.path)??((f=q.commit.file)==null?void 0:f.originalPath)??P,E=q.line.originalLine-1;const O=ue.YY.fromFile(P,e,s);H==null?(H=O,W=E):(D=H,A=W,H=O,W=E)}return D==null?void 0:{current:D,previous:H,line:(A??t)+1}}catch(C){throw J.Y.error(C,v),C}}async getIncomingActivity(e,r){}async getRemotes(e,r){if(e==null)return[];const t=r?.providers??(0,qe.v)(Y.DN.get("remotes",null)),s=_.Uri.parse(e,!0),[,h,m]=s.path.split("/",3),f=`https://github.com/${h}/${m}.git`,v="github.com",C=`${h}/${m}`;return[new be.ss(e,`${v}/${C}`,"origin","https",v,C,(0,qe.B)(this.container,t)(f,v,C),[{type:be.XG.Fetch,url:f},{type:be.XG.Push,url:f}])]}async getRevisionContent(e,r,t){const s=t?this.createProviderUri(e,t,r):this.createVirtualUri(e,t,r);return _.workspace.fs.readFile(s)}async getStash(e){}async getStatusForFile(e,r){}async getStatusForFiles(e,r){}async getStatusForRepo(e){}async getTags(e,r){if(e==null)return Ee;const t=(0,y.UH)();let s=r?.cursor?void 0:this._tagsCache.get(e);if(s==null){async function m(){var f,v,C;try{const{metadata:F,github:P,session:D}=await this.ensureRepositoryContext(e),A=[];let H=r?.cursor;const W=H==null;for(;;){const E=await P.getTags(D.accessToken,F.repo.owner,F.repo.name,{cursor:H});for(const N of E.values)A.push(new Le.gE(e,N.name,N.target.oid,N.target.message??"",new Date(N.target.authoredDate??((f=N.target.tagger)==null?void 0:f.date)),new Date(N.target.committedDate??((v=N.target.tagger)==null?void 0:v.date))));if(!((C=E.paging)!=null&&C.more)||!W)return{...E,values:A};H=E.paging.cursor}}catch(F){return J.Y.error(F,t),this._tagsCache.delete(e),Ee}}S(m,"load"),s=m.call(this),r?.cursor==null&&this._tagsCache.set(e,s)}let h=await s;return r?.filter!=null&&(h={...h,values:h.values.filter(r.filter)}),r?.sort!=null&&(0,Le.Pj)(h.values,typeof r.sort=="boolean"?void 0:r.sort),h}async getTreeEntryForRevision(e,r,t){if(e==null||!r)return;if(t==="HEAD"){const m=await this.ensureRepositoryContext(e);if(m==null)return;const f=await m.metadata.getRevision();t=f?.revision}const s=t?this.createProviderUri(e,t,r):this.createVirtualUri(e,t,r),h=await _.workspace.fs.stat(s);if(h!=null)return{path:this.getRelativePath(s,e),commitSha:t,size:h.size,type:(h.type&_.FileType.Directory)===_.FileType.Directory?"tree":"blob"}}async getTreeForRevision(e,r){if(e==null)return[];if(r==="HEAD"){const m=await this.ensureRepositoryContext(e);if(m==null)return[];const f=await m.metadata.getRevision();r=f?.revision}const t=r?this.createProviderUri(e,r):this.createVirtualUri(e,r),s=await _.workspace.fs.readDirectory(t);if(s==null)return[];const h=[];for(const[m,f]of s){const v=this.getAbsoluteUri(m,t);h.push({path:this.getRelativePath(m,v),commitSha:r,size:0,type:(f&_.FileType.Directory)===_.FileType.Directory?"tree":"blob"})}return[]}async hasBranchOrTag(e,r){var t,s;const[{values:h},{values:m}]=await Promise.all([this.getBranches(e,{filter:(t=r?.filter)==null?void 0:t.branches,sort:!1}),this.getTags(e,{filter:(s=r?.filter)==null?void 0:s.tags,sort:!1})]);return h.length!==0||m.length!==0}async hasCommitBeenPushed(e,r){return!0}isTrackable(e){return this.supportedSchemes.has(e.scheme)}async isTracked(e){if(!this.isTrackable(e)||this.container.git.getRepository(e)==null)return!1;const r=e.with({scheme:G.sN.GitHub});return await _.workspace.fs.stat(r)!=null}async getDiffTool(e){}async openDiffTool(e,r,t){}async openDirectoryCompare(e,r,t,s){}async resolveReference(e,r,t,s){if(!r||r===te.p.deletedOrMissing||t==null&&te.p.isSha(r)||t!=null&&te.p.isUncommitted(r))return r;let h;if(t!=null)h=this.getRelativePath(t,e);else if(!te.p.isShaLike(r)||r.endsWith("^3"))return r;const m=await this.ensureRepositoryContext(e);if(m==null)return r;const{metadata:f,github:v,session:C}=m,F=await v.resolveReference(C.accessToken,f.repo.owner,f.repo.name,r,h);return F??(h?te.p.deletedOrMissing:r)}async validateBranchOrTagName(e,r){return _e.test(e)}async validateReference(e,r){return!0}async stageFile(e,r){}async stageDirectory(e,r){}async unStageFile(e,r){}async unStageDirectory(e,r){}async stashApply(e,r,t){}async stashDelete(e,r,t){}async stashSave(e,r,t,s){}async ensureRepositoryContext(e,r){let t=_.Uri.parse(e,!0);if(!/^github\+?/.test(t.authority))throw new k.kX(e,k.sh.NotAGitHubRepository);if(!r){const v=this.container.git.getRepository(t);if(v==null)throw new k.kX(e,k.sh.NotAGitHubRepository);t=v.uri}let s=this._remotehub;if(s==null)try{s=await this.ensureRemoteHubApi()}catch(v){throw v instanceof k.R5,new k.kX(e,k.sh.RemoteHubApiNotFound,v)}const h=await s?.getMetadata(t);if(h?.provider.id!=="github")throw new k.kX(e,k.sh.NotAGitHubRepository);let m,f;try{[m,f]=await Promise.all([this.ensureGitHub(),this.ensureSession()])}catch(v){throw v instanceof k._7?new k.kX(e,v.reason===k.Jx.UserDidNotConsent?k.sh.GitHubAuthenticationDenied:k.sh.GitHubAuthenticationNotFound,v):new k.kX(e)}if(m==null)throw new k.kX(e);return{github:m,metadata:h,remotehub:s,session:f}}async ensureGitHub(){if(this._github==null){const e=await this.container.github;e!=null&&this._disposables.push(e.onDidReauthenticate(()=>void this.ensureSession(!0))),this._github=e}return this._github}async ensureRemoteHubApi(e){if(this._remotehubPromise==null&&(this._remotehubPromise=Ne(),this._remotehubPromise.then(r=>this._remotehub=r,()=>this._remotehub=void 0)),!e)return this._remotehubPromise;try{return await this._remotehubPromise}catch{return}}async ensureSession(e=!1,r=!1){if(e||this._sessionPromise==null){async function t(){let s=this.container.storage.get(`provider:authentication:skip:${this.descriptor.id}`,!1);try{if(e)return s=!1,this.container.storage.delete(`provider:authentication:skip:${this.descriptor.id}`),await _.authentication.getSession("github",xe,{forceNewSession:!0});if(!s&&!r)return await _.authentication.getSession("github",xe,{createIfNone:!0});const h=await _.authentication.getSession("github",xe,{createIfNone:!1,silent:r});if(h!=null)return h;throw new Error("User did not consent")}catch(h){if(h instanceof Error&&h.message.includes("User did not consent")){if(!r&&(await this.container.storage.store(`provider:authentication:skip:${this.descriptor.id}`,!0),!s))return e||queueMicrotask(async()=>{const m="Re-enable";await _.window.showInformationMessage("GitLens has been disabled. Authentication is required for GitLens to work with remote GitHub repositories.",m)===m&&this.ensureSession(!0)}),e=!1,t.call(this);throw new k._7("github",k.Jx.UserDidNotConsent)}throw J.Y.error(h),new k._7("github",void 0,h)}}S(t,"getSession"),this._sessionPromise=t.call(this)}return this._sessionPromise}createVirtualUri(e,r,t){let s;if(typeof r=="string")r&&(te.p.isSha(r)?s={v:1,ref:{id:r,type:2}}:s={v:1,ref:{id:r,type:4}});else switch(r?.refType){case"revision":case"stash":s={v:1,ref:{id:r.ref,type:2}};break;case"branch":case"tag":s={v:1,ref:{id:r.name,type:4}};break}if(typeof e=="string"&&(e=_.Uri.parse(e,!0)),t){let h=e.path;h.endsWith("/")&&(h=h.slice(0,-1)),t=this.getRelativePath(t,e),t=`${h}/${t.startsWith("/")?t.slice(0,-1):t}`}return e.with({scheme:G.sN.Virtual,authority:We("github",s),path:t??e.path})}createProviderUri(e,r,t){const s=this.createVirtualUri(e,r,t);return this._remotehub==null?s.scheme!==G.sN.Virtual?s:s.with({scheme:G.sN.GitHub}):this._remotehub.getProviderUri(s)}getPagingLimit(e){return e=Math.min(100,e??Y.DN.get("advanced.maxListItems")??100),e===0&&(e=100),e}async resolveReferenceCore(e,r,t){var s,h,m,f;if(t==null||t==="HEAD")return(await r.getRevision()).revision;if(te.p.isSha(t))return t;if(te.p.isRange(t))return;const[v,C]=await Promise.allSettled([this.getBranches(e,{filter:F=>F.name===t}),this.getTags(e,{filter:F=>F.name===t})]);return t=((h=(s=(0,Me.Sb)(v))==null?void 0:s.values[0])==null?void 0:h.sha)??((f=(m=(0,Me.Sb)(C))==null?void 0:m.values[0])==null?void 0:f.sha),t==null,t}}S(R,"GitHubGitProvider"),M([(0,y.cM)()],R.prototype,"getBestRevisionUri",1),M([(0,y.cM)()],R.prototype,"getWorkingUri",1),M([(0,y.cM)()],R.prototype,"addRemote",1),M([(0,y.cM)()],R.prototype,"pruneRemote",1),M([(0,y.cM)()],R.prototype,"applyChangesToWorkingFile",1),M([(0,y.cM)()],R.prototype,"branchContainsCommit",1),M([(0,y.cM)()],R.prototype,"checkout",1),M([(0,y.cM)()],R.prototype,"resetCaches",1),M([(0,y.cM)({args:{1:L=>L.length}})],R.prototype,"excludeIgnoredUris",1),M([(0,y.cM)()],R.prototype,"fetch",1),M([(0,Fe.H)(),(0,y.fF)()],R.prototype,"findRepositoryUri",1),M([(0,y.cM)({args:{1:L=>L.join(",")}})],R.prototype,"getAheadBehindCommitCount",1),M([(0,Fe.H)((L,e)=>`${L.toString()}|${e?.isDirty}`),(0,y.cM)({args:{1:L=>L?.isDirty}})],R.prototype,"getBlame",1),M([(0,y.cM)({args:{1:"<contents>"}})],R.prototype,"getBlameContents",1),M([(0,Fe.H)((L,e,r,t)=>`${L.toString()}|${e}|${r?.isDirty}|${t?.forceSingleLine}`),(0,y.cM)({args:{2:L=>L?.isDirty}})],R.prototype,"getBlameForLine",1),M([(0,y.cM)({args:{2:"<contents>"}})],R.prototype,"getBlameForLineContents",1),M([(0,y.cM)()],R.prototype,"getBlameForRange",1),M([(0,y.cM)({args:{2:"<contents>"}})],R.prototype,"getBlameForRangeContents",1),M([(0,y.cM)({args:{0:"<blame>"}})],R.prototype,"getBlameRange",1),M([(0,y.cM)()],R.prototype,"getBranch",1),M([(0,y.cM)({args:{1:!1}})],R.prototype,"getBranches",1),M([(0,y.cM)()],R.prototype,"getChangedFilesCount",1),M([(0,y.cM)()],R.prototype,"getCommit",1),M([(0,y.cM)()],R.prototype,"getCommitBranches",1),M([(0,y.cM)()],R.prototype,"getCommitCount",1),M([(0,y.cM)()],R.prototype,"getCommitForFile",1),M([(0,y.cM)()],R.prototype,"getCommitsForGraph",1),M([(0,y.cM)()],R.prototype,"getOldestUnpushedRefForFile",1),M([(0,y.cM)()],R.prototype,"getContributors",1),M([(0,Fe.H)(),(0,y.cM)()],R.prototype,"getCurrentUser",1),M([(0,y.cM)()],R.prototype,"getDefaultBranchName",1),M([(0,y.cM)()],R.prototype,"getDiffForFile",1),M([(0,y.cM)({args:{1:L=>"<contents>"}})],R.prototype,"getDiffForFileContents",1),M([(0,y.cM)()],R.prototype,"getDiffForLine",1),M([(0,y.cM)()],R.prototype,"getDiffStatus",1),M([(0,y.cM)()],R.prototype,"getFileStatusForCommit",1),M([(0,y.cM)()],R.prototype,"getLog",1),M([(0,y.cM)()],R.prototype,"getLogRefsOnly",1),M([(0,y.cM)()],R.prototype,"getLogForSearch",1),M([(0,y.cM)()],R.prototype,"getLogForFile",1),M([(0,y.cM)()],R.prototype,"getMergeBase",1),M([(0,y.cM)()],R.prototype,"getMergeStatus",1),M([(0,y.cM)()],R.prototype,"getRebaseStatus",1),M([(0,y.cM)()],R.prototype,"getNextComparisonUris",1),M([(0,y.cM)()],R.prototype,"getPreviousComparisonUris",1),M([(0,y.cM)()],R.prototype,"getPreviousComparisonUrisForLine",1),M([(0,y.cM)()],R.prototype,"getIncomingActivity",1),M([(0,y.cM)({args:{1:!1}})],R.prototype,"getRemotes",1),M([(0,y.cM)()],R.prototype,"getRevisionContent",1),M([(0,y.cM)()],R.prototype,"getStash",1),M([(0,y.cM)()],R.prototype,"getStatusForFile",1),M([(0,y.cM)()],R.prototype,"getStatusForFiles",1),M([(0,y.cM)()],R.prototype,"getStatusForRepo",1),M([(0,y.cM)({args:{1:!1}})],R.prototype,"getTags",1),M([(0,y.cM)()],R.prototype,"getTreeEntryForRevision",1),M([(0,y.cM)()],R.prototype,"getTreeForRevision",1),M([(0,y.cM)()],R.prototype,"hasBranchOrTag",1),M([(0,y.cM)()],R.prototype,"hasCommitBeenPushed",1),M([(0,y.cM)()],R.prototype,"getDiffTool",1),M([(0,y.cM)()],R.prototype,"openDiffTool",1),M([(0,y.cM)()],R.prototype,"openDirectoryCompare",1),M([(0,y.cM)()],R.prototype,"resolveReference",1),M([(0,y.cM)()],R.prototype,"validateBranchOrTagName",1),M([(0,y.cM)()],R.prototype,"validateReference",1),M([(0,y.cM)()],R.prototype,"stageFile",1),M([(0,y.cM)()],R.prototype,"stageDirectory",1),M([(0,y.cM)()],R.prototype,"unStageFile",1),M([(0,y.cM)()],R.prototype,"unStageDirectory",1),M([(0,y.cM)()],R.prototype,"stashApply",1),M([(0,y.cM)()],R.prototype,"stashDelete",1),M([(0,y.cM)({args:{2:L=>L?.length}})],R.prototype,"stashSave",1),M([(0,Fe.H)()],R.prototype,"ensureRepositoryContext",1),M([(0,Fe.H)()],R.prototype,"ensureGitHub",1);function We(L,e){return`${L}${e!=null?`+${(0,K.e)(JSON.stringify(e))}`:""}`}S(We,"encodeAuthority")},8301:(le,oe,w)=>{"use strict";w.r(oe),w.d(oe,{GitHubPullRequest:()=>Y,fromCommitFileStatus:()=>G});var _=w(3901),K=w(9052),Y;(I=>{function re(Z,ue){return new K.i7(ue,{name:Z.author.login,avatarUrl:Z.author.avatarUrl,url:Z.author.url},String(Z.number),Z.title,Z.permalink,k(Z.state),new Date(Z.updatedAt),Z.closedAt==null?void 0:new Date(Z.closedAt),Z.mergedAt==null?void 0:new Date(Z.mergedAt))}S(re,"from"),I.from=re;function k(Z){return Z==="MERGED"?K.o0.Merged:Z==="CLOSED"?K.o0.Closed:K.o0.Open}S(k,"fromState"),I.fromState=k;function fe(Z){return Z===K.o0.Merged?"MERGED":Z===K.o0.Closed?"CLOSED":"OPEN"}S(fe,"toState"),I.toState=fe})(Y||(Y={}));function G(I){switch(I){case"added":return _.NV.Added;case"changed":case"modified":return _.NV.Modified;case"removed":return _.NV.Deleted;case"renamed":return _.NV.Renamed;case"copied":return _.NV.Copied}}S(G,"fromCommitFileStatus")},778:(le,oe,w)=>{var _=w(2479);le.exports=_(K),le.exports.strict=_(Y),K.proto=K(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return K(this)},configurable:!0}),Object.defineProperty(Function.prototype,"onceStrict",{value:function(){return Y(this)},configurable:!0})});function K(G){var I=S(function(){return I.called?I.value:(I.called=!0,I.value=G.apply(this,arguments))},"f");return I.called=!1,I}S(K,"once");function Y(G){var I=S(function(){if(I.called)throw new Error(I.onceError);return I.called=!0,I.value=G.apply(this,arguments)},"f"),re=G.name||"Function wrapped with `once`";return I.onceError=re+" shouldn't be called more than once",I.called=!1,I}S(Y,"onceStrict")},2479:le=>{le.exports=oe;function oe(w,_){if(w&&_)return oe(w)(_);if(typeof w!="function")throw new TypeError("need wrapper function");return Object.keys(w).forEach(function(Y){K[Y]=w[Y]}),K;function K(){for(var Y=new Array(arguments.length),G=0;G<Y.length;G++)Y[G]=arguments[G];var I=w.apply(this,Y),re=Y[Y.length-1];return typeof I=="function"&&I!==re&&Object.keys(re).forEach(function(k){I[k]=re[k]}),I}S(K,"wrapper")}S(oe,"wrappy")}};
