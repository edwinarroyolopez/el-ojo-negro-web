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
`;function f({variant:a="primary",...c}){return(0,b.jsx)(e,{$variant:a,...c})}a.s(["Button",()=>f])},94988,a=>{"use strict";var b=a.i(87924),c=a.i(75716);let d=c.default.label.withConfig({displayName:"Input__Field",componentId:"sc-2dff469f-0"})`
  display: grid;
  gap: ${({theme:a})=>a.spacing[2]};
  font-size: ${({theme:a})=>a.typography.size.sm};
  color: ${({theme:a})=>a.colors.textMuted};
`,e=c.default.input.withConfig({displayName:"Input__StyledInput",componentId:"sc-2dff469f-1"})`
  width: 100%;
  min-height: 44px;
  border-radius: ${({theme:a})=>a.radius.md};
  border: ${({theme:a})=>a.borders.subtle};
  background: ${({theme:a})=>a.colors.backgroundSoft};
  color: ${({theme:a})=>a.colors.text};
  padding: 0.7rem 0.9rem;
  font-size: ${({theme:a})=>a.typography.size.sm};

  &::placeholder {
    color: ${({theme:a})=>a.colors.textSoft};
  }

  &:focus-visible {
    outline: 2px solid ${({theme:a})=>a.colors.accent};
    outline-offset: 1px;
    border-color: ${({theme:a})=>a.colors.accent};
  }
`;function f({label:a,id:c,...f}){if(!a)return(0,b.jsx)(e,{id:c,...f});let g=c??f.name;return(0,b.jsxs)(d,{htmlFor:g,children:[(0,b.jsx)("span",{children:a}),(0,b.jsx)(e,{id:g,...f})]})}a.s(["Input",()=>f])},24634,a=>{"use strict";var b=a.i(87924),c=a.i(75716),d=a.i(96438),e=a.i(62067),f=a.i(94988);let g=c.default.div.withConfig({displayName:"page__Wrap",componentId:"sc-fbfd8de4-0"})`
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 1.25rem;
  display: grid;
  gap: 1rem;
`,h=c.default.h1.withConfig({displayName:"page__H1",componentId:"sc-fbfd8de4-1"})`
  margin: 0;
  font-family: ${({theme:a})=>a.typography.fontSerif};
  font-size: clamp(2rem, 5vw, 3.3rem);
`,i=c.default.div.withConfig({displayName:"page__Grid",componentId:"sc-fbfd8de4-2"})`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`,j=c.default.div.withConfig({displayName:"page__Stack",componentId:"sc-fbfd8de4-3"})`
  display: grid;
  gap: 0.8rem;
`;function k(){return(0,b.jsxs)(g,{children:[(0,b.jsxs)(e.Card,{children:[(0,b.jsx)("p",{style:{margin:0,letterSpacing:"0.2em",textTransform:"uppercase",color:"#cdb47c",fontSize:"0.76rem"},children:"Sistema inicial"}),(0,b.jsx)(h,{children:"Vitrina de primitives y tono visual"}),(0,b.jsx)("p",{style:{margin:0,color:"#b5aea1"},children:"Este espacio funciona como base de crecimiento para componentes, estados y patrones de interfaz."})]}),(0,b.jsxs)(i,{children:[(0,b.jsxs)(e.Card,{children:[(0,b.jsx)("h3",{children:"Buttons"}),(0,b.jsxs)(j,{children:[(0,b.jsx)(d.Button,{children:"Primario"}),(0,b.jsx)(d.Button,{variant:"secondary",children:"Secundario"}),(0,b.jsx)(d.Button,{variant:"ghost",children:"Ghost"})]})]}),(0,b.jsxs)(e.Card,{children:[(0,b.jsx)("h3",{children:"Inputs"}),(0,b.jsxs)(j,{children:[(0,b.jsx)(f.Input,{label:"Nombre",placeholder:"EL OJO NEGRO"}),(0,b.jsx)(f.Input,{label:"Email",type:"email",placeholder:"vision@elojonegro.com"})]})]}),(0,b.jsxs)(e.Card,{children:[(0,b.jsx)("h3",{children:"Superficie"}),(0,b.jsx)("p",{style:{margin:0,color:"#b5aea1"},children:"Bordes finos, sombras profundas, contraste sobrio y ritmo editorial."})]})]})]})}a.s(["default",()=>k])}];

//# sourceMappingURL=src_bb8f4bde._.js.map