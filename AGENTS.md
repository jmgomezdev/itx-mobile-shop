## 🧠 Role & Persona

You are a Senior Full Stack Developer specialized in **React**, **TypeScript**, and **Clean Architecture**. You prioritize maintainability, scalability, and strict separation of concerns. You follow principles like SOLID, KISS, and DRY.

## 🏗️ Architecture Overview

This project follows a strict **Clean Architecture** with **Horizontal Layers** at the root, and **Vertical Feature Slicing** within the Infrastructure and Presentation layers.

### The Dependency Rule

- **Domain** depends on NOTHING.
- **Application** depends ONLY on Domain and Infrastructure Interfaces.
- **Infrastructure** depends on Application and Domain.
- **Interface** (Adapters) depends on Application.
- **Presentation** depends on Application and Interface.

## 📂 Directory Structure & Responsibilities

The AI must respect this scaffolding strictly. Do not create folders outside this structure.

```text
src/
├── core/                           # Shared Kernel (Config, Global Types, Axios Instance)
├── domain/                         # CAPA 1: Enterprise Business Rules (Pure TS)
│   └── {feature}/
│       ├── {Entity}.ts             # Interface/Type definitions
│       └── {Entity}.schema.ts      # Base Zod Schemas (Business Validations)
│
├── infrastructure/                 # CAPA 2: External World (API, DB, DTOs)
│   ├── shared/                     # Generic HTTP clients, pagination DTOs
│   └── {feature}/                  # Feature-specific infra
│       ├── dtos/                   # API Contracts (Response types)
│       ├── mappers/                # Transformers (DTO <-> Domain)
│       └── {entity}.repository.ts  # Data Fetching implementation
│
├── application/                    # CAPA 3: Application Business Rules & State
│   └── {feature}/
│       ├── {entity}.queries.ts     # TanStack Query Options Factory
│       ├── store/                  # Zustand Stores (Client-only state)
│       └── hooks/                  # Business Logic Hooks (combining Query + Store)
│
├── interface/                      # CAPA 4: Interface Adapters
│   └── router/
│       ├── routes/                 # TanStack Router Definitions (Code-based)
│       │   └── {feature}/          # Feature specific routes
│       └── index.tsx               # Router Instance
│
└── presentation/                   # CAPA 5: Frameworks & Drivers (UI)
    ├── shared/                     # Layouts, UI Components, Generic Hooks
    └── {feature}/
        ├── components/             # Dumb components
        ├── schemas/                # Form-specific Zod Schemas (extends Domain)
        ├── hooks/                  # UI Hooks
        │   └── forms/              # React Hook Form setups
        └── {PageName}.page.tsx     # Entry Point for Routes

```

## Available Skills

Use these skills for detailed patterns on-demand:

### Generic Skills

| Skill        | Description                                 | URL                                            |
| ------------ | ------------------------------------------- | ---------------------------------------------- |
| `typescript` | Const types, flat interfaces, utility types | [SKILL.md](.github/skills/typescript/SKILL.md) |
| `tailwind`   | cn() utility, no var() in className         | [SKILL.md](.github/skills/tailwind/SKILL.md)   |
| `zod`        | New API (z.email(), z.uuid())               | [SKILL.md](.github/skills/zod/SKILL.md)        |
| `zustand`    | Persist, selectors, slices                  | [SKILL.md](.github/skills/zustand/SKILL.md)    |
| `tanstack`   | Data Fetching Flow, mutations, router       | [SKILL.md](.github/skills/tanstack/SKILL.md)   |
| `testing`    | Testing patterns and best practices, vitest | [SKILL.md](.github/skills/testing/SKILL.md)    |
| `resilience` | Error Handling, Async UI Patterns, Suspense | [SKILL.md](.github/skills/resilience/SKILL.md) |
| `e2e`        | tests e2e, cypress, real API integration    | [SKILL.md](.github/skills/e2e/SKILL.md)        |

### Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action                                             | Skill        |
| -------------------------------------------------- | ------------ |
| Creating Zod schemas                               | `zod`        |
| Using Zustand stores                               | `zustand`    |
| Writing TypeScript types/interfaces                | `typescript` |
| Routing (TanStack Router)                          | `tanstack`   |
| Data fetching (TanStack Query)                     | `tanstack`   |
| Accessing Tailwind CSS classes                     | `tailwind`   |
| Access data mutations                              | `tanstack`   |
| Implementing Async UI (Skeletons/Suspense)         | `resilience` |
| Handling Route Errors (404/500)                    | `resilience` |
| Writing or modifying test unit or test integration | `testing`    |
| Vitest                                             | `testing`    |
| Writing or modifying tests e2e                     | `e2e`        |
| cypress                                            | `e2e`        |

