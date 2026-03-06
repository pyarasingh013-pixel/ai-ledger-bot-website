# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Chatbot Implementation Details

The project includes a demo chatbot within src/sections/ChatDemo.tsx that simulates an AI ledger bot. This section provides a code-level breakdown for engineers to understand and extend the behavior.

### Core Concepts

1. **State Management**
   - `messages`: array of `{ id, text, isUser, timestamp }` representing chat history.
   - `inputValue`: controlled input for user message.
   - `isTyping`: boolean used to show a typing indicator.

2. **Initial Data & Responses**
   - `initialMessages` seeds the conversation with welcome text and usage hints.
   - `botResponses`: simple keyword-to-response map. The `handleSend` function checks the user's input against these keys to determine bot output.

3. **Message Lifecycle**
   - `handleSend`:
     * Validates non-empty input, appends a user message to `messages`.
     * Clears the input and sets `isTyping` to `true`.
     * After a 1.5second timeout, chooses a response (default fallback if no keyword match) and appends a bot message.
     * Resets `isTyping` to `false`.
   - `handleKeyPress` submits on `Enter`.
   - `quickCommands` provide buttons for common commands to prefill the input.

4. **UI & Animation**
   - Message list scrolls to bottom whenever `messages` updates using `scrollToBottom` and a `ref`.
   - GSAP animations (via `gsap/ScrollTrigger`) animate the left column and phone mockup when the section scrolls into view.
   - `PhoneMockup` component contains `ChatBubble` child components rendering individual messages with different styles for user vs bot.

5. **Extensibility**
   - To support real AI or backend integration, replace the local `setTimeout` block with an async call to a service (e.g. OpenAI or custom API). Keep the message structure and typing indicator logic for seamless UX.
   - Additional commands can be added by extending `botResponses` or implementing more advanced parsing/NER.

6. **Related Files**
   - `src/components/ChatBubble.tsx` handles rendering a single message bubble.
   - `src/components/PhoneMockup.tsx` lays out the faux mobile UI.

### Example flow
1. User types "Coffee 250" and presses Enter.
2. `handleSend` appends user message, triggers typing state.
3. After delay, lookups `coffee` keyword, finds response text.
4. Bot message is appended; chat scrolls to bottom automatically.

### Notes
- The logic lives entirely in the frontend; no network or persistence is used in the demo.
- State updates use functional `setMessages` calls to avoid stale closures.
