# Knowledge Context

## High-Level Architecture

```mermaid
flowchart LR
    A[User Browser] --> B[Vite + React SPA]
    B --> C[Components & Sections]
    B --> D[Tailwind CSS]
    B --> E[External APIs / Services]
    C --> F[ChatDemo, Hero, Features, Pricing, etc.]
    E -->|Optional| B
    subgraph Build
        B --> G[Vite build output (dist)]
        G --> H[Deployment (Vercel)]
    end
```

## Low-Level Component Hierarchy

```mermaid
flowchart TD
    App[App.tsx]
    App --> Navbar[Navigation]
    App --> Main[Main Section]
    Main --> Hero[Hero]
    Main --> Features[Features]
    Main --> HowItWorks[HowItWorks]
    Main --> ChatDemo[ChatDemo]
    Main --> Pricing[Pricing]
    Main --> FAQ[FAQ]
    Main --> Security[Security]
    App --> Footer[CTAFooter]

    subgraph UI Library
        Accordion
        Alert
        Button
        ...
    end
    Navbar --- Button
    ChatDemo --- Carousel
```

*(UI Library represents dozens of `src/components/ui/*` primitives used by sections.)*
