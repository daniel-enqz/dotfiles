"use strict";var ne=Object.defineProperty;var $=(j,M)=>ne(j,"name",{value:M,configurable:!0});exports.id=449;exports.ids=[449];exports.modules={8776:(j,M,f)=>{f.r(M),f.d(M,{GitLabApi:()=>A});var w=f(9496),C=f.n(w),p=f(1149),I=f(4673),b=f(9179),c=f(5396),m=f(3903),y=f(9052),D=f(2436),S=f(1999),_=f(7369),G=f(9417),W=f(2971),U=f(2925),x=Object.defineProperty,re=Object.getOwnPropertyDescriptor,se=$((g,e,t)=>e in g?x(g,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):g[e]=t,"__defNormalProp"),L=$((g,e,t,r)=>{for(var i=r>1?void 0:r?re(e,t):e,u=g.length-1,a;u>=0;u--)(a=g[u])&&(i=(r?a(e,t,i):a(i))||i);return r&&i&&x(e,t,i),i},"__decorateClass"),T=$((g,e,t)=>(se(g,typeof e!="symbol"?e+"":e,t),t),"__publicField");class A{constructor(e){T(this,"_disposable"),T(this,"_projectIds",new Map),T(this,"_proxyAgents",new Map),this._disposable=w.Disposable.from(b.DN.onDidChange(t=>{(b.DN.changed(t,"proxy")||b.DN.changed(t,"remotes"))&&(this._projectIds.clear(),this._proxyAgents.clear())}),b.DN.onDidChangeAny(t=>{(t.affectsConfiguration("http.proxy")||t.affectsConfiguration("http.proxyStrictSSL"))&&(this._projectIds.clear(),this._proxyAgents.clear())}))}dispose(){var e;(e=this._disposable)==null||e.dispose()}getProxyAgent(e){if(I.$L)return;let t=this._proxyAgents.get(e.id);if(t===void 0){const r=e.getIgnoreSSLErrors();t=(0,p.Nx)(r===!0||r==="force"?!1:void 0),this._proxyAgents.set(e.id,t??null)}return t??void 0}async getAccountForCommit(e,t,r,i,u,a){const o=(0,_.UH)(),s=await this.getProjectId(e,t,r,i,a?.baseUrl);if(!!s)try{const l=await this.request(e,t,a?.baseUrl,`v4/projects/${s}/repository/commits/${u}?stats=false`,{method:"GET"},o);let n;const h=await this.findUser(e,t,l.author_name,a);for(const d of h)if(d.name===l.author_name||d.publicEmail&&d.publicEmail===l.author_email){if(n=d,d.state==="active")break}else((0,W.qq)(d.name,l.author_name)||d.publicEmail&&(0,W.qq)(d.publicEmail,l.author_email))&&(n=d);return n==null?void 0:(n.avatarUrl&&!/^([a-zA-Z][\w+.-]+):/.test(n.avatarUrl)&&(n.avatarUrl=w.Uri.joinPath(w.Uri.parse(n.webUrl),"..",n.avatarUrl).toString()),{provider:e,name:n.name||void 0,email:l.author_email||void 0,avatarUrl:n.avatarUrl||void 0})}catch(l){if(l instanceof c.Ww)return;throw this.handleException(l,e,o)}}async getAccountForEmail(e,t,r,i,u,a){const o=(0,_.UH)();try{const[s]=await this.findUser(e,t,u,a);return s==null?void 0:{provider:e,name:s.name||void 0,email:s.publicEmail||void 0,avatarUrl:s.avatarUrl||void 0}}catch(s){if(s instanceof c.Ww)return;throw this.handleException(s,e,o)}}async getDefaultBranch(e,t,r,i,u){var a,o,s;const l=(0,_.UH)();try{const n=`query getDefaultBranch(
	$fullPath: ID!
) {
	project(fullPath: $fullPath) {
		repository {
			rootRef
		}
}`,h=await this.graphql(e,t,u?.baseUrl,n,{fullPath:`${r}/${i}`},l),d=((s=(o=(a=h?.data)==null?void 0:a.project)==null?void 0:o.repository)==null?void 0:s.rootRef)??void 0;return d==null?void 0:{provider:e,name:d}}catch(n){if(n instanceof c.Ww)return;throw this.handleException(n,e,l)}}async getIssueOrPullRequest(e,t,r,i,u,a){var o,s,l,n;const h=(0,_.UH)();try{const d=`query getIssueOrMergeRequest(
	$fullPath: ID!
	$iid: String!
) {
	project(fullPath: $fullPath) {
		mergeRequest(iid: $iid) {
			author {
				name
				avatarUrl
				webUrl
			}
			iid
			title
			description
			state
			createdAt
			updatedAt
			mergedAt
			webUrl
		}
		issue(iid: $iid) {
			author {
				name
				avatarUrl
				webUrl
			}
			iid
			title
			description
			state
			createdAt
			updatedAt
			closedAt
			webUrl
		}
	}
}`,P=await this.graphql(e,t,a?.baseUrl,d,{fullPath:`${r}/${i}`,iid:String(u)},h);if(((s=(o=P?.data)==null?void 0:o.project)==null?void 0:s.issue)!=null){const v=P.data.project.issue;return{provider:e,type:m.mX.Issue,id:v.iid,date:new Date(v.createdAt),title:v.title,closed:v.state==="closed",closedDate:v.closedAt==null?void 0:new Date(v.closedAt),url:v.webUrl}}if(((n=(l=P?.data)==null?void 0:l.project)==null?void 0:n.mergeRequest)!=null){const v=P.data.project.mergeRequest;return{provider:e,type:m.mX.PullRequest,id:v.iid,date:new Date(v.createdAt),title:v.title,closed:v.state==="closed",closedDate:v.state==="closed"?new Date(v.updatedAt):void 0,url:v.webUrl}}return}catch(d){if(d instanceof c.Ww)return;throw this.handleException(d,e,h)}}async getPullRequestForBranch(e,t,r,i,u,a){var o,s,l,n,h,d,P,v,F,K,N,Y,H,X,J,z,Z,Q,V,k,ee,te;const ae=(0,_.UH)();try{const q=`
			nodes {
				iid
				author {
					name
					avatarUrl
					webUrl
				}
				title
				description
				state
				createdAt
				updatedAt
				mergedAt
				webUrl
			}`,le=`query getMergeRequestForBranch(
	$fullPath: ID!
	$branches: [String!]
) {
	project(fullPath: $fullPath) {
		${a?.include==null?`mergeRequests(sourceBranches: $branches sort: UPDATED_DESC first: 1) {
			${q}
		}`:""}
		${(o=a?.include)!=null&&o.includes(U.GitLabMergeRequestState.OPEN)?`opened: mergeRequests(sourceBranches: $branches state: opened sort: UPDATED_DESC first: 1) {
			${q}
		}`:""}
		${(s=a?.include)!=null&&s.includes(U.GitLabMergeRequestState.MERGED)?`merged: mergeRequests(sourceBranches: $branches state: merged sort: UPDATED_DESC first: 1) {
			${q}
		}`:""}
		${(l=a?.include)!=null&&l.includes(U.GitLabMergeRequestState.CLOSED)?`closed: mergeRequests(sourceBranches: $branches state: closed sort: UPDATED_DESC first: 1) {
			${q}
		}`:""}
	}
}`,R=await this.graphql(e,t,a?.baseUrl,le,{fullPath:`${r}/${i}`,branches:[u],state:a?.include},ae);let E;if(a?.include==null)E=(P=(d=(h=(n=R?.data)==null?void 0:n.project)==null?void 0:h.mergeRequests)==null?void 0:d.nodes)==null?void 0:P[0];else for(const B of a.include){let O;B===U.GitLabMergeRequestState.OPEN?O=(N=(K=(F=(v=R?.data)==null?void 0:v.project)==null?void 0:F.opened)==null?void 0:K.nodes)==null?void 0:N[0]:B===U.GitLabMergeRequestState.MERGED?O=(J=(X=(H=(Y=R?.data)==null?void 0:Y.project)==null?void 0:H.merged)==null?void 0:X.nodes)==null?void 0:J[0]:B===U.GitLabMergeRequestState.CLOSED&&(O=(V=(Q=(Z=(z=R?.data)==null?void 0:z.project)==null?void 0:Z.closed)==null?void 0:Q.nodes)==null?void 0:V[0]),O!=null&&(E==null||new Date(O.updatedAt)>new Date(E.updatedAt))&&(E=O)}return E==null?void 0:new y.i7(e,{name:((k=E.author)==null?void 0:k.name)??"Unknown",avatarUrl:((ee=E.author)==null?void 0:ee.avatarUrl)??"",url:((te=E.author)==null?void 0:te.webUrl)??""},String(E.iid),E.title,E.webUrl,U.GitLabMergeRequest.fromState(E.state),new Date(E.updatedAt),E.state!==U.GitLabMergeRequestState.CLOSED?void 0:new Date(E.updatedAt),E.mergedAt==null?void 0:new Date(E.mergedAt))}catch(q){if(q instanceof c.Ww)return;throw this.handleException(q,e,ae)}}async getPullRequestForCommit(e,t,r,i,u,a){const o=(0,_.UH)(),s=await this.getProjectId(e,t,r,i,a?.baseUrl);if(!!s)try{const l=await this.request(e,t,a?.baseUrl,`v4/projects/${s}/repository/commits/${u}/merge_requests`,{method:"GET"},o);return l==null||l.length===0?void 0:(l.length>1&&l.sort((n,h)=>(n.state===U.GitLabMergeRequestState.OPEN?-1:1)-(h.state===U.GitLabMergeRequestState.OPEN?-1:1)||new Date(h.updated_at).getTime()-new Date(n.updated_at).getTime()),U.GitLabMergeRequestREST.from(l[0],e))}catch(l){if(l instanceof c.Ww)return;throw this.handleException(l,e,o)}}async findUser(e,t,r,i){var u,a;const o=(0,_.UH)();try{const s=`query findUser(
$search: String!
) {
	users(search: $search) {
		nodes {
			id
			name
			username,
			publicEmail,
			state
			avatarUrl
			webUrl
		}
	}
}`,l=await this.graphql(e,t,i?.baseUrl,s,{search:r},o),n=(a=(u=l?.data)==null?void 0:u.users)==null?void 0:a.nodes;if(n==null||n.length===0)return[];const h=[];for(const d of n){const P=/gid:\/\/gitlab\/User\/([0-9]+)\b/.exec(d.id);P!=null&&h.push({id:parseInt(P[1],10),name:d.name,username:d.username,publicEmail:d.publicEmail||void 0,state:d.state,avatarUrl:d.avatarUrl,webUrl:d.webUrl})}return h}catch(s){return s instanceof c.Ww?[]:(this.handleException(s,e,o),[])}}getProjectId(e,t,r,i,u){const a=`${t}|${r}/${i}`;let o=this._projectIds.get(a);return o==null&&(o=this.getProjectIdCore(e,t,r,i,u),this._projectIds.set(a,o)),o}async getProjectIdCore(e,t,r,i,u){var a,o;const s=(0,_.UH)();try{const l=`query getProjectId(
	$fullPath: ID!
) {
	project(fullPath: $fullPath) {
		id
	}
}`,n=await this.graphql(e,t,u,l,{fullPath:`${r}/${i}`},s),h=(o=(a=n?.data)==null?void 0:a.project)==null?void 0:o.id;if(h==null)return;const d=/gid:\/\/gitlab\/Project\/([0-9]+)\b/.exec(h);if(d==null)return;const P=d[1];return s!=null&&(s.exitDetails=`\u2022 projectId=${P}`),P}catch(l){if(l instanceof c.Ww)return;this.handleException(l,e,s);return}}async graphql(e,t,r,i,u,a){let o;try{const s=D.Y.logLevel===D.i.Debug||D.Y.isDebugging?new G.u(`[GITLAB] POST ${r}`,{log:!1}):void 0,l=this.getProxyAgent(e);try{if(o=await(0,p.a_)(e.getIgnoreSSLErrors(),()=>(0,p.he)(`${r??"https://gitlab.com/api"}/graphql`,{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},agent:l,body:JSON.stringify({query:i,variables:u})})),o.ok){const n=await o.json();if("errors"in n)throw new c.Xq("GitLab",o,n.errors);return n}throw new c.Xq("GitLab",o)}finally{const n=/(^[^({\n]+)/.exec(i),h=` ${n?.[1].trim()??i}`;s?.stop({message:h})}}catch(s){throw s instanceof c.Xq?this.handleRequestError(e,t,s,a):D.Y.isDebugging&&w.window.showErrorMessage(`GitLab request failed: ${s.message}`),s}}async request(e,t,r,i,u,a){const o=`${r??"https://gitlab.com/api"}/${i}`;let s;try{const l=D.Y.logLevel===D.i.Debug||D.Y.isDebugging?new G.u(`[GITLAB] ${u?.method??"GET"} ${o}`,{log:!1}):void 0,n=this.getProxyAgent(e);try{if(s=await(0,p.a_)(e.getIgnoreSSLErrors(),()=>(0,p.he)(o,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},agent:n,...u})),s.ok)return await s.json();throw new c.Xq("GitLab",s)}finally{l?.stop()}}catch(l){throw l instanceof c.Xq?this.handleRequestError(e,t,l,a):D.Y.isDebugging&&w.window.showErrorMessage(`GitLab request failed: ${l.message}`),l}}handleRequestError(e,t,r,i){var u,a,o,s,l;switch(r.status){case 404:case 410:case 422:throw new c.Ww(r);case 401:throw new c._7("gitlab",c.Jx.Unauthorized,r);case 403:if(r.message.includes("rate limit exceeded")){let n;const h=(a=(u=r.response)==null?void 0:u.headers)==null?void 0:a.get("x-ratelimit-reset");throw h!=null&&(n=parseInt(h,10),Number.isNaN(n)&&(n=void 0)),new c.yx(r,t,n)}throw new c._7("gitlab",c.Jx.Forbidden,r);case 500:D.Y.error(r,i),r.response!=null&&(e?.trackRequestException(),(0,S.vF)(`${e?.name??"GitLab"} failed to respond and might be experiencing issues.${e?.custom?"":" Please visit the [GitLab status page](https://status.gitlab.com) for more information."}`));return;case 502:if(D.Y.error(r,i),r.message.includes("timeout")){e?.trackRequestException(),(0,S.s$)(e?.name??"GitLab");return}break;default:if(r.status>=400&&r.status<500)throw new c.Bn(r);break}D.Y.error(r,i),D.Y.isDebugging&&w.window.showErrorMessage(`GitLab request failed: ${((l=(s=(o=r.response)==null?void 0:o.errors)==null?void 0:s[0])==null?void 0:l.message)??r.message}`)}handleException(e,t,r){return D.Y.error(e,r),e instanceof c._7&&this.showAuthenticationErrorMessage(e,t),e}async showAuthenticationErrorMessage(e,t){if(e.reason===c.Jx.Unauthorized||e.reason===c.Jx.Forbidden){const r="Reauthenticate";await w.window.showErrorMessage(`${e.message}. Would you like to try reauthenticating${e.reason===c.Jx.Forbidden?" to provide additional access":""}?`,r)===r&&await t.reauthenticate()}else w.window.showErrorMessage(e.message)}}$(A,"GitLabApi"),L([(0,_.fF)({args:{0:g=>g.name,1:"<token>"}})],A.prototype,"getAccountForCommit",1),L([(0,_.fF)({args:{0:g=>g.name,1:"<token>"}})],A.prototype,"getAccountForEmail",1),L([(0,_.fF)({args:{0:g=>g.name,1:"<token>"}})],A.prototype,"getDefaultBranch",1),L([(0,_.fF)({args:{0:g=>g.name,1:"<token>"}})],A.prototype,"getIssueOrPullRequest",1),L([(0,_.fF)({args:{0:g=>g.name,1:"<token>"}})],A.prototype,"getPullRequestForBranch",1),L([(0,_.fF)({args:{0:g=>g.name,1:"<token>"}})],A.prototype,"getPullRequestForCommit",1)},2925:(j,M,f)=>{f.r(M),f.d(M,{GitLabMergeRequest:()=>p,GitLabMergeRequestREST:()=>I,GitLabMergeRequestState:()=>C});var w=f(9052),C=(b=>(b.OPEN="opened",b.CLOSED="closed",b.MERGED="merged",b.LOCKED="locked",b))(C||{}),p;(b=>{function c(y){return y==="merged"?w.o0.Merged:y==="closed"||y==="locked"?w.o0.Closed:w.o0.Open}$(c,"fromState"),b.fromState=c;function m(y){return y===w.o0.Merged?"merged":y===w.o0.Closed?"closed":"opened"}$(m,"toState"),b.toState=m})(p||(p={}));var I;(b=>{function c(m,y){var D,S,_;return new w.i7(y,{name:((D=m.author)==null?void 0:D.name)??"Unknown",avatarUrl:((S=m.author)==null?void 0:S.avatar_url)??"",url:((_=m.author)==null?void 0:_.web_url)??""},String(m.iid),m.title,m.web_url,p.fromState(m.state),new Date(m.updated_at),m.closed_at==null?void 0:new Date(m.closed_at),m.merged_at==null?void 0:new Date(m.merged_at))}$(c,"from"),b.from=c})(I||(I={}))}};
