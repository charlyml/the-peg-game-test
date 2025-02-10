import { describe, it, expect, beforeEach } from "vitest";
import {
  initialBoard,
  setBoard,
  canMove,
  makeMove,
  youWon,
  getMovements,
  gameOver,
  solve,
} from "./algorithm";

describe("algorithm tests", () => {
  let board: boolean[];

  beforeEach(() => {
    board = [...initialBoard];
  });

  it("should set a hole correctly", () => {
    setBoard(0);
    expect(initialBoard[0]).toBe(false);
  });

  it("should check if a move is possible", () => {
    // Set up the board state to make the move possible
    board[0] = true;
    board[1] = true;
    board[3] = false;
    expect(canMove(board, 0, 3)).toBe(true);

    // Set up the board state to make the move impossible
    board[0] = true;
    board[1] = false;
    board[3] = false;
    expect(canMove(board, 0, 3)).toBe(false);
  });

  it("should make a move correctly", () => {
    const newBoard = makeMove(board, 0, 3);
    expect(newBoard[0]).toBe(false);
    expect(newBoard[1]).toBe(false);
    expect(newBoard[3]).toBe(true);
  });

  it("should check if you won the game", () => {
    const winningBoard = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
    ];
    expect(youWon(winningBoard)).toBe(true);
  });

  it("should get movements correctly", () => {
    const movements = getMovements(board, 0);
    expect(movements).not.toBeNull();
    expect(movements?.length).toBeGreaterThan(0);
  });

  it("should check if the game is over", () => {
    const gameOverBoard = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
    ];
    expect(gameOver(gameOverBoard)).toBe(true);
  });

  it("should solve the board correctly", () => {
    const solution = solve(board);
    expect(solution).not.toBeNull();
    expect(solution?.length).toBeGreaterThan(0);
  });
});
