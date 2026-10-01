import { randomBytes } from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";
import { localSpotifyRedirect } from "@/lib/spotify-auth";

export const dynamic = "force-dynamic";

const SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-top-read",
  "playlist-read-private",
  "playlist-read-collaborative",
].join(" ");

export async function GET(request: NextRequest) {
  const redirectUri = localSpotifyRedirect(request.url, process.env.NODE_ENV);
  if (!redirectUri)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  const localOrigin = new URL(redirectUri).origin;
  if (request.nextUrl.origin !== localOrigin)
    return NextResponse.redirect(`${localOrigin}/api/spotify/login`);
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  if (!clientId)
    return NextResponse.json(
      { error: "Spotify is not configured" },
      { status: 503 },
    );
  const state = randomBytes(32).toString("hex");
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: SCOPES,
    state,
  });
  const response = NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params}`,
  );
  response.cookies.set("spotify_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/api/spotify",
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
