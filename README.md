# DroidUI Desktop — Phase D1

Windows-first Tauri 2 + React/TypeScript desktop studio. This first scaffold supports a draggable canvas, layer selection, property editing, and saving/loading a **desktop prototype** project.

## Run

Prerequisites: Node 20+, Rust stable, Windows C++ build tools, WebView2.

```bash
npm install
npm run desktop
```

Build an installer with `npm run desktop:build`.

## Known limitations

The current desktop JSON document is a **prototype**, NOT the existing DroidUI mobile `.dui` schema. Loading a mobile project is intentionally rejected until the shared project adapter and schema validation are implemented. File dialogs and disk access require the Tauri runtime (not a plain browser). No Windows installer has been verified yet. Drag positions are not yet constrained to canvas bounds. Additional production features (undo/redo, device presets, export, shared compiler, icons, animation timeline) remain future phases.
