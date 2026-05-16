import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: "http://127.0.0.1:3000/api/spotify/callback",
    }),
  });

  const data = await res.json();

  if (!data.refresh_token) {
    return NextResponse.json({ error: data }, { status: 400 });
  }

  return new NextResponse(
    `<!DOCTYPE html><html><body style="font-family:monospace;padding:40px;background:#1a1a1a;color:#4ade80;">
      <h2 style="margin-bottom:16px;">✓ Spotify connected</h2>
      <p style="color:#9ca3af;margin-bottom:8px;">Add this to .env.local and restart the dev server:</p>
      <pre style="background:#111;padding:16px;border-radius:4px;color:#fbbf24;">SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</pre>
    </body></html>`,
    { headers: { "Content-Type": "text/html" } },
  );
}
