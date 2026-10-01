const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const TOKEN_URL = "https://accounts.spotify.com/api/token";
let cachedToken: { token: string; expiresAt: number } | undefined;
let tokenRequest: Promise<string> | undefined;

export async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now())
    return cachedToken.token;
  if (tokenRequest) return tokenRequest;
  tokenRequest = (async () => {
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN)
      throw new Error("Spotify is not configured");
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`,
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error("Spotify authorization unavailable");
    const data = await res.json();
    if (!data.access_token)
      throw new Error("Spotify authorization unavailable");
    cachedToken = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in - 60) * 1000,
    };
    return data.access_token as string;
  })();
  try {
    return await tokenRequest;
  } finally {
    tokenRequest = undefined;
  }
}

async function spotifyFetch(path: string, revalidate = 60) {
  const token = await getAccessToken();
  return fetch(`https://api.spotify.com/v1${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate },
    signal: AbortSignal.timeout(8000),
  });
}

export async function getNowPlaying() {
  const token = await getAccessToken();
  return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
}

export async function getRecentlyPlayed() {
  const token = await getAccessToken();
  return fetch("https://api.spotify.com/v1/me/player/recently-played?limit=5", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
}

export async function getTopArtists() {
  return spotifyFetch("/me/top/artists?limit=8&time_range=short_term", 900);
}

export async function getPlaylists() {
  return spotifyFetch("/me/playlists?limit=5", 300);
}

export async function getPlaylistTracks(id: string) {
  return spotifyFetch(
    `/playlists/${id}/tracks?limit=5&fields=items(track(name,artists(name)))`,
    300,
  );
}
