"use client";

import { useState, useCallback } from "react";

const ROWS = 8;
const COLS = 10;
const MINES = 10;

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

function createBoard(): Cell[][] {
  const board: Cell[][] = Array(ROWS)
    .fill(null)
    .map(() =>
      Array(COLS)
        .fill(null)
        .map(() => ({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          adjacentMines: 0,
        })),
    );

  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!board[r][c].isMine) {
      board[r][c].isMine = true;
      placed++;
    }
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!board[r][c].isMine) {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].isMine) count++;
          }
        }
        board[r][c].adjacentMines = count;
      }
    }
  }

  return board;
}

function revealCells(board: Cell[][], r: number, c: number): Cell[][] {
  const next = board.map((row) => row.map((cell) => ({ ...cell })));
  const stack = [[r, c]];
  while (stack.length) {
    const [cr, cc] = stack.pop()!;
    if (cr < 0 || cr >= ROWS || cc < 0 || cc >= COLS) continue;
    if (next[cr][cc].isRevealed || next[cr][cc].isFlagged) continue;
    next[cr][cc].isRevealed = true;
    if (next[cr][cc].adjacentMines === 0 && !next[cr][cc].isMine) {
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) stack.push([cr + dr, cc + dc]);
    }
  }
  return next;
}

const numColors: Record<number, string> = {
  1: "text-blue-600",
  2: "text-green-600",
  3: "text-red-600",
  4: "text-purple-800",
  5: "text-red-900",
  6: "text-teal-600",
  7: "text-black",
  8: "text-gray-600",
};

export default function MinesweeperWindow() {
  const [board, setBoard] = useState<Cell[][]>(createBoard);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");

  const reset = () => {
    setBoard(createBoard());
    setStatus("playing");
  };

  const handleClick = useCallback(
    (r: number, c: number) => {
      if (status !== "playing") return;
      if (board[r][c].isRevealed || board[r][c].isFlagged) return;

      if (board[r][c].isMine) {
        const next = board.map((row) =>
          row.map((cell) => ({ ...cell, isRevealed: cell.isMine ? true : cell.isRevealed })),
        );
        setBoard(next);
        setStatus("lost");
        return;
      }

      const next = revealCells(board, r, c);
      setBoard(next);

      const unrevealed = next.flat().filter((cell) => !cell.isRevealed && !cell.isMine);
      if (unrevealed.length === 0) setStatus("won");
    },
    [board, status],
  );

  const handleRightClick = useCallback(
    (e: React.MouseEvent, r: number, c: number) => {
      e.preventDefault();
      if (status !== "playing" || board[r][c].isRevealed) return;
      const next = board.map((row) => row.map((cell) => ({ ...cell })));
      next[r][c].isFlagged = !next[r][c].isFlagged;
      setBoard(next);
    },
    [board, status],
  );

  const flags = board.flat().filter((c) => c.isFlagged).length;

  return (
    <div className="retro-font flex flex-col items-center space-y-3 text-xs">
      <div className="pixelated-border flex w-full items-center justify-between bg-amber-100 p-2">
        <span className="text-red-600">💣 {MINES - flags}</span>
        <button
          onClick={reset}
          className="pixelated-button bg-amber-300 px-2 py-0.5 hover:bg-amber-400"
        >
          {status === "won" ? "😎" : status === "lost" ? "😵" : "🙂"} new game
        </button>
        <span className="text-gray-500">right-click = flag</span>
      </div>

      {(status === "won" || status === "lost") && (
        <div
          className={`pixelated-border w-full p-2 text-center ${
            status === "won" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {status === "won" ? "you won!!" : "boom. try again."}
        </div>
      )}

      <div
        className="pixelated-border bg-gray-200"
        style={{ display: "grid", gridTemplateColumns: `repeat(${COLS}, 1.75rem)` }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => {
            let bg = "bg-gray-300 hover:bg-gray-200";
            let content: React.ReactNode = "";

            if (cell.isRevealed) {
              bg = cell.isMine ? "bg-red-500" : "bg-gray-100";
              if (cell.isMine) content = "💣";
              else if (cell.adjacentMines > 0)
                content = (
                  <span className={`font-bold ${numColors[cell.adjacentMines]}`}>
                    {cell.adjacentMines}
                  </span>
                );
            } else if (cell.isFlagged) {
              content = "🚩";
            }

            return (
              <button
                key={`${r}-${c}`}
                className={`pixelated-border flex h-7 w-7 items-center justify-center text-xs ${bg}`}
                onClick={() => handleClick(r, c)}
                onContextMenu={(e) => handleRightClick(e, r, c)}
              >
                {content}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}
