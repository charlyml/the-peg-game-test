export type Move = {
  from: number;
  over: number;
  to: number;
};

export const initialBoard: boolean[] = Array(15).fill(true);

const MOVES: Move[] = [
  { from: 0, over: 1, to: 3 },
  { from: 0, over: 2, to: 5 },
  { from: 1, over: 3, to: 6 },
  { from: 1, over: 4, to: 8 },
  { from: 2, over: 4, to: 7 },
  { from: 2, over: 5, to: 9 },
  { from: 3, over: 4, to: 5 },
  { from: 3, over: 6, to: 10 },
  { from: 3, over: 7, to: 12 },
  { from: 4, over: 7, to: 11 },
  { from: 4, over: 8, to: 13 },
  { from: 5, over: 8, to: 12 },
  { from: 5, over: 9, to: 14 },
  { from: 6, over: 7, to: 8 },
  { from: 7, over: 8, to: 9 },
  { from: 10, over: 11, to: 12 },
  { from: 11, over: 12, to: 13 },
  { from: 12, over: 13, to: 14 },
  { from: 3, over: 1, to: 0 },
  { from: 5, over: 2, to: 0 },
  { from: 6, over: 3, to: 1 },
  { from: 8, over: 4, to: 1 },
  { from: 7, over: 4, to: 2 },
  { from: 9, over: 5, to: 2 },
  { from: 5, over: 4, to: 3 },
  { from: 10, over: 6, to: 3 },
  { from: 12, over: 7, to: 3 },
  { from: 11, over: 7, to: 4 },
  { from: 13, over: 8, to: 4 },
  { from: 12, over: 8, to: 5 },
  { from: 14, over: 9, to: 5 },
  { from: 8, over: 7, to: 6 },
  { from: 9, over: 8, to: 7 },
  { from: 12, over: 11, to: 10 },
  { from: 13, over: 12, to: 11 },
  { from: 14, over: 13, to: 12 },
];

export const setBoard = (hole: number) => (initialBoard[hole] = false);

export const canMove = (
  board: boolean[],
  from: number,
  to: number
): boolean => {
  const move = getValidMove(from, to);
  if (!move) return false;

  // return true if the from hole has a peg
  // the over hole has a peg
  // and the to hole is empty
  return board[from] && board[move.over] && !board[to];
};

export const makeMove = (
  board: boolean[],
  from: number,
  to: number
): boolean[] => {
  const newBoard = [...board];
  const validMove = getValidMove(from, to);

  if (validMove) {
    move(newBoard, from, validMove.over, to);
  }

  return newBoard;
};

export const youWon = (board: boolean[]) => board.filter(Boolean).length === 1;

export const solve = (board: boolean[], path: Move[] = []): Move[] | null => {
  if (youWon(board)) return path;

  const validMoves = getValidMoves(board);

  for (const validMove of validMoves) {
    // javascript passes arrays by reference
    // so we need to create a new array for every recursive call
    // to avoid modifying the original array
    const newBoard = [...board];
    move(newBoard, validMove.from, validMove.over, validMove.to);
    const result = solve(newBoard, [...path, validMove]);

    if (result) return result;
  }

  return null;
};

export const getMovements = (
  board: boolean[],
  selectedHole: number = 0
): Move[] | null => {
  board[selectedHole] = false;

  const solution = solve(board);

  if (solution) {
    return solution;
  }

  return null;
};

export const gameOver = (board: boolean[]): boolean =>
  !MOVES.some(({ from, over, to }) => board[from] && board[over] && !board[to]);

const getValidMove = (from: number, to: number) =>
  MOVES.find((m) => m.from === from && m.to === to);

const getValidMoves = (board: boolean[]): Move[] =>
  MOVES.filter(
    ({ from, over, to }) => board[from] && board[over] && !board[to]
  );

const move = (board: boolean[], from: number, over: number, to: number) => {
  board[from] = false;
  board[over] = false;
  board[to] = true;
};
