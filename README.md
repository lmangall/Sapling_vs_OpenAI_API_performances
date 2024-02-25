## Language APIs Resources:

**Links for API related to languages:**

- **Azure Cognitive Services for Language (Bing Spell Check API):**
  - Tutorial video: [Packt tutorial on Bing Spell Check API](https://www.youtube.com/watch?v=-zuqfJaxT8A&ab_channel=Packt)
  - Documentation: [Microsoft Docs: Sending requests to Bing Spell Check API](https://github.com/MicrosoftDocs/bing-docs/blob/main/bing-docs/bing-spell-check/how-to/sending-requests.md)
- **OpenAI Grammar Example:** [OpenAI API example for correcting grammar](https://platform.openai.com/examples/default-grammar)
- **OpenAI Node.js Library:** [Interact with OpenAI API using Node.js](https://github.com/openai/openai-node)

**Pronunciation assesment APIs:**
_(for further development)_

Defined.ai:
[Defined.ai Public API](https://developers.definedcrowd.com/#)

confidence:
[Language Confidence](https://languageconfidence.ai/#how-does-our) only english and chinese, no info on pricing

Speechsuper:
[SpeechSuper](https://www.speechsuper.com/) infos, GitHub, 20USD+ per month

Microsoft Azure pronunciation assesment:
[Pronunciation assessment in Azure Speech Services](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-pronunciation-assessment?pivots=programming-language-csharp) 480$ per month ?

Speechcase:
[Speechace API plans](https://www.speechace.com/speechace-api-plans/) 80$/month

Elsa:
[ELSA](https://elsaspeak.com/en/elsa-api/) english only

**Coding ressources:**

- **Next.js React Foundations:** [Learn the fundamentals of React with Next.js](https://nextjs.org/learn/react-foundations)

# Understanding the Code and Technologies

This project utilizes several web development technologies to create a web application that interacts with the ChatGPT API:

- **Next.js:** A React framework for building server-side rendered and static web applications.
- **React:** A JavaScript library for creating reusable UI components.
- **TypeScript:** A superset of JavaScript that adds static typing for improved code robustness.
- **CSS:** Cascading Style Sheets for styling web page elements.
- **Tailwind CSS:** A utility-first CSS framework for rapid design creation.
- **PostCSS:** A tool for transforming CSS with JavaScript (used for Tailwind processing).
- **API:** Application Programming Interface, enabling communication between different parts of an application (here, interacting with ChatGPT).

# Component Dependencies

- `page.tsx` and `layout.tsx`: React components defining page content and layout, respectively.
- `globals.css` and `tailwind.config.ts`: Global styles and Tailwind configuration.
- `next.config.mjs`: Next.js application configuration.
- `tsconfig.json`: TypeScript compiler configuration.

# Project Structure

```bash

tree -I 'node_modules' -L 2

project-root/
├── .next/ (Next.js build output)
├── node_modules/ (Installed dependencies)
├── pages/ (React components for pages)
│   └── page.tsx (Main page component)
├── public/ (Static assets, e.g., favicon)
├── styles/ (CSS styles)
│   └── globals.css (Global styles)
├── next-env.d.ts (TypeScript declarations for Next.js)
├── next.config.mjs (Next.js configuration)
├── package.json (Project metadata)
├── package-lock.json (Dependency lock file)
├── postcss.config.js (PostCSS configuration)
├── README.md (Project documentation)
├── tailwind.config.ts (Tailwind configuration)
├── tsconfig.json (TypeScript configuration)
└── layout.tsx (Layout component shared across pages)
```

# Details:

| File/Directory       | Description                                           |
| -------------------- | ----------------------------------------------------- |
| `.next/`             | Contains generated build output from Next.js          |
| `node_modules/`      | Contains installed third-party dependencies           |
| `pages/`             | Contains React components for individual pages        |
| `pages/page.tsx`     | The main page component of the application            |
| `public/`            | Contains static assets like favicon, images, etc.     |
| `public/favicon.ico` | The website's favicon                                 |
| `styles/`            | Contains CSS styles for the application               |
| `styles/globals.css` | Global styles applied to the entire application       |
| `next-env.d.ts`      | Provides TypeScript declarations for Next.js env vars |
| `next.config.mjs`    | Configuration file for Next.js settings               |
| `package.json`       | Contains project metadata, dependencies, and scripts  |
| `package-lock.json`  | Lock file for package versions                        |
| `postcss.config.js`  | Configuration file for PostCSS plugins                |
| `README.md`          | Project documentation file                            |
| `tailwind.config.ts` | Configuration file for Tailwind CSS                   |
| `tsconfig.json`      | Configuration file for TypeScript                     |
| `layout.tsx`         | Shared layout component used across multiple pages    |

## Server-Side Rendering Issues and Solutions

**Encountered Problems:**

- **Error:** `ReferenceError: document is not defined`
- **Context:** Server-side rendering (SSR) in Next.js
- **Component:** `SaplingEditor.js` using `document` object within `useEffect` hook

**Explanation:**

- The `document` object belongs to the Document Object Model (DOM), not available in Node.js environments used for Next.js SSR.
- `SaplingEditor.js` accessing `document` during SSR leads to the error.

**Difference Between Local and Vercel:**

- Local development might have relaxed SSR rules, allowing code execution despite missing `document`.
- Vercel enforces strict SSR, causing the error when `document` is unavailable.

**Solution: Dynamic Imports with `ssr: false`**

1. Use dynamic imports:

   ```javascript
   const SaplingEditorWithNoSSR = dynamic(
     () => import("../components/saplingEditor"),
     { ssr: false }
   );
   ```

2. ssr: false tells Next.js to:
   Load SaplingEditor only on the client-side.
   Bypass SSR for this component, avoiding issues with document.
   Benefits:

- Prevents document error during SSR.
- Improves performance by loading SaplingEditor only when needed.

**useful links:**

https://nextjs.org/docs/pages/building-your-application/rendering

**Solution Breakdown:**

**What `ssr: false` tells Next.js:**

- **Load `SaplingEditor` only on the client-side:**
  - This means the component code won't be executed during server-side rendering (SSR).
  - It will only be loaded and executed when the browser receives the rendered HTML.
- **Bypass SSR for this component:**
  - This avoids the `ReferenceError: document is not defined` because `document` is a browser-specific object unavailable during SSR.

**Benefits:**

- **Prevents `document` error:**
  - By not executing `SaplingEditor` on the server, it can't access `document`, eliminating the error.
- **Improves performance:**
  - Loading `SaplingEditor` only when needed reduces the initial page load weight on the server.

**Remember:**

- **Audience-specific detail:** Adapt the explanation's technical level based on your target audience.

**I hope this explanation in code block format is helpful! Feel free to ask further questions.**
