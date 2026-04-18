(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,39964,e=>{"use strict";var r=e.i(97053);let a=r.default.article.withConfig({displayName:"Card",componentId:"sc-d613c67c-0"})`
  border: ${({theme:e})=>e.borders.subtle};
  border-radius: ${({theme:e})=>e.radius.lg};
  padding: ${({theme:e})=>e.spacing[6]};
  background: ${({theme:e})=>e.colors.panel};
  box-shadow: ${({theme:e})=>e.shadows.sm};
  backdrop-filter: blur(8px);
`;e.s(["Card",0,a])},11939,e=>{"use strict";var r=e.i(43476),a=e.i(97053),i=e.i(39964);let o=a.default.section.withConfig({displayName:"DashboardOverview__Grid",componentId:"sc-946b373b-0"})`
  display: grid;
  gap: 1rem;

  @media (min-width: 960px) {
    grid-template-columns: 2fr 1fr;
  }
`,d=a.default.h1.withConfig({displayName:"DashboardOverview__Title",componentId:"sc-946b373b-1"})`
  margin: 0;
  font-family: ${({theme:e})=>e.typography.fontSerif};
  font-size: clamp(2rem, 4vw, 3rem);
`,s=a.default.p.withConfig({displayName:"DashboardOverview__Lead",componentId:"sc-946b373b-2"})`
  margin: 0.8rem 0 0;
  color: ${({theme:e})=>e.colors.textMuted};
  max-width: 64ch;
`,t=a.default.p.withConfig({displayName:"DashboardOverview__Stat",componentId:"sc-946b373b-3"})`
  margin: 0;
  font-size: 2.4rem;
  font-family: ${({theme:e})=>e.typography.fontSerif};
  color: ${({theme:e})=>e.colors.accent};
`;function c(){return(0,r.jsxs)(o,{children:[(0,r.jsxs)(i.Card,{children:[(0,r.jsx)(d,{children:"Centro de Percepcion"}),(0,r.jsx)(s,{children:"Shell protegido listo para crecer por modulos. Aqui viven los flujos privados y las operaciones de alto criterio."})]}),(0,r.jsxs)(i.Card,{children:[(0,r.jsx)("p",{style:{margin:0,color:"#b5aea1"},children:"Estado de base"}),(0,r.jsx)(t,{children:"Ready"}),(0,r.jsx)("p",{style:{margin:"0.4rem 0 0",color:"#8f887d"},children:"Arquitectura sembrada con separacion publica/protegida."})]})]})}e.s(["DashboardOverview",()=>c])}]);