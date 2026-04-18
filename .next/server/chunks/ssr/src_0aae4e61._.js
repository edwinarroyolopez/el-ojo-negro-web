module.exports=[62067,a=>{"use strict";var b=a.i(75716);let c=b.default.article.withConfig({displayName:"Card",componentId:"sc-d613c67c-0"})`
  border: ${({theme:a})=>a.borders.subtle};
  border-radius: ${({theme:a})=>a.radius.lg};
  padding: ${({theme:a})=>a.spacing[6]};
  background: ${({theme:a})=>a.colors.panel};
  box-shadow: ${({theme:a})=>a.shadows.sm};
  backdrop-filter: blur(8px);
`;a.s(["Card",0,c])},96438,a=>{"use strict";var b=a.i(87924),c=a.i(75716);let d={primary:c.css`
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
`;function f({variant:a="primary",...c}){return(0,b.jsx)(e,{$variant:a,...c})}a.s(["Button",()=>f])},33814,a=>{"use strict";var b=a.i(87924),c=a.i(75716);let d=[{title:"La mirada es el activo",body:"El centro no es producir por producir. Es ver con precision, detectar esencia y revelar valor antes de que sea obvio."},{title:"Transformar percepcion",body:"Elevar como una persona, oficio o negocio es entendido, sentido y valorado sin traicionar su naturaleza."},{title:"Lujo silencioso",body:"Menos ruido. Mas criterio. Mas aire. Una presencia sobria y firme, con autoridad tranquila."},{title:"Limitless",body:"No es un nicho estrecho. Es una capacidad: ver potencial donde otros ven rutina y convertirlo en direccion."}],e=["Observar con profundidad","Detectar la esencia","Quitar ruido","Ordenar percepcion","Elevar valor","Transformar presencia"],f=["Artesanos y oficios con excelencia oculta","Negocios tradicionales con percepcion debil","Marcas personales con valor sin forma","Productos y experiencias que merecen una posicion superior"];var g=a.i(62067),h=a.i(96438);let i=c.default.section.withConfig({displayName:"LandingHero__Hero",componentId:"sc-39523b46-0"})`
  border-bottom: ${({theme:a})=>a.borders.subtle};
`,j=c.default.div.withConfig({displayName:"LandingHero__Grid",componentId:"sc-39523b46-1"})`
  max-width: 1240px;
  margin: 0 auto;
  padding: 6.5rem 1.25rem;
  display: grid;
  gap: 3rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
  }
`,k=c.default.p.withConfig({displayName:"LandingHero__Badge",componentId:"sc-39523b46-2"})`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin: 0;
  padding: 0.35rem 0.8rem;
  border-radius: ${({theme:a})=>a.radius.pill};
  border: ${({theme:a})=>a.borders.subtle};
  color: ${({theme:a})=>a.colors.accent};
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-size: ${({theme:a})=>a.typography.size.xs};
`,l=c.default.span.withConfig({displayName:"LandingHero__Dot",componentId:"sc-39523b46-3"})`
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: ${({theme:a})=>a.colors.accent};
`,m=c.default.h1.withConfig({displayName:"LandingHero__Heading",componentId:"sc-39523b46-4"})`
  margin: 1rem 0 0;
  font-family: ${({theme:a})=>a.typography.fontSerif};
  font-size: clamp(2.8rem, 7vw, 5.2rem);
  line-height: 0.96;
  letter-spacing: 0.02em;
`,n=c.default.span.withConfig({displayName:"LandingHero__Accent",componentId:"sc-39523b46-5"})`
  color: ${({theme:a})=>a.colors.accent};
`,o=c.default.p.withConfig({displayName:"LandingHero__Lead",componentId:"sc-39523b46-6"})`
  margin: 1.4rem 0 0;
  max-width: 58ch;
  color: ${({theme:a})=>a.colors.textMuted};
  font-size: ${({theme:a})=>a.typography.size.lg};
`,p=c.default.div.withConfig({displayName:"LandingHero__Actions",componentId:"sc-39523b46-7"})`
  margin-top: 1.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`,q=c.default.div.withConfig({displayName:"LandingHero__SigilCard",componentId:"sc-39523b46-8"})`
  border: ${({theme:a})=>a.borders.subtle};
  border-radius: ${({theme:a})=>a.radius.xl};
  padding: 2rem;
  background: ${({theme:a})=>a.colors.panel};
  box-shadow: ${({theme:a})=>a.shadows.md};
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
`,r=c.default.p.withConfig({displayName:"LandingHero__SigilTitle",componentId:"sc-39523b46-9"})`
  margin: 1.2rem 0 0;
  font-family: ${({theme:a})=>a.typography.fontSerif};
  letter-spacing: 0.2em;
  font-size: clamp(1.5rem, 4vw, 2.3rem);
`,s=c.default.p.withConfig({displayName:"LandingHero__SigilSub",componentId:"sc-39523b46-10"})`
  margin: 0.65rem 0 0;
  color: ${({theme:a})=>a.colors.textMuted};
  text-transform: uppercase;
  font-size: ${({theme:a})=>a.typography.size.xs};
  letter-spacing: 0.3em;
`,t=c.default.p.withConfig({displayName:"LandingHero__SigilLimitless",componentId:"sc-39523b46-11"})`
  margin: 1.8rem 0 0;
  color: ${({theme:a})=>a.colors.accent};
  letter-spacing: 0.5em;
  text-transform: uppercase;
  font-size: ${({theme:a})=>a.typography.size.xs};
`;function u(){let a=a=>{let b=document.getElementById(a);b&&b.scrollIntoView({behavior:"smooth",block:"start"})};return(0,b.jsx)(i,{children:(0,b.jsxs)(j,{children:[(0,b.jsxs)("div",{children:[(0,b.jsxs)(k,{children:["EL OJO NEGRO ",(0,b.jsx)(l,{})," Arquitecto de Percepcion"]}),(0,b.jsxs)(m,{children:["No invento valor.",(0,b.jsx)("br",{}),(0,b.jsx)(n,{children:"Lo revelo."})]}),(0,b.jsx)(o,{children:"Una firma construida desde la mirada. Detecta excelencia, ordena percepcion y eleva como una persona, oficio o negocio es visto por el mundo."}),(0,b.jsxs)(p,{children:[(0,b.jsx)(h.Button,{type:"button",onClick:()=>a("manifiesto"),children:"Ver manifiesto"}),(0,b.jsx)(h.Button,{variant:"secondary",type:"button",onClick:()=>a("metodo"),children:"Explorar metodo"})]})]}),(0,b.jsxs)(q,{children:[(0,b.jsxs)("svg",{viewBox:"0 0 220 120","aria-hidden":!0,width:"100%",style:{maxWidth:340},children:[(0,b.jsx)("path",{d:"M20 60 Q60 18 110 18 Q160 18 200 60 Q160 102 110 102 Q60 102 20 60Z",fill:"none",stroke:"#f2ede4",strokeWidth:"4"}),(0,b.jsx)("line",{x1:"110",y1:"10",x2:"110",y2:"110",stroke:"#cdb47c",strokeWidth:"4"}),(0,b.jsx)("circle",{cx:"110",cy:"60",r:"26",fill:"none",stroke:"#cdb47c",strokeWidth:"4"})]}),(0,b.jsx)(r,{children:"EL OJO NEGRO"}),(0,b.jsx)(s,{children:"Arquitecto de Percepcion"}),(0,b.jsx)(t,{children:"Limitless"})]})]})})}let v=c.default.section.withConfig({displayName:"ElOjoNegroLanding__Section",componentId:"sc-5ade4eac-0"})`
  border-bottom: ${({theme:a})=>a.borders.subtle};
`,w=c.default.div.withConfig({displayName:"ElOjoNegroLanding__Container",componentId:"sc-5ade4eac-1"})`
  max-width: 1240px;
  margin: 0 auto;
  padding: 5rem 1.25rem;
`,x=c.default.p.withConfig({displayName:"ElOjoNegroLanding__Eyebrow",componentId:"sc-5ade4eac-2"})`
  margin: 0;
  color: ${({theme:a})=>a.colors.accent};
  text-transform: uppercase;
  letter-spacing: 0.32em;
  font-size: ${({theme:a})=>a.typography.size.xs};
`,y=c.default.h2.withConfig({displayName:"ElOjoNegroLanding__Heading",componentId:"sc-5ade4eac-3"})`
  margin: 0.75rem 0 0;
  font-family: ${({theme:a})=>a.typography.fontSerif};
  font-size: clamp(2rem, 5vw, 3.5rem);
`,z=c.default.p.withConfig({displayName:"ElOjoNegroLanding__Muted",componentId:"sc-5ade4eac-4"})`
  margin: 0;
  color: ${({theme:a})=>a.colors.textMuted};
  line-height: 1.8;
`,A=c.default.div.withConfig({displayName:"ElOjoNegroLanding__GridTwo",componentId:"sc-5ade4eac-5"})`
  display: grid;
  gap: 1.25rem;

  @media (min-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`,B=c.default.div.withConfig({displayName:"ElOjoNegroLanding__Principles",componentId:"sc-5ade4eac-6"})`
  display: grid;
  gap: 0.75rem;
`,C=(0,c.default)(g.Card).withConfig({displayName:"ElOjoNegroLanding__Principle",componentId:"sc-5ade4eac-7"})`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
`,D=c.default.span.withConfig({displayName:"ElOjoNegroLanding__Step",componentId:"sc-5ade4eac-8"})`
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${({theme:a})=>a.colors.accent};
  border: ${({theme:a})=>a.borders.emphasized};
  background: ${({theme:a})=>a.colors.accentMuted};
`,E=c.default.blockquote.withConfig({displayName:"ElOjoNegroLanding__Quote",componentId:"sc-5ade4eac-9"})`
  margin: 0;
  font-family: ${({theme:a})=>a.typography.fontSerif};
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1.15;
`,F=c.default.p.withConfig({displayName:"ElOjoNegroLanding__Manifesto",componentId:"sc-5ade4eac-10"})`
  margin: 0;
  font-size: ${({theme:a})=>a.typography.size.lg};
  color: ${({theme:a})=>a.colors.textMuted};
  max-width: 64ch;
`;function G(){return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(u,{}),(0,b.jsx)(v,{id:"manifiesto",children:(0,b.jsx)(w,{children:(0,b.jsxs)(A,{children:[(0,b.jsxs)("div",{children:[(0,b.jsx)(x,{children:"Analisis"}),(0,b.jsx)(y,{children:"Una firma construida desde la mirada"})]}),(0,b.jsxs)("div",{style:{display:"grid",gap:"1rem"},children:[(0,b.jsx)(z,{children:"EL OJO NEGRO une simbolo, oficio y expansion: el ojo como lectura profunda, Arquitecto de Percepcion como metodo y LIMITLESS como alcance."}),(0,b.jsx)(z,{children:"No compite por volumen de ejecucion. Compite por criterio. Su valor aparece cuando algo sustancial deja de parecer ordinario y empieza a ocupar su lugar real."})]})]})})}),(0,b.jsx)(v,{children:(0,b.jsx)(w,{children:(0,b.jsxs)("div",{style:{display:"grid",gap:"1.4rem"},children:[(0,b.jsxs)("div",{children:[(0,b.jsx)(x,{children:"Pilares"}),(0,b.jsx)(y,{children:"Transformar percepcion. Elevar valor."})]}),(0,b.jsx)(A,{children:d.map(a=>(0,b.jsxs)(g.Card,{children:[(0,b.jsx)("div",{style:{width:64,height:1,background:"#cdb47c",marginBottom:"1rem"}}),(0,b.jsx)("h3",{style:{margin:0,fontFamily:"var(--font-serif)",fontSize:"1.7rem"},children:a.title}),(0,b.jsx)(z,{style:{marginTop:"0.75rem"},children:a.body})]},a.title))})]})})}),(0,b.jsx)(v,{id:"metodo",children:(0,b.jsx)(w,{children:(0,b.jsxs)(A,{children:[(0,b.jsxs)("div",{children:[(0,b.jsx)(x,{children:"Metodo"}),(0,b.jsx)(y,{children:"Quod tango muto"}),(0,b.jsx)(F,{children:"La transformacion no nace del ruido. Nace de observar, destilar y elevar. Este metodo convierte intuicion en direccion visible."})]}),(0,b.jsx)(B,{children:e.map((a,c)=>(0,b.jsxs)(C,{children:[(0,b.jsx)(D,{children:`0${c+1}`}),(0,b.jsx)("span",{children:a})]},a))})]})})}),(0,b.jsx)(v,{children:(0,b.jsx)(w,{children:(0,b.jsxs)(A,{children:[(0,b.jsxs)(g.Card,{children:[(0,b.jsx)(x,{children:"Territorio"}),(0,b.jsx)(y,{style:{fontSize:"clamp(1.8rem, 4vw, 2.8rem)"},children:"Donde vive esta vision"}),(0,b.jsx)("div",{style:{display:"grid",gap:"0.8rem",marginTop:"1rem"},children:f.map(a=>(0,b.jsxs)("div",{style:{display:"flex",alignItems:"flex-start",gap:"0.65rem",padding:"0.8rem",borderRadius:"14px",border:"1px solid rgba(242, 237, 228, 0.12)"},children:[(0,b.jsx)("span",{"aria-hidden":!0,style:{width:8,height:8,borderRadius:"999px",marginTop:8,background:"#cdb47c"}}),(0,b.jsx)(z,{children:a})]},a))})]}),(0,b.jsxs)(g.Card,{style:{background:"rgba(205, 180, 124, 0.08)"},children:[(0,b.jsx)(x,{children:"Declaracion"}),(0,b.jsxs)(E,{children:["Mi activo no son las manos.",(0,b.jsx)("br",{}),"Son los ojos."]}),(0,b.jsx)(z,{style:{marginTop:"1rem"},children:"No fabrico talento. Lo detecto, lo ordeno y lo elevo. Donde otros ven rutina, veo potencial. Donde otros ven oficio, veo identidad."})]})]})})}),(0,b.jsx)(v,{style:{borderBottom:"none"},children:(0,b.jsxs)(w,{style:{textAlign:"center"},children:[(0,b.jsx)(x,{children:"Cierre"}),(0,b.jsx)(y,{children:"Arquitecto de Percepcion"}),(0,b.jsx)(F,{style:{marginInline:"auto",marginTop:"1rem"},children:"Una firma para revelar valor, elevar presencia y transformar como el mundo percibe lo que ya tiene sustancia. Sin gritar. Sin exagerar. Sin traicionar la esencia."}),(0,b.jsx)(x,{style:{marginTop:"2rem"},children:"EL OJO NEGRO - LIMITLESS"})]})})]})}a.s(["ElOjoNegroLanding",()=>G],33814)}];

//# sourceMappingURL=src_0aae4e61._.js.map