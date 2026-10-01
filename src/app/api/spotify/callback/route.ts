import { type NextRequest, NextResponse } from "next/server";
import { localSpotifyRedirect, validOAuthState } from "@/lib/spotify-auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const redirectUri = localSpotifyRedirect(request.url, process.env.NODE_ENV);
  if (!redirectUri)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  const finish = (response: NextResponse) => {
    response.cookies.set("spotify_oauth_state", "", {
      path: "/api/spotify",
      maxAge: 0,
    });
    response.headers.set("Cache-Control", "no-store");
    return response;
  };
  if (
    !validOAuthState(
      request.nextUrl.searchParams.get("state"),
      request.cookies.get("spotify_oauth_state")?.value,
    )
  ) {
    return finish(
      NextResponse.json(
        { error: "Invalid or expired Spotify setup session" },
        { status: 400 },
      ),
    );
  }
  const code = request.nextUrl.searchParams.get("code");
  if (!code || request.nextUrl.searchParams.has("error"))
    return finish(
      NextResponse.json(
        { error: "Spotify authorization was not completed" },
        { status: 400 },
      ),
    );
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret)
    return finish(
      NextResponse.json(
        { error: "Spotify is not configured" },
        { status: 503 },
      ),
    );
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("Authorization unavailable");
    const data = await response.json();
    if (typeof data.refresh_token !== "string")
      throw new Error("Authorization unavailable");
    const token = data.refresh_token.replace(
      /[&<>"']/g,
      (character: string) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[character],
    );
    return finish(
      new NextResponse(
        `<!DOCTYPE html><html lang="en"><head><meta name="referrer" content="no-referrer"><title>Spotify setup</title></head><body style="font-family:monospace;padding:40px"><h1>Spotify connected</h1><p>Add this to .env.local, configure it in Vercel, and restart the dev server:</p><pre>SPOTIFY_REFRESH_TOKEN=${token}</pre></body></html>`,
        {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Referrer-Policy": "no-referrer",
            "Content-Security-Policy":
              "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'",
          },
        },
      ),
    );
  } catch {
    return finish(
      NextResponse.json(
        { error: "Spotify authorization unavailable. Start setup again." },
        { status: 503 },
      ),
    );
  }
}
