import { NextResponse } from "next/server";
import snapshot from "@/data/videos.json";
import { fetchFeed, parseYouTube, parseYouTubePage } from "@/lib/feeds";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let videos;
    try {
      videos = parseYouTube(
        await fetchFeed(
          "https://www.youtube.com/feeds/videos.xml?channel_id=UCauIpaACB91tW4OQOWy_wQg",
        ),
      );
      if (!videos.length) throw new Error("Empty feed");
    } catch {
      videos = parseYouTubePage(
        await fetchFeed("https://www.youtube.com/@4nkitagrawal/videos"),
      );
    }
    if (!videos.length) throw new Error("Empty feed");
    videos = videos.map((video) => ({
      ...video,
      description:
        video.description ||
        snapshot.find((saved) => saved.id === video.id)?.description ||
        "",
    }));
    return NextResponse.json({ videos, stale: false });
  } catch {
    return NextResponse.json({
      videos: snapshot,
      stale: true,
      updatedAt: "2026-09-30",
    });
  }
}
