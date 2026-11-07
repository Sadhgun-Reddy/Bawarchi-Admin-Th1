## 2024-11-05 - Vitest and matchMedia
**Learning:** The JSDOM environment in Vitest for this project lacks `window.matchMedia`, which causes components utilizing the theme provider (or media queries) to fail during testing.
**Action:** When adding or testing UI components that interact with the system theme (or when running into `window.matchMedia is not a function`), ensure `window.matchMedia` is explicitly mocked in the relevant test files (e.g., `Security.test.tsx`) using `Object.defineProperty(window, "matchMedia", ...)` before the tests execute.
## 2024-03-24 - Accessibility gaps in icon-only buttons
**Learning:** Found multiple icon-only buttons in data tables (UserTable, RecentExportsHistory, CatererTable) that rely solely on `title` attributes instead of proper `aria-label`s. Screen readers handle `title` attributes inconsistently, making these actions difficult for non-visual users to understand.
**Action:** Ensure all icon-only buttons include an `aria-label` matching their visual intent, rather than just `title`.
