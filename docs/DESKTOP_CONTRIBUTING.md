# Contributing to DroidUI Desktop

## Local Windows setup
Install Node.js 20+, Rust stable, Microsoft C++ Build Tools and WebView2. From the repository root:

```powershell
cd desktop
npm install
npm run build
npm run desktop
```

Build a Windows installer with `npm run desktop:build`.

## Development conventions
- TypeScript strict mode; explicit types for document and command boundaries.
- Separate UI components from document mutations; commands must be undoable.
- Validate imported project files; use fixtures for migration tests.
- Keep each pull request focused, include screenshots for UI changes and explain manual tests.
- Do not merge failing Windows builds or claim a packaged installer exists without an uploaded artifact.
- Avoid breaking Android project compatibility; keep existing mobile application isolated.

## Proposed issue labels
`desktop`, `phase-d2`, `ux`, `interop`, `bug`, `testing`, `documentation`.

## Release checklist
Typecheck; tests; Windows installer and portable executable artifacts; smoke test on Windows 10/11; verify open/save; check antivirus false positives; version/changelog; code signing for public distribution.
