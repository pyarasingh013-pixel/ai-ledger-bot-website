# AI Ledger Bot — Landing Page

Marketing website for AI Ledger Bot, built with React + TypeScript + Vite + Tailwind + GSAP ScrollTrigger.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- GSAP (`ScrollTrigger`) for pinned/scroll animations
- Lucide icons

## Project Structure

- `src/App.tsx` — page composition + global snap behavior
- `src/components/Navigation.tsx` — sticky top navigation + section scrolling
- `src/components/PhoneMockup.tsx` — reusable phone frame UI
- `src/components/ChatBubble.tsx` — reusable chat bubble UI
- `src/sections/` — homepage sections:
  - `Hero.tsx`
  - `Features.tsx`
  - `UseCases.tsx`
  - `ChatDemo.tsx`
  - `HowItWorks.tsx`
  - `Security.tsx`
  - `Pricing.tsx`
  - `FAQ.tsx`
  - `CTAFooter.tsx`
- `src/index.css` — global design tokens, utilities, responsive layout tuning

## Current UX Notes (Latest)

- Sticky header remains visible while navigating sections.
- Hero and Features visuals are aligned to the right with content text aligned left.
- Responsive safeguards were added for overlap issues in pinned sections.
- Transitions were tuned toward `transform`/`opacity` based animation patterns.
- Use Cases section displays concise cards (title, subtitle, features) without scenario blocks.
- Chat Demo includes an interactive simulated chat experience with quick commands.

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Deployment

- Production deploys are handled via Vercel from the `master` branch.

## Notes for Contributors

- Keep section IDs stable (`features`, `usecases`, `demo`, `pricing`, `faq`) so navbar anchors continue to work.
- Prefer responsive layout fixes via CSS breakpoints and class hooks over one-off inline style overrides.
- When adjusting animations, avoid layout-triggering properties (`top`, `left`, `width`, `height`) for smoother rendering.

## `index.css` Breakdown (Current)

The stylesheet is organized into logical layers and utility sections:

1. **Imports + Global Image Rules**
  - Imports Google fonts used by the design system.
  - Normalizes image behavior (`max-width: 100%`, `display: block`, `cursor: default`) to avoid layout shifts and hover cursor mismatch.

2. **Tailwind Layers**
  - `@tailwind base/components/utilities` are the foundation.
  - `@layer base` defines theme tokens (`--background`, `--card`, etc.) and base selectors.

3. **Base Resets + Box Model**
  - Global `box-sizing: border-box` is applied on `*`, `*::before`, `*::after`.
  - This prevents padding/border from unexpectedly increasing element width and causing alignment drift.

4. **Component-Level Styling (`@layer components`)**
  - Reusable classes like:
    - `.phone-mockup`
    - `.chat-bubble-left` / `.chat-bubble-right`
    - `.feature-card`
    - `.btn-primary` / `.btn-outline`
    - `.section-pinned`
    - `.grain-overlay`
  - Transition performance was tuned by reducing broad `transition-all` usage and specifying transition properties.

5. **Performance + Motion Helpers**
  - `will-change: transform, opacity` is used on animated hero/feature elements.
  - This improves perceived smoothness for GSAP-driven transitions.

6. **Responsive Regression Guards**
  - `@media (max-width: 1200px)`: scales and repositions hero visuals.
  - `@media (max-width: 1024px)`: switches pinned layouts to safer vertical flow, neutralizes absolute positioning for key elements, and prevents overlap.

7. **Utilities + Scrollbar Styling**
  - Animation delay helpers (`.animation-delay-*`).
  - Custom scrollbar styles + mobile scrollbar hide rule.

## Latest CSS/Layout Changes We Made

- Removed overlap-causing behavior by combining:
  - global `box-sizing: border-box`
  - responsive fallback for pinned/absolute layouts on tablet/mobile
  - safer flow for hero/feature text + visual blocks.
- Improved sticky navigation visibility by balancing z-index with overlay layers.
- Updated transition strategy to favor `transform` and `opacity` where possible.
- Kept text clean on the left and visual phone/image blocks on the right across hero/features.
- Standardized image rendering behavior to avoid indentation/flow glitches.

These updates were specifically made to address regression issues around **overlap**, **spacing consistency**, and **jerky motion during section transitions**.
