# DroidUI Desktop — Architecture

## Current implementation
- Desktop shell: Tauri 2 / Rust / WebView2 on Windows.
- UI: React 18 + TypeScript + Vite.
- File dialogs: `@tauri-apps/plugin-dialog`.
- Local persistence: `@tauri-apps/plugin-fs`.
- CI: GitHub Actions Windows NSIS packaging with a portable executable fallback.

## Target architecture
```text
desktop-ui (React)
  ├── editor shell (panels, commands, shortcuts)
  ├── canvas renderer (viewport, transforms, selection)
  ├── property inspector / component catalog
  └── preview
         │
shared-editor-core (framework-neutral TypeScript)
  ├── document schema and migrations
  ├── commands + undo/redo
  ├── selection, layout, snapping
  ├── validation and serializers
  └── import/export adapters
         │
Tauri desktop services (filesystem, dialogs, OS integration)
         │
Android DroidUI app (existing Expo/React Native implementation)
```

## Compatibility contract
Do not treat the D1 prototype's `{name,nodes}` JSON as the production Android project schema. Introduce a shared versioned model with explicit adapters for Android signature `DROID_STUDIO_PROJECT_V30` and schema versions 29/30. Preserve unknown fields when practical; reject invalid or unsafe inputs. Test round trips with real sanitized Android fixtures before enabling cross-platform project open/save.

## Security
Limit filesystem scope to user-approved project paths; validate imported JSON; never execute project-authored scripts. Release builds should be signed before public distribution.

## Engineering workflow
Use feature branches, pull requests, required Windows build/typecheck/tests, release tags, changelogs, and reproducible dependency locks. Keep Android CI independent from desktop CI.
