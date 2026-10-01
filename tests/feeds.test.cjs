const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const ts = require("typescript");
const path = require("node:path");
const filename = path.resolve("src/lib/feeds.ts");
const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const loaded = new Module(filename, module);
loaded.filename = filename;
loaded.paths = module.paths;
loaded._compile(compiled, filename);
const { parseLetterboxd, parseYouTube, parseYouTubePage } = loaded.exports;

test("Letterboxd keeps watched dates, half stars, decoded plain review text and spoiler flags", () => {
  const [film] = parseLetterboxd(
    `<rss><channel><item><link>https://letterboxd.com/ankit010201/film/example/</link><letterboxd:filmTitle>A &amp; B</letterboxd:filmTitle><letterboxd:filmYear>2026</letterboxd:filmYear><letterboxd:memberRating>4.5</letterboxd:memberRating><letterboxd:watchedDate>2026-09-22</letterboxd:watchedDate><description><![CDATA[<p><img src="x"/></p><p>This review may contain spoilers.</p><p>great &amp; strange<br/>ending</p>]]></description></item></channel></rss>`,
  );
  assert.equal(film.title, "A & B");
  assert.equal(film.rating, 4.5);
  assert.equal(film.watchedDate, "2026-09-22");
  assert.equal(film.spoiler, true);
  assert.ok(film.review.includes("great & strange\nending"));
  assert.ok(!film.review.includes("<"));
});

test("non-film activity, invalid review URLs and empty feeds are ignored", () => {
  assert.deepEqual(
    parseLetterboxd(
      "<rss><channel><item><title>A list</title></item></channel></rss>",
    ),
    [],
  );
  assert.deepEqual(
    parseLetterboxd(
      "<rss><channel><item><letterboxd:filmTitle>Film</letterboxd:filmTitle><link>javascript:alert(1)</link></item></channel></rss>",
    ),
    [],
  );
  assert.deepEqual(parseYouTube("<html>feed unavailable</html>"), []);
});

test("YouTube Atom entries become playable video links", () => {
  const [video] = parseYouTube(
    "<feed><entry><yt:videoId>T3ChyIX9tx0</yt:videoId><title>we outside (lands)</title><media:group><media:description>Recap</media:description></media:group></entry></feed>",
  );
  assert.equal(video.url, "https://www.youtube.com/watch?v=T3ChyIX9tx0");
  assert.equal(video.description, "Recap");
});

test("YouTube page fallback reads only the selected uploads tab and handles braces in titles", () => {
  const payload = {
    contents: {
      twoColumnBrowseResultsRenderer: {
        tabs: [
          {
            tabRenderer: {
              selected: true,
              content: {
                richGridRenderer: {
                  contents: [
                    {
                      richItemRenderer: {
                        content: {
                          lockupViewModel: {
                            contentId: "T3ChyIX9tx0",
                            metadata: {
                              lockupMetadataViewModel: {
                                title: { content: 'A "quoted" {title}' },
                              },
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
  };
  const [video] = parseYouTubePage(
    `<script>var ytInitialData = ${JSON.stringify(
      payload,
    )}; anotherCall();</script>`,
  );
  assert.equal(video.title, 'A "quoted" {title}');
  assert.deepEqual(parseYouTubePage("<html>No channel data</html>"), []);
});

test("Letterboxd decodes double-escaped title apostrophes", () => {
  const [film] = parseLetterboxd(
    "<rss><channel><item><link>https://letterboxd.com/ankit010201/film/hes-all-that/</link><letterboxd:filmTitle>He&amp;#039;s All That</letterboxd:filmTitle></item></channel></rss>",
  );
  assert.equal(film.title, "He's All That");
});
