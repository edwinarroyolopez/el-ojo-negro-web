module.exports=[62067,a=>{"use strict";var b=a.i(75716);let c=b.default.article.withConfig({displayName:"Card",componentId:"sc-d613c67c-0"})`
  border: ${({theme:a})=>a.borders.subtle};
  border-radius: ${({theme:a})=>a.radius.lg};
  padding: ${({theme:a})=>a.spacing[6]};
  background: ${({theme:a})=>a.colors.panel};
  box-shadow: ${({theme:a})=>a.shadows.sm};
  backdrop-filter: blur(8px);
`;a.s(["Card",0,c])},88104,a=>{"use strict";var b=a.i(87924),c=a.i(75716),d=a.i(62067);let e=c.default.div.withConfig({displayName:"page__Container",componentId:"sc-4a4af706-0"})`
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 1.25rem;
  display: grid;
  gap: 1rem;
`,f=(0,c.default)(d.Card).withConfig({displayName:"page__Hero",componentId:"sc-4a4af706-1"})`
  display: grid;
  gap: 0.75rem;
`,g=c.default.h1.withConfig({displayName:"page__Title",componentId:"sc-4a4af706-2"})`
  margin: 0;
  font-family: ${({theme:a})=>a.typography.fontSerif};
  font-size: clamp(2.2rem, 5vw, 3.4rem);
`,h=c.default.p.withConfig({displayName:"page__Muted",componentId:"sc-4a4af706-3"})`
  margin: 0;
  color: ${({theme:a})=>a.colors.textMuted};
`,i=c.default.div.withConfig({displayName:"page__Grid",componentId:"sc-4a4af706-4"})`
  display: grid;
  gap: 1rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;function j(){return(0,b.jsxs)(e,{children:[(0,b.jsxs)(f,{children:[(0,b.jsx)("p",{style:{margin:0,letterSpacing:"0.2em",textTransform:"uppercase",color:"#cdb47c",fontSize:"0.76rem"},children:"Arquitectura viva"}),(0,b.jsx)(g,{children:"Base modular para escalar con claridad"}),(0,b.jsx)(h,{children:"El proyecto separa primitives, componentes compuestos, modulos de dominio, infraestructura y estado local para crecer sin mezclar capas."})]}),(0,b.jsxs)(i,{children:[(0,b.jsxs)(d.Card,{children:[(0,b.jsx)("h3",{children:"Capas y responsabilidades"}),(0,b.jsx)(h,{children:"`components/ui` para primitives sin dominio; `components` para composicion reusable; `modules` para negocio; `stores` para sesion/UI; `services` y `lib` para infraestructura."})]}),(0,b.jsxs)(d.Card,{children:[(0,b.jsx)("h3",{children:"Estado y datos"}),(0,b.jsx)(h,{children:"React Query controla fetch, cache e invalidacion de server state. Zustand solo guarda estado local persistible de shell y autenticacion."})]}),(0,b.jsxs)(d.Card,{children:[(0,b.jsx)("h3",{children:"Rutas publicas y protegidas"}),(0,b.jsx)(h,{children:"`(public)` concentra narrativa abierta (`/`, `/login`, `/architecture`, `/system-design`). `(protected)` concentra shell privado (`/dashboard`)."})]}),(0,b.jsxs)(d.Card,{children:[(0,b.jsx)("h3",{children:"Como crecer sin deuda"}),(0,b.jsx)(h,{children:"Crear nuevos modulos por dominio, extraer primitives si se repiten en 3+ lugares y documentar decisiones estructurales en `ai/*`."})]})]})]})}a.s(["default",()=>j])}];

//# sourceMappingURL=src_3e90a365._.js.map