# Prospects Experience Map

## Rutas

Privadas:

- `/dashboard`
- `/dashboard/prospects`
- `/dashboard/prospects/import`
- `/dashboard/prospects/[id]`

Publica:

- `/diagnosticos/[slug]`

## Flujo privado

1. El operador entra por login con `phone`.
2. Pega JSON de Panalbee Providers en `/dashboard/prospects/import`.
3. La UI valida primero JSON y formato esperado, incluyendo el envelope `researchVersion + candidates[]`.
4. La UI detecta volumen, categoria dominante, ciudad dominante y señales básicas.
5. El backend importa, deduplica y devuelve resumen por item.
6. El operador trabaja el radar en `/dashboard/prospects` con métricas y filtros.
7. Desde el radar entra a `/dashboard/prospects/[id]`.
8. En el detalle puede:
   - editar estado comercial
   - guardar notas internas
   - abrir el guion de contacto
   - abrir el norte comercial
   - copiar prompt de investigación
   - copiar mensaje base de WhatsApp
   - pegar/editar diagnóstico
   - guardar o publicar
9. Si el diagnóstico tiene slug y contenido, se publica y puede verse en `/diagnosticos/[slug]`.

El guion de contacto también está disponible desde el radar para consulta rápida antes de contactar.
El norte comercial debe estar disponible siempre como referencia táctica privada desde radar y detalle.

## Flujo público

1. El cliente abre `/diagnosticos/[slug]` sin autenticación.
2. Ve una pieza pública premium con:
   - hero de marca
   - resumen ejecutivo
   - señales positivas
   - oportunidades principales
   - scores públicos
   - mapa recomendado
   - mejora rápida
   - sistema mínimo recomendado
   - sandbox local de viabilidad

## Reglas UX

- Negro profundo, dorado sobrio, serif editorial, autoridad serena.
- No lenguaje agresivo.
- No decir que un negocio pierde clientes como hecho.
- Usar oportunidad visible, orden, claridad, confianza y recorrido como ejes.
- El radar debe sentirse como centro de mando, no tabla genérica.

## Outreach privado

- El contacto puede iniciar por llamada o WhatsApp.
- El guion de contacto es parte del flujo privado de outreach.
- No es contenido público.
- Su objetivo es conseguir permiso para enviar el diagnóstico gratuito.
- El objetivo inicial no es vender una web.
- El objetivo inicial es abrir permiso para entregar diagnóstico gratuito.
- La escalera comercial es: `Diagnóstico gratuito → Sistema mínimo de captación → Growth Partner mensual`.
- Debe mantener lenguaje de oportunidad, nunca acusatorio.
- Debe estar disponible desde radar y detalle.
- Debe diferenciar WhatsApp inicial, WhatsApp posterior a llamada y seguimiento si no responde.
- No reemplaza el prompt de investigación ni el diagnóstico público.

## Sandbox de viabilidad

- Es local, sin persistencia backend por ahora.
- Sirve para visualizar escenarios de mejora del negocio.
- Debe mostrar disclaimer explícito de no promesa de resultados.
