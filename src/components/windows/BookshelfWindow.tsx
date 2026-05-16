"use client";

const fiveStars = [
  { title: "Do Androids Dream of Electric Sheep?", author: "Philip K. Dick" },
  { title: "The Hunger Games", author: "Suzanne Collins" },
  { title: "The Lightning Thief", author: "Rick Riordan" },
  { title: "Shoe Dog", author: "Phil Knight" },
  { title: "Divergent", author: "Veronica Roth" },
  { title: "The Power of Habit", author: "Charles Duhigg" },
  { title: "Born a Crime", author: "Trevor Noah" },
  { title: "Bad Blood", author: "John Carreyrou" },
  { title: "Exhalation", author: "Ted Chiang" },
  { title: "Project Hail Mary", author: "Andy Weir" },
  { title: "Build", author: "Tony Fadell" },
];

const fourStars = [
  { title: "Funny in Farsi", author: "Firoozeh Dumas" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { title: "Fahrenheit 451", author: "Ray Bradbury" },
  { title: "Life of Pi", author: "Yann Martel" },
  { title: "The Metamorphosis", author: "Franz Kafka" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { title: "Deception Point", author: "Dan Brown" },
  { title: "To Kill a Mockingbird", author: "Harper Lee" },
];

const wantToRead = [
  "The Handmaid's Tale — Margaret Atwood",
  "The Diary of a Young Girl — Anne Frank",
  "Sapiens — Yuval Noah Harari",
  "The Help — Kathryn Stockett",
  "Chip War — Chris Miller",
];

export default function BookshelfWindow() {
  return (
    <div className="retro-font space-y-3 text-xs">
      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">★★★★★ FAVORITES.log</div>
        <div className="space-y-1">
          {fiveStars.map((b, i) => (
            <div key={i} className="flex justify-between text-gray-700">
              <div>
                <div>{b.title}</div>
                <div className="text-gray-400">{b.author}</div>
              </div>
              <div className="ml-2 flex-shrink-0 text-amber-500">★★★★★</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">★★★★ LIKED.log</div>
        <div className="space-y-1">
          {fourStars.map((b, i) => (
            <div key={i} className="flex justify-between text-gray-700">
              <div>
                <div>{b.title}</div>
                <div className="text-gray-400">{b.author}</div>
              </div>
              <div className="ml-2 flex-shrink-0 text-amber-400">★★★★☆</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">QUEUE.txt</div>
        <div className="space-y-1 text-gray-700">
          {wantToRead.map((b, i) => (
            <div key={i}>▸ {b}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
