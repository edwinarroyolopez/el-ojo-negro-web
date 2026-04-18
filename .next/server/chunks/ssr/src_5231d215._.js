module.exports=[62067,a=>{"use strict";var b=a.i(75716);let c=b.default.article.withConfig({displayName:"Card",componentId:"sc-d613c67c-0"})`
  border: ${({theme:a})=>a.borders.subtle};
  border-radius: ${({theme:a})=>a.radius.lg};
  padding: ${({theme:a})=>a.spacing[6]};
  background: ${({theme:a})=>a.colors.panel};
  box-shadow: ${({theme:a})=>a.shadows.sm};
  backdrop-filter: blur(8px);
`;a.s(["Card",0,c])},41875,a=>{"use strict";var b=a.i(87924),c=a.i(75716),d=a.i(62067);let e=c.default.section.withConfig({displayName:"DashboardOverview__Grid",componentId:"sc-946b373b-0"})`
  display: grid;
  gap: 1rem;

  @media (min-width: 960px) {
    grid-template-columns: 2fr 1fr;
  }
`,f=c.default.h1.withConfig({displayName:"DashboardOverview__Title",componentId:"sc-946b373b-1"})`
  margin: 0;
  font-family: ${({theme:a})=>a.typography.fontSerif};
  font-size: clamp(2rem, 4vw, 3rem);
`,g=c.default.p.withConfig({displayName:"DashboardOverview__Lead",componentId:"sc-946b373b-2"})`
  margin: 0.8rem 0 0;
  color: ${({theme:a})=>a.colors.textMuted};
  max-width: 64ch;
`,h=c.default.p.withConfig({displayName:"DashboardOverview__Stat",componentId:"sc-946b373b-3"})`
  margin: 0;
  font-size: 2.4rem;
  font-family: ${({theme:a})=>a.typography.fontSerif};
  color: ${({theme:a})=>a.colors.accent};
`;function i(){return(0,b.jsxs)(e,{children:[(0,b.jsxs)(d.Card,{children:[(0,b.jsx)(f,{children:"Centro de Percepcion"}),(0,b.jsx)(g,{children:"Shell protegido listo para crecer por modulos. Aqui viven los flujos privados y las operaciones de alto criterio."})]}),(0,b.jsxs)(d.Card,{children:[(0,b.jsx)("p",{style:{margin:0,color:"#b5aea1"},children:"Estado de base"}),(0,b.jsx)(h,{children:"Ready"}),(0,b.jsx)("p",{style:{margin:"0.4rem 0 0",color:"#8f887d"},children:"Arquitectura sembrada con separacion publica/protegida."})]})]})}a.s(["DashboardOverview",()=>i])}];

//# sourceMappingURL=src_5231d215._.js.map