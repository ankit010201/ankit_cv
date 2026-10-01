const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  windowSize,
  windowPosition,
  bringToFront,
  TOPBAR_HEIGHT,
  TASKBAR_HEIGHT,
} = require("./load-typescript.cjs")("src/lib/desktop.ts");

test("windows fit short laptop and tablet screens, including the larger video player", () => {
  for (const viewport of [
    { width: 800, height: 500 },
    { width: 1024, height: 600 },
    { width: 1440, height: 900 },
  ]) {
    for (const id of ["videos", "running", "about"]) {
      const size = windowSize(id, viewport);
      const position = windowPosition(id, 10000, 10000, viewport);
      assert.ok(position.x + size.width <= viewport.width);
      assert.ok(position.y + size.height <= viewport.height - TASKBAR_HEIGHT);
      assert.ok(position.y >= TOPBAR_HEIGHT);
    }
  }
});

test("negative drags keep the title bar and close button reachable", () => {
  const position = windowPosition("about", -5000, -5000, {
    width: 1024,
    height: 768,
  });
  assert.ok(position.x >= 0);
  assert.ok(position.y > TOPBAR_HEIGHT);
});

test("restoring a window preserves other minimized windows and bounded layers", () => {
  let windows = [
    { id: "about", x: 16, y: 48, zIndex: 40, minimized: true },
    { id: "camera", x: 16, y: 48, zIndex: 41, minimized: false },
    { id: "videos", x: 16, y: 48, zIndex: 42, minimized: true },
  ];
  for (let i = 0; i < 1000; i++)
    windows = bringToFront(windows, i % 2 ? "about" : "camera");
  assert.equal(windows.find((win) => win.id === "videos").minimized, true);
  assert.equal(windows.find((win) => win.id === "about").minimized, false);
  assert.equal(
    windows.find((win) => win.id === "about").zIndex,
    Math.max(...windows.map((win) => win.zIndex)),
  );
  assert.ok(Math.max(...windows.map((win) => win.zIndex)) < 200);
  assert.equal(bringToFront(windows, "missing"), windows);
});
