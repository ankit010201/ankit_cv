const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const BASIC = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
const TOKEN_URL = "https://accounts.spotify.com/api/token";

export async function getAccessToken(): Promise<string> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${BASIC}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
    cache: "no-store",
  });
  const data = await res.json();
  return data.access_token;
}

async function spotifyFetch(path: string, revalidate = 60) {
  const token = await getAccessToken();
  return fetch(`https://api.spotify.com/v1${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate },
  });
}

export async function getNowPlaying() {
  return spotifyFetch("/me/player/currently-playing", 30);
}

export async function getRecentlyPlayed() {
  return spotifyFetch("/me/player/recently-played?limit=5", 60);
}

export async function getTopArtists() {
  return spotifyFetch("/me/top/artists?limit=8&time_range=medium_term", 3600);
}

export async function getPlaylists() {
  return spotifyFetch("/me/playlists?limit=5", 3600);
}

export async function getPlaylistTracks(id: string) {
  return spotifyFetch(
    `/playlists/${id}/tracks?limit=5&fields=items(track(name,artists(name)))`,
    3600,
  );
}
