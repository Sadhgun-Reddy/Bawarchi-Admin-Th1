## 2025-03-01 - [Memory Leak in CSV Export]
**Vulnerability:** A `URL.createObjectURL(blob)` was being used without being revoked (`URL.revokeObjectURL(url)`), which can cause a small memory leak in the browser.
**Learning:** Although not a critical security vulnerability, uncontrolled memory consumption could theoretically be weaponized as a client-side Denial of Service if the export button is triggered repeatedly.
**Prevention:** Ensure that anytime `URL.createObjectURL` is called, it is matched with a `URL.revokeObjectURL` once the URL is no longer needed (e.g., after the download completes via `setTimeout`).
