## 2024-11-05 - Vitest and matchMedia
**Learning:** The JSDOM environment in Vitest for this project lacks `window.matchMedia`, which causes components utilizing the theme provider (or media queries) to fail during testing.
**Action:** When adding or testing UI components that interact with the system theme (or when running into `window.matchMedia is not a function`), ensure `window.matchMedia` is explicitly mocked in the relevant test files (e.g., `Security.test.tsx`) using `Object.defineProperty(window, "matchMedia", ...)` before the tests execute.
