(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,39964,e=>{"use strict";var o=e.i(97053);let r=o.default.article.withConfig({displayName:"Card",componentId:"sc-d613c67c-0"})`
  border: ${({theme:e})=>e.borders.subtle};
  border-radius: ${({theme:e})=>e.radius.lg};
  padding: ${({theme:e})=>e.spacing[6]};
  background: ${({theme:e})=>e.colors.panel};
  box-shadow: ${({theme:e})=>e.shadows.sm};
  backdrop-filter: blur(8px);
`;e.s(["Card",0,r])},59544,e=>{"use strict";var o=e.i(43476),r=e.i(97053);let i={primary:r.css`
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
  `},n=r.default.button.withConfig({displayName:"Button__StyledButton",componentId:"sc-8dcb086a-0"})`
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

  ${({$variant:e})=>i[e]}
`;function a({variant:e="primary",...r}){return(0,o.jsx)(n,{$variant:e,...r})}e.s(["Button",()=>a])},38896,e=>{"use strict";var o=e.i(43476),r=e.i(97053);let i=[{title:"La mirada es el activo",body:"El centro no es producir por producir. Es ver con precision, detectar esencia y revelar valor antes de que sea obvio."},{title:"Transformar percepcion",body:"Elevar como una persona, oficio o negocio es entendido, sentido y valorado sin traicionar su naturaleza."},{title:"Lujo silencioso",body:"Menos ruido. Mas criterio. Mas aire. Una presencia sobria y firme, con autoridad tranquila."},{title:"Limitless",body:"No es un nicho estrecho. Es una capacidad: ver potencial donde otros ven rutina y convertirlo en direccion."}],n=["Observar con profundidad","Detectar la esencia","Quitar ruido","Ordenar percepcion","Elevar valor","Transformar presencia"],a=["Artesanos y oficios con excelencia oculta","Negocios tradicionales con percepcion debil","Marcas personales con valor sin forma","Productos y experiencias que merecen una posicion superior"];var t=e.i(39964),s=e.i(59544);let d=r.default.section.withConfig({displayName:"LandingHero__Hero",componentId:"sc-39523b46-0"})`
  border-bottom: ${({theme:e})=>e.borders.subtle};
`,c=r.default.div.withConfig({displayName:"LandingHero__Grid",componentId:"sc-39523b46-1"})`
  max-width: 1240px;
  margin: 0 auto;
  padding: 6.5rem 1.25rem;
  display: grid;
  gap: 3rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
  }
`,l=r.default.p.withConfig({displayName:"LandingHero__Badge",componentId:"sc-39523b46-2"})`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin: 0;
  padding: 0.35rem 0.8rem;
  border-radius: ${({theme:e})=>e.radius.pill};
  border: ${({theme:e})=>e.borders.subtle};
  color: ${({theme:e})=>e.colors.accent};
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-size: ${({theme:e})=>e.typography.size.xs};
`,p=r.default.span.withConfig({displayName:"LandingHero__Dot",componentId:"sc-39523b46-3"})`
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: ${({theme:e})=>e.colors.accent};
`,m=r.default.h1.withConfig({displayName:"LandingHero__Heading",componentId:"sc-39523b46-4"})`
  margin: 1rem 0 0;
  font-family: ${({theme:e})=>e.typography.fontSerif};
  font-size: clamp(2.8rem, 7vw, 5.2rem);
  line-height: 0.96;
  letter-spacing: 0.02em;
`,g=r.default.span.withConfig({displayName:"LandingHero__Accent",componentId:"sc-39523b46-5"})`
  color: ${({theme:e})=>e.colors.accent};
`,h=r.default.p.withConfig({displayName:"LandingHero__Lead",componentId:"sc-39523b46-6"})`
  margin: 1.4rem 0 0;
  max-width: 58ch;
  color: ${({theme:e})=>e.colors.textMuted};
  font-size: ${({theme:e})=>e.typography.size.lg};
`,u=r.default.div.withConfig({displayName:"LandingHero__Actions",componentId:"sc-39523b46-7"})`
  margin-top: 1.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`,f=r.default.div.withConfig({displayName:"LandingHero__SigilCard",componentId:"sc-39523b46-8"})`
  border: ${({theme:e})=>e.borders.subtle};
  border-radius: ${({theme:e})=>e.radius.xl};
  padding: 2rem;
  background: ${({theme:e})=>e.colors.panel};
  box-shadow: ${({theme:e})=>e.shadows.md};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: -20% -20% auto auto;
    width: 280px;
    height: 280px;
    background: radial-gradient(circle, rgba(205, 180, 124, 0.16), transparent 62%);
    pointer-events: none;
  }
`,x=r.default.p.withConfig({displayName:"LandingHero__SigilTitle",componentId:"sc-39523b46-9"})`
  margin: 1.2rem 0 0;
  font-family: ${({theme:e})=>e.typography.fontSerif};
  letter-spacing: 0.2em;
  font-size: clamp(1.5rem, 4vw, 2.3rem);
`,y=r.default.p.withConfig({displayName:"LandingHero__SigilSub",componentId:"sc-39523b46-10"})`
  margin: 0.65rem 0 0;
  color: ${({theme:e})=>e.colors.textMuted};
  text-transform: uppercase;
  font-size: ${({theme:e})=>e.typography.size.xs};
  letter-spacing: 0.3em;
`,b=r.default.p.withConfig({displayName:"LandingHero__SigilLimitless",componentId:"sc-39523b46-11"})`
  margin: 1.8rem 0 0;
  color: ${({theme:e})=>e.colors.accent};
  letter-spacing: 0.5em;
  text-transform: uppercase;
  font-size: ${({theme:e})=>e.typography.size.xs};
`;function j(){let e=e=>{let o=document.getElementById(e);o&&o.scrollIntoView({behavior:"smooth",block:"start"})};return(0,o.jsx)(d,{children:(0,o.jsxs)(c,{children:[(0,o.jsxs)("div",{children:[(0,o.jsxs)(l,{children:["EL OJO NEGRO ",(0,o.jsx)(p,{})," Arquitecto de Percepcion"]}),(0,o.jsxs)(m,{children:["No invento valor.",(0,o.jsx)("br",{}),(0,o.jsx)(g,{children:"Lo revelo."})]}),(0,o.jsx)(h,{children:"Una firma construida desde la mirada. Detecta excelencia, ordena percepcion y eleva como una persona, oficio o negocio es visto por el mundo."}),(0,o.jsxs)(u,{children:[(0,o.jsx)(s.Button,{type:"button",onClick:()=>e("manifiesto"),children:"Ver manifiesto"}),(0,o.jsx)(s.Button,{variant:"secondary",type:"button",onClick:()=>e("metodo"),children:"Explorar metodo"})]})]}),(0,o.jsxs)(f,{children:[(0,o.jsxs)("svg",{viewBox:"0 0 220 120","aria-hidden":!0,width:"100%",style:{maxWidth:340},children:[(0,o.jsx)("path",{d:"M20 60 Q60 18 110 18 Q160 18 200 60 Q160 102 110 102 Q60 102 20 60Z",fill:"none",stroke:"#f2ede4",strokeWidth:"4"}),(0,o.jsx)("line",{x1:"110",y1:"10",x2:"110",y2:"110",stroke:"#cdb47c",strokeWidth:"4"}),(0,o.jsx)("circle",{cx:"110",cy:"60",r:"26",fill:"none",stroke:"#cdb47c",strokeWidth:"4"})]}),(0,o.jsx)(x,{children:"EL OJO NEGRO"}),(0,o.jsx)(y,{children:"Arquitecto de Percepcion"}),(0,o.jsx)(b,{children:"Limitless"})]})]})})}let v=r.default.section.withConfig({displayName:"ElOjoNegroLanding__Section",componentId:"sc-5ade4eac-0"})`
  border-bottom: ${({theme:e})=>e.borders.subtle};
`,w=r.default.div.withConfig({displayName:"ElOjoNegroLanding__Container",componentId:"sc-5ade4eac-1"})`
  max-width: 1240px;
  margin: 0 auto;
  padding: 5rem 1.25rem;
`,$=r.default.p.withConfig({displayName:"ElOjoNegroLanding__Eyebrow",componentId:"sc-5ade4eac-2"})`
  margin: 0;
  color: ${({theme:e})=>e.colors.accent};
  text-transform: uppercase;
  letter-spacing: 0.32em;
  font-size: ${({theme:e})=>e.typography.size.xs};
`,_=r.default.h2.withConfig({displayName:"ElOjoNegroLanding__Heading",componentId:"sc-5ade4eac-3"})`
  margin: 0.75rem 0 0;
  font-family: ${({theme:e})=>e.typography.fontSerif};
  font-size: clamp(2rem, 5vw, 3.5rem);
`,N=r.default.p.withConfig({displayName:"ElOjoNegroLanding__Muted",componentId:"sc-5ade4eac-4"})`
  margin: 0;
  color: ${({theme:e})=>e.colors.textMuted};
  line-height: 1.8;
`,L=r.default.div.withConfig({displayName:"ElOjoNegroLanding__GridTwo",componentId:"sc-5ade4eac-5"})`
  display: grid;
  gap: 1.25rem;

  @media (min-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`,C=r.default.div.withConfig({displayName:"ElOjoNegroLanding__Principles",componentId:"sc-5ade4eac-6"})`
  display: grid;
  gap: 0.75rem;
`,I=(0,r.default)(t.Card).withConfig({displayName:"ElOjoNegroLanding__Principle",componentId:"sc-5ade4eac-7"})`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
`,E=r.default.span.withConfig({displayName:"ElOjoNegroLanding__Step",componentId:"sc-5ade4eac-8"})`
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${({theme:e})=>e.colors.accent};
  border: ${({theme:e})=>e.borders.emphasized};
  background: ${({theme:e})=>e.colors.accentMuted};
`,O=r.default.blockquote.withConfig({displayName:"ElOjoNegroLanding__Quote",componentId:"sc-5ade4eac-9"})`
  margin: 0;
  font-family: ${({theme:e})=>e.typography.fontSerif};
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1.15;
`,S=r.default.p.withConfig({displayName:"ElOjoNegroLanding__Manifesto",componentId:"sc-5ade4eac-10"})`
  margin: 0;
  font-size: ${({theme:e})=>e.typography.size.lg};
  color: ${({theme:e})=>e.colors.textMuted};
  max-width: 64ch;
`;function k(){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(j,{}),(0,o.jsx)(v,{id:"manifiesto",children:(0,o.jsx)(w,{children:(0,o.jsxs)(L,{children:[(0,o.jsxs)("div",{children:[(0,o.jsx)($,{children:"Analisis"}),(0,o.jsx)(_,{children:"Una firma construida desde la mirada"})]}),(0,o.jsxs)("div",{style:{display:"grid",gap:"1rem"},children:[(0,o.jsx)(N,{children:"EL OJO NEGRO une simbolo, oficio y expansion: el ojo como lectura profunda, Arquitecto de Percepcion como metodo y LIMITLESS como alcance."}),(0,o.jsx)(N,{children:"No compite por volumen de ejecucion. Compite por criterio. Su valor aparece cuando algo sustancial deja de parecer ordinario y empieza a ocupar su lugar real."})]})]})})}),(0,o.jsx)(v,{children:(0,o.jsx)(w,{children:(0,o.jsxs)("div",{style:{display:"grid",gap:"1.4rem"},children:[(0,o.jsxs)("div",{children:[(0,o.jsx)($,{children:"Pilares"}),(0,o.jsx)(_,{children:"Transformar percepcion. Elevar valor."})]}),(0,o.jsx)(L,{children:i.map(e=>(0,o.jsxs)(t.Card,{children:[(0,o.jsx)("div",{style:{width:64,height:1,background:"#cdb47c",marginBottom:"1rem"}}),(0,o.jsx)("h3",{style:{margin:0,fontFamily:"var(--font-serif)",fontSize:"1.7rem"},children:e.title}),(0,o.jsx)(N,{style:{marginTop:"0.75rem"},children:e.body})]},e.title))})]})})}),(0,o.jsx)(v,{id:"metodo",children:(0,o.jsx)(w,{children:(0,o.jsxs)(L,{children:[(0,o.jsxs)("div",{children:[(0,o.jsx)($,{children:"Metodo"}),(0,o.jsx)(_,{children:"Quod tango muto"}),(0,o.jsx)(S,{children:"La transformacion no nace del ruido. Nace de observar, destilar y elevar. Este metodo convierte intuicion en direccion visible."})]}),(0,o.jsx)(C,{children:n.map((e,r)=>(0,o.jsxs)(I,{children:[(0,o.jsx)(E,{children:`0${r+1}`}),(0,o.jsx)("span",{children:e})]},e))})]})})}),(0,o.jsx)(v,{children:(0,o.jsx)(w,{children:(0,o.jsxs)(L,{children:[(0,o.jsxs)(t.Card,{children:[(0,o.jsx)($,{children:"Territorio"}),(0,o.jsx)(_,{style:{fontSize:"clamp(1.8rem, 4vw, 2.8rem)"},children:"Donde vive esta vision"}),(0,o.jsx)("div",{style:{display:"grid",gap:"0.8rem",marginTop:"1rem"},children:a.map(e=>(0,o.jsxs)("div",{style:{display:"flex",alignItems:"flex-start",gap:"0.65rem",padding:"0.8rem",borderRadius:"14px",border:"1px solid rgba(242, 237, 228, 0.12)"},children:[(0,o.jsx)("span",{"aria-hidden":!0,style:{width:8,height:8,borderRadius:"999px",marginTop:8,background:"#cdb47c"}}),(0,o.jsx)(N,{children:e})]},e))})]}),(0,o.jsxs)(t.Card,{style:{background:"rgba(205, 180, 124, 0.08)"},children:[(0,o.jsx)($,{children:"Declaracion"}),(0,o.jsxs)(O,{children:["Mi activo no son las manos.",(0,o.jsx)("br",{}),"Son los ojos."]}),(0,o.jsx)(N,{style:{marginTop:"1rem"},children:"No fabrico talento. Lo detecto, lo ordeno y lo elevo. Donde otros ven rutina, veo potencial. Donde otros ven oficio, veo identidad."})]})]})})}),(0,o.jsx)(v,{style:{borderBottom:"none"},children:(0,o.jsxs)(w,{style:{textAlign:"center"},children:[(0,o.jsx)($,{children:"Cierre"}),(0,o.jsx)(_,{children:"Arquitecto de Percepcion"}),(0,o.jsx)(S,{style:{marginInline:"auto",marginTop:"1rem"},children:"Una firma para revelar valor, elevar presencia y transformar como el mundo percibe lo que ya tiene sustancia. Sin gritar. Sin exagerar. Sin traicionar la esencia."}),(0,o.jsx)($,{style:{marginTop:"2rem"},children:"EL OJO NEGRO - LIMITLESS"})]})})]})}e.s(["ElOjoNegroLanding",()=>k],38896)}]);