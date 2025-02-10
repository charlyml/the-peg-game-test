import { describe, it, expect, beforeEach } from "vitest";
import {
  initialBoard,
  setBoard,
  canMove,
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

  it("should check if you won the game", () => {
    const winningBoard = Array(15).fill(false);

    winningBoard[14] = true;
    expect(youWon(winningBoard)).toBe(true);
  });

  it("should get movements correctly", () => {
    const movements = getMovements(board, 0);
    expect(movements).not.toBeNull();
    expect(movements?.length).toBeGreaterThan(0);
  });

  it("should check if the game is over", () => {
    const gameOverBoard = Array(15).fill(true);
    gameOverBoard[14] = true;
    expect(gameOver(gameOverBoard)).toBe(true);
  });

  it("should solve the game when the empty hole is at position 0", () => {
    const solution = solve(board);
    expect(solution).not.toBeNull();
    expect(solution?.length).toBeGreaterThan(0);
  });

  it("should solve the game when the empty hole is at position 14", () => {
    const newGame = Array(15).fill(true);
    newGame[14] = false;
    const solution = solve(board);
    expect(solution).not.toBeNull();
    expect(solution?.length).toBeGreaterThan(0);
  });

  it("should not solve the game when empty hole is invalid", () => {
    const newGame = Array(15).fill(true);
    newGame[100] = false;
    console.log("board", board);
    const solution = solve(newGame);
    expect(solution).toBeNull();
    //expect(solution?.length).toBeGreaterThan(0);
  });
});
