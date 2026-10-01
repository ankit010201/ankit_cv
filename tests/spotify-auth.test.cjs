const { test } = require("node:test");
const assert = require("node:assert/strict");
const { localSpotifyRedirect, validOAuthState } =
  require("./load-typescript.cjs")("src/lib/spotify-auth.ts");

test("Spotify setup is disabled in production and on non-loopback hosts", () => {
  assert.equal(
    localSpotifyRedirect(
      "https://ankitagrawal.com/api/spotify/login",
      "production",
    ),
    null,
  );
  assert.equal(
    localSpotifyRedirect(
      "http://127.0.0.1:3000/api/spotify/login",
      "production",
    ),
    null,
  );
  assert.equal(
    localSpotifyRedirect(
      "https://example.com/api/spotify/login",
      "development",
    ),
    null,
  );
  assert.equal(
    localSpotifyRedirect(
      "http://localhost.example.com/api/spotify/login",
      "development",
    ),
    null,
  );
});

test("local OAuth uses one exact loopback redirect for both setup endpoints", () => {
  for (const origin of ["http://localhost:3001", "http://127.0.0.1:3001"]) {
    const expected = "http://127.0.0.1:3001/api/spotify/callback";
    assert.equal(
      localSpotifyRedirect(origin + "/api/spotify/login", "development"),
      expected,
    );
    assert.equal(
      localSpotifyRedirect(origin + "/api/spotify/callback", "development"),
      expected,
    );
  }
});

test("OAuth callbacks reject missing, mismatched and malformed state", () => {
  const state = "a".repeat(64);
  assert.equal(validOAuthState(state, state), true);
  assert.equal(validOAuthState(null, state), false);
  assert.equal(validOAuthState(state, undefined), false);
  assert.equal(validOAuthState("b".repeat(64), state), false);
  assert.equal(validOAuthState("short", "short"), false);
});
