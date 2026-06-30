export interface Section {
  id: string;
  title: string;
  icon: string;
}

export const sections: Section[] = [
  { id: "about",       title: "About Me",    icon: "user"       },
  { id: "now",         title: "/now",         icon: "clock"      },
  { id: "music",       title: "Now Playing",  icon: "music"      },
  { id: "books",       title: "Bookshelf",    icon: "book"       },
  { id: "watch",       title: "Watchlist",    icon: "film"       },
  { id: "videos",      title: "Videos",       icon: "video"      },
  { id: "food",        title: "Food Log",     icon: "fork"       },
  { id: "camera",      title: "Camera Roll",  icon: "camera"     },
  { id: "running",     title: "Running",      icon: "run"        },
  { id: "mixtape",     title: "Mixtape",      icon: "tape"       },
  { id: "terminal",    title: "Terminal",     icon: "term"       },
  { id: "minesweeper", title: "Minesweeper",  icon: "bomb"       },
];
