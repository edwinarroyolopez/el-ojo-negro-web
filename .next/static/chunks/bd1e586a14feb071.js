(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},98183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={assign:function(){return l},searchParamsToUrlQuery:function(){return i},urlQueryToSearchParams:function(){return u}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});function i(e){let t={};for(let[r,n]of e.entries()){let e=t[r];void 0===e?t[r]=n:Array.isArray(e)?e.push(n):t[r]=[e,n]}return t}function a(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function u(e){let t=new URLSearchParams;for(let[r,n]of Object.entries(e))if(Array.isArray(n))for(let e of n)t.append(r,a(e));else t.set(r,a(n));return t}function l(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,n]of r.entries())e.append(t,n)}return e}},95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return u},formatWithValidation:function(){return c},urlObjectKeys:function(){return l}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=e.r(90809)._(e.r(98183)),a=/https?|ftp|gopher|file/;function u(e){let{auth:t,hostname:r}=e,n=e.protocol||"",o=e.pathname||"",u=e.hash||"",l=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(c+=":"+e.port)),l&&"object"==typeof l&&(l=String(i.urlQueryToSearchParams(l)));let s=e.search||l&&`?${l}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||a.test(n))&&!1!==c?(c="//"+(c||""),o&&"/"!==o[0]&&(o="/"+o)):c||(c=""),u&&"#"!==u[0]&&(u="#"+u),s&&"?"!==s[0]&&(s="?"+s),o=o.replace(/[?#]/g,encodeURIComponent),s=s.replace("#","%23"),`${n}${c}${o}${s}${u}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return u(e)}},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return o}});let n=e.r(71645);function o(e,t){let r=(0,n.useRef)(null),o=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=o.current;t&&(o.current=null,t())}else e&&(r.current=i(e,n)),t&&(o.current=i(t,n))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18967,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return y},MiddlewareNotFoundError:function(){return v},MissingStaticPage:function(){return _},NormalizeError:function(){return b},PageNotFoundError:function(){return x},SP:function(){return m},ST:function(){return g},WEB_VITALS:function(){return i},execOnce:function(){return a},getDisplayName:function(){return f},getLocationOrigin:function(){return c},getURL:function(){return s},isAbsoluteUrl:function(){return l},isResSent:function(){return d},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return p},stringifyError:function(){return j}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=["CLS","FCP","FID","INP","LCP","TTFB"];function a(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let u=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>u.test(e);function c(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function s(){let{href:e}=window.location,t=c();return e.substring(t.length)}function f(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function d(e){return e.finished||e.headersSent}function p(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function h(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&d(r))return n;if(!n)throw Object.defineProperty(Error(`"${f(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return n}let m="undefined"!=typeof performance,g=m&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class y extends Error{}class b extends Error{}class x extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class _ extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class v extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function j(e){return JSON.stringify({message:e.message,stack:e.stack})}},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return i}});let n=e.r(18967),o=e.r(52817);function i(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,o.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return y},useLinkStatus:function(){return x}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=e.r(90809),a=e.r(43476),u=i._(e.r(71645)),l=e.r(95057),c=e.r(8372),s=e.r(18581),f=e.r(18967),d=e.r(5550);e.r(33525);let p=e.r(91949),h=e.r(73668),m=e.r(9396);function g(e){return"string"==typeof e?e:(0,l.formatUrl)(e)}function y(t){var r;let n,o,i,[l,y]=(0,u.useOptimistic)(p.IDLE_LINK_STATUS),x=(0,u.useRef)(null),{href:_,as:v,children:j,prefetch:w=null,passHref:O,replace:P,shallow:E,scroll:C,onClick:N,onMouseEnter:M,onTouchStart:S,legacyBehavior:I=!1,onNavigate:R,ref:T,unstable_dynamicOnHover:k,...L}=t;n=j,I&&("string"==typeof n||"number"==typeof n)&&(n=(0,a.jsx)("a",{children:n}));let $=u.default.useContext(c.AppRouterContext),A=!1!==w,U=!1!==w?null===(r=w)||"auto"===r?m.FetchStrategy.PPR:m.FetchStrategy.Full:m.FetchStrategy.PPR,{href:F,as:z}=u.default.useMemo(()=>{let e=g(_);return{href:e,as:v?g(v):e}},[_,v]);if(I){if(n?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});o=u.default.Children.only(n)}let B=I?o&&"object"==typeof o&&o.ref:T,D=u.default.useCallback(e=>(null!==$&&(x.current=(0,p.mountLinkInstance)(e,F,$,U,A,y)),()=>{x.current&&((0,p.unmountLinkForCurrentNavigation)(x.current),x.current=null),(0,p.unmountPrefetchableInstance)(e)}),[A,F,$,U,y]),K={ref:(0,s.useMergedRef)(D,B),onClick(t){I||"function"!=typeof N||N(t),I&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(t),!$||t.defaultPrevented||function(t,r,n,o,i,a,l){if("undefined"!=typeof window){let c,{nodeName:s}=t.currentTarget;if("A"===s.toUpperCase()&&((c=t.currentTarget.getAttribute("target"))&&"_self"!==c||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,h.isLocalURL)(r)){i&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),l){let e=!1;if(l({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:f}=e.r(99781);u.default.startTransition(()=>{f(n||r,i?"replace":"push",a??!0,o.current)})}}(t,F,z,x,P,C,R)},onMouseEnter(e){I||"function"!=typeof M||M(e),I&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),$&&A&&(0,p.onNavigationIntent)(e.currentTarget,!0===k)},onTouchStart:function(e){I||"function"!=typeof S||S(e),I&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),$&&A&&(0,p.onNavigationIntent)(e.currentTarget,!0===k)}};return(0,f.isAbsoluteUrl)(z)?K.href=z:I&&!O&&("a"!==o.type||"href"in o.props)||(K.href=(0,d.addBasePath)(z)),i=I?u.default.cloneElement(o,K):(0,a.jsx)("a",{...L,...K,children:n}),(0,a.jsx)(b.Provider,{value:l,children:i})}e.r(84508);let b=(0,u.createContext)(p.IDLE_LINK_STATUS),x=()=>(0,u.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},48053,e=>{"use strict";var t=e.i(43476),r=e.i(97053),n=e.i(22016);let o=r.default.header.withConfig({displayName:"MarketingHeader__Header",componentId:"sc-9bdcb0ed-0"})`
  position: sticky;
  top: 0;
  z-index: ${({theme:e})=>e.zIndex.nav};
  border-bottom: ${({theme:e})=>e.borders.subtle};
  background: rgba(9, 9, 9, 0.82);
  backdrop-filter: blur(10px);
`,i=r.default.div.withConfig({displayName:"MarketingHeader__Shell",componentId:"sc-9bdcb0ed-1"})`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0.9rem 1.25rem;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    align-items: start;
    padding: 0.75rem 1rem;
    gap: 0.6rem;
  }
`,a=(0,r.default)(n.default).withConfig({displayName:"MarketingHeader__Brand",componentId:"sc-9bdcb0ed-2"})`
  display: inline-flex;
  width: fit-content;
`,u=r.default.img.withConfig({displayName:"MarketingHeader__BrandLogo",componentId:"sc-9bdcb0ed-3"})`
  display: block;
  width: 116px;
  height: auto;

  @media (max-width: 760px) {
    width: 102px;
  }
`,l=r.default.nav.withConfig({displayName:"MarketingHeader__Nav",componentId:"sc-9bdcb0ed-4"})`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  color: ${({theme:e})=>e.colors.textMuted};
  font-size: ${({theme:e})=>e.typography.size.sm};

  @media (max-width: 760px) {
    justify-content: flex-start;
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
    gap: 0.85rem;
    padding-bottom: 0.15rem;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`,c=(0,r.default)(n.default).withConfig({displayName:"MarketingHeader__NavLink",componentId:"sc-9bdcb0ed-5"})`
  color: inherit;
  flex: 0 0 auto;

  @media (max-width: 760px) {
    font-size: 0.9rem;
  }
`,s=r.default.span.withConfig({displayName:"MarketingHeader__Accent",componentId:"sc-9bdcb0ed-6"})`
  color: ${({theme:e})=>e.colors.accent};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: ${({theme:e})=>e.typography.size.xs};
  flex: 0 0 auto;

  @media (max-width: 900px) {
    display: none;
  }
`;function f(){return(0,t.jsx)(o,{children:(0,t.jsxs)(i,{children:[(0,t.jsx)(a,{href:"/","aria-label":"EL OJO NEGRO - inicio",children:(0,t.jsx)(u,{src:"/DARK.png",alt:"EL OJO NEGRO"})}),(0,t.jsxs)(l,{"aria-label":"Navegacion publica",children:[(0,t.jsx)(c,{href:"/architecture",children:"Arquitectura"}),(0,t.jsx)(c,{href:"/system-design",children:"Sistema"}),(0,t.jsx)(c,{href:"/login",children:"Login"}),(0,t.jsx)(s,{children:"Limitless"})]})]})})}let d=r.default.footer.withConfig({displayName:"Footer__Wrapper",componentId:"sc-3a28c693-0"})`
  border-top: ${({theme:e})=>e.borders.subtle};
  margin-top: ${({theme:e})=>e.spacing[16]};
`,p=r.default.div.withConfig({displayName:"Footer__Inner",componentId:"sc-3a28c693-1"})`
  max-width: 1240px;
  margin: 0 auto;
  padding: 2rem 1.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  color: ${({theme:e})=>e.colors.textMuted};
  font-size: ${({theme:e})=>e.typography.size.sm};
`,h=r.default.p.withConfig({displayName:"Footer__Motto",componentId:"sc-3a28c693-2"})`
  margin: 0;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({theme:e})=>e.colors.accent};
`;function m(){return(0,t.jsx)(d,{children:(0,t.jsxs)(p,{children:[(0,t.jsx)("p",{children:"EL OJO NEGRO - Arquitecto de Percepcion"}),(0,t.jsx)(h,{children:"Limitless"})]})})}let g=r.default.main.withConfig({displayName:"layout__Main",componentId:"sc-263b77bf-0"})`
  min-height: calc(100vh - 66px);
`;function y({children:e}){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(f,{}),(0,t.jsx)(g,{children:e}),(0,t.jsx)(m,{})]})}e.s(["default",()=>y],48053)}]);