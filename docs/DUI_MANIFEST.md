# DroidUI Manifest (.dui) — Draft Specification v1

**Extension:** `.dui`  
**Media type (proposed, not registered):** `application/vnd.droidui.manifest+json`  
**Magic identifier:** `com.droidui.manifest`  
**Schema version:** `1`

The file is UTF-8 JSON and contains `format`, `version`, `project` and `splash`.

```json
{
  "format": "com.droidui.manifest",
  "version": 1,
  "project": {
    "name": "Example",
    "nodes": [{"id":"welcome","type":"Text","label":"Hello","x":24,"y":64,"animation":"fade","animationDurationMs":1200}]
  },
  "splash": {
    "enabled": true,
    "title": "Example",
    "subtitle": "Powered by DroidUI",
    "backgroundColor": "#101827",
    "textColor": "#ffffff",
    "durationMs": 2500,
    "animation": "fade"
  }
}
```

## Compatibility
- Desktop v1 manifests are validated on open.
- Earlier desktop prototype `{name,nodes}` files can be opened and saved into the new format.
- **Android DroidUI v29/v30 files are NOT yet supported.** They require an explicit adapter and round-trip tests.
- Unknown future manifest versions are rejected instead of being silently rewritten.
- No automatic file association, OS icon registration or binary packaging is implemented yet.

## Exporters
- Jetpack Compose: generated Kotlin screen source (`.kt`), requires integration into an Android Gradle project.
- React Native / Expo: generated TSX screen source (`.tsx`), requires integration into an existing app.
- Absolute positioning is a prototype limitation. Event handlers, responsive layouts, native splash integration, asset bundling, and animation parity across targets are incomplete.
- Exports are source files, **not buildable APKs**.

## Quality gates
Before public release: automated manifest round-trip tests; exporter compile checks against current Compose and Expo templates; cross-device screenshot tests; unsaved-change protection; robust file permissions and atomic saves; schema migrations and Android interoperability fixtures.
