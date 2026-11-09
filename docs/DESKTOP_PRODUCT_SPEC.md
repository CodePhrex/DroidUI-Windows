# DroidUI Desktop — Product Specification

**Status:** Phase D1 prototype complete; Phase D2 planned. **Target:** commercial-quality Windows-first visual UI studio.

## Product principles
- Desktop-first, keyboard-accessible professional workflow; Android project interoperability.
- Non-destructive editing, explicit save state, responsive inspector, predictable shortcuts.
- Offline-first project editing; no cloud account required for core features.

## Phase D2 acceptance criteria
1. **Canvas:** zoom 25–400%, pan, optional grid/snap, multi-select, drag, resize handles, alignment guides, visible device bounds.
2. **Workspace:** resizable/dockable toolbox, Layers, Properties, Assets and History panels; restore layout between sessions.
3. **Editing:** undo/redo for mutations, duplicate/delete, grouping, z-order, context menu, keyboard shortcuts.
4. **Components:** searchable categorized library with thumbnails and presets; editable text, layout, colors, spacing, typography, events.
5. **Preview:** interactive device-size preview with selectable device presets and clear edit/preview modes.
6. **Persistence:** atomic save, unsaved-change prompt, schema validation, safe error messages, backups, recent projects.
7. **Interoperability:** a versioned adapter that reads/writes the existing Android `.dui` schema without losing unsupported fields; round-trip regression fixtures.
8. **Quality:** Windows CI installer, UI regression tests, accessibility and keyboard checks, release notes, signed releases before commercial distribution.

## Non-goals for D2
Cloud collaboration, marketplace, and full cross-platform packaging are later phases.

## Current limitations
The Phase D1 desktop prototype uses a separate project JSON format and is **not yet interoperable** with Android `.dui` projects. Windows executable has been built in GitHub Actions; no code signing or commercial release readiness is claimed.
