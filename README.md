# Front-End Test - ITX Mobile Shop

## Resumen

Miniaplicación SPA para comprar dispositivos móviles con dos vistas: listado (PLP) y detalle (PDP). Implementa búsqueda en tiempo real, navegación cliente, carrito persistente y cacheo de datos con expiración de 1 hora.

## Cumplimiento de requisitos de la prueba

### Vistas

- PLP: listado responsivo con máximo 4 columnas, búsqueda por marca/modelo en tiempo real y navegación al detalle.
- PDP: layout a dos columnas (imagen y detalle/acciones), con enlace para volver al listado.

### Componentes clave

- Header con título/enlace a home, breadcrumbs y contador de carrito.
- Search con filtrado por marca y modelo en tiempo real.
- Item con imagen, marca, modelo y precio.
- Detail con especificaciones completas del producto.
- Actions con selectores de color y almacenamiento y botón de añadir al carrito.

### Integración API

- GET /api/product: listado.
- GET /api/product/:id: detalle.
- POST /api/cart: añade producto con id, colorCode y storageCode; devuelve count.

### Persistencia y cacheo

- Cache cliente con expiración de 1 hora.
- Persistencia del estado del carrito en almacenamiento local.

## Arquitectura

El proyecto sigue Clean Architecture con capas estrictas:

- Domain: entidades y esquemas base.
- Infrastructure: DTOs, mappers y repositorios de API.
- Application: queries, hooks de negocio y estado (Zustand).
- Interface: router y loaders como adaptadores.
- Presentation: páginas y componentes UI.

### Flujo de datos (render-as-you-fetch)

- Los loaders del router precargan datos usando TanStack Query.
- Las páginas consumen datos con Suspense evitando useEffect para fetching.

## Buenas prácticas destacadas

- Separación de responsabilidades por capas y feature slicing.
- Tipado estricto y mapeo DTO → dominio.
- Caché con TTL y persistencia en localStorage.
- Estado de carrito aislado y persistido.
- Error boundary y 404 a nivel de router.

## Scripts

- START: modo desarrollo.
- BUILD: compilación de producción.
- TEST: ejecución de tests unitario y de integración.
- TEST:E2E:RUN: ejecuta tests E2E en modo headless.
- LINT: comprobación de código.
