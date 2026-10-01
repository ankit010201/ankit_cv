import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({ parseTagValue: false, processEntities: true });
const array = <T>(value: T | T[] | undefined): T[] =>
  value === undefined ? [] : Array.isArray(value) ? value : [value];

function decodeText(text: string) {
  return text
    .replace(/&#(x[0-9a-f]+|[0-9]+);/gi, (match, value: string) => {
      const code =
        value[0].toLowerCase() === "x"
          ? parseInt(value.slice(1), 16)
          : Number(value);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    })
    .replace(/&nbsp;/g, " ")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

export function parseLetterboxd(xml: string) {
  const feed = parser.parse(xml);
  return array<Record<string, string>>(feed.rss?.channel?.item)
    .filter(
      (item) =>
        item["letterboxd:filmTitle"] &&
        /^https:\/\/letterboxd\.com\/ankit010201\/film\//.test(item.link),
    )
    .map((item) => {
      const description = item.description ?? "";
      // Render remote reviews as plain React text, never as feed-provided HTML.
      const review = description
        .replace(/<p>\s*<img[^>]*>\s*<\/p>/gi, "")
        .replace(/<br\s*\/?>|<\/p>/gi, "\n")
        .replace(/<[^>]*>/g, "")
        .replace(/&gt;/g, ">")
        .replace(/&lt;/g, "<")
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&apos;/g, "'")
        .replace(/&amp;/g, "&")
        .trim();
      const rating = Number(item["letterboxd:memberRating"]);
      return {
        title: decodeText(item["letterboxd:filmTitle"]),
        year: item["letterboxd:filmYear"],
        rating: Number.isFinite(rating) ? Math.max(0, Math.min(5, rating)) : 0,
        watchedDate: item["letterboxd:watchedDate"] ?? "",
        url: item.link,
        review: decodeText(review),
        spoiler: /This review may contain spoilers/i.test(description),
      };
    });
}

export type FeedVideo = {
  id: string;
  title: string;
  description: string;
  url: string;
};

export function parseYouTube(xml: string): FeedVideo[] {
  const feed = parser.parse(xml);
  return array<Record<string, any>>(feed.feed?.entry)
    .filter((item) => /^[\w-]{11}$/.test(item["yt:videoId"]))
    .map((item) => ({
      id: item["yt:videoId"] as string,
      title: item.title as string,
      description: (item["media:group"]?.["media:description"] ?? "") as string,
      url: `https://www.youtube.com/watch?v=${item["yt:videoId"]}`,
    }));
}

// YouTube occasionally returns 500 for RSS; use the public uploads page then.
export function parseYouTubePage(html: string): FeedVideo[] {
  const start = /ytInitialData\s*=\s*/.exec(html);
  if (!start) return [];
  const offset = start.index + start[0].length;
  let depth = 0,
    quoted = false,
    escaped = false,
    end = offset;
  for (; end < html.length; end++) {
    const char = html[end];
    if (quoted) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') quoted = false;
    } else if (char === '"') quoted = true;
    else if (char === "{") depth++;
    else if (char === "}" && --depth === 0) break;
  }
  const data = JSON.parse(html.slice(offset, end + 1));
  const tabs = data.contents?.twoColumnBrowseResultsRenderer?.tabs ?? [];
  const uploads =
    tabs.find((tab: any) => tab.tabRenderer?.selected)?.tabRenderer?.content
      ?.richGridRenderer?.contents ?? [];
  return uploads.flatMap((item: any) => {
    const content = item.richItemRenderer?.content;
    const video = content?.lockupViewModel;
    const legacy = content?.videoRenderer;
    const id = video?.contentId ?? legacy?.videoId;
    const title =
      video?.metadata?.lockupMetadataViewModel?.title?.content ??
      legacy?.title?.runs?.[0]?.text;
    return /^[\w-]{11}$/.test(id) && title
      ? [
          {
            id: id as string,
            title: title as string,
            description: "",
            url: `https://www.youtube.com/watch?v=${id}`,
          },
        ]
      : [];
  });
}

export async function fetchFeed(url: string) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "application/rss+xml, application/atom+xml, application/xml",
    },
    next: { revalidate: 900 },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error("Feed unavailable");
  return response.text();
}
