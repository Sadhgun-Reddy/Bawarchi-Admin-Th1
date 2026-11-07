
## 2023-10-27 - Hoisting Invariant Operations in Array Filtering
**Learning:** Performing string transformations like `.toLowerCase()` on invariant values (e.g., search queries) inside a `.filter()` or `.map()` callback can cause significant performance degradation on large datasets, as the same transformation is recomputed for every element. Benchmarks showed that evaluating `searchQuery.toLowerCase()` inside a loop over a large mock dataset runs 2-3x slower than hoisting it outside the loop.
**Action:** When filtering or mapping arrays using a search query or another static string, always hoist the `.toLowerCase()` call (or other invariant transformations) outside of the array iteration callback.
## 2026-11-07 - [Short-circuit filtering with early returns]
**Learning:** Eager evaluation of expensive string operations like `.toLowerCase().includes()` occurs in logical AND operations when bound to intermediate variables (e.g., `const matchesSearch = ...`). This defeats short-circuiting in complex filtering logic within `useMemo` and can bottleneck rendering when dealing with large mocked data stores.
**Action:** Use early returns (`if (!matchTab) return false;`) to immediately short-circuit array iteration callbacks. Always check if the `searchQuery` is empty (`if (searchLower === '') return true;`) before performing multiple string lookups.
