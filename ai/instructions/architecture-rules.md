# Architecture Rules

## Estructura base

- `src/app`: rutas App Router y layouts por segmento.
- `src/components/ui`: primitives puros reutilizables (sin dominio).
- `src/components`: componentes compuestos reutilizables.
- `src/modules`: logica de dominio por modulo (ui, hooks, servicios, tipos).
- `src/stores`: estado local de sesion/UI con Zustand.
- `src/services`: cliente HTTP y acceso a APIs.
- `src/lib`: utilidades de infraestructura compartida.

## React Query vs Zustand

React Query:
- Estado remoto, cache, invalidacion, loading, error, refetch.

Zustand:
- Token, usuario local, hidratacion, estado shell, preferencias de UI.

Regla critica: no duplicar server state en Zustand.

## Rutas

- Publicas: `/`, `/login`, `/architecture`, `/system-design`.
- Protegidas: `/dashboard` y futuras privadas.

Separar narrativas: landing y contenido publico no comparten shell privado.

## Reglas para crecer

1. Si algo es reutilizable y agnostico -> `components/ui`.
2. Si combina primitives pero no pertenece a dominio -> `components`.
3. Si depende del negocio -> `modules/<dominio>`.
4. Si es estado local transversal -> `stores`.
5. Si consume API -> `services` + React Query.
