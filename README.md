# Front-End Test - ITX Mobile Shop

Miniaplicación **SPA** para comprar dispositivos móviles, construida con **React 19 + TypeScript**, siguiendo **Clean Architecture** y un flujo “render-as-you-fetch” con **TanStack Router + TanStack Query (Suspense)**.

![React](https://img.shields.io/badge/React-19.x-149ECA)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)
![Vite](https://img.shields.io/badge/Vite-rolldown--vite-646CFF)
![TanStack](https://img.shields.io/badge/TanStack-Router%20%2B%20Query-FF4154)
![Tests](https://img.shields.io/badge/Tests-Vitest%20%2B%20Cypress-4B8BBE)

---

## Índice

- [Resumen](#resumen)
- [Requisitos cubiertos](#requisitos-cubiertos)
- [Stack](#stack)
- [Arranque rápido](#arranque-rápido)
- [Scripts](#scripts)
- [Arquitectura](#arquitectura)
- [Flujo de datos (Loaders + Suspense)](#flujo-de-datos-loaders--suspense)
- [Cacheo y persistencia (TTL 1h)](#cacheo-y-persistencia-ttl-1h)
- [Notas de rendimiento](#notas-de-rendimiento)
- [Calidad y estándares](#calidad-y-estándares)

---

## Resumen

La aplicación tiene **dos vistas**:

- **PLP (Product List Page):** listado con búsqueda en tiempo real y navegación al detalle.
- **PDP (Product Details Page):** detalle en dos columnas (imagen + descripción/acciones), con botón de añadir al carrito.

Incluye:

- **Cacheo cliente con TTL de 1 hora** para evitar peticiones constantes.
- **Persistencia** en `localStorage`:
  - Contador del **carrito**.
  - Caché de **TanStack Query**.
- **Loaders + Suspense** para mejorar UX y reducir layout shift.

---

## Requisitos cubiertos

### Vistas

- **PLP:** grilla responsiva con máximo 4 columnas y buscador por **marca** y **modelo**.
- **PDP:** layout a dos columnas, enlace de vuelta al listado.

### Integración API

- `GET /api/product` → listado.
- `GET /api/product/:id` → detalle.
- `POST /api/cart` → añade producto con `id`, `colorCode`, `storageCode` y devuelve `{ count }`.

---

## Stack

- **React 19** + **TypeScript**
- **Vite** (con `rolldown-vite`)
- **Tailwind CSS**
- **TanStack Router** (routing code-based) + **TanStack Query** (caché y Suspense)
- **Zustand** (estado del carrito)
- **Vitest** (unit/integration) + **Cypress** (E2E)

---

## Arranque rápido

### 1) Instalar dependencias

```bash
npm install
```

### 2) Configurar variables de entorno

Este proyecto necesita la URL base de la API.

```bash
copy .env.example .env
```

En `.env`:

```dotenv
VITE_API_BASE_URL=https://itx-frontend-test.onrender.com
```

### 3) Ejecutar en local

```bash
npm run start
```

---

## Scripts

```bash
# Desarrollo
npm run start

# Build producción
npm run build

# Lint
npm run lint

# Tests unit/integration
npm run test

# E2E (UI)
npm run test:e2e:open

# E2E (headless)
npm run test:e2e:run
```

---

## Arquitectura

Clean Architecture con capas estrictas (horizontal) y feature slicing (vertical):

```text
src/
	core/             # Shared kernel (http client, queryClient, env)
	domain/           # Reglas de negocio (types/schemas)
	infrastructure/   # API/DTOs/mappers/repositories
	application/      # Queries/hooks de negocio + Zustand stores
	interface/        # Router + loaders (adaptadores)
	presentation/     # Páginas y componentes UI
```

---

## Flujo de datos (Loaders + Suspense)

Se usa el patrón **render-as-you-fetch**:

1. La ruta ejecuta un **loader** y precarga datos con `queryClient.ensureQueryData(...)`.
2. La página consume los datos con `useSuspenseQuery(...)` asumiendo data presente.
3. Mientras carga, se muestra `pendingComponent` (skeleton/fallback), evitando layout shift.

---

## Cacheo y persistencia (TTL 1h)

- **TanStack Query** configura `staleTime` y `gcTime` a **1 hora**.
- Se persiste el Query Cache en `localStorage` con `PersistQueryClientProvider` (`maxAge: 1h`).
- El contador del carrito se persiste con Zustand (`persist`) en `localStorage`.

---

## Notas de rendimiento

- Búsqueda optimizada con `useDeferredValue` para no bloquear el input al filtrar.
- `useMemo` para evitar recomputar el filtrado cuando no toca.
- React 19 permite activar React Compiler, pero aquí se priorizó mostrar optimización explícita con hooks.

---

## Calidad y estándares

El repo incluye herramientas para estandarizar el desarrollo y evitar errores antes de integrar cambios:

- **ESLint** (`npm run lint`) con configuración para TypeScript + React Hooks.
- **Prettier** + ordenado de imports + Tailwind plugin (formato consistente).
- **Husky** (git hooks) con:
  - `pre-commit`: ejecuta `lint-staged` + `pretty-quick --staged`.
  - `pre-push`: ejecuta `npm run build` para evitar pushes que rompan el build.
