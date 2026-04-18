module.exports=[38783,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].ReactServerDOMTurbopackClient},96438,a=>{"use strict";var b=a.i(87924),c=a.i(75716);let d={primary:c.css`
    background: ${({theme:a})=>a.colors.accent};
    color: ${({theme:a})=>a.colors.accentForeground};
    border: 1px solid ${({theme:a})=>a.colors.accent};

    &:hover:not(:disabled) {
      transform: translateY(-1px);
      filter: brightness(1.02);
    }
  `,secondary:c.css`
    background: ${({theme:a})=>a.colors.panel};
    color: ${({theme:a})=>a.colors.text};
    border: ${({theme:a})=>a.borders.subtle};

    &:hover:not(:disabled) {
      border-color: ${({theme:a})=>a.colors.borderStrong};
      background: ${({theme:a})=>a.colors.panelStrong};
    }
  `,ghost:c.css`
    background: transparent;
    color: ${({theme:a})=>a.colors.textMuted};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      color: ${({theme:a})=>a.colors.text};
      border-color: ${({theme:a})=>a.colors.border};
      background: ${({theme:a})=>a.colors.panel};
    }
  `},e=c.default.button.withConfig({displayName:"Button__StyledButton",componentId:"sc-8dcb086a-0"})`
  appearance: none;
  border-radius: ${({theme:a})=>a.radius.pill};
  font-family: ${({theme:a})=>a.typography.fontSans};
  font-size: ${({theme:a})=>a.typography.size.sm};
  font-weight: ${({theme:a})=>a.typography.weight.medium};
  padding: 0.65rem 1.15rem;
  transition: all 180ms ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 42px;

  &:focus-visible {
    outline: 2px solid ${({theme:a})=>a.colors.accent};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.48;
    cursor: not-allowed;
  }

  ${({$variant:a})=>d[a]}
`;function f({variant:a="primary",...c}){return(0,b.jsx)(e,{$variant:a,...c})}a.s(["Button",()=>f])},67370,20226,a=>{"use strict";let b,c;var d=a.i(72131);let e=a=>{let b,c=new Set,d=(a,d)=>{let e="function"==typeof a?a(b):a;if(!Object.is(e,b)){let a=b;b=(null!=d?d:"object"!=typeof e||null===e)?e:Object.assign({},b,e),c.forEach(c=>c(b,a))}},e=()=>b,f={setState:d,getState:e,getInitialState:()=>g,subscribe:a=>(c.add(a),()=>c.delete(a))},g=b=a(d,e,f);return f},f=a=>{let b=a?e(a):e,c=a=>(function(a,b=a=>a){let c=d.default.useSyncExternalStore(a.subscribe,d.default.useCallback(()=>b(a.getState()),[a,b]),d.default.useCallback(()=>b(a.getInitialState()),[a,b]));return d.default.useDebugValue(c),c})(b,a);return Object.assign(c,b),c},g=a=>a?f(a):f;a.s(["create",()=>g],20226);let h=a=>b=>{try{let c=a(b);if(c instanceof Promise)return c;return{then:a=>h(a)(c),catch(a){return this}}}catch(a){return{then(a){return this},catch:b=>h(b)(a)}}},i=g()((b=a=>({token:null,user:null,isHydrated:!1,setToken:b=>a({token:b}),setUser:b=>a({user:b}),login:({token:b,user:c})=>a({token:b,user:c}),logout:()=>a({token:null,user:null}),setHydrated:b=>a({isHydrated:b})}),c={name:"el-ojo-negro-auth",partialize:a=>({token:a.token,user:a.user}),onRehydrateStorage:()=>a=>{a?.setHydrated(!0)}},(a,d,e)=>{let f,g={storage:function(a,b){let c;try{c=a()}catch(a){return}return{getItem:a=>{var b;let d=a=>null===a?null:JSON.parse(a,void 0),e=null!=(b=c.getItem(a))?b:null;return e instanceof Promise?e.then(d):d(e)},setItem:(a,b)=>c.setItem(a,JSON.stringify(b,void 0)),removeItem:a=>c.removeItem(a)}}(()=>window.localStorage),partialize:a=>a,version:0,merge:(a,b)=>({...b,...a}),...c},i=!1,j=0,k=new Set,l=new Set,m=g.storage;if(!m)return b((...b)=>{console.warn(`[zustand persist middleware] Unable to update item '${g.name}', the given storage is currently unavailable.`),a(...b)},d,e);let n=()=>{let a=g.partialize({...d()});return m.setItem(g.name,{state:a,version:g.version})},o=e.setState;e.setState=(a,b)=>(o(a,b),n());let p=b((...b)=>(a(...b),n()),d,e);e.getInitialState=()=>p;let q=()=>{var b,c;if(!m)return;let e=++j;i=!1,k.forEach(a=>{var b;return a(null!=(b=d())?b:p)});let o=(null==(c=g.onRehydrateStorage)?void 0:c.call(g,null!=(b=d())?b:p))||void 0;return h(m.getItem.bind(m))(g.name).then(a=>{if(a)if("number"!=typeof a.version||a.version===g.version)return[!1,a.state];else{if(g.migrate){let b=g.migrate(a.state,a.version);return b instanceof Promise?b.then(a=>[!0,a]):[!0,b]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}return[!1,void 0]}).then(b=>{var c;if(e!==j)return;let[h,i]=b;if(a(f=g.merge(i,null!=(c=d())?c:p),!0),h)return n()}).then(()=>{e===j&&(null==o||o(d(),void 0),f=d(),i=!0,l.forEach(a=>a(f)))}).catch(a=>{e===j&&(null==o||o(void 0,a))})};return e.persist={setOptions:a=>{g={...g,...a},a.storage&&(m=a.storage)},clearStorage:()=>{null==m||m.removeItem(g.name)},getOptions:()=>g,rehydrate:()=>q(),hasHydrated:()=>i,onHydrate:a=>(k.add(a),()=>{k.delete(a)}),onFinishHydration:a=>(l.add(a),()=>{l.delete(a)})},g.skipHydration||q(),f||p}));a.s(["useAuthStore",0,i],67370)},32105,a=>{"use strict";var b=a.i(87924),c=a.i(38246),d=a.i(75716),e=a.i(72131);let f=a=>{let b=a.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,b,c)=>c?c.toUpperCase():b.toLowerCase());return b.charAt(0).toUpperCase()+b.slice(1)},g=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim();var h={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let i=(0,e.forwardRef)(({color:a="currentColor",size:b=24,strokeWidth:c=2,absoluteStrokeWidth:d,className:f="",children:i,iconNode:j,...k},l)=>(0,e.createElement)("svg",{ref:l,...h,width:b,height:b,stroke:a,strokeWidth:d?24*Number(c)/Number(b):c,className:g("lucide",f),...!i&&!(a=>{for(let b in a)if(b.startsWith("aria-")||"role"===b||"title"===b)return!0})(k)&&{"aria-hidden":"true"},...k},[...j.map(([a,b])=>(0,e.createElement)(a,b)),...Array.isArray(i)?i:[i]])),j=(a,b)=>{let c=(0,e.forwardRef)(({className:c,...d},h)=>(0,e.createElement)(i,{ref:h,iconNode:b,className:g(`lucide-${f(a).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${a}`,c),...d}));return c.displayName=f(a),c},k=j("panel-left-close",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m16 15-3-3 3-3",key:"14y99z"}]]),l=j("panel-left-open",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m14 9 3 3-3 3",key:"8010ee"}]]),m=j("layout-grid",[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]]),n=j("log-out",[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]);var o=a.i(50944),p=a.i(67370);let q=(0,a.i(20226).create)(a=>({isSidebarOpen:!0,toggleSidebar:()=>a(a=>({isSidebarOpen:!a.isSidebarOpen})),setSidebarOpen:b=>a({isSidebarOpen:b})}));var r=a.i(96438);let s=d.default.div.withConfig({displayName:"layout__Shell",componentId:"sc-f0594771-0"})`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`,t=d.default.aside.withConfig({displayName:"layout__Sidebar",componentId:"sc-f0594771-1"})`
  border-right: ${({theme:a})=>a.borders.subtle};
  padding: 1.25rem;
  background: ${({theme:a})=>a.colors.backgroundElevated};

  @media (max-width: 980px) {
    display: ${({$open:a})=>a?"block":"none"};
    border-right: none;
    border-bottom: ${({theme:a})=>a.borders.subtle};
  }
`,u=d.default.div.withConfig({displayName:"layout__Content",componentId:"sc-f0594771-2"})`
  min-width: 0;
`,v=d.default.header.withConfig({displayName:"layout__Topbar",componentId:"sc-f0594771-3"})`
  position: sticky;
  top: 0;
  z-index: ${({theme:a})=>a.zIndex.nav};
  border-bottom: ${({theme:a})=>a.borders.subtle};
  background: rgba(12, 12, 12, 0.82);
  backdrop-filter: blur(10px);
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
`,w=d.default.main.withConfig({displayName:"layout__Main",componentId:"sc-f0594771-4"})`
  padding: 1.25rem;
`,x=d.default.nav.withConfig({displayName:"layout__Nav",componentId:"sc-f0594771-5"})`
  display: grid;
  gap: 0.5rem;
  margin-top: 1rem;
`,y=(0,d.default)(c.default).withConfig({displayName:"layout__NavLink",componentId:"sc-f0594771-6"})`
  border: ${({theme:a})=>a.borders.subtle};
  padding: 0.6rem 0.8rem;
  border-radius: ${({theme:a})=>a.radius.md};
  color: ${({theme:a})=>a.colors.textMuted};

  &:hover {
    border-color: ${({theme:a})=>a.colors.borderStrong};
    color: ${({theme:a})=>a.colors.text};
  }
`,z=d.default.p.withConfig({displayName:"layout__Brand",componentId:"sc-f0594771-7"})`
  margin: 0;
  font-family: ${({theme:a})=>a.typography.fontSerif};
  letter-spacing: 0.12em;
`,A=d.default.div.withConfig({displayName:"layout__Screen",componentId:"sc-f0594771-8"})`
  min-height: 100vh;
  display: grid;
  place-items: center;
  color: ${({theme:a})=>a.colors.textMuted};
`;function B({children:a}){let c,d,f,g,{isReady:h}=(c=(0,o.useRouter)(),d=(0,o.usePathname)(),f=(0,p.useAuthStore)(a=>a.token),g=(0,p.useAuthStore)(a=>a.isHydrated),(0,e.useEffect)(()=>{if(g&&!f){let a=encodeURIComponent(d||"/dashboard");c.replace(`/login?next=${a}`)}},[g,d,c,f]),{isReady:g&&!!f}),i=(0,p.useAuthStore)(a=>a.logout),j=(0,p.useAuthStore)(a=>a.user),B=q(a=>a.isSidebarOpen),C=q(a=>a.toggleSidebar);return h?(0,b.jsxs)(s,{children:[(0,b.jsxs)(t,{$open:B,children:[(0,b.jsx)(z,{children:"EL OJO NEGRO"}),(0,b.jsx)("p",{style:{margin:"0.35rem 0 0",color:"#8f887d",fontSize:"0.8rem",letterSpacing:"0.15em",textTransform:"uppercase"},children:"Shell privado"}),(0,b.jsx)(x,{children:(0,b.jsx)(y,{href:"/dashboard",children:"Dashboard"})})]}),(0,b.jsxs)(u,{children:[(0,b.jsxs)(v,{children:[(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.55rem"},children:[(0,b.jsx)(r.Button,{variant:"ghost",onClick:C,"aria-label":"Alternar panel lateral",children:B?(0,b.jsx)(k,{size:18}):(0,b.jsx)(l,{size:18})}),(0,b.jsx)(m,{size:16}),(0,b.jsx)("span",{style:{color:"#b5aea1"},children:"Centro operativo"})]}),(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.6rem"},children:[(0,b.jsx)("span",{style:{color:"#8f887d",fontSize:"0.85rem"},children:j?.name||"Operador"}),(0,b.jsxs)(r.Button,{variant:"secondary",onClick:i,children:[(0,b.jsx)(n,{size:16})," Salir"]})]})]}),(0,b.jsx)(w,{children:a})]})]}):(0,b.jsx)(A,{children:"Verificando acceso..."})}a.s(["default",()=>B],32105)}];

//# sourceMappingURL=_05278f2d._.js.map