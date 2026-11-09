# Android Component Compatibility Contract

DroidUI Desktop is an Android UI authoring tool. Desktop components must map to Android semantics and must not be exported as arbitrary HTML/CSS.

## Component mapping (initial)
| Studio type | Intended Jetpack Compose output | Notes |
|---|---|---|
| Text | Text | Typography in sp; accessibility semantics |
| Button | Button | Material 3; recommended 48dp minimum touch target |
| Card | Card | Container, elevation, shape and content |
| TextField | TextField / OutlinedTextField | Input type, label, validation and IME options in later phase |
| Switch | Switch | Must be state-backed and accessible in exported code |
| Checkbox | Checkbox | Must be state-backed and accessible in exported code |
| Rectangle | Box + background | Visual primitive, not automatically interactive |
| Frame | Box / Column / Row | Parent layout semantics and constraints required |

## Coordinate and sizing policy
The editor's current 390×844 design viewport is a **baseline preview** only. Inspector coordinates and dimensions are labeled dp; font sizes are labeled sp. Pixel-to-dp scaling and font-scale simulation are **not yet implemented**. Avoid treating CSS pixel output as a validated Android rendering.

## Implementation milestones
1. Establish a shared versioned Android component schema with typed properties, events, and layout constraints.
2. Implement component renderers for the desktop preview and Android Compose output from the same schema.
3. Add parent-child layout containers, constraints, responsive width rules, scrolling and safe-area/inset handling.
4. Implement input behavior, state, accessibility roles, semantic labels and keyboard/IME support.
5. Add density and font-scale previews, device presets, dark/light themes and minimum touch target warnings.
6. Test generated Compose projects on Android emulator/device and compare screenshots against desktop previews.

## Export rules
Do not claim functional Android export for newly added controls until a Compose exporter and device-level tests exist. Keep schema migrations explicit; do not silently discard unsupported properties.

## Current implementation
The desktop editor now exposes TextField, Switch and Checkbox as preview components and allows editing width/height in dp, text size in sp, and accessibility labels. These are early editor representations; they do not yet provide working Android event/state export.
