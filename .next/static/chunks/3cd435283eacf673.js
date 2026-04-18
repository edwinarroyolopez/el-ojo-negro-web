(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},59544,e=>{"use strict";var t=e.i(43476),r=e.i(97053);let n={primary:r.css`
    background: ${({theme:e})=>e.colors.accent};
    color: ${({theme:e})=>e.colors.accentForeground};
    border: 1px solid ${({theme:e})=>e.colors.accent};

    &:hover:not(:disabled) {
      transform: translateY(-1px);
      filter: brightness(1.02);
    }
  `,secondary:r.css`
    background: ${({theme:e})=>e.colors.panel};
    color: ${({theme:e})=>e.colors.text};
    border: ${({theme:e})=>e.borders.subtle};

    &:hover:not(:disabled) {
      border-color: ${({theme:e})=>e.colors.borderStrong};
      background: ${({theme:e})=>e.colors.panelStrong};
    }
  `,ghost:r.css`
    background: transparent;
    color: ${({theme:e})=>e.colors.textMuted};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      color: ${({theme:e})=>e.colors.text};
      border-color: ${({theme:e})=>e.colors.border};
      background: ${({theme:e})=>e.colors.panel};
    }
  `},o=r.default.button.withConfig({displayName:"Button__StyledButton",componentId:"sc-8dcb086a-0"})`
  appearance: none;
  border-radius: ${({theme:e})=>e.radius.pill};
  font-family: ${({theme:e})=>e.typography.fontSans};
  font-size: ${({theme:e})=>e.typography.size.sm};
  font-weight: ${({theme:e})=>e.typography.weight.medium};
  padding: 0.65rem 1.15rem;
  transition: all 180ms ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 42px;

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.colors.accent};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.48;
    cursor: not-allowed;
  }

  ${({$variant:e})=>n[e]}
`;function a({variant:e="primary",...r}){return(0,t.jsx)(o,{$variant:e,...r})}e.s(["Button",()=>a])},3903,68834,e=>{"use strict";let t,r;var n=e.i(71645);let o=e=>{let t,r=new Set,n=(e,n)=>{let o="function"==typeof e?e(t):e;if(!Object.is(o,t)){let e=t;t=(null!=n?n:"object"!=typeof o||null===o)?o:Object.assign({},t,o),r.forEach(r=>r(t,e))}},o=()=>t,a={setState:n,getState:o,getInitialState:()=>i,subscribe:e=>(r.add(e),()=>r.delete(e))},i=t=e(n,o,a);return a},a=e=>{let t=e?o(e):o,r=e=>(function(e,t=e=>e){let r=n.default.useSyncExternalStore(e.subscribe,n.default.useCallback(()=>t(e.getState()),[e,t]),n.default.useCallback(()=>t(e.getInitialState()),[e,t]));return n.default.useDebugValue(r),r})(t,e);return Object.assign(r,t),r},i=e=>e?a(e):a;e.s(["create",()=>i],68834);let l=e=>t=>{try{let r=e(t);if(r instanceof Promise)return r;return{then:e=>l(e)(r),catch(e){return this}}}catch(e){return{then(e){return this},catch:t=>l(t)(e)}}},s=i()((t=e=>({token:null,user:null,isHydrated:!1,setToken:t=>e({token:t}),setUser:t=>e({user:t}),login:({token:t,user:r})=>e({token:t,user:r}),logout:()=>e({token:null,user:null}),setHydrated:t=>e({isHydrated:t})}),r={name:"el-ojo-negro-auth",partialize:e=>({token:e.token,user:e.user}),onRehydrateStorage:()=>e=>{e?.setHydrated(!0)}},(e,n,o)=>{let a,i={storage:function(e,t){let r;try{r=e()}catch(e){return}return{getItem:e=>{var t;let n=e=>null===e?null:JSON.parse(e,void 0),o=null!=(t=r.getItem(e))?t:null;return o instanceof Promise?o.then(n):n(o)},setItem:(e,t)=>r.setItem(e,JSON.stringify(t,void 0)),removeItem:e=>r.removeItem(e)}}(()=>window.localStorage),partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...r},s=!1,u=0,c=new Set,d=new Set,f=i.storage;if(!f)return t((...t)=>{console.warn(`[zustand persist middleware] Unable to update item '${i.name}', the given storage is currently unavailable.`),e(...t)},n,o);let p=()=>{let e=i.partialize({...n()});return f.setItem(i.name,{state:e,version:i.version})},h=o.setState;o.setState=(e,t)=>(h(e,t),p());let g=t((...t)=>(e(...t),p()),n,o);o.getInitialState=()=>g;let m=()=>{var t,r;if(!f)return;let o=++u;s=!1,c.forEach(e=>{var t;return e(null!=(t=n())?t:g)});let h=(null==(r=i.onRehydrateStorage)?void 0:r.call(i,null!=(t=n())?t:g))||void 0;return l(f.getItem.bind(f))(i.name).then(e=>{if(e)if("number"!=typeof e.version||e.version===i.version)return[!1,e.state];else{if(i.migrate){let t=i.migrate(e.state,e.version);return t instanceof Promise?t.then(e=>[!0,e]):[!0,t]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}return[!1,void 0]}).then(t=>{var r;if(o!==u)return;let[l,s]=t;if(e(a=i.merge(s,null!=(r=n())?r:g),!0),l)return p()}).then(()=>{o===u&&(null==h||h(n(),void 0),a=n(),s=!0,d.forEach(e=>e(a)))}).catch(e=>{o===u&&(null==h||h(void 0,e))})};return o.persist={setOptions:e=>{i={...i,...e},e.storage&&(f=e.storage)},clearStorage:()=>{null==f||f.removeItem(i.name)},getOptions:()=>i,rehydrate:()=>m(),hasHydrated:()=>s,onHydrate:e=>(c.add(e),()=>{c.delete(e)}),onFinishHydration:e=>(d.add(e),()=>{d.delete(e)})},i.skipHydration||m(),a||g}));e.s(["useAuthStore",0,s],3903)},98183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={assign:function(){return s},searchParamsToUrlQuery:function(){return a},urlQueryToSearchParams:function(){return l}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});function a(e){let t={};for(let[r,n]of e.entries()){let e=t[r];void 0===e?t[r]=n:Array.isArray(e)?e.push(n):t[r]=[e,n]}return t}function i(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function l(e){let t=new URLSearchParams;for(let[r,n]of Object.entries(e))if(Array.isArray(n))for(let e of n)t.append(r,i(e));else t.set(r,i(n));return t}function s(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,n]of r.entries())e.append(t,n)}return e}},95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return l},formatWithValidation:function(){return u},urlObjectKeys:function(){return s}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let a=e.r(90809)._(e.r(98183)),i=/https?|ftp|gopher|file/;function l(e){let{auth:t,hostname:r}=e,n=e.protocol||"",o=e.pathname||"",l=e.hash||"",s=e.query||"",u=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?u=t+e.host:r&&(u=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(u+=":"+e.port)),s&&"object"==typeof s&&(s=String(a.urlQueryToSearchParams(s)));let c=e.search||s&&`?${s}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||i.test(n))&&!1!==u?(u="//"+(u||""),o&&"/"!==o[0]&&(o="/"+o)):u||(u=""),l&&"#"!==l[0]&&(l="#"+l),c&&"?"!==c[0]&&(c="?"+c),o=o.replace(/[?#]/g,encodeURIComponent),c=c.replace("#","%23"),`${n}${u}${o}${c}${l}`}let s=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function u(e){return l(e)}},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return o}});let n=e.r(71645);function o(e,t){let r=(0,n.useRef)(null),o=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=o.current;t&&(o.current=null,t())}else e&&(r.current=a(e,n)),t&&(o.current=a(t,n))},[e,t])}function a(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18967,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return y},MiddlewareNotFoundError:function(){return S},MissingStaticPage:function(){return x},NormalizeError:function(){return b},PageNotFoundError:function(){return v},SP:function(){return g},ST:function(){return m},WEB_VITALS:function(){return a},execOnce:function(){return i},getDisplayName:function(){return d},getLocationOrigin:function(){return u},getURL:function(){return c},isAbsoluteUrl:function(){return s},isResSent:function(){return f},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return p},stringifyError:function(){return j}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let a=["CLS","FCP","FID","INP","LCP","TTFB"];function i(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let l=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,s=e=>l.test(e);function u(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function c(){let{href:e}=window.location,t=u();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function f(e){return e.finished||e.headersSent}function p(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function h(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&f(r))return n;if(!n)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return n}let g="undefined"!=typeof performance,m=g&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class y extends Error{}class b extends Error{}class v extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class x extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class S extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function j(e){return JSON.stringify({message:e.message,stack:e.stack})}},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return a}});let n=e.r(18967),o=e.r(52817);function a(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,o.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return y},useLinkStatus:function(){return v}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let a=e.r(90809),i=e.r(43476),l=a._(e.r(71645)),s=e.r(95057),u=e.r(8372),c=e.r(18581),d=e.r(18967),f=e.r(5550);e.r(33525);let p=e.r(91949),h=e.r(73668),g=e.r(9396);function m(e){return"string"==typeof e?e:(0,s.formatUrl)(e)}function y(t){var r;let n,o,a,[s,y]=(0,l.useOptimistic)(p.IDLE_LINK_STATUS),v=(0,l.useRef)(null),{href:x,as:S,children:j,prefetch:w=null,passHref:_,replace:k,shallow:O,scroll:$,onClick:C,onMouseEnter:P,onTouchStart:E,legacyBehavior:I=!1,onNavigate:N,ref:R,unstable_dynamicOnHover:T,...A}=t;n=j,I&&("string"==typeof n||"number"==typeof n)&&(n=(0,i.jsx)("a",{children:n}));let M=l.default.useContext(u.AppRouterContext),L=!1!==w,U=!1!==w?null===(r=w)||"auto"===r?g.FetchStrategy.PPR:g.FetchStrategy.Full:g.FetchStrategy.PPR,{href:z,as:B}=l.default.useMemo(()=>{let e=m(x);return{href:e,as:S?m(S):e}},[x,S]);if(I){if(n?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});o=l.default.Children.only(n)}let F=I?o&&"object"==typeof o&&o.ref:R,D=l.default.useCallback(e=>(null!==M&&(v.current=(0,p.mountLinkInstance)(e,z,M,U,L,y)),()=>{v.current&&((0,p.unmountLinkForCurrentNavigation)(v.current),v.current=null),(0,p.unmountPrefetchableInstance)(e)}),[L,z,M,U,y]),H={ref:(0,c.useMergedRef)(D,F),onClick(t){I||"function"!=typeof C||C(t),I&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(t),!M||t.defaultPrevented||function(t,r,n,o,a,i,s){if("undefined"!=typeof window){let u,{nodeName:c}=t.currentTarget;if("A"===c.toUpperCase()&&((u=t.currentTarget.getAttribute("target"))&&"_self"!==u||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,h.isLocalURL)(r)){a&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),s){let e=!1;if(s({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:d}=e.r(99781);l.default.startTransition(()=>{d(n||r,a?"replace":"push",i??!0,o.current)})}}(t,z,B,v,k,$,N)},onMouseEnter(e){I||"function"!=typeof P||P(e),I&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),M&&L&&(0,p.onNavigationIntent)(e.currentTarget,!0===T)},onTouchStart:function(e){I||"function"!=typeof E||E(e),I&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),M&&L&&(0,p.onNavigationIntent)(e.currentTarget,!0===T)}};return(0,d.isAbsoluteUrl)(B)?H.href=B:I&&!_&&("a"!==o.type||"href"in o.props)||(H.href=(0,f.addBasePath)(B)),a=I?l.default.cloneElement(o,H):(0,i.jsx)("a",{...A,...H,children:n}),(0,i.jsx)(b.Provider,{value:s,children:a})}e.r(84508);let b=(0,l.createContext)(p.IDLE_LINK_STATUS),v=()=>(0,l.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},47510,e=>{"use strict";var t=e.i(43476),r=e.i(22016),n=e.i(97053),o=e.i(71645);let a=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},i=(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim();var l={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,o.forwardRef)(({color:e="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:n,className:a="",children:s,iconNode:u,...c},d)=>(0,o.createElement)("svg",{ref:d,...l,width:t,height:t,stroke:e,strokeWidth:n?24*Number(r)/Number(t):r,className:i("lucide",a),...!s&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0})(c)&&{"aria-hidden":"true"},...c},[...u.map(([e,t])=>(0,o.createElement)(e,t)),...Array.isArray(s)?s:[s]])),u=(e,t)=>{let r=(0,o.forwardRef)(({className:r,...n},l)=>(0,o.createElement)(s,{ref:l,iconNode:t,className:i(`lucide-${a(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,r),...n}));return r.displayName=a(e),r},c=u("panel-left-close",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m16 15-3-3 3-3",key:"14y99z"}]]),d=u("panel-left-open",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m14 9 3 3-3 3",key:"8010ee"}]]),f=u("layout-grid",[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]]),p=u("log-out",[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]);var h=e.i(18566),g=e.i(3903);let m=(0,e.i(68834).create)(e=>({isSidebarOpen:!0,toggleSidebar:()=>e(e=>({isSidebarOpen:!e.isSidebarOpen})),setSidebarOpen:t=>e({isSidebarOpen:t})}));var y=e.i(59544);let b=n.default.div.withConfig({displayName:"layout__Shell",componentId:"sc-f0594771-0"})`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`,v=n.default.aside.withConfig({displayName:"layout__Sidebar",componentId:"sc-f0594771-1"})`
  border-right: ${({theme:e})=>e.borders.subtle};
  padding: 1.25rem;
  background: ${({theme:e})=>e.colors.backgroundElevated};

  @media (max-width: 980px) {
    display: ${({$open:e})=>e?"block":"none"};
    border-right: none;
    border-bottom: ${({theme:e})=>e.borders.subtle};
  }
`,x=n.default.div.withConfig({displayName:"layout__Content",componentId:"sc-f0594771-2"})`
  min-width: 0;
`,S=n.default.header.withConfig({displayName:"layout__Topbar",componentId:"sc-f0594771-3"})`
  position: sticky;
  top: 0;
  z-index: ${({theme:e})=>e.zIndex.nav};
  border-bottom: ${({theme:e})=>e.borders.subtle};
  background: rgba(12, 12, 12, 0.82);
  backdrop-filter: blur(10px);
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
`,j=n.default.main.withConfig({displayName:"layout__Main",componentId:"sc-f0594771-4"})`
  padding: 1.25rem;
`,w=n.default.nav.withConfig({displayName:"layout__Nav",componentId:"sc-f0594771-5"})`
  display: grid;
  gap: 0.5rem;
  margin-top: 1rem;
`,_=(0,n.default)(r.default).withConfig({displayName:"layout__NavLink",componentId:"sc-f0594771-6"})`
  border: ${({theme:e})=>e.borders.subtle};
  padding: 0.6rem 0.8rem;
  border-radius: ${({theme:e})=>e.radius.md};
  color: ${({theme:e})=>e.colors.textMuted};

  &:hover {
    border-color: ${({theme:e})=>e.colors.borderStrong};
    color: ${({theme:e})=>e.colors.text};
  }
`,k=n.default.p.withConfig({displayName:"layout__Brand",componentId:"sc-f0594771-7"})`
  margin: 0;
  font-family: ${({theme:e})=>e.typography.fontSerif};
  letter-spacing: 0.12em;
`,O=n.default.div.withConfig({displayName:"layout__Screen",componentId:"sc-f0594771-8"})`
  min-height: 100vh;
  display: grid;
  place-items: center;
  color: ${({theme:e})=>e.colors.textMuted};
`;function $({children:e}){let r,n,a,i,{isReady:l}=(r=(0,h.useRouter)(),n=(0,h.usePathname)(),a=(0,g.useAuthStore)(e=>e.token),i=(0,g.useAuthStore)(e=>e.isHydrated),(0,o.useEffect)(()=>{if(i&&!a){let e=encodeURIComponent(n||"/dashboard");r.replace(`/login?next=${e}`)}},[i,n,r,a]),{isReady:i&&!!a}),s=(0,g.useAuthStore)(e=>e.logout),u=(0,g.useAuthStore)(e=>e.user),$=m(e=>e.isSidebarOpen),C=m(e=>e.toggleSidebar);return l?(0,t.jsxs)(b,{children:[(0,t.jsxs)(v,{$open:$,children:[(0,t.jsx)(k,{children:"EL OJO NEGRO"}),(0,t.jsx)("p",{style:{margin:"0.35rem 0 0",color:"#8f887d",fontSize:"0.8rem",letterSpacing:"0.15em",textTransform:"uppercase"},children:"Shell privado"}),(0,t.jsx)(w,{children:(0,t.jsx)(_,{href:"/dashboard",children:"Dashboard"})})]}),(0,t.jsxs)(x,{children:[(0,t.jsxs)(S,{children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.55rem"},children:[(0,t.jsx)(y.Button,{variant:"ghost",onClick:C,"aria-label":"Alternar panel lateral",children:$?(0,t.jsx)(c,{size:18}):(0,t.jsx)(d,{size:18})}),(0,t.jsx)(f,{size:16}),(0,t.jsx)("span",{style:{color:"#b5aea1"},children:"Centro operativo"})]}),(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.6rem"},children:[(0,t.jsx)("span",{style:{color:"#8f887d",fontSize:"0.85rem"},children:u?.name||"Operador"}),(0,t.jsxs)(y.Button,{variant:"secondary",onClick:s,children:[(0,t.jsx)(p,{size:16})," Salir"]})]})]}),(0,t.jsx)(j,{children:e})]})]}):(0,t.jsx)(O,{children:"Verificando acceso..."})}e.s(["default",()=>$],47510)}]);