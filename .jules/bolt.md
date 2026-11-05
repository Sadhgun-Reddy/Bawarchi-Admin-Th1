
## 2023-10-27 - Hoisting Invariant Operations in Array Filtering
**Learning:** Performing string transformations like `.toLowerCase()` on invariant values (e.g., search queries) inside a `.filter()` or `.map()` callback can cause significant performance degradation on large datasets, as the same transformation is recomputed for every element. Benchmarks showed that evaluating `searchQuery.toLowerCase()` inside a loop over a large mock dataset runs 2-3x slower than hoisting it outside the loop.
**Action:** When filtering or mapping arrays using a search query or another static string, always hoist the `.toLowerCase()` call (or other invariant transformations) outside of the array iteration callback.
