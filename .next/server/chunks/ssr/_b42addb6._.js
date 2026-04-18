module.exports=[38783,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].ReactServerDOMTurbopackClient},30697,a=>{"use strict";var b=a.i(87924),c=a.i(75716),d=a.i(38246);let e=c.default.header.withConfig({displayName:"MarketingHeader__Header",componentId:"sc-9bdcb0ed-0"})`
  position: sticky;
  top: 0;
  z-index: ${({theme:a})=>a.zIndex.nav};
  border-bottom: ${({theme:a})=>a.borders.subtle};
  background: rgba(9, 9, 9, 0.82);
  backdrop-filter: blur(10px);
`,f=c.default.div.withConfig({displayName:"MarketingHeader__Shell",componentId:"sc-9bdcb0ed-1"})`
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
`,g=(0,c.default)(d.default).withConfig({displayName:"MarketingHeader__Brand",componentId:"sc-9bdcb0ed-2"})`
  display: inline-flex;
  width: fit-content;
`,h=c.default.img.withConfig({displayName:"MarketingHeader__BrandLogo",componentId:"sc-9bdcb0ed-3"})`
  display: block;
  width: 116px;
  height: auto;

  @media (max-width: 760px) {
    width: 102px;
  }
`,i=c.default.nav.withConfig({displayName:"MarketingHeader__Nav",componentId:"sc-9bdcb0ed-4"})`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  color: ${({theme:a})=>a.colors.textMuted};
  font-size: ${({theme:a})=>a.typography.size.sm};

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
`,j=(0,c.default)(d.default).withConfig({displayName:"MarketingHeader__NavLink",componentId:"sc-9bdcb0ed-5"})`
  color: inherit;
  flex: 0 0 auto;

  @media (max-width: 760px) {
    font-size: 0.9rem;
  }
`,k=c.default.span.withConfig({displayName:"MarketingHeader__Accent",componentId:"sc-9bdcb0ed-6"})`
  color: ${({theme:a})=>a.colors.accent};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: ${({theme:a})=>a.typography.size.xs};
  flex: 0 0 auto;

  @media (max-width: 900px) {
    display: none;
  }
`;function l(){return(0,b.jsx)(e,{children:(0,b.jsxs)(f,{children:[(0,b.jsx)(g,{href:"/","aria-label":"EL OJO NEGRO - inicio",children:(0,b.jsx)(h,{src:"/DARK.png",alt:"EL OJO NEGRO"})}),(0,b.jsxs)(i,{"aria-label":"Navegacion publica",children:[(0,b.jsx)(j,{href:"/architecture",children:"Arquitectura"}),(0,b.jsx)(j,{href:"/system-design",children:"Sistema"}),(0,b.jsx)(j,{href:"/login",children:"Login"}),(0,b.jsx)(k,{children:"Limitless"})]})]})})}let m=c.default.footer.withConfig({displayName:"Footer__Wrapper",componentId:"sc-3a28c693-0"})`
  border-top: ${({theme:a})=>a.borders.subtle};
  margin-top: ${({theme:a})=>a.spacing[16]};
`,n=c.default.div.withConfig({displayName:"Footer__Inner",componentId:"sc-3a28c693-1"})`
  max-width: 1240px;
  margin: 0 auto;
  padding: 2rem 1.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  color: ${({theme:a})=>a.colors.textMuted};
  font-size: ${({theme:a})=>a.typography.size.sm};
`,o=c.default.p.withConfig({displayName:"Footer__Motto",componentId:"sc-3a28c693-2"})`
  margin: 0;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({theme:a})=>a.colors.accent};
`;function p(){return(0,b.jsx)(m,{children:(0,b.jsxs)(n,{children:[(0,b.jsx)("p",{children:"EL OJO NEGRO - Arquitecto de Percepcion"}),(0,b.jsx)(o,{children:"Limitless"})]})})}let q=c.default.main.withConfig({displayName:"layout__Main",componentId:"sc-263b77bf-0"})`
  min-height: calc(100vh - 66px);
`;function r({children:a}){return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(l,{}),(0,b.jsx)(q,{children:a}),(0,b.jsx)(p,{})]})}a.s(["default",()=>r],30697)}];

//# sourceMappingURL=_b42addb6._.js.map