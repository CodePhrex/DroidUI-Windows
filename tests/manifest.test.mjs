import { test } from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";

async function loadManifest() {
  const result = await build({ entryPoints: ["src/manifest.ts"], bundle: true, platform: "node", format: "esm", write: false, logLevel: "silent" });
  return import("data:text/javascript;base64," + Buffer.from(result.outputFiles[0].text).toString("base64"));
}
const api = await loadManifest();
const { encodeManifest, decodeManifest, defaultSplash, DUI_FORMAT } = api;
const screen = (name, nodes = []) => ({ name, nodes, canvasColor: "#ffffff" });
const node = { id: "title", type: "Text", label: "Welcome", x: 24, y: 32, fontFamily: "Roboto", fontWeight: 700, transition: "fade", transitionDurationMs: 450 };

test("round-trip multi-screen manifest preserves splash and new component properties", () => {
  const screens = [screen("Home", [node]), screen("Settings", [{ ...node, id: "settings", label: "Settings", x: 12, visible: false, locked: true }])];
  const splash = { ...defaultSplash, title: "My Project", durationMs: 3000 };
  const decoded = decodeManifest(JSON.parse(encodeManifest(screens[0], splash, screens)));
  assert.equal(decoded.legacy, false);
  assert.deepEqual(decoded.screens, screens);
  assert.deepEqual(decoded.splash, splash);
  assert.deepEqual(decoded.project, screens[0]);
});

test("legacy desktop document loads without mutating defaults", () => {
  const old = screen("Legacy", [node]);
  const result = decodeManifest(old);
  assert.equal(result.legacy, true);
  assert.deepEqual(result.screens, [old]);
  assert.deepEqual(result.splash, defaultSplash);
});

test("reject unsupported versions, malformed screen collections and invalid splash", () => {
  const valid = JSON.parse(encodeManifest(screen("Home"), defaultSplash));
  assert.equal(valid.format, DUI_FORMAT);
  assert.throws(() => decodeManifest({ ...valid, version: 999 }), /version/);
  assert.throws(() => decodeManifest({ ...valid, screens: [] }), /screen collection/);
  assert.throws(() => decodeManifest({ ...valid, splash: { ...defaultSplash, durationMs: -1 } }), /manifest/);
  assert.throws(() => encodeManifest(screen("Home"), defaultSplash, []), /Invalid/);
});

test("reject unsafe media URLs and invalid visual properties", () => {
  const bad = screen("Unsafe", [{ ...node, type: "WebView", sourceUrl: "javascript:alert(1)" }]);
  assert.throws(() => encodeManifest(bad, defaultSplash), /Invalid/);
  const badWeight = screen("Bad font", [{ ...node, fontWeight: 9999 }]);
  assert.throws(() => encodeManifest(badWeight, defaultSplash), /Invalid/);
});

test("reject Android mobile manifests without a dedicated adapter", () => {
  assert.throws(() => decodeManifest({ format: "mobile-v30", version: 30 }), /Unsupported DroidUI format/);
});
