# Agent Workflow - EL OJO NEGRO Web

## Overlay operativo — sistema de prospectos y diagnosticos

- El backend real vive en `http://localhost:7000/api` y el frontend debe consumirlo como fuente principal.
- Auth web debe seguir el modelo vigente de backend: login por `phone`, token tipo `accessToken`, transporte `Authorization: Bearer`.
- Rutas privadas del radar y constructor deben vivir solo dentro de `src/app/(protected)`.
- La pagina publica por slug debe vivir solo en `src/app/(public)/diagnosticos/[slug]` y no cargar shell privado.
- `src/modules/prospects/*` es el bounded context de importacion, radar, detalle, publicacion y experiencia publica.
- La zona de viabilidad es exploratoria y local. No debe presentarse como promesa de resultado.

## 1) Contexto canonico

Este proyecto es la base digital de **EL OJO NEGRO**.
No es un SaaS generico.
No es una agencia creativa generica.
No es una estetica dark vacia.

Es una firma de vision estrategica orientada a **transformar percepcion**.

## 2) Significado operativo de marca

- La mirada es el activo.
- La percepcion es el territorio.
- La transformacion es el resultado.
- Promesa: **"No invento valor. Lo revelo."**
- Oficio: **Arquitecto de Percepcion**.
- Expansion: **LIMITLESS**.

La voz debe mantener autoridad tranquila, precision editorial, lujo silencioso y cero ruido.

## 3) Forma correcta de trabajar

1. Leer este archivo antes de tocar codigo.
2. Leer `ai/instructions/*` en este orden:
   - `brand-system.md`
   - `architecture-rules.md`
   - `design-system.md`
   - `engineering-rules.md`
3. Entender arquitectura y flujo de datos antes de editar.
4. No mezclar dominio con primitives.
5. No duplicar server state en Zustand.
6. Documentar decisiones que cambien estructura, datos o direccion visual.
7. Priorizar escalabilidad y claridad sobre atajos.

## 4) Orden de trabajo recomendado para agentes

1. Entender marca.
2. Entender arquitectura.
3. Revisar sistema visual y tono.
4. Revisar estado y data flow.
5. Implementar.
6. Validar (tipado, build, pruebas).
7. Documentar cambios y racional.

## 5) Criterios de calidad obligatorios

- Codigo limpio, con imports correctos y tipado estricto.
- SSR correcto con styled-components.
- Capas respetadas (`ui`, `components`, `modules`, `stores`, `services`).
- UI con presencia inevitable: sobria, precisa, no generica.
- Copy corto, pesado, sin tono vendedor.
- Nada de placeholders mediocres en superficies clave.

## 6) Guardrails de producto

- Landing publica y shell protegido separados.
- Rutas publicas no deben cargar shell privado.
- Shell privado no debe contaminar narrativa publica.
- React Query: fetch/cache/invalidation/estado remoto.
- Zustand: estado local de sesion y UI shell.
