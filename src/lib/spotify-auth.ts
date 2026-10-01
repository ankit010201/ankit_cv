// OAuth setup is for the site owner's local development session only.
export function localSpotifyRedirect(
  requestUrl: string,
  environment: string | undefined,
) {
  const url = new URL(requestUrl);
  if (
    environment === "production" ||
    !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
  )
    return null;
  return `http://127.0.0.1:${url.port || "3000"}/api/spotify/callback`;
}

export function validOAuthState(
  received: string | null,
  expected: string | undefined,
) {
  return Boolean(
    received &&
    expected &&
    /^[a-f0-9]{64}$/.test(received) &&
    received === expected,
  );
}