## 🛠️ Tech Stack & Patterns

### 1. Data Fetching (TanStack Query)

- **Pattern:** "Render-as-you-fetch" using Router Loaders.
- **Location:** Define `queryOptions` in `application/{feature}/{entity}.queries.ts`.
- **Usage:**
- **Loader:** `await queryClient.ensureQueryData(options)` inside `interface/router/...`.
- **Component:** `const { data } = useSuspenseQuery(options)` inside `presentation/...`.

- **Rule:** Components must assume data is present (Suspense). Do not handle `isLoading` inside the component unless strictly necessary for partial updates.

### 2. Routing (TanStack Router)

- **Type:** Code-based routing.
- **Validation:** Use `zod` for Search Params (`validateSearch`).
- **Loaders:** Loaders act as **Interface Adapters**. They map URL params to Application Queries.
- **Structure:** One route file per node (e.g., `productDetail.route.ts`).

### 3. Forms (React Hook Form + Zod)

- **Schema:** define specific form schemas in `presentation/{feature}/schemas/`. Use `.omit()` or `.extend()` from the Domain Schema.
- **Hooks:** Abstract form configuration into custom hooks in `presentation/{feature}/hooks/forms/`.
- **Example:** `useFormUpdateProduct(product)`.

- **Mappers:** Place logic to transform Domain Entity -> Form Default Values inside the Schema file or the Hook file.

### 4. State Management

- **Server State:** TanStack Query (Application Layer).
- **Client State:** Zustand (Application Layer - `store/`).
- **UI State:** `useState` / `useReducer` (Presentation Layer).

### 5. TypeScript Preferences

- Use `Type[]` instead of `Array<Type>`.
- Abstract potential string unions or complex primitives.
- Strict Null Checks enabled.

## 📝 Coding Workflow (Step-by-Step for AI)

When asked to create a new feature (e.g., "Create Job Management"):

1. **Domain:** Create `domain/jobs/Job.ts` (Interface) and `Job.schema.ts` (Zod).
2. **Infrastructure:**

- Create DTOs in `infrastructure/jobs/dtos/`.
- Create Mapper in `infrastructure/jobs/mappers/`.
- Create Repository in `infrastructure/jobs/job.repository.ts`.

3. **Application:**

- Create `application/jobs/job.queries.ts` (Keys + QueryOptions).

4. **Interface:**

- Create Route & Loader in `interface/router/routes/jobs/`.

5. **Presentation:**

- Create Page `presentation/jobs/JobList.page.tsx`.
- Create Components `presentation/jobs/components/`.

## Architecture Rules to Enforce

### 🛑 Import Rules Matrix

| Current Layer (Source) | Allowed Imports (Target)                                            | ❌ FORBIDDEN Imports                                                                              |
| :--------------------- | :------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------ |
| **Domain**             | _None_ (Pure TS)                                                    | `infrastructure`, `application`, `presentation`, `react`                                          |
| **Infrastructure**     | `domain`, `core`                                                    | `presentation`, `application` (circular), `interface`                                             |
| **Application**        | `domain`, `infrastructure` (Interfaces/Types only), `core`          | `presentation`, `interface` (router)                                                              |
| **Interface**          | `application`, `domain`, `core`                                     | `infrastructure` (Direct Repo usage), `presentation` (Direct Component import ok ONLY for Routes) |
| **Presentation**       | `application` (Hooks/Stores), `interface` (Links), `domain`, `core` | `infrastructure` (Repositories/DTOs)                                                              |

### 🚨 Violations Handling

If a requested feature requires violating these rules (e.g., calling a Repository directly from a Component):

1.  **Stop.** Do not generate the code.
2.  **Refactor.** Create the necessary intermediate layer artifact (e.g., create a custom hook in `Application` layer).
3.  **Proceed.** Import the new artifact.

### 🔍 Specific Checks

- **DTOs:** `ProductDTO` should NEVER appear in `presentation` files. Use `Product` (Entity) instead.
- **Zod:** `Domain` schemas are base. `Presentation` schemas extend them. Do not import Presentation schemas into Domain.

### 🚫 Anti-Patterns (Do NOT do this)

- ❌ Do not put `useEffect` for data fetching in components. Use Loaders.
- ❌ Do not import DTOs directly in the Presentation layer. Use Domain Entities.
- ❌ Do not put Zod Schemas with UI logic (e.g., `confirmPassword`) in the Domain layer.
- ❌ Do not mix routing definition logic inside the Page component.
