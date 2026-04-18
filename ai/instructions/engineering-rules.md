# Engineering Rules

## Implementacion

- Priorizar composicion y modulos pequenos.
- Evitar sobreingenieria y abstracciones prematuras.
- Mantener tipos explicitos en limites de capa.

## Codigo y organizacion

- Naming claro y estable.
- Evitar duplicados de utilidades y estilos.
- Mantener imports sanos con alias `@/*`.
- Separar infraestructura, dominio y presentacion.

## Estado y datos

- React Query para remoto.
- Zustand para local/sesion/shell.
- HTTP client centralizado con interceptores.

## DX y calidad

- ESLint activo.
- Vitest + Testing Library para pruebas unitarias.
- Playwright listo para e2e.
- Build y typecheck limpios antes de merge.

## Regla de entrega

Cada cambio significativo debe:
1. Respetar capas.
2. Mantener coherencia de marca.
3. Incluir validacion minima ejecutable.
