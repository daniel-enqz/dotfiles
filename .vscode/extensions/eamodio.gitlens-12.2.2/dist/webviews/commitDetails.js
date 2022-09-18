(()=>{"use strict";var ao={};class Te{constructor(n){this.method=n}}class v extends Te{}class Z extends Te{}function Me(c,n,r){c.method===n.method&&r(n.params)}const ht=new v("webview/ready"),lo=new v("command/execute"),ho=new v("configuration/preview"),bo=new v("configuration/update"),fo=new Z("configuration/didChange"),uo=new Z("configuration/didPreview"),po=new Z("webview/didOpenAnchor"),bt=new v("commit/actions"),ft=new v("commit/file/actions"),ut=new v("commit/file/open"),pt=new v("commit/file/openOnRemote"),mt=new v("commit/file/compareWorking"),gt=new v("commit/file/comparePrevious"),vt=new v("commit/pickCommit"),yt=new v("commit/searchCommit"),_t=new v("commit/autolinkSettings"),$t=new v("commit/pin"),wt=new v("commit/preferences"),Oe=new Z("commit/didChange"),mo=new Z("commit/didChange/rich");var y;(c=>{function n(s,l,a,b){let d=!1;if(typeof s=="string"){const p=function(f){const u=f?.target;!u?.matches(s)||a(f,u)};return document.addEventListener(l,p,b??!0),{dispose:()=>{d||(d=!0,document.removeEventListener(l,p,b??!0))}}}const h=function(p){a(p,this)};return s.addEventListener(l,h,b??!1),{dispose:()=>{d||(d=!0,s.removeEventListener(l,h,b??!1))}}}c.on=n;function r(s,l,a){const b=document.getElementById(s);if(l.replaceChildren(b?.content.cloneNode(!0)),l.className=b.className,a?.visible!=null){const d=l.querySelectorAll("[data-visible]");for(const h of d){const p=h.dataset.visible;!p||(a.visible[p]?h.style.display="initial":h.style.display="none")}}if(a?.bindings!=null){const d=l.querySelectorAll("[data-bind]");for(const h of d){const p=h.dataset.bind;if(!p)continue;const f=a.bindings[p];f!=null&&(h.textContent=String(f))}}}c.insertTemplate=r;function i(s){s.replaceChildren(),s.className=""}c.resetSlot=i})(y||(y={}));const kt=/^(?:(#?)([0-9a-f]{3}|[0-9a-f]{6})|((?:rgb|hsl)a?)\((-?\d+%?)[,\s]+(-?\d+%?)[,\s]+(-?\d+%?)[,\s]*(-?[\d.]+%?)?\))$/i;function pe(c,n){const r=c+n,i=n<0?r<0?0:r:r>255?255:r;return Math.round(i)}function _(c,n){return $(c,-n)}function $(c,n){const r=se(c);if(r==null)return c;const[i,s,l,a]=r,b=255*n/100;return`rgba(${pe(i,b)}, ${pe(s,b)}, ${pe(l,b)}, ${a})`}function D(c,n){const r=se(c);if(r==null)return c;const[i,s,l,a]=r;return`rgba(${i}, ${s}, ${l}, ${a*(n/100)})`}function go(c,n,r){const i=se(c),s=se(n);if(i==null||s==null)return c;const[l,a,b,d]=i,[h,p,f,u]=s;return`rgba(${ie(l,h,r)}, ${ie(a,p,r)}, ${ie(b,f,r)}, ${ie(d,u,r)})`}const ie=(c,n,r)=>c+(n-c)*r/100;function se(c){c=c.trim();const n=kt.exec(c);if(n==null)return null;if(n[1]==="#"){const r=n[2];switch(r.length){case 3:return[parseInt(r[0]+r[0],16),parseInt(r[1]+r[1],16),parseInt(r[2]+r[2],16),1];case 6:return[parseInt(r.substring(0,2),16),parseInt(r.substring(2,4),16),parseInt(r.substring(4,6),16),1]}return null}switch(n[3]){case"rgb":return[parseInt(n[4],10),parseInt(n[5],10),parseInt(n[6],10),1];case"rgba":return[parseInt(n[4],10),parseInt(n[5],10),parseInt(n[6],10),parseFloat(n[7])];default:return null}}function Pt(c){const n=()=>{const i=document.body,s=window.getComputedStyle(i),l=i.classList.contains("vscode-light")||i.classList.contains("vscode-high-contrast-light"),a=i.style;a.setProperty("--font-family",s.getPropertyValue("--vscode-font-family").trim()),a.setProperty("--font-size",s.getPropertyValue("--vscode-font-size").trim()),a.setProperty("--font-weight",s.getPropertyValue("--vscode-font-weight").trim()),a.setProperty("--editor-font-family",s.getPropertyValue("--vscode-editor-font-family").trim()),a.setProperty("--editor-font-size",s.getPropertyValue("--vscode-editor-font-size").trim()),a.setProperty("--editor-font-weight",s.getPropertyValue("--vscode-editor-font-weight").trim());const b=s.getPropertyValue("--vscode-editor-background").trim();let d=b;a.setProperty("--color-background",d),a.setProperty("--color-background--lighten-05",$(d,5)),a.setProperty("--color-background--darken-05",_(d,5)),a.setProperty("--color-background--lighten-075",$(d,7.5)),a.setProperty("--color-background--darken-075",_(d,7.5)),a.setProperty("--color-background--lighten-10",$(d,10)),a.setProperty("--color-background--darken-10",_(d,10)),a.setProperty("--color-background--lighten-15",$(d,15)),a.setProperty("--color-background--darken-15",_(d,15)),a.setProperty("--color-background--lighten-30",$(d,30)),a.setProperty("--color-background--darken-30",_(d,30)),a.setProperty("--color-background--lighten-50",$(d,50)),a.setProperty("--color-background--darken-50",_(d,50)),d=s.getPropertyValue("--vscode-button-background").trim(),a.setProperty("--color-button-background",d),a.setProperty("--color-button-background--darken-30",_(d,30)),a.setProperty("--color-highlight",d),a.setProperty("--color-highlight--75",D(d,75)),a.setProperty("--color-highlight--50",D(d,50)),a.setProperty("--color-highlight--25",D(d,25)),d=s.getPropertyValue("--vscode-button-secondaryBackground").trim(),a.setProperty("--color-button-secondary-background",d),a.setProperty("--color-button-secondary-background--darken-30",_(d,30)),d=s.getPropertyValue("--vscode-button-foreground").trim(),a.setProperty("--color-button-foreground",d);let h=s.getPropertyValue("--vscode-editor-foreground").trim();h||(h=s.getPropertyValue("--vscode-foreground").trim()),a.setProperty("--color-foreground",h),a.setProperty("--color-foreground--85",D(h,85)),a.setProperty("--color-foreground--75",D(h,75)),a.setProperty("--color-foreground--65",D(h,65)),a.setProperty("--color-foreground--50",D(h,50)),d=s.getPropertyValue("--vscode-focusBorder").trim(),a.setProperty("--color-focus-border",d),d=s.getPropertyValue("--vscode-textLink-foreground").trim(),a.setProperty("--color-link-foreground",d),a.setProperty("--color-link-foreground--darken-20",_(d,20)),a.setProperty("--color-link-foreground--lighten-20",$(d,20)),d=s.getPropertyValue("--vscode-sideBar-background").trim(),a.setProperty("--color-view-background",d||b),d=s.getPropertyValue("--vscode-sideBar-foreground").trim(),a.setProperty("--color-view-foreground",d||h),a.setProperty("--color-view-header-foreground",s.getPropertyValue("--vscode-sideBarSectionHeader-foreground").trim()||d||h),d=s.getPropertyValue("--vscode-editorHoverWidget-background").trim(),a.setProperty("--color-hover-background",d),d=s.getPropertyValue("--vscode-editorHoverWidget-border").trim(),a.setProperty("--color-hover-border",d),d=s.getPropertyValue("--vscode-editorHoverWidget-foreground").trim(),a.setProperty("--color-hover-foreground",d),d=s.getPropertyValue("--vscode-editorHoverWidget-statusBarBackground").trim(),a.setProperty("--color-hover-statusBarBackground",d),a.setProperty("--graph-panel-bg",l?_(b,5):$(b,5)),a.setProperty("--graph-theme-opacity-factor",l?"0.5":"1"),d=s.getPropertyValue("--vscode-inputValidation-infoBackground").trim(),a.setProperty("--color-alert-infoHoverBackground",l?_(d,5):$(d,5)),a.setProperty("--color-alert-infoBackground",d),d=s.getPropertyValue("--vscode-inputValidation-warningBackground").trim(),a.setProperty("--color-alert-warningHoverBackground",l?_(d,5):$(d,5)),a.setProperty("--color-alert-warningBackground",d),d=s.getPropertyValue("--vscode-inputValidation-errorBackground").trim(),a.setProperty("--color-alert-errorHoverBackground",l?_(d,5):$(d,5)),a.setProperty("--color-alert-errorBackground",d),d=l?_(b,5):$(b,5),a.setProperty("--color-alert-neutralHoverBackground",l?_(d,5):$(d,5)),a.setProperty("--color-alert-neutralBackground",d),a.setProperty("--color-alert-infoBorder","var(--vscode-inputValidation-infoBorder)"),a.setProperty("--color-alert-warningBorder","var(--vscode-inputValidation-warningBorder)"),a.setProperty("--color-alert-errorBorder","var(--vscode-inputValidation-errorBorder)"),a.setProperty("--color-alert-neutralBorder","var(--vscode-input-foreground)"),a.setProperty("--color-alert-foreground","var(--vscode-input-foreground)"),c?.()},r=new MutationObserver(n);return r.observe(document.body,{attributes:!0,attributeFilter:["class"]}),n(),r}const At=2**30;let ce=0;function De(){return ce===At?ce=1:ce++,`webview:${ce}`}class Ct{constructor(n){this.appName=n,this.state=window.bootstrap,window.bootstrap=void 0,this.log(`${this.appName}()`),this._api=acquireVsCodeApi(),Pt(this.onThemeUpdated?.bind(this)),requestAnimationFrame(()=>{this.log(`${this.appName}.initializing`);try{this.onInitialize?.(),this.bind(),this.onMessageReceived!=null&&window.addEventListener("message",this.onMessageReceived.bind(this)),this.sendCommand(ht,void 0),this.onInitialized?.()}finally{setTimeout(()=>{document.body.classList.remove("preload")},500)}})}bind(){this.bindDisposables?.forEach(n=>n.dispose()),this.bindDisposables=this.onBind?.()}log(n,...r){}getState(){return this._api.getState()}sendCommand(n,r){const i=De();return this.log(`${this.appName}.sendCommand(${i}): name=${n.method}`),this.postMessage({id:i,method:n.method,params:r})}sendCommandWithCompletion(n,r,i,s){const l=De();this.log(`${this.appName}.sendCommandWithCompletion(${l}): name=${n.method}`);const a=y.on(window,"message",b=>{Me(i,b.data,d=>{d.completionId===l&&(a.dispose(),s(d))})});return this.postMessage({id:l,method:n.method,params:r})}setState(n){this.state=n,n!=null&&this._api.setState(n)}postMessage(n){this._api.postMessage(n)}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ae=window,me=ae.ShadowRoot&&(ae.ShadyCSS===void 0||ae.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ge=Symbol(),Re=new WeakMap;class He{constructor(n,r,i){if(this._$cssResult$=!0,i!==ge)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=n,this.t=r}get styleSheet(){let n=this.o;const r=this.t;if(me&&n===void 0){const i=r!==void 0&&r.length===1;i&&(n=Re.get(r)),n===void 0&&((this.o=n=new CSSStyleSheet).replaceSync(this.cssText),i&&Re.set(r,n))}return n}toString(){return this.cssText}}const St=c=>new He(typeof c=="string"?c:c+"",void 0,ge),R=(c,...n)=>{const r=c.length===1?c[0]:n.reduce((i,s,l)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+c[l+1],c[0]);return new He(r,c,ge)},xt=(c,n)=>{me?c.adoptedStyleSheets=n.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet):n.forEach(r=>{const i=document.createElement("style"),s=ae.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=r.cssText,c.appendChild(i)})},Fe=me?c=>c:c=>c instanceof CSSStyleSheet?(n=>{let r="";for(const i of n.cssRules)r+=i.cssText;return St(r)})(c):c;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ve;const le=window,Ue=le.trustedTypes,Et=Ue?Ue.emptyScript:"",Ie=le.reactiveElementPolyfillSupport,ye={toAttribute(c,n){switch(n){case Boolean:c=c?Et:null;break;case Object:case Array:c=c==null?c:JSON.stringify(c)}return c},fromAttribute(c,n){let r=c;switch(n){case Boolean:r=c!==null;break;case Number:r=c===null?null:Number(c);break;case Object:case Array:try{r=JSON.parse(c)}catch{r=null}}return r}},Ne=(c,n)=>n!==c&&(n==n||c==c),_e={attribute:!0,type:String,converter:ye,reflect:!1,hasChanged:Ne};class I extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(n){var r;(r=this.h)!==null&&r!==void 0||(this.h=[]),this.h.push(n)}static get observedAttributes(){this.finalize();const n=[];return this.elementProperties.forEach((r,i)=>{const s=this._$Ep(i,r);s!==void 0&&(this._$Ev.set(s,i),n.push(s))}),n}static createProperty(n,r=_e){if(r.state&&(r.attribute=!1),this.finalize(),this.elementProperties.set(n,r),!r.noAccessor&&!this.prototype.hasOwnProperty(n)){const i=typeof n=="symbol"?Symbol():"__"+n,s=this.getPropertyDescriptor(n,i,r);s!==void 0&&Object.defineProperty(this.prototype,n,s)}}static getPropertyDescriptor(n,r,i){return{get(){return this[r]},set(s){const l=this[n];this[r]=s,this.requestUpdate(n,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(n){return this.elementProperties.get(n)||_e}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const n=Object.getPrototypeOf(this);if(n.finalize(),this.elementProperties=new Map(n.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const r=this.properties,i=[...Object.getOwnPropertyNames(r),...Object.getOwnPropertySymbols(r)];for(const s of i)this.createProperty(s,r[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(n){const r=[];if(Array.isArray(n)){const i=new Set(n.flat(1/0).reverse());for(const s of i)r.unshift(Fe(s))}else n!==void 0&&r.push(Fe(n));return r}static _$Ep(n,r){const i=r.attribute;return i===!1?void 0:typeof i=="string"?i:typeof n=="string"?n.toLowerCase():void 0}u(){var n;this._$E_=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(n=this.constructor.h)===null||n===void 0||n.forEach(r=>r(this))}addController(n){var r,i;((r=this._$ES)!==null&&r!==void 0?r:this._$ES=[]).push(n),this.renderRoot!==void 0&&this.isConnected&&((i=n.hostConnected)===null||i===void 0||i.call(n))}removeController(n){var r;(r=this._$ES)===null||r===void 0||r.splice(this._$ES.indexOf(n)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((n,r)=>{this.hasOwnProperty(r)&&(this._$Ei.set(r,this[r]),delete this[r])})}createRenderRoot(){var n;const r=(n=this.shadowRoot)!==null&&n!==void 0?n:this.attachShadow(this.constructor.shadowRootOptions);return xt(r,this.constructor.elementStyles),r}connectedCallback(){var n;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(n=this._$ES)===null||n===void 0||n.forEach(r=>{var i;return(i=r.hostConnected)===null||i===void 0?void 0:i.call(r)})}enableUpdating(n){}disconnectedCallback(){var n;(n=this._$ES)===null||n===void 0||n.forEach(r=>{var i;return(i=r.hostDisconnected)===null||i===void 0?void 0:i.call(r)})}attributeChangedCallback(n,r,i){this._$AK(n,i)}_$EO(n,r,i=_e){var s;const l=this.constructor._$Ep(n,i);if(l!==void 0&&i.reflect===!0){const a=(((s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?i.converter:ye).toAttribute(r,i.type);this._$El=n,a==null?this.removeAttribute(l):this.setAttribute(l,a),this._$El=null}}_$AK(n,r){var i;const s=this.constructor,l=s._$Ev.get(n);if(l!==void 0&&this._$El!==l){const a=s.getPropertyOptions(l),b=typeof a.converter=="function"?{fromAttribute:a.converter}:((i=a.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?a.converter:ye;this._$El=l,this[l]=b.fromAttribute(r,a.type),this._$El=null}}requestUpdate(n,r,i){let s=!0;n!==void 0&&(((i=i||this.constructor.getPropertyOptions(n)).hasChanged||Ne)(this[n],r)?(this._$AL.has(n)||this._$AL.set(n,r),i.reflect===!0&&this._$El!==n&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(n,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(r){Promise.reject(r)}const n=this.scheduleUpdate();return n!=null&&await n,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var n;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((s,l)=>this[l]=s),this._$Ei=void 0);let r=!1;const i=this._$AL;try{r=this.shouldUpdate(i),r?(this.willUpdate(i),(n=this._$ES)===null||n===void 0||n.forEach(s=>{var l;return(l=s.hostUpdate)===null||l===void 0?void 0:l.call(s)}),this.update(i)):this._$Ek()}catch(s){throw r=!1,this._$Ek(),s}r&&this._$AE(i)}willUpdate(n){}_$AE(n){var r;(r=this._$ES)===null||r===void 0||r.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(n)),this.updated(n)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(n){return!0}update(n){this._$EC!==void 0&&(this._$EC.forEach((r,i)=>this._$EO(i,this[i],r)),this._$EC=void 0),this._$Ek()}updated(n){}firstUpdated(n){}}I.finalized=!0,I.elementProperties=new Map,I.elementStyles=[],I.shadowRootOptions={mode:"open"},Ie?.({ReactiveElement:I}),((ve=le.reactiveElementVersions)!==null&&ve!==void 0?ve:le.reactiveElementVersions=[]).push("1.4.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var $e;const de=window,N=de.trustedTypes,qe=N?N.createPolicy("lit-html",{createHTML:c=>c}):void 0,C=`lit$${(Math.random()+"").slice(9)}$`,we="?"+C,Tt=`<${we}>`,q=document,K=(c="")=>q.createComment(c),G=c=>c===null||typeof c!="object"&&typeof c!="function",Be=Array.isArray,Le=c=>Be(c)||typeof c?.[Symbol.iterator]=="function",J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ze=/-->/g,je=/>/g,H=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ve=/'/g,We=/"/g,Ye=/^(?:script|style|textarea|title)$/i,Ze=c=>(n,...r)=>({_$litType$:c,strings:n,values:r}),w=Ze(1),vo=Ze(2),B=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),Ke=new WeakMap,Mt=(c,n,r)=>{var i,s;const l=(i=r?.renderBefore)!==null&&i!==void 0?i:n;let a=l._$litPart$;if(a===void 0){const b=(s=r?.renderBefore)!==null&&s!==void 0?s:null;l._$litPart$=a=new z(n.insertBefore(K(),b),b,void 0,r??{})}return a._$AI(c),a},L=q.createTreeWalker(q,129,null,!1),Ge=(c,n)=>{const r=c.length-1,i=[];let s,l=n===2?"<svg>":"",a=J;for(let d=0;d<r;d++){const h=c[d];let p,f,u=-1,P=0;for(;P<h.length&&(a.lastIndex=P,f=a.exec(h),f!==null);)P=a.lastIndex,a===J?f[1]==="!--"?a=ze:f[1]!==void 0?a=je:f[2]!==void 0?(Ye.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=H):f[3]!==void 0&&(a=H):a===H?f[0]===">"?(a=s??J,u=-1):f[1]===void 0?u=-2:(u=a.lastIndex-f[2].length,p=f[1],a=f[3]===void 0?H:f[3]==='"'?We:Ve):a===We||a===Ve?a=H:a===ze||a===je?a=J:(a=H,s=void 0);const oe=a===H&&c[d+1].startsWith("/>")?" ":"";l+=a===J?h+Tt:u>=0?(i.push(p),h.slice(0,u)+"$lit$"+h.slice(u)+C+oe):h+C+(u===-2?(i.push(void 0),d):oe)}const b=l+(c[r]||"<?>")+(n===2?"</svg>":"");if(!Array.isArray(c)||!c.hasOwnProperty("raw"))throw Error("invalid template strings array");return[qe!==void 0?qe.createHTML(b):b,i]};class X{constructor({strings:n,_$litType$:r},i){let s;this.parts=[];let l=0,a=0;const b=n.length-1,d=this.parts,[h,p]=Ge(n,r);if(this.el=X.createElement(h,i),L.currentNode=this.el.content,r===2){const f=this.el.content,u=f.firstChild;u.remove(),f.append(...u.childNodes)}for(;(s=L.nextNode())!==null&&d.length<b;){if(s.nodeType===1){if(s.hasAttributes()){const f=[];for(const u of s.getAttributeNames())if(u.endsWith("$lit$")||u.startsWith(C)){const P=p[a++];if(f.push(u),P!==void 0){const oe=s.getAttribute(P.toLowerCase()+"$lit$").split(C),ne=/([.?@])?(.*)/.exec(P);d.push({type:1,index:l,name:ne[2],strings:oe,ctor:ne[1]==="."?Xe:ne[1]==="?"?Qe:ne[1]==="@"?et:Q})}else d.push({type:6,index:l})}for(const u of f)s.removeAttribute(u)}if(Ye.test(s.tagName)){const f=s.textContent.split(C),u=f.length-1;if(u>0){s.textContent=N?N.emptyScript:"";for(let P=0;P<u;P++)s.append(f[P],K()),L.nextNode(),d.push({type:2,index:++l});s.append(f[u],K())}}}else if(s.nodeType===8)if(s.data===we)d.push({type:2,index:l});else{let f=-1;for(;(f=s.data.indexOf(C,f+1))!==-1;)d.push({type:7,index:l}),f+=C.length-1}l++}}static createElement(n,r){const i=q.createElement("template");return i.innerHTML=n,i}}function F(c,n,r=c,i){var s,l,a,b;if(n===B)return n;let d=i!==void 0?(s=r._$Cl)===null||s===void 0?void 0:s[i]:r._$Cu;const h=G(n)?void 0:n._$litDirective$;return d?.constructor!==h&&((l=d?._$AO)===null||l===void 0||l.call(d,!1),h===void 0?d=void 0:(d=new h(c),d._$AT(c,r,i)),i!==void 0?((a=(b=r)._$Cl)!==null&&a!==void 0?a:b._$Cl=[])[i]=d:r._$Cu=d),d!==void 0&&(n=F(c,d._$AS(c,n.values),d,i)),n}class Je{constructor(n,r){this.v=[],this._$AN=void 0,this._$AD=n,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(n){var r;const{el:{content:i},parts:s}=this._$AD,l=((r=n?.creationScope)!==null&&r!==void 0?r:q).importNode(i,!0);L.currentNode=l;let a=L.nextNode(),b=0,d=0,h=s[0];for(;h!==void 0;){if(b===h.index){let p;h.type===2?p=new z(a,a.nextSibling,this,n):h.type===1?p=new h.ctor(a,h.name,h.strings,this,n):h.type===6&&(p=new tt(a,this,n)),this.v.push(p),h=s[++d]}b!==h?.index&&(a=L.nextNode(),b++)}return l}m(n){let r=0;for(const i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(n,i,r),r+=i.strings.length-2):i._$AI(n[r])),r++}}class z{constructor(n,r,i,s){var l;this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=n,this._$AB=r,this._$AM=i,this.options=s,this._$C_=(l=s?.isConnected)===null||l===void 0||l}get _$AU(){var n,r;return(r=(n=this._$AM)===null||n===void 0?void 0:n._$AU)!==null&&r!==void 0?r:this._$C_}get parentNode(){let n=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&n.nodeType===11&&(n=r.parentNode),n}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(n,r=this){n=F(this,n,r),G(n)?n===g||n==null||n===""?(this._$AH!==g&&this._$AR(),this._$AH=g):n!==this._$AH&&n!==B&&this.$(n):n._$litType$!==void 0?this.T(n):n.nodeType!==void 0?this.k(n):Le(n)?this.O(n):this.$(n)}S(n,r=this._$AB){return this._$AA.parentNode.insertBefore(n,r)}k(n){this._$AH!==n&&(this._$AR(),this._$AH=this.S(n))}$(n){this._$AH!==g&&G(this._$AH)?this._$AA.nextSibling.data=n:this.k(q.createTextNode(n)),this._$AH=n}T(n){var r;const{values:i,_$litType$:s}=n,l=typeof s=="number"?this._$AC(n):(s.el===void 0&&(s.el=X.createElement(s.h,this.options)),s);if(((r=this._$AH)===null||r===void 0?void 0:r._$AD)===l)this._$AH.m(i);else{const a=new Je(l,this),b=a.p(this.options);a.m(i),this.k(b),this._$AH=a}}_$AC(n){let r=Ke.get(n.strings);return r===void 0&&Ke.set(n.strings,r=new X(n)),r}O(n){Be(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let i,s=0;for(const l of n)s===r.length?r.push(i=new z(this.S(K()),this.S(K()),this,this.options)):i=r[s],i._$AI(l),s++;s<r.length&&(this._$AR(i&&i._$AB.nextSibling,s),r.length=s)}_$AR(n=this._$AA.nextSibling,r){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,r);n&&n!==this._$AB;){const s=n.nextSibling;n.remove(),n=s}}setConnected(n){var r;this._$AM===void 0&&(this._$C_=n,(r=this._$AP)===null||r===void 0||r.call(this,n))}}class Q{constructor(n,r,i,s,l){this.type=1,this._$AH=g,this._$AN=void 0,this.element=n,this.name=r,this._$AM=s,this.options=l,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=g}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(n,r=this,i,s){const l=this.strings;let a=!1;if(l===void 0)n=F(this,n,r,0),a=!G(n)||n!==this._$AH&&n!==B,a&&(this._$AH=n);else{const b=n;let d,h;for(n=l[0],d=0;d<l.length-1;d++)h=F(this,b[i+d],r,d),h===B&&(h=this._$AH[d]),a||(a=!G(h)||h!==this._$AH[d]),h===g?n=g:n!==g&&(n+=(h??"")+l[d+1]),this._$AH[d]=h}a&&!s&&this.P(n)}P(n){n===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,n??"")}}class Xe extends Q{constructor(){super(...arguments),this.type=3}P(n){this.element[this.name]=n===g?void 0:n}}const Ot=N?N.emptyScript:"";class Qe extends Q{constructor(){super(...arguments),this.type=4}P(n){n&&n!==g?this.element.setAttribute(this.name,Ot):this.element.removeAttribute(this.name)}}class et extends Q{constructor(n,r,i,s,l){super(n,r,i,s,l),this.type=5}_$AI(n,r=this){var i;if((n=(i=F(this,n,r,0))!==null&&i!==void 0?i:g)===B)return;const s=this._$AH,l=n===g&&s!==g||n.capture!==s.capture||n.once!==s.once||n.passive!==s.passive,a=n!==g&&(s===g||l);l&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,n),this._$AH=n}handleEvent(n){var r,i;typeof this._$AH=="function"?this._$AH.call((i=(r=this.options)===null||r===void 0?void 0:r.host)!==null&&i!==void 0?i:this.element,n):this._$AH.handleEvent(n)}}class tt{constructor(n,r,i){this.element=n,this.type=6,this._$AN=void 0,this._$AM=r,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(n){F(this,n)}}const yo={A:"$lit$",M:C,C:we,L:1,R:Ge,D:Je,V:Le,I:F,H:z,N:Q,U:Qe,B:et,F:Xe,W:tt},ot=de.litHtmlPolyfillSupport;ot?.(X,z),(($e=de.litHtmlVersions)!==null&&$e!==void 0?$e:de.litHtmlVersions=[]).push("2.3.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ke,Pe;const _o=null;class k extends I{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n,r;const i=super.createRenderRoot();return(n=(r=this.renderOptions).renderBefore)!==null&&n!==void 0||(r.renderBefore=i.firstChild),i}update(n){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(n),this._$Do=Mt(r,this.renderRoot,this.renderOptions)}connectedCallback(){var n;super.connectedCallback(),(n=this._$Do)===null||n===void 0||n.setConnected(!0)}disconnectedCallback(){var n;super.disconnectedCallback(),(n=this._$Do)===null||n===void 0||n.setConnected(!1)}render(){return B}}k.finalized=!0,k._$litElement$=!0,(ke=globalThis.litElementHydrateSupport)===null||ke===void 0||ke.call(globalThis,{LitElement:k});const nt=globalThis.litElementPolyfillSupport;nt?.({LitElement:k});const $o={_$AK:(c,n,r)=>{c._$AK(n,r)},_$AL:c=>c._$AL};((Pe=globalThis.litElementVersions)!==null&&Pe!==void 0?Pe:globalThis.litElementVersions=[]).push("3.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S=c=>n=>typeof n=="function"?((r,i)=>(customElements.define(r,i),i))(c,n):((r,i)=>{const{kind:s,elements:l}=i;return{kind:s,elements:l,finisher(a){customElements.define(r,a)}}})(c,n);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Dt=(c,n)=>n.kind==="method"&&n.descriptor&&!("value"in n.descriptor)?{...n,finisher(r){r.createProperty(n.key,c)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:n.key,initializer(){typeof n.initializer=="function"&&(this[n.key]=n.initializer.call(this))},finisher(r){r.createProperty(n.key,c)}};function m(c){return(n,r)=>r!==void 0?((i,s,l)=>{s.constructor.createProperty(l,i)})(c,n,r):Dt(c,n)}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ae;const Rt=((Ae=window.HTMLSlotElement)===null||Ae===void 0?void 0:Ae.prototype.assignedElements)!=null?(c,n)=>c.assignedElements(n):(c,n)=>c.assignedNodes(n).filter(r=>r.nodeType===Node.ELEMENT_NODE);function wo(c){const{slot:n,selector:r}=c??{};return o({descriptor:i=>({get(){var s;const l="slot"+(n?`[name=${n}]`:":not([name])"),a=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(l),b=a!=null?Rt(a,c):[];return r?b.filter(d=>d.matches(r)):b},enumerable:!0,configurable:!0})})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ko(c,n,r){let i,s=c;return typeof c=="object"?(s=c.slot,i=c):i={flatten:n},r?t({slot:s,flatten:n,selector:r}):e({descriptor:l=>({get(){var a,b;const d="slot"+(s?`[name=${s}]`:":not([name])"),h=(a=this.renderRoot)===null||a===void 0?void 0:a.querySelector(d);return(b=h?.assignedNodes(i))!==null&&b!==void 0?b:[]},enumerable:!0,configurable:!0})})}var Ht=Object.defineProperty,Ft=Object.getOwnPropertyDescriptor,rt=(c,n,r,i)=>{for(var s=i>1?void 0:i?Ft(n,r):n,l=c.length-1,a;l>=0;l--)(a=c[l])&&(s=(i?a(n,r,s):a(s))||s);return i&&s&&Ht(n,r,s),s};let he=class extends k{constructor(){super(...arguments),this.icon=""}render(){return w``}};he.styles=R`
		:host {
			font: normal normal normal 16px/1 codicon;
			display: inline-block;
			text-decoration: none;
			text-rendering: auto;
			text-align: center;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			user-select: none;
			-webkit-user-select: none;
			-ms-user-select: none;
			color: inherit;
			vertical-align: text-bottom;
			letter-spacing: normal;
		}

		:host([icon='add']):before {
			content: '\\ea60';
		}
		:host([icon='plus']):before {
			content: '\\ea60';
		}
		:host([icon='gist-new']):before {
			content: '\\ea60';
		}
		:host([icon='repo-create']):before {
			content: '\\ea60';
		}
		:host([icon='lightbulb']):before {
			content: '\\ea61';
		}
		:host([icon='light-bulb']):before {
			content: '\\ea61';
		}
		:host([icon='repo']):before {
			content: '\\ea62';
		}
		:host([icon='repo-delete']):before {
			content: '\\ea62';
		}
		:host([icon='gist-fork']):before {
			content: '\\ea63';
		}
		:host([icon='repo-forked']):before {
			content: '\\ea63';
		}
		:host([icon='git-pull-request']):before {
			content: '\\ea64';
		}
		:host([icon='git-pull-request-abandoned']):before {
			content: '\\ea64';
		}
		:host([icon='record-keys']):before {
			content: '\\ea65';
		}
		:host([icon='keyboard']):before {
			content: '\\ea65';
		}
		:host([icon='tag']):before {
			content: '\\ea66';
		}
		:host([icon='tag-add']):before {
			content: '\\ea66';
		}
		:host([icon='tag-remove']):before {
			content: '\\ea66';
		}
		:host([icon='person']):before {
			content: '\\ea67';
		}
		:host([icon='person-follow']):before {
			content: '\\ea67';
		}
		:host([icon='person-outline']):before {
			content: '\\ea67';
		}
		:host([icon='person-filled']):before {
			content: '\\ea67';
		}
		:host([icon='git-branch']):before {
			content: '\\ea68';
		}
		:host([icon='git-branch-create']):before {
			content: '\\ea68';
		}
		:host([icon='git-branch-delete']):before {
			content: '\\ea68';
		}
		:host([icon='source-control']):before {
			content: '\\ea68';
		}
		:host([icon='mirror']):before {
			content: '\\ea69';
		}
		:host([icon='mirror-public']):before {
			content: '\\ea69';
		}
		:host([icon='star']):before {
			content: '\\ea6a';
		}
		:host([icon='star-add']):before {
			content: '\\ea6a';
		}
		:host([icon='star-delete']):before {
			content: '\\ea6a';
		}
		:host([icon='star-empty']):before {
			content: '\\ea6a';
		}
		:host([icon='comment']):before {
			content: '\\ea6b';
		}
		:host([icon='comment-add']):before {
			content: '\\ea6b';
		}
		:host([icon='alert']):before {
			content: '\\ea6c';
		}
		:host([icon='warning']):before {
			content: '\\ea6c';
		}
		:host([icon='search']):before {
			content: '\\ea6d';
		}
		:host([icon='search-save']):before {
			content: '\\ea6d';
		}
		:host([icon='log-out']):before {
			content: '\\ea6e';
		}
		:host([icon='sign-out']):before {
			content: '\\ea6e';
		}
		:host([icon='log-in']):before {
			content: '\\ea6f';
		}
		:host([icon='sign-in']):before {
			content: '\\ea6f';
		}
		:host([icon='eye']):before {
			content: '\\ea70';
		}
		:host([icon='eye-unwatch']):before {
			content: '\\ea70';
		}
		:host([icon='eye-watch']):before {
			content: '\\ea70';
		}
		:host([icon='circle-filled']):before {
			content: '\\ea71';
		}
		:host([icon='primitive-dot']):before {
			content: '\\ea71';
		}
		:host([icon='close-dirty']):before {
			content: '\\ea71';
		}
		:host([icon='debug-breakpoint']):before {
			content: '\\ea71';
		}
		:host([icon='debug-breakpoint-disabled']):before {
			content: '\\ea71';
		}
		:host([icon='debug-hint']):before {
			content: '\\ea71';
		}
		:host([icon='primitive-square']):before {
			content: '\\ea72';
		}
		:host([icon='edit']):before {
			content: '\\ea73';
		}
		:host([icon='pencil']):before {
			content: '\\ea73';
		}
		:host([icon='info']):before {
			content: '\\ea74';
		}
		:host([icon='issue-opened']):before {
			content: '\\ea74';
		}
		:host([icon='gist-private']):before {
			content: '\\ea75';
		}
		:host([icon='git-fork-private']):before {
			content: '\\ea75';
		}
		:host([icon='lock']):before {
			content: '\\ea75';
		}
		:host([icon='mirror-private']):before {
			content: '\\ea75';
		}
		:host([icon='close']):before {
			content: '\\ea76';
		}
		:host([icon='remove-close']):before {
			content: '\\ea76';
		}
		:host([icon='x']):before {
			content: '\\ea76';
		}
		:host([icon='repo-sync']):before {
			content: '\\ea77';
		}
		:host([icon='sync']):before {
			content: '\\ea77';
		}
		:host([icon='clone']):before {
			content: '\\ea78';
		}
		:host([icon='desktop-download']):before {
			content: '\\ea78';
		}
		:host([icon='beaker']):before {
			content: '\\ea79';
		}
		:host([icon='microscope']):before {
			content: '\\ea79';
		}
		:host([icon='vm']):before {
			content: '\\ea7a';
		}
		:host([icon='device-desktop']):before {
			content: '\\ea7a';
		}
		:host([icon='file']):before {
			content: '\\ea7b';
		}
		:host([icon='file-text']):before {
			content: '\\ea7b';
		}
		:host([icon='more']):before {
			content: '\\ea7c';
		}
		:host([icon='ellipsis']):before {
			content: '\\ea7c';
		}
		:host([icon='kebab-horizontal']):before {
			content: '\\ea7c';
		}
		:host([icon='mail-reply']):before {
			content: '\\ea7d';
		}
		:host([icon='reply']):before {
			content: '\\ea7d';
		}
		:host([icon='organization']):before {
			content: '\\ea7e';
		}
		:host([icon='organization-filled']):before {
			content: '\\ea7e';
		}
		:host([icon='organization-outline']):before {
			content: '\\ea7e';
		}
		:host([icon='new-file']):before {
			content: '\\ea7f';
		}
		:host([icon='file-add']):before {
			content: '\\ea7f';
		}
		:host([icon='new-folder']):before {
			content: '\\ea80';
		}
		:host([icon='file-directory-create']):before {
			content: '\\ea80';
		}
		:host([icon='trash']):before {
			content: '\\ea81';
		}
		:host([icon='trashcan']):before {
			content: '\\ea81';
		}
		:host([icon='history']):before {
			content: '\\ea82';
		}
		:host([icon='clock']):before {
			content: '\\ea82';
		}
		:host([icon='folder']):before {
			content: '\\ea83';
		}
		:host([icon='file-directory']):before {
			content: '\\ea83';
		}
		:host([icon='symbol-folder']):before {
			content: '\\ea83';
		}
		:host([icon='logo-github']):before {
			content: '\\ea84';
		}
		:host([icon='mark-github']):before {
			content: '\\ea84';
		}
		:host([icon='github']):before {
			content: '\\ea84';
		}
		:host([icon='terminal']):before {
			content: '\\ea85';
		}
		:host([icon='console']):before {
			content: '\\ea85';
		}
		:host([icon='repl']):before {
			content: '\\ea85';
		}
		:host([icon='zap']):before {
			content: '\\ea86';
		}
		:host([icon='symbol-event']):before {
			content: '\\ea86';
		}
		:host([icon='error']):before {
			content: '\\ea87';
		}
		:host([icon='stop']):before {
			content: '\\ea87';
		}
		:host([icon='variable']):before {
			content: '\\ea88';
		}
		:host([icon='symbol-variable']):before {
			content: '\\ea88';
		}
		:host([icon='array']):before {
			content: '\\ea8a';
		}
		:host([icon='symbol-array']):before {
			content: '\\ea8a';
		}
		:host([icon='symbol-module']):before {
			content: '\\ea8b';
		}
		:host([icon='symbol-package']):before {
			content: '\\ea8b';
		}
		:host([icon='symbol-namespace']):before {
			content: '\\ea8b';
		}
		:host([icon='symbol-object']):before {
			content: '\\ea8b';
		}
		:host([icon='symbol-method']):before {
			content: '\\ea8c';
		}
		:host([icon='symbol-function']):before {
			content: '\\ea8c';
		}
		:host([icon='symbol-constructor']):before {
			content: '\\ea8c';
		}
		:host([icon='symbol-boolean']):before {
			content: '\\ea8f';
		}
		:host([icon='symbol-null']):before {
			content: '\\ea8f';
		}
		:host([icon='symbol-numeric']):before {
			content: '\\ea90';
		}
		:host([icon='symbol-number']):before {
			content: '\\ea90';
		}
		:host([icon='symbol-structure']):before {
			content: '\\ea91';
		}
		:host([icon='symbol-struct']):before {
			content: '\\ea91';
		}
		:host([icon='symbol-parameter']):before {
			content: '\\ea92';
		}
		:host([icon='symbol-type-parameter']):before {
			content: '\\ea92';
		}
		:host([icon='symbol-key']):before {
			content: '\\ea93';
		}
		:host([icon='symbol-text']):before {
			content: '\\ea93';
		}
		:host([icon='symbol-reference']):before {
			content: '\\ea94';
		}
		:host([icon='go-to-file']):before {
			content: '\\ea94';
		}
		:host([icon='symbol-enum']):before {
			content: '\\ea95';
		}
		:host([icon='symbol-value']):before {
			content: '\\ea95';
		}
		:host([icon='symbol-ruler']):before {
			content: '\\ea96';
		}
		:host([icon='symbol-unit']):before {
			content: '\\ea96';
		}
		:host([icon='activate-breakpoints']):before {
			content: '\\ea97';
		}
		:host([icon='archive']):before {
			content: '\\ea98';
		}
		:host([icon='arrow-both']):before {
			content: '\\ea99';
		}
		:host([icon='arrow-down']):before {
			content: '\\ea9a';
		}
		:host([icon='arrow-left']):before {
			content: '\\ea9b';
		}
		:host([icon='arrow-right']):before {
			content: '\\ea9c';
		}
		:host([icon='arrow-small-down']):before {
			content: '\\ea9d';
		}
		:host([icon='arrow-small-left']):before {
			content: '\\ea9e';
		}
		:host([icon='arrow-small-right']):before {
			content: '\\ea9f';
		}
		:host([icon='arrow-small-up']):before {
			content: '\\eaa0';
		}
		:host([icon='arrow-up']):before {
			content: '\\eaa1';
		}
		:host([icon='bell']):before {
			content: '\\eaa2';
		}
		:host([icon='bold']):before {
			content: '\\eaa3';
		}
		:host([icon='book']):before {
			content: '\\eaa4';
		}
		:host([icon='bookmark']):before {
			content: '\\eaa5';
		}
		:host([icon='debug-breakpoint-conditional-unverified']):before {
			content: '\\eaa6';
		}
		:host([icon='debug-breakpoint-conditional']):before {
			content: '\\eaa7';
		}
		:host([icon='debug-breakpoint-conditional-disabled']):before {
			content: '\\eaa7';
		}
		:host([icon='debug-breakpoint-data-unverified']):before {
			content: '\\eaa8';
		}
		:host([icon='debug-breakpoint-data']):before {
			content: '\\eaa9';
		}
		:host([icon='debug-breakpoint-data-disabled']):before {
			content: '\\eaa9';
		}
		:host([icon='debug-breakpoint-log-unverified']):before {
			content: '\\eaaa';
		}
		:host([icon='debug-breakpoint-log']):before {
			content: '\\eaab';
		}
		:host([icon='debug-breakpoint-log-disabled']):before {
			content: '\\eaab';
		}
		:host([icon='briefcase']):before {
			content: '\\eaac';
		}
		:host([icon='broadcast']):before {
			content: '\\eaad';
		}
		:host([icon='browser']):before {
			content: '\\eaae';
		}
		:host([icon='bug']):before {
			content: '\\eaaf';
		}
		:host([icon='calendar']):before {
			content: '\\eab0';
		}
		:host([icon='case-sensitive']):before {
			content: '\\eab1';
		}
		:host([icon='check']):before {
			content: '\\eab2';
		}
		:host([icon='checklist']):before {
			content: '\\eab3';
		}
		:host([icon='chevron-down']):before {
			content: '\\eab4';
		}
		:host([icon='chevron-left']):before {
			content: '\\eab5';
		}
		:host([icon='chevron-right']):before {
			content: '\\eab6';
		}
		:host([icon='chevron-up']):before {
			content: '\\eab7';
		}
		:host([icon='chrome-close']):before {
			content: '\\eab8';
		}
		:host([icon='chrome-maximize']):before {
			content: '\\eab9';
		}
		:host([icon='chrome-minimize']):before {
			content: '\\eaba';
		}
		:host([icon='chrome-restore']):before {
			content: '\\eabb';
		}
		:host([icon='circle-outline']):before {
			content: '\\eabc';
		}
		:host([icon='debug-breakpoint-unverified']):before {
			content: '\\eabc';
		}
		:host([icon='circle-slash']):before {
			content: '\\eabd';
		}
		:host([icon='circuit-board']):before {
			content: '\\eabe';
		}
		:host([icon='clear-all']):before {
			content: '\\eabf';
		}
		:host([icon='clippy']):before {
			content: '\\eac0';
		}
		:host([icon='close-all']):before {
			content: '\\eac1';
		}
		:host([icon='cloud-download']):before {
			content: '\\eac2';
		}
		:host([icon='cloud-upload']):before {
			content: '\\eac3';
		}
		:host([icon='code']):before {
			content: '\\eac4';
		}
		:host([icon='collapse-all']):before {
			content: '\\eac5';
		}
		:host([icon='color-mode']):before {
			content: '\\eac6';
		}
		:host([icon='comment-discussion']):before {
			content: '\\eac7';
		}
		:host([icon='credit-card']):before {
			content: '\\eac9';
		}
		:host([icon='dash']):before {
			content: '\\eacc';
		}
		:host([icon='dashboard']):before {
			content: '\\eacd';
		}
		:host([icon='database']):before {
			content: '\\eace';
		}
		:host([icon='debug-continue']):before {
			content: '\\eacf';
		}
		:host([icon='debug-disconnect']):before {
			content: '\\ead0';
		}
		:host([icon='debug-pause']):before {
			content: '\\ead1';
		}
		:host([icon='debug-restart']):before {
			content: '\\ead2';
		}
		:host([icon='debug-start']):before {
			content: '\\ead3';
		}
		:host([icon='debug-step-into']):before {
			content: '\\ead4';
		}
		:host([icon='debug-step-out']):before {
			content: '\\ead5';
		}
		:host([icon='debug-step-over']):before {
			content: '\\ead6';
		}
		:host([icon='debug-stop']):before {
			content: '\\ead7';
		}
		:host([icon='debug']):before {
			content: '\\ead8';
		}
		:host([icon='device-camera-video']):before {
			content: '\\ead9';
		}
		:host([icon='device-camera']):before {
			content: '\\eada';
		}
		:host([icon='device-mobile']):before {
			content: '\\eadb';
		}
		:host([icon='diff-added']):before {
			content: '\\eadc';
		}
		:host([icon='diff-ignored']):before {
			content: '\\eadd';
		}
		:host([icon='diff-modified']):before {
			content: '\\eade';
		}
		:host([icon='diff-removed']):before {
			content: '\\eadf';
		}
		:host([icon='diff-renamed']):before {
			content: '\\eae0';
		}
		:host([icon='diff']):before {
			content: '\\eae1';
		}
		:host([icon='discard']):before {
			content: '\\eae2';
		}
		:host([icon='editor-layout']):before {
			content: '\\eae3';
		}
		:host([icon='empty-window']):before {
			content: '\\eae4';
		}
		:host([icon='exclude']):before {
			content: '\\eae5';
		}
		:host([icon='extensions']):before {
			content: '\\eae6';
		}
		:host([icon='eye-closed']):before {
			content: '\\eae7';
		}
		:host([icon='file-binary']):before {
			content: '\\eae8';
		}
		:host([icon='file-code']):before {
			content: '\\eae9';
		}
		:host([icon='file-media']):before {
			content: '\\eaea';
		}
		:host([icon='file-pdf']):before {
			content: '\\eaeb';
		}
		:host([icon='file-submodule']):before {
			content: '\\eaec';
		}
		:host([icon='file-symlink-directory']):before {
			content: '\\eaed';
		}
		:host([icon='file-symlink-file']):before {
			content: '\\eaee';
		}
		:host([icon='file-zip']):before {
			content: '\\eaef';
		}
		:host([icon='files']):before {
			content: '\\eaf0';
		}
		:host([icon='filter']):before {
			content: '\\eaf1';
		}
		:host([icon='flame']):before {
			content: '\\eaf2';
		}
		:host([icon='fold-down']):before {
			content: '\\eaf3';
		}
		:host([icon='fold-up']):before {
			content: '\\eaf4';
		}
		:host([icon='fold']):before {
			content: '\\eaf5';
		}
		:host([icon='folder-active']):before {
			content: '\\eaf6';
		}
		:host([icon='folder-opened']):before {
			content: '\\eaf7';
		}
		:host([icon='gear']):before {
			content: '\\eaf8';
		}
		:host([icon='gift']):before {
			content: '\\eaf9';
		}
		:host([icon='gist-secret']):before {
			content: '\\eafa';
		}
		:host([icon='gist']):before {
			content: '\\eafb';
		}
		:host([icon='git-commit']):before {
			content: '\\eafc';
		}
		:host([icon='git-compare']):before {
			content: '\\eafd';
		}
		:host([icon='compare-changes']):before {
			content: '\\eafd';
		}
		:host([icon='git-merge']):before {
			content: '\\eafe';
		}
		:host([icon='github-action']):before {
			content: '\\eaff';
		}
		:host([icon='github-alt']):before {
			content: '\\eb00';
		}
		:host([icon='globe']):before {
			content: '\\eb01';
		}
		:host([icon='grabber']):before {
			content: '\\eb02';
		}
		:host([icon='graph']):before {
			content: '\\eb03';
		}
		:host([icon='gripper']):before {
			content: '\\eb04';
		}
		:host([icon='heart']):before {
			content: '\\eb05';
		}
		:host([icon='home']):before {
			content: '\\eb06';
		}
		:host([icon='horizontal-rule']):before {
			content: '\\eb07';
		}
		:host([icon='hubot']):before {
			content: '\\eb08';
		}
		:host([icon='inbox']):before {
			content: '\\eb09';
		}
		:host([icon='issue-reopened']):before {
			content: '\\eb0b';
		}
		:host([icon='issues']):before {
			content: '\\eb0c';
		}
		:host([icon='italic']):before {
			content: '\\eb0d';
		}
		:host([icon='jersey']):before {
			content: '\\eb0e';
		}
		:host([icon='json']):before {
			content: '\\eb0f';
		}
		:host([icon='kebab-vertical']):before {
			content: '\\eb10';
		}
		:host([icon='key']):before {
			content: '\\eb11';
		}
		:host([icon='law']):before {
			content: '\\eb12';
		}
		:host([icon='lightbulb-autofix']):before {
			content: '\\eb13';
		}
		:host([icon='link-external']):before {
			content: '\\eb14';
		}
		:host([icon='link']):before {
			content: '\\eb15';
		}
		:host([icon='list-ordered']):before {
			content: '\\eb16';
		}
		:host([icon='list-unordered']):before {
			content: '\\eb17';
		}
		:host([icon='live-share']):before {
			content: '\\eb18';
		}
		:host([icon='loading']):before {
			content: '\\eb19';
		}
		:host([icon='location']):before {
			content: '\\eb1a';
		}
		:host([icon='mail-read']):before {
			content: '\\eb1b';
		}
		:host([icon='mail']):before {
			content: '\\eb1c';
		}
		:host([icon='markdown']):before {
			content: '\\eb1d';
		}
		:host([icon='megaphone']):before {
			content: '\\eb1e';
		}
		:host([icon='mention']):before {
			content: '\\eb1f';
		}
		:host([icon='milestone']):before {
			content: '\\eb20';
		}
		:host([icon='mortar-board']):before {
			content: '\\eb21';
		}
		:host([icon='move']):before {
			content: '\\eb22';
		}
		:host([icon='multiple-windows']):before {
			content: '\\eb23';
		}
		:host([icon='mute']):before {
			content: '\\eb24';
		}
		:host([icon='no-newline']):before {
			content: '\\eb25';
		}
		:host([icon='note']):before {
			content: '\\eb26';
		}
		:host([icon='octoface']):before {
			content: '\\eb27';
		}
		:host([icon='open-preview']):before {
			content: '\\eb28';
		}
		:host([icon='package']):before {
			content: '\\eb29';
		}
		:host([icon='paintcan']):before {
			content: '\\eb2a';
		}
		:host([icon='pin']):before {
			content: '\\eb2b';
		}
		:host([icon='play']):before {
			content: '\\eb2c';
		}
		:host([icon='run']):before {
			content: '\\eb2c';
		}
		:host([icon='plug']):before {
			content: '\\eb2d';
		}
		:host([icon='preserve-case']):before {
			content: '\\eb2e';
		}
		:host([icon='preview']):before {
			content: '\\eb2f';
		}
		:host([icon='project']):before {
			content: '\\eb30';
		}
		:host([icon='pulse']):before {
			content: '\\eb31';
		}
		:host([icon='question']):before {
			content: '\\eb32';
		}
		:host([icon='quote']):before {
			content: '\\eb33';
		}
		:host([icon='radio-tower']):before {
			content: '\\eb34';
		}
		:host([icon='reactions']):before {
			content: '\\eb35';
		}
		:host([icon='references']):before {
			content: '\\eb36';
		}
		:host([icon='refresh']):before {
			content: '\\eb37';
		}
		:host([icon='regex']):before {
			content: '\\eb38';
		}
		:host([icon='remote-explorer']):before {
			content: '\\eb39';
		}
		:host([icon='remote']):before {
			content: '\\eb3a';
		}
		:host([icon='remove']):before {
			content: '\\eb3b';
		}
		:host([icon='replace-all']):before {
			content: '\\eb3c';
		}
		:host([icon='replace']):before {
			content: '\\eb3d';
		}
		:host([icon='repo-clone']):before {
			content: '\\eb3e';
		}
		:host([icon='repo-force-push']):before {
			content: '\\eb3f';
		}
		:host([icon='repo-pull']):before {
			content: '\\eb40';
		}
		:host([icon='repo-push']):before {
			content: '\\eb41';
		}
		:host([icon='report']):before {
			content: '\\eb42';
		}
		:host([icon='request-changes']):before {
			content: '\\eb43';
		}
		:host([icon='rocket']):before {
			content: '\\eb44';
		}
		:host([icon='root-folder-opened']):before {
			content: '\\eb45';
		}
		:host([icon='root-folder']):before {
			content: '\\eb46';
		}
		:host([icon='rss']):before {
			content: '\\eb47';
		}
		:host([icon='ruby']):before {
			content: '\\eb48';
		}
		:host([icon='save-all']):before {
			content: '\\eb49';
		}
		:host([icon='save-as']):before {
			content: '\\eb4a';
		}
		:host([icon='save']):before {
			content: '\\eb4b';
		}
		:host([icon='screen-full']):before {
			content: '\\eb4c';
		}
		:host([icon='screen-normal']):before {
			content: '\\eb4d';
		}
		:host([icon='search-stop']):before {
			content: '\\eb4e';
		}
		:host([icon='server']):before {
			content: '\\eb50';
		}
		:host([icon='settings-gear']):before {
			content: '\\eb51';
		}
		:host([icon='settings']):before {
			content: '\\eb52';
		}
		:host([icon='shield']):before {
			content: '\\eb53';
		}
		:host([icon='smiley']):before {
			content: '\\eb54';
		}
		:host([icon='sort-precedence']):before {
			content: '\\eb55';
		}
		:host([icon='split-horizontal']):before {
			content: '\\eb56';
		}
		:host([icon='split-vertical']):before {
			content: '\\eb57';
		}
		:host([icon='squirrel']):before {
			content: '\\eb58';
		}
		:host([icon='star-full']):before {
			content: '\\eb59';
		}
		:host([icon='star-half']):before {
			content: '\\eb5a';
		}
		:host([icon='symbol-class']):before {
			content: '\\eb5b';
		}
		:host([icon='symbol-color']):before {
			content: '\\eb5c';
		}
		:host([icon='symbol-constant']):before {
			content: '\\eb5d';
		}
		:host([icon='symbol-enum-member']):before {
			content: '\\eb5e';
		}
		:host([icon='symbol-field']):before {
			content: '\\eb5f';
		}
		:host([icon='symbol-file']):before {
			content: '\\eb60';
		}
		:host([icon='symbol-interface']):before {
			content: '\\eb61';
		}
		:host([icon='symbol-keyword']):before {
			content: '\\eb62';
		}
		:host([icon='symbol-misc']):before {
			content: '\\eb63';
		}
		:host([icon='symbol-operator']):before {
			content: '\\eb64';
		}
		:host([icon='symbol-property']):before {
			content: '\\eb65';
		}
		:host([icon='wrench']):before {
			content: '\\eb65';
		}
		:host([icon='wrench-subaction']):before {
			content: '\\eb65';
		}
		:host([icon='symbol-snippet']):before {
			content: '\\eb66';
		}
		:host([icon='tasklist']):before {
			content: '\\eb67';
		}
		:host([icon='telescope']):before {
			content: '\\eb68';
		}
		:host([icon='text-size']):before {
			content: '\\eb69';
		}
		:host([icon='three-bars']):before {
			content: '\\eb6a';
		}
		:host([icon='thumbsdown']):before {
			content: '\\eb6b';
		}
		:host([icon='thumbsup']):before {
			content: '\\eb6c';
		}
		:host([icon='tools']):before {
			content: '\\eb6d';
		}
		:host([icon='triangle-down']):before {
			content: '\\eb6e';
		}
		:host([icon='triangle-left']):before {
			content: '\\eb6f';
		}
		:host([icon='triangle-right']):before {
			content: '\\eb70';
		}
		:host([icon='triangle-up']):before {
			content: '\\eb71';
		}
		:host([icon='twitter']):before {
			content: '\\eb72';
		}
		:host([icon='unfold']):before {
			content: '\\eb73';
		}
		:host([icon='unlock']):before {
			content: '\\eb74';
		}
		:host([icon='unmute']):before {
			content: '\\eb75';
		}
		:host([icon='unverified']):before {
			content: '\\eb76';
		}
		:host([icon='verified']):before {
			content: '\\eb77';
		}
		:host([icon='versions']):before {
			content: '\\eb78';
		}
		:host([icon='vm-active']):before {
			content: '\\eb79';
		}
		:host([icon='vm-outline']):before {
			content: '\\eb7a';
		}
		:host([icon='vm-running']):before {
			content: '\\eb7b';
		}
		:host([icon='watch']):before {
			content: '\\eb7c';
		}
		:host([icon='whitespace']):before {
			content: '\\eb7d';
		}
		:host([icon='whole-word']):before {
			content: '\\eb7e';
		}
		:host([icon='window']):before {
			content: '\\eb7f';
		}
		:host([icon='word-wrap']):before {
			content: '\\eb80';
		}
		:host([icon='zoom-in']):before {
			content: '\\eb81';
		}
		:host([icon='zoom-out']):before {
			content: '\\eb82';
		}
		:host([icon='list-filter']):before {
			content: '\\eb83';
		}
		:host([icon='list-flat']):before {
			content: '\\eb84';
		}
		:host([icon='list-selection']):before {
			content: '\\eb85';
		}
		:host([icon='selection']):before {
			content: '\\eb85';
		}
		:host([icon='list-tree']):before {
			content: '\\eb86';
		}
		:host([icon='debug-breakpoint-function-unverified']):before {
			content: '\\eb87';
		}
		:host([icon='debug-breakpoint-function']):before {
			content: '\\eb88';
		}
		:host([icon='debug-breakpoint-function-disabled']):before {
			content: '\\eb88';
		}
		:host([icon='debug-stackframe-active']):before {
			content: '\\eb89';
		}
		:host([icon='debug-stackframe-dot']):before {
			content: '\\eb8a';
		}
		:host([icon='debug-stackframe']):before {
			content: '\\eb8b';
		}
		:host([icon='debug-stackframe-focused']):before {
			content: '\\eb8b';
		}
		:host([icon='debug-breakpoint-unsupported']):before {
			content: '\\eb8c';
		}
		:host([icon='symbol-string']):before {
			content: '\\eb8d';
		}
		:host([icon='debug-reverse-continue']):before {
			content: '\\eb8e';
		}
		:host([icon='debug-step-back']):before {
			content: '\\eb8f';
		}
		:host([icon='debug-restart-frame']):before {
			content: '\\eb90';
		}
		:host([icon='debug-alt']):before {
			content: '\\eb91';
		}
		:host([icon='call-incoming']):before {
			content: '\\eb92';
		}
		:host([icon='call-outgoing']):before {
			content: '\\eb93';
		}
		:host([icon='menu']):before {
			content: '\\eb94';
		}
		:host([icon='expand-all']):before {
			content: '\\eb95';
		}
		:host([icon='feedback']):before {
			content: '\\eb96';
		}
		:host([icon='group-by-ref-type']):before {
			content: '\\eb97';
		}
		:host([icon='ungroup-by-ref-type']):before {
			content: '\\eb98';
		}
		:host([icon='account']):before {
			content: '\\eb99';
		}
		:host([icon='bell-dot']):before {
			content: '\\eb9a';
		}
		:host([icon='debug-console']):before {
			content: '\\eb9b';
		}
		:host([icon='library']):before {
			content: '\\eb9c';
		}
		:host([icon='output']):before {
			content: '\\eb9d';
		}
		:host([icon='run-all']):before {
			content: '\\eb9e';
		}
		:host([icon='sync-ignored']):before {
			content: '\\eb9f';
		}
		:host([icon='pinned']):before {
			content: '\\eba0';
		}
		:host([icon='github-inverted']):before {
			content: '\\eba1';
		}
		:host([icon='server-process']):before {
			content: '\\eba2';
		}
		:host([icon='server-environment']):before {
			content: '\\eba3';
		}
		:host([icon='pass']):before {
			content: '\\eba4';
		}
		:host([icon='issue-closed']):before {
			content: '\\eba4';
		}
		:host([icon='stop-circle']):before {
			content: '\\eba5';
		}
		:host([icon='play-circle']):before {
			content: '\\eba6';
		}
		:host([icon='record']):before {
			content: '\\eba7';
		}
		:host([icon='debug-alt-small']):before {
			content: '\\eba8';
		}
		:host([icon='vm-connect']):before {
			content: '\\eba9';
		}
		:host([icon='cloud']):before {
			content: '\\ebaa';
		}
		:host([icon='merge']):before {
			content: '\\ebab';
		}
		:host([icon='export']):before {
			content: '\\ebac';
		}
		:host([icon='graph-left']):before {
			content: '\\ebad';
		}
		:host([icon='magnet']):before {
			content: '\\ebae';
		}
		:host([icon='notebook']):before {
			content: '\\ebaf';
		}
		:host([icon='redo']):before {
			content: '\\ebb0';
		}
		:host([icon='check-all']):before {
			content: '\\ebb1';
		}
		:host([icon='pinned-dirty']):before {
			content: '\\ebb2';
		}
		:host([icon='pass-filled']):before {
			content: '\\ebb3';
		}
		:host([icon='circle-large-filled']):before {
			content: '\\ebb4';
		}
		:host([icon='circle-large-outline']):before {
			content: '\\ebb5';
		}
		:host([icon='combine']):before {
			content: '\\ebb6';
		}
		:host([icon='gather']):before {
			content: '\\ebb6';
		}
		:host([icon='table']):before {
			content: '\\ebb7';
		}
		:host([icon='variable-group']):before {
			content: '\\ebb8';
		}
		:host([icon='type-hierarchy']):before {
			content: '\\ebb9';
		}
		:host([icon='type-hierarchy-sub']):before {
			content: '\\ebba';
		}
		:host([icon='type-hierarchy-super']):before {
			content: '\\ebbb';
		}
		:host([icon='git-pull-request-create']):before {
			content: '\\ebbc';
		}
		:host([icon='run-above']):before {
			content: '\\ebbd';
		}
		:host([icon='run-below']):before {
			content: '\\ebbe';
		}
		:host([icon='notebook-template']):before {
			content: '\\ebbf';
		}
		:host([icon='debug-rerun']):before {
			content: '\\ebc0';
		}
		:host([icon='workspace-trusted']):before {
			content: '\\ebc1';
		}
		:host([icon='workspace-untrusted']):before {
			content: '\\ebc2';
		}
		:host([icon='workspace-unknown']):before {
			content: '\\ebc3';
		}
		:host([icon='terminal-cmd']):before {
			content: '\\ebc4';
		}
		:host([icon='terminal-debian']):before {
			content: '\\ebc5';
		}
		:host([icon='terminal-linux']):before {
			content: '\\ebc6';
		}
		:host([icon='terminal-powershell']):before {
			content: '\\ebc7';
		}
		:host([icon='terminal-tmux']):before {
			content: '\\ebc8';
		}
		:host([icon='terminal-ubuntu']):before {
			content: '\\ebc9';
		}
		:host([icon='terminal-bash']):before {
			content: '\\ebca';
		}
		:host([icon='arrow-swap']):before {
			content: '\\ebcb';
		}
		:host([icon='copy']):before {
			content: '\\ebcc';
		}
		:host([icon='person-add']):before {
			content: '\\ebcd';
		}
		:host([icon='filter-filled']):before {
			content: '\\ebce';
		}
		:host([icon='wand']):before {
			content: '\\ebcf';
		}
		:host([icon='debug-line-by-line']):before {
			content: '\\ebd0';
		}
		:host([icon='inspect']):before {
			content: '\\ebd1';
		}
		:host([icon='layers']):before {
			content: '\\ebd2';
		}
		:host([icon='layers-dot']):before {
			content: '\\ebd3';
		}
		:host([icon='layers-active']):before {
			content: '\\ebd4';
		}
		:host([icon='compass']):before {
			content: '\\ebd5';
		}
		:host([icon='compass-dot']):before {
			content: '\\ebd6';
		}
		:host([icon='compass-active']):before {
			content: '\\ebd7';
		}
		:host([icon='azure']):before {
			content: '\\ebd8';
		}
		:host([icon='issue-draft']):before {
			content: '\\ebd9';
		}
		:host([icon='git-pull-request-closed']):before {
			content: '\\ebda';
		}
		:host([icon='git-pull-request-draft']):before {
			content: '\\ebdb';
		}
		:host([icon='debug-all']):before {
			content: '\\ebdc';
		}
		:host([icon='debug-coverage']):before {
			content: '\\ebdd';
		}
		:host([icon='run-errors']):before {
			content: '\\ebde';
		}
		:host([icon='folder-library']):before {
			content: '\\ebdf';
		}
		:host([icon='debug-continue-small']):before {
			content: '\\ebe0';
		}
		:host([icon='beaker-stop']):before {
			content: '\\ebe1';
		}
		:host([icon='graph-line']):before {
			content: '\\ebe2';
		}
		:host([icon='graph-scatter']):before {
			content: '\\ebe3';
		}
		:host([icon='pie-chart']):before {
			content: '\\ebe4';
		}
		:host([icon='bracket']):before {
			content: '\\eb0f';
		}
		:host([icon='bracket-dot']):before {
			content: '\\ebe5';
		}
		:host([icon='bracket-error']):before {
			content: '\\ebe6';
		}
		:host([icon='lock-small']):before {
			content: '\\ebe7';
		}
		:host([icon='azure-devops']):before {
			content: '\\ebe8';
		}
		:host([icon='verified-filled']):before {
			content: '\\ebe9';
		}
		:host([icon='newline']):before {
			content: '\\ebea';
		}
		:host([icon='layout']):before {
			content: '\\ebeb';
		}
		:host([icon='layout-activitybar-left']):before {
			content: '\\ebec';
		}
		:host([icon='layout-activitybar-right']):before {
			content: '\\ebed';
		}
		:host([icon='layout-panel-left']):before {
			content: '\\ebee';
		}
		:host([icon='layout-panel-center']):before {
			content: '\\ebef';
		}
		:host([icon='layout-panel-justify']):before {
			content: '\\ebf0';
		}
		:host([icon='layout-panel-right']):before {
			content: '\\ebf1';
		}
		:host([icon='layout-panel']):before {
			content: '\\ebf2';
		}
		:host([icon='layout-sidebar-left']):before {
			content: '\\ebf3';
		}
		:host([icon='layout-sidebar-right']):before {
			content: '\\ebf4';
		}
		:host([icon='layout-statusbar']):before {
			content: '\\ebf5';
		}
		:host([icon='layout-menubar']):before {
			content: '\\ebf6';
		}
		:host([icon='layout-centered']):before {
			content: '\\ebf7';
		}
		:host([icon='target']):before {
			content: '\\ebf8';
		}
		:host([icon='pinned-filled']):before {
			font-family: 'glicons';
			content: '\\f11c';
			position: relative;
			left: 1px;
		}
		:host([icon='graph']):before {
			font-family: 'glicons';
			content: '\\f102';
		}
	`,rt([m()],he.prototype,"icon",2),he=rt([S("code-icon")],he);const it=/(?<literal>\[.*?\])|(?<year>YYYY|YY)|(?<month>M{1,4})|(?<day>Do|DD?)|(?<weekday>d{2,4})|(?<hour>HH?|hh?)|(?<minute>mm?)|(?<second>ss?)|(?<fractionalSecond>SSS)|(?<dayPeriod>A|a)|(?<timeZoneName>ZZ?)/g,st=/(?<dateStyle>full|long|medium|short)(?:\+(?<timeStyle>full|long|medium|short))?/,Ut=[["year",24*60*60*1e3*(365*2-1),24*60*60*1e3*365,"yr"],["month",24*60*60*1e3*365/12,24*60*60*1e3*365/12,"mo"],["week",24*60*60*1e3*7,24*60*60*1e3*7,"wk"],["day",24*60*60*1e3,24*60*60*1e3,"d"],["hour",60*60*1e3,60*60*1e3,"h"],["minute",60*1e3,60*1e3,"m"],["second",1e3,1e3,"s"]];let U;const ee=new Map;let x,j,E;function Po(c){typeof c=="string"?c==="system"?x=void 0:x=[c]:x=c??void 0,j=void 0,E=void 0,ee.clear(),U=void 0}function Ao(c,n){const r=new Date(c.getTime());for(const[i,s]of Object.entries(n))if(!!s)switch(i){case"years":r.setFullYear(r.getFullYear()+s);break;case"months":r.setMonth(r.getMonth()+s);break;case"days":r.setDate(r.getDate()+s);break;case"hours":r.setHours(r.getHours()+s);break;case"minutes":r.setMinutes(r.getMinutes()+s);break;case"seconds":r.setSeconds(r.getSeconds()+s);break}return r}function It(c,n){const r=c.getTime()-new Date().getTime();for(const[i,s,l,a]of Ut){const b=Math.abs(r);if(b>=s||s===1e3)return n?(U==null&&(E!=null?U=E.resolvedOptions().locale:j!=null?U=j.resolvedOptions().locale:(E=new Intl.RelativeTimeFormat(x,{localeMatcher:"best fit",numeric:"always",style:"narrow"}),U=E.resolvedOptions().locale)),U==="en"||U?.startsWith("en-")?`${Math.round(b/l)}${a}`:(E==null&&(E=new Intl.RelativeTimeFormat(x,{localeMatcher:"best fit",numeric:"always",style:"narrow"})),E.format(Math.round(r/l),i))):(j==null&&(j=new Intl.RelativeTimeFormat(x,{localeMatcher:"best fit",numeric:"auto",style:"long"})),j.format(Math.round(r/l),i))}return""}function Nt(c,n,r,i=!0){n=n??void 0;const s=`${r??""}:${n}`;let l=ee.get(s);if(l==null){const d=qt(n);let h;r==null?h=x:r==="system"?h=void 0:h=[r],l=new Intl.DateTimeFormat(h,d),i&&ee.set(s,l)}if(n==null||st.test(n))return l.format(c);function a(d){const h=`${r??""}:time:${d}`;let p=ee.get(h);if(p==null){const f={localeMatcher:"best fit",timeStyle:d};let u;r==null?u=x:r==="system"?u=void 0:u=[r],p=new Intl.DateTimeFormat(u,f),i&&ee.set(h,p)}return p}const b=l.formatToParts(c);return n.replace(it,(d,h,p,f,u,P,oe,ne,xo,Eo,To,Mo,Oo,Do,at)=>{if(h!=null)return h.substring(1,h.length-1);for(const lt in at){const Ee=at[lt];if(Ee==null)continue;const re=b.find(dt=>dt.type===lt);return Ee==="Do"&&re?.type==="day"?Bt(Number(re.value)):Ee==="a"&&re?.type==="dayPeriod"?` ${(a("short").formatToParts(c).find(co=>co.type==="dayPeriod")??re)?.value??""}`:re?.value??""}return""})}function Co(c,n,r){const i=(typeof n=="number"?n:n.getTime())-(typeof c=="number"?c:c.getTime());switch(r){case"days":return Math.floor(i/(1e3*60*60*24));case"hours":return Math.floor(i/(1e3*60*60));case"minutes":return Math.floor(i/(1e3*60));case"seconds":return Math.floor(i/1e3);default:return i}}function qt(c){if(c==null)return{localeMatcher:"best fit",dateStyle:"full",timeStyle:"short"};const n=st.exec(c);if(n?.groups!=null){const{dateStyle:i,timeStyle:s}=n.groups;return{localeMatcher:"best fit",dateStyle:i||"full",timeStyle:s||void 0}}const r={localeMatcher:"best fit"};for(const{groups:i}of c.matchAll(it))if(i!=null)for(const s in i){const l=i[s];if(l!=null)switch(s){case"year":r.year=l.length===4?"numeric":"2-digit";break;case"month":switch(l.length){case 4:r.month="long";break;case 3:r.month="short";break;case 2:r.month="2-digit";break;case 1:r.month="numeric";break}break;case"day":l==="DD"?r.day="2-digit":r.day="numeric";break;case"weekday":switch(l.length){case 4:r.weekday="long";break;case 3:r.weekday="short";break;case 2:r.weekday="narrow";break}break;case"hour":r.hour=l.length===2?"2-digit":"numeric",r.hour12=l==="hh"||l==="h";break;case"minute":r.minute=l.length===2?"2-digit":"numeric";break;case"second":r.second=l.length===2?"2-digit":"numeric";break;case"fractionalSecond":r.fractionalSecondDigits=3;break;case"dayPeriod":r.dayPeriod="narrow",r.hour12=!0,r.hourCycle="h12";break;case"timeZoneName":r.timeZoneName=l.length===2?"long":"short";break}}return r}const Ce=["th","st","nd","rd"];function Bt(c){const n=c%100;return`${c}${Ce[(n-20)%10]??Ce[n]??Ce[0]}`}const Lt=()=>({toAttribute:c=>c.getTime(),fromAttribute:(c,n)=>new Date(parseInt(c,10))});var zt=Object.defineProperty,jt=Object.getOwnPropertyDescriptor,Se=(c,n,r,i)=>{for(var s=i>1?void 0:i?jt(n,r):n,l=c.length-1,a;l>=0;l--)(a=c[l])&&(s=(i?a(n,r,s):a(s))||s);return i&&s&&zt(n,r,s),s};let be=class extends k{constructor(){super(...arguments),this.format="MMMM Do, YYYY h:mma",this.date=new Date}render(){return w`<time datetime="${this.date}" title="${Nt(this.date,this.format??"MMMM Do, YYYY h:mma")}"
			>${It(this.date)}</time
		>`}};Se([m()],be.prototype,"format",2),Se([m({converter:Lt(),reflect:!0})],be.prototype,"date",2),be=Se([S("formatted-date")],be);var Vt=Object.defineProperty,Wt=Object.getOwnPropertyDescriptor,T=(c,n,r,i)=>{for(var s=i>1?void 0:i?Wt(n,r):n,l=c.length-1,a;l>=0;l--)(a=c[l])&&(s=(i?a(n,r,s):a(s))||s);return i&&s&&Vt(n,r,s),s};let A=class extends k{constructor(){super(...arguments),this.name="",this.email="",this.date="",this.avatar="https://www.gravatar.com/avatar/?s=64&d=robohash",this.dateFormat="MMMM Do, YYYY h:mma",this.committer=!1,this.actionLabel="committed"}render(){const c=this.avatar.replace("s=32","s=64");return w`
			<a class="avatar" href="${this.email?`mailto:${this.email}`:"#"}"
				><img class="thumb" lazy src="${c}" alt="${this.name}"
			/></a>
			<a class="name" href="${this.email?`mailto:${this.email}`:"#"}">${this.name}</a>
			<span class="date"
				>${this.actionLabel} <formatted-date date=${this.date} dateFormat="${this.dateFormat}"></formatted-date
			></span>
		`}};A.styles=R`
		:host {
			display: grid;
			gap: 0rem 1rem;
			justify-content: start;
		}
		a {
			color: var(--color-link-foreground);
			text-decoration: none;
		}
		.avatar {
			grid-column: 1;
			grid-row: 1 / 3;
			width: 36px;
		}
		.thumb {
			width: 100%;
			height: auto;
			border-radius: 0.4rem;
		}
		.name {
			grid-column: 2;
			grid-row: 1;
			font-size: 1.5rem;
		}
		.date {
			grid-column: 2;
			grid-row: 2;
			font-size: 1.3rem;
		}
	`,T([m()],A.prototype,"name",2),T([m()],A.prototype,"email",2),T([m()],A.prototype,"date",2),T([m()],A.prototype,"avatar",2),T([m()],A.prototype,"dateFormat",2),T([m({type:Boolean,reflect:!0})],A.prototype,"committer",2),T([m()],A.prototype,"actionLabel",2),A=T([S("commit-identity")],A);var Yt=Object.defineProperty,Zt=Object.getOwnPropertyDescriptor,V=(c,n,r,i)=>{for(var s=i>1?void 0:i?Zt(n,r):n,l=c.length-1,a;l>=0;l--)(a=c[l])&&(s=(i?a(n,r,s):a(s))||s);return i&&s&&Yt(n,r,s),s};let M=class extends k{constructor(){super(...arguments),this.url="",this.name="",this.date="",this.status="merged",this.key="#1999"}render(){const c=this.status.toLowerCase()==="merged"?"git-merge":this.status.toLowerCase()==="closed"?"pass":"issues";return w`
			<span class="icon"><code-icon icon=${c}></code-icon></span>
			<p class="title">
				<a href="${this.url}">${this.name}</a>
			</p>
			<p class="date">
				${this.key} ${this.status}
				<formatted-date date="${this.date}"></formatted-date>
			</p>
		`}};M.styles=R`
		:host {
			display: grid;
			gap: 0.25rem 0.6rem;
			justify-content: start;
		}

		a {
			color: var(--color-link-foreground);
			text-decoration: none;
		}

		.icon {
			grid-column: 1;
			grid-row: 1 / 3;
			color: var(--vscode-gitlens-mergedPullRequestIconColor);
			text-align: center;
			padding-top: 0.1rem;
		}

		.title {
			grid-column: 2;
			grid-row: 1;
			margin: 0;
			font-size: 1.4rem;
		}

		.date {
			grid-column: 2;
			grid-row: 2;
			margin: 0;
			font-size: 1.3rem;
		}
	`,V([m()],M.prototype,"url",2),V([m()],M.prototype,"name",2),V([m()],M.prototype,"date",2),V([m()],M.prototype,"status",2),V([m()],M.prototype,"key",2),M=V([S("issue-pull-request")],M);var Kt=Object.defineProperty,Gt=Object.getOwnPropertyDescriptor,ct=(c,n,r,i)=>{for(var s=i>1?void 0:i?Gt(n,r):n,l=c.length-1,a;l>=0;l--)(a=c[l])&&(s=(i?a(n,r,s):a(s))||s);return i&&s&&Kt(n,r,s),s};let fe=class extends k{constructor(){super(...arguments),this.lines=1}render(){const c=`--skeleton-lines: ${this.lines};`;return w`<div class="skeleton" style=${c}></div>`}};fe.styles=R`
		:host {
			--skeleton-line-height: 1.2;
			--skeleton-lines: 1;
		}

		.skeleton {
			position: relative;
			display: block;
			overflow: hidden;
			border-radius: 0.25em;
			width: 100%;
			height: calc(1em * var(--skeleton-line-height, 1.2) * var(--skeleton-lines, 1));
			background-color: var(--color-background--lighten-15);
		}

		.skeleton::before {
			content: '';
			position: absolute;
			display: block;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-image: linear-gradient(
				to right,
				transparent 0%,
				var(--color-background--lighten-15) 20%,
				var(--color-background--lighten-30) 60%,
				transparent 100%
			);
			transform: translateX(-100%);
			animation: skeleton-loader 2s ease-in-out infinite;
		}

		@keyframes skeleton-loader {
			100% {
				transform: translateX(100%);
			}
		}
	`,ct([m({type:Number})],fe.prototype,"lines",2),fe=ct([S("skeleton-loader")],fe);var Jt=Object.defineProperty,Xt=Object.getOwnPropertyDescriptor,ue=(c,n,r,i)=>{for(var s=i>1?void 0:i?Xt(n,r):n,l=c.length-1,a;l>=0;l--)(a=c[l])&&(s=(i?a(n,r,s):a(s))||s);return i&&s&&Jt(n,r,s),s};let W=class extends k{constructor(){super(...arguments),this.added=0,this.modified=0,this.removed=0}render(){return w`
			<span class="stat added" title="${this.added} added" aria-label="${this.added} added"
				><span class="label">+${this.added}</span></span
			>
			<span class="stat modified" title="${this.modified} modified" aria-label="${this.modified} modified"
				><span class="label">~${this.modified}</span></span
			>
			<span class="stat deleted" title="${this.removed} removed" aria-label="${this.removed} removed"
				><span class="label">-${this.removed}</span></span
			>
		`}};W.styles=R`
        :host {
            display: inline-flex;
            flex-direction: row;
            align-items: center;
            gap: 1rem;
        }

        .stat {
            display: inline-flex;
            flex-direction: row;
            align-items: center;
        }

        .stat code-icon {
            margin-right: 0.25rem;
        }

        .added {
            color: var(--vscode-gitDecoration-addedResourceForeground);
        }
        .modified {
            color: var(--vscode-gitDecoration-modifiedResourceForeground);
        }
        .deleted {
            color: var(--vscode-gitDecoration-deletedResourceForeground);
        }

        .label {
            flex-basis: 100%;
            text-align: center;
        }
    }
    `,ue([m({type:Number})],W.prototype,"added",2),ue([m({type:Number})],W.prototype,"modified",2),ue([m({type:Number})],W.prototype,"removed",2),W=ue([S("commit-stats")],W);var Qt=Object.defineProperty,eo=Object.getOwnPropertyDescriptor,Y=(c,n,r,i)=>{for(var s=i>1?void 0:i?eo(n,r):n,l=c.length-1,a;l>=0;l--)(a=c[l])&&(s=(i?a(n,r,s):a(s))||s);return i&&s&&Qt(n,r,s),s};const to={".":"Unchanged","!":"Ignored","?":"Untracked",A:"Added",D:"Deleted",M:"Modified",R:"Renamed",C:"Copied",AA:"Conflict",AU:"Conflict",UA:"Conflict",DD:"Conflict",DU:"Conflict",UD:"Conflict",UU:"Conflict",T:"Modified",U:"Updated but Unmerged"},oo={".":void 0,"!":"diff-ignored","?":"diff-added",A:"diff-added",D:"diff-removed",M:"diff-modified",R:"diff-renamed",C:"diff-added",AA:"warning",AU:"warning",UA:"warning",DD:"warning",DU:"warning",UD:"warning",UU:"warning",T:"diff-modified",U:"diff-modified"};let O=class extends k{constructor(){super(...arguments),this.status="",this.path="",this.repoPath="",this.icon="",this.stash=!1}renderIcon(){if(this.icon!=="")return w`<img class="change-list__status-icon" src="${this.icon}" />`;const c=(this.status!==""&&oo[this.status])??"file";return w` <code-icon icon="${c}"></code-icon> `}focus(c){this.shadowRoot?.getElementById("item")?.focus(c)}open(c){this.onComparePrevious(void 0,c)}render(){const c=this.status!==""?to[this.status]:"",n=this.path.lastIndexOf("/"),r=n>-1?this.path.substring(n+1):this.path,i=n>-1?this.path.substring(0,n):"";return w`
			<a id="item" class="change-list__link" @click=${this.onComparePrevious} href="#">
				<span class="change-list__status" title="${c}" aria-label="${c}"
					>${this.renderIcon()}</span
				><span class="change-list__filename">${r}</span>
				<small class="change-list__path">${i}</small>
			</a>
			<nav class="change-list__actions">
				<a
					class="change-list__action"
					@click=${this.onOpenFile}
					href="#"
					title="Open file"
					aria-label="Open file"
					><code-icon icon="go-to-file"></code-icon></a
				><a
					class="change-list__action"
					@click=${this.onCompareWorking}
					href="#"
					title="Open Changes with Working File"
					aria-label="Open Changes with Working File"
					><code-icon icon="git-compare"></code-icon></a
				>${this.stash?g:w`<a
								class="change-list__action"
								@click=${this.onOpenFileOnRemote}
								href="#"
								title="Open on remote"
								aria-label="Open on remote"
								><code-icon icon="globe"></code-icon></a
							><a
								class="change-list__action"
								@click=${this.onMoreActions}
								href="#"
								title="Show more actions"
								aria-label="Show more actions"
								><code-icon icon="ellipsis"></code-icon
							></a>`}
			</nav>
		`}onOpenFile(c){c.preventDefault(),this.fireEvent("file-open")}onOpenFileOnRemote(c){c.preventDefault(),this.fireEvent("file-open-on-remote")}onCompareWorking(c){c.preventDefault(),this.fireEvent("file-compare-working")}onComparePrevious(c,n){c?.preventDefault(),this.fireEvent("file-compare-previous",n)}onMoreActions(c){c.preventDefault(),this.fireEvent("file-more-actions")}fireEvent(c,n){const r=new CustomEvent(c,{detail:{path:this.path,repoPath:this.repoPath,showOptions:n},bubbles:!0,composed:!0});this.dispatchEvent(r)}};O.styles=R`
		:host {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			font-size: var(--vscode-font-size);
			line-height: 2rem;
			color: var(--vscode-sideBar-foreground);
		}
		:host(:hover) {
			color: var(--vscode-list-hoverForeground);
			background-color: var(--vscode-list-hoverBackground);
		}

		:host(:focus-within) {
			outline: 1px solid var(--vscode-list-focusOutline);
			outline-offset: -1px;
			color: var(--vscode-list-activeSelectionForeground);
			background-color: var(--vscode-list-activeSelectionBackground);
		}

		* {
			box-sizing: border-box;
		}

		.change-list__link {
			width: 100%;
			color: inherit;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			text-decoration: none;
			outline: none;
		}

		.change-list__status {
			margin-right: 0.6rem;
		}

		.change-list__status-icon {
			width: 16px;
			aspect-ratio: 1;
			vertical-align: text-bottom;
		}

		.change-list__path {
			opacity: 0.7;
			margin-left: 0.3rem;
		}

		.change-list__actions {
			flex: none;
			user-select: none;
			display: flex;
			align-items: center;
			color: var(--vscode-icon-foreground);
		}

		:host(:focus-within) .change-list__actions {
			color: var(--vscode-list-activeSelectionIconForeground);
		}

		:host(:not(:hover):not(:focus-within)) .change-list__actions {
			display: none;
		}

		.change-list__action {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			width: 2rem;
			height: 2rem;
			border-radius: 0.25em;
			color: inherit;
			padding: 2px;
			vertical-align: text-bottom;
			text-decoration: none;
		}
		.change-list__action:focus {
			outline: 1px solid var(--vscode-focusBorder);
			outline-offset: -1px;
		}
		.change-list__action:hover {
			background-color: var(--vscode-toolbar-hoverBackground);
		}
		.change-list__action:active {
			background-color: var(--vscode-toolbar-activeBackground);
		}
	`,Y([m()],O.prototype,"status",2),Y([m()],O.prototype,"path",2),Y([m({attribute:"repo-path"})],O.prototype,"repoPath",2),Y([m()],O.prototype,"icon",2),Y([m({type:Boolean,reflect:!0})],O.prototype,"stash",2),O=Y([S("file-change-item")],O);var no=Object.defineProperty,ro=Object.getOwnPropertyDescriptor,xe=(c,n,r,i)=>{for(var s=i>1?void 0:i?ro(n,r):n,l=c.length-1,a;l>=0;l--)(a=c[l])&&(s=(i?a(n,r,s):a(s))||s);return i&&s&&no(n,r,s),s};let te=class extends k{constructor(){super(...arguments),this.collapsable=!1,this.expanded=!1}renderTitle(){return this.collapsable?w`<button
			type="button"
			class="label"
			aria-controls="content"
			aria-expanded=${this.expanded}
			@click="${this.toggleExpanded}"
		>
			<code-icon class="icon" icon=${this.expanded?"chevron-down":"chevron-right"}></code-icon
			><span class="title"><slot name="title">Section</slot></span>
			<span class="subtitle"><slot name="subtitle"></slot></span>
		</button>`:w`<div class="label">
				<span class="title"><slot name="title">Section</slot></span>
				<span class="subtitle"><slot name="subtitle"></slot></span>
			</div>`}render(){return w`
			<header class="header">${this.renderTitle()}</header>
			<div id="content" role="region" class="content">
				<slot></slot>
			</div>
		`}toggleExpanded(){this.expanded=!this.expanded,this.dispatchEvent(new CustomEvent("expanded-change",{detail:{expanded:this.expanded},bubbles:!0,composed:!0}))}};te.styles=R`
		:host {
			display: flex;
			flex-direction: column;
			background-color: var(--vscode-sideBar-background);
		}

		* {
			box-sizing: border-box;
		}

		.header {
			flex: none;
			display: flex;
			background-color: var(--vscode-sideBarSectionHeader-background);
			color: var(--vscode-sideBarSectionHeader-foreground);
			border-top: 1px solid var(--vscode-sideBarSectionHeader-border);
		}

		.header:focus-within {
			outline: 1px solid var(--vscode-focusBorder);
			outline-offset: -1px;
		}

		.label {
			appearance: none;
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 100%;
			padding: 0;
			border: none;
			text-align: left;
			font-family: var(--font-family);
			font-size: 1.1rem;
			line-height: 2.2rem;
			height: 2.2rem;
			background: transparent;
			color: inherit;
			cursor: pointer;
			outline: none;
			text-overflow: ellipsis;
		}

		.title {
			font-weight: bold;
			text-transform: uppercase;
		}

		.subtitle {
			margin-left: 1rem;
			opacity: 0.6;
		}

		.icon {
			font-weight: normal;
			margin: 0 0.2rem;
		}

		.content {
			overflow: auto;
			/*
			scrollbar-gutter: stable;
			box-shadow: #000000 0 0.6rem 0.6rem -0.6rem inset;
			*/
			padding-top: 0.6rem;
		}

		:host([collapsable]:not([expanded])) .content,
		:host([collapsable][expanded='false']) .content {
			display: none;
		}
	`,xe([m({type:Boolean,reflect:!0})],te.prototype,"collapsable",2),xe([m({type:Boolean,reflect:!0})],te.prototype,"expanded",2),te=xe([S("webview-pane")],te);const io="0000000000000000000000000000000000000000";class so extends Ct{constructor(){super("CommitDetailsApp"),this.log("CommitDetailsApp",this.state)}onInitialize(){this.log("CommitDetailsApp.onInitialize",this.state),this.renderContent()}onBind(){return[y.on("file-change-item","file-open-on-remote",r=>this.onOpenFileOnRemote(r.detail)),y.on("file-change-item","file-open",r=>this.onOpenFile(r.detail)),y.on("file-change-item","file-compare-working",r=>this.onCompareFileWithWorking(r.detail)),y.on("file-change-item","file-compare-previous",r=>this.onCompareFileWithPrevious(r.detail)),y.on("file-change-item","file-more-actions",r=>this.onFileMoreActions(r.detail)),y.on('[data-action="commit-actions"]',"click",r=>this.onCommitActions(r)),y.on('[data-action="pick-commit"]',"click",r=>this.onPickCommit(r)),y.on('[data-action="search-commit"]',"click",r=>this.onSearchCommit(r)),y.on('[data-action="autolink-settings"]',"click",r=>this.onAutolinkSettings(r)),y.on("file-change-item","keydown",(r,i)=>{r.key==="Enter"||r.key===" "?i.open(r.key==="Enter"?{preserveFocus:!1}:void 0):r.key==="ArrowUp"?i.parentElement?.previousElementSibling?.firstElementChild?.focus():r.key==="ArrowDown"&&i.parentElement?.nextElementSibling?.firstElementChild?.focus()}),y.on('[data-action="pin"]',"click",r=>this.onTogglePin(r)),y.on('[data-region="rich-pane"]',"expanded-change",r=>this.onExpandedChange(r.detail))]}onMessageReceived(n){const r=n.data;switch(r.method){case Oe.method:Me(Oe,r,i=>{i.state,this.state=i.state,this.renderContent()});break}}onExpandedChange(n){this.sendCommand(wt,{autolinksExpanded:n.expanded})}onTogglePin(n){n.preventDefault(),this.sendCommand($t,{pin:!this.state.pinned})}onAutolinkSettings(n){n.preventDefault(),this.sendCommand(_t,void 0)}onSearchCommit(n){this.sendCommand(yt,void 0)}onPickCommit(n){this.sendCommand(vt,void 0)}onOpenFileOnRemote(n){this.sendCommand(pt,n)}onOpenFile(n){this.sendCommand(ut,n)}onCompareFileWithWorking(n){this.sendCommand(mt,n)}onCompareFileWithPrevious(n){this.sendCommand(gt,n)}onFileMoreActions(n){this.sendCommand(ft,n)}onCommitActions(n){if(n.preventDefault(),this.state.selected===void 0){n.stopPropagation();return}const r=n.target?.getAttribute("data-action-type");r!=null&&this.sendCommand(bt,{action:r,alt:n.altKey})}renderCommit(n){const r=n.selected!==void 0,i=document.getElementById("empty"),s=document.getElementById("main");return i?.setAttribute("aria-hidden",r?"true":"false"),s?.setAttribute("aria-hidden",r?"false":"true"),r}renderRichContent(){!this.renderCommit(this.state)||(this.renderMessage(this.state),this.renderPullRequestAndAutolinks(this.state))}renderContent(){!this.renderCommit(this.state)||(this.renderPin(this.state),this.renderSha(this.state),this.renderMessage(this.state),this.renderAuthor(this.state),this.renderStats(this.state),this.renderFiles(this.state),this.renderPullRequestAndAutolinks(this.state))}renderPin(n){const r=document.querySelector('[data-action="pin"]');if(r==null)return;const i=n.pinned?"Unpin this Commit":"Pin this Commit";r.setAttribute("aria-label",i),r.setAttribute("title",i),r.classList.toggle("is-active",n.pinned),r.querySelector('[data-region="commit-pin"]')?.setAttribute("icon",n.pinned?"pinned-filled":"pin")}renderSha(n){const r=[...document.querySelectorAll('[data-region="shortsha"]')];r.length!==0&&r.forEach(i=>{i.textContent=n.selected.shortSha})}renderChoices(){const n=document.querySelector('[data-region="choices"]');n!=null&&(n.setAttribute("aria-hidden","true"),n.innerHTML="")}renderStats(n){const r=document.querySelector('[data-region="stats"]');if(r!=null)if(n.selected.stats?.changedFiles!==void 0)if(typeof n.selected.stats.changedFiles=="number")r.innerHTML=`
				<commit-stats added="?" modified="${n.selected.stats.changedFiles}" removed="?"></commit-stats>
			`;else{const{added:i,deleted:s,changed:l}=n.selected.stats.changedFiles;r.innerHTML=`
				<commit-stats added="${i}" modified="${l}" removed="${s}"></commit-stats>
			`}else r.innerHTML=""}renderFiles(n){const r=document.querySelector('[data-region="files"]');if(r!=null)if(n.selected.files?.length){const i=n.selected.isStash?"stash ":"";r.innerHTML=n.selected.files.map(s=>`
						<li class="change-list__item">
							<file-change-item class="commit-details__file" ${i}status="${s.status}" path="${s.path}" repo-path="${s.repoPath}" icon="${s.icon.dark}"></file-change-item>
						</li>
					`).join(""),r.setAttribute("aria-hidden","false")}else r.innerHTML=""}renderAuthor(n){const r=document.querySelector('[data-region="author"]');r!=null&&(n.selected?.isStash===!0?(r.innerHTML=`
				<div class="commit-stashed">
					<span class="commit-stashed__media"><code-icon class="commit-stashed__icon" icon="inbox"></code-icon></span>
					<span class="commit-stashed__date">stashed <formatted-date date=${n.selected.author.date} dateFormat="${n.dateFormat}"></formatted-date></span>
				</div>
			`,r.setAttribute("aria-hidden","false")):n.selected?.author!=null?(r.innerHTML=`
				<commit-identity
					name="${n.selected.author.name}"
					email="${n.selected.author.email}"
					date=${n.selected.author.date}
					dateFormat="${n.dateFormat}"
					avatar="${n.selected.author.avatar}"
					actionLabel="${n.selected.sha===io?"modified":"committed"}"
				></commit-identity>
			`,r.setAttribute("aria-hidden","false")):(r.innerHTML="",r.setAttribute("aria-hidden","true")))}renderTitle(n){const r=document.querySelector('[data-region="commit-title"]');r!=null&&(r.innerHTML=n.selected.shortSha)}renderMessage(n){const r=document.querySelector('[data-region="message"]');if(r==null)return;const[i,...s]=n.selected.message.split(`
`);s.length>1?r.innerHTML=`<strong>${i}</strong><br>${s.join("<br>")}`:r.innerHTML=`<strong>${i}</strong>`}renderPullRequestAndAutolinks(n){const r=document.querySelector('[data-region="rich-pane"]');if(r==null)return;r.expanded=this.state.preferences?.autolinksExpanded??!0;const i=r.querySelector('[data-region="rich-info"]'),s=r.querySelector('[data-region="autolinks"]');n.pullRequest!=null||n.autolinkedIssues?.length?(s?.setAttribute("aria-hidden","false"),i?.setAttribute("aria-hidden","true"),this.renderPullRequest(n),this.renderIssues(n)):(s?.setAttribute("aria-hidden","true"),i?.setAttribute("aria-hidden","false"));const l=r.querySelector('[data-region="autolink-count"]');if(l==null)return;const a=(n.pullRequest!=null?1:0)+(n.autolinkedIssues?.length??0);l.innerHTML=n.includeRichContent?`${a} found`:"\u2026"}renderPullRequest(n){const r=document.querySelector('[data-region="pull-request"]');r!=null&&(n.pullRequest!=null?(r.innerHTML=`
				<issue-pull-request
					name="${n.pullRequest.title}"
					url="${n.pullRequest.url}"
					key="${n.pullRequest.id}"
					status="${n.pullRequest.state}"
					date=${n.pullRequest.date}
					dateFormat="${n.dateFormat}"
				></issue-pull-request>
			`,r.setAttribute("aria-hidden","false")):(r.innerHTML="",r.setAttribute("aria-hidden","true")))}renderIssues(n){const r=document.querySelector('[data-region="issue"]');r!=null&&(n.autolinkedIssues?.length?(r.innerHTML=n.autolinkedIssues.map(i=>`
						<issue-pull-request
							name="${i.title}"
							url="${i.url}"
							key="${i.id}"
							status="${i.closed?"closed":"opened"}"
							date="${i.closed?i.closedDate:i.date}"
						></issue-pull-request>
					`).join(""),r.setAttribute("aria-hidden","false")):(r.innerHTML="",r.setAttribute("aria-hidden","true")))}}function So(c){}new so})();
