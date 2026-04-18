(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,39964,e=>{"use strict";var o=e.i(97053);let r=o.default.article.withConfig({displayName:"Card",componentId:"sc-d613c67c-0"})`
  border: ${({theme:e})=>e.borders.subtle};
  border-radius: ${({theme:e})=>e.radius.lg};
  padding: ${({theme:e})=>e.spacing[6]};
  background: ${({theme:e})=>e.colors.panel};
  box-shadow: ${({theme:e})=>e.shadows.sm};
  backdrop-filter: blur(8px);
`;e.s(["Card",0,r])},59544,e=>{"use strict";var o=e.i(43476),r=e.i(97053);let t={primary:r.css`
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
  `},i=r.default.button.withConfig({displayName:"Button__StyledButton",componentId:"sc-8dcb086a-0"})`
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

  ${({$variant:e})=>t[e]}
`;function s({variant:e="primary",...r}){return(0,o.jsx)(i,{$variant:e,...r})}e.s(["Button",()=>s])},3812,e=>{"use strict";var o=e.i(43476),r=e.i(97053);let t=r.default.label.withConfig({displayName:"Input__Field",componentId:"sc-2dff469f-0"})`
  display: grid;
  gap: ${({theme:e})=>e.spacing[2]};
  font-size: ${({theme:e})=>e.typography.size.sm};
  color: ${({theme:e})=>e.colors.textMuted};
`,i=r.default.input.withConfig({displayName:"Input__StyledInput",componentId:"sc-2dff469f-1"})`
  width: 100%;
  min-height: 44px;
  border-radius: ${({theme:e})=>e.radius.md};
  border: ${({theme:e})=>e.borders.subtle};
  background: ${({theme:e})=>e.colors.backgroundSoft};
  color: ${({theme:e})=>e.colors.text};
  padding: 0.7rem 0.9rem;
  font-size: ${({theme:e})=>e.typography.size.sm};

  &::placeholder {
    color: ${({theme:e})=>e.colors.textSoft};
  }

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.colors.accent};
    outline-offset: 1px;
    border-color: ${({theme:e})=>e.colors.accent};
  }
`;function s({label:e,id:r,...s}){if(!e)return(0,o.jsx)(i,{id:r,...s});let a=r??s.name;return(0,o.jsxs)(t,{htmlFor:a,children:[(0,o.jsx)("span",{children:e}),(0,o.jsx)(i,{id:a,...s})]})}e.s(["Input",()=>s])},51594,e=>{"use strict";var o=e.i(43476),r=e.i(97053),t=e.i(59544),i=e.i(39964),s=e.i(3812);let a=r.default.div.withConfig({displayName:"page__Wrap",componentId:"sc-fbfd8de4-0"})`
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 1.25rem;
  display: grid;
  gap: 1rem;
`,n=r.default.h1.withConfig({displayName:"page__H1",componentId:"sc-fbfd8de4-1"})`
  margin: 0;
  font-family: ${({theme:e})=>e.typography.fontSerif};
  font-size: clamp(2rem, 5vw, 3.3rem);
`,d=r.default.div.withConfig({displayName:"page__Grid",componentId:"sc-fbfd8de4-2"})`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`,l=r.default.div.withConfig({displayName:"page__Stack",componentId:"sc-fbfd8de4-3"})`
  display: grid;
  gap: 0.8rem;
`;function c(){return(0,o.jsxs)(a,{children:[(0,o.jsxs)(i.Card,{children:[(0,o.jsx)("p",{style:{margin:0,letterSpacing:"0.2em",textTransform:"uppercase",color:"#cdb47c",fontSize:"0.76rem"},children:"Sistema inicial"}),(0,o.jsx)(n,{children:"Vitrina de primitives y tono visual"}),(0,o.jsx)("p",{style:{margin:0,color:"#b5aea1"},children:"Este espacio funciona como base de crecimiento para componentes, estados y patrones de interfaz."})]}),(0,o.jsxs)(d,{children:[(0,o.jsxs)(i.Card,{children:[(0,o.jsx)("h3",{children:"Buttons"}),(0,o.jsxs)(l,{children:[(0,o.jsx)(t.Button,{children:"Primario"}),(0,o.jsx)(t.Button,{variant:"secondary",children:"Secundario"}),(0,o.jsx)(t.Button,{variant:"ghost",children:"Ghost"})]})]}),(0,o.jsxs)(i.Card,{children:[(0,o.jsx)("h3",{children:"Inputs"}),(0,o.jsxs)(l,{children:[(0,o.jsx)(s.Input,{label:"Nombre",placeholder:"EL OJO NEGRO"}),(0,o.jsx)(s.Input,{label:"Email",type:"email",placeholder:"vision@elojonegro.com"})]})]}),(0,o.jsxs)(i.Card,{children:[(0,o.jsx)("h3",{children:"Superficie"}),(0,o.jsx)("p",{style:{margin:0,color:"#b5aea1"},children:"Bordes finos, sombras profundas, contraste sobrio y ritmo editorial."})]})]})]})}e.s(["default",()=>c])}]);