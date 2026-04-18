(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,39964,e=>{"use strict";var a=e.i(97053);let r=a.default.article.withConfig({displayName:"Card",componentId:"sc-d613c67c-0"})`
  border: ${({theme:e})=>e.borders.subtle};
  border-radius: ${({theme:e})=>e.radius.lg};
  padding: ${({theme:e})=>e.spacing[6]};
  background: ${({theme:e})=>e.colors.panel};
  box-shadow: ${({theme:e})=>e.shadows.sm};
  backdrop-filter: blur(8px);
`;e.s(["Card",0,r])},58575,e=>{"use strict";var a=e.i(43476),r=e.i(97053),i=e.i(39964);let s=r.default.div.withConfig({displayName:"page__Container",componentId:"sc-4a4af706-0"})`
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 1.25rem;
  display: grid;
  gap: 1rem;
`,d=(0,r.default)(i.Card).withConfig({displayName:"page__Hero",componentId:"sc-4a4af706-1"})`
  display: grid;
  gap: 0.75rem;
`,o=r.default.h1.withConfig({displayName:"page__Title",componentId:"sc-4a4af706-2"})`
  margin: 0;
  font-family: ${({theme:e})=>e.typography.fontSerif};
  font-size: clamp(2.2rem, 5vw, 3.4rem);
`,t=r.default.p.withConfig({displayName:"page__Muted",componentId:"sc-4a4af706-3"})`
  margin: 0;
  color: ${({theme:e})=>e.colors.textMuted};
`,n=r.default.div.withConfig({displayName:"page__Grid",componentId:"sc-4a4af706-4"})`
  display: grid;
  gap: 1rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;function c(){return(0,a.jsxs)(s,{children:[(0,a.jsxs)(d,{children:[(0,a.jsx)("p",{style:{margin:0,letterSpacing:"0.2em",textTransform:"uppercase",color:"#cdb47c",fontSize:"0.76rem"},children:"Arquitectura viva"}),(0,a.jsx)(o,{children:"Base modular para escalar con claridad"}),(0,a.jsx)(t,{children:"El proyecto separa primitives, componentes compuestos, modulos de dominio, infraestructura y estado local para crecer sin mezclar capas."})]}),(0,a.jsxs)(n,{children:[(0,a.jsxs)(i.Card,{children:[(0,a.jsx)("h3",{children:"Capas y responsabilidades"}),(0,a.jsx)(t,{children:"`components/ui` para primitives sin dominio; `components` para composicion reusable; `modules` para negocio; `stores` para sesion/UI; `services` y `lib` para infraestructura."})]}),(0,a.jsxs)(i.Card,{children:[(0,a.jsx)("h3",{children:"Estado y datos"}),(0,a.jsx)(t,{children:"React Query controla fetch, cache e invalidacion de server state. Zustand solo guarda estado local persistible de shell y autenticacion."})]}),(0,a.jsxs)(i.Card,{children:[(0,a.jsx)("h3",{children:"Rutas publicas y protegidas"}),(0,a.jsx)(t,{children:"`(public)` concentra narrativa abierta (`/`, `/login`, `/architecture`, `/system-design`). `(protected)` concentra shell privado (`/dashboard`)."})]}),(0,a.jsxs)(i.Card,{children:[(0,a.jsx)("h3",{children:"Como crecer sin deuda"}),(0,a.jsx)(t,{children:"Crear nuevos modulos por dominio, extraer primitives si se repiten en 3+ lugares y documentar decisiones estructurales en `ai/*`."})]})]})]})}e.s(["default",()=>c])}]);