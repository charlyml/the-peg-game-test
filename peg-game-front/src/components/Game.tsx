import { useState, useCallback } from "react";
import { Board } from "./Board";
import {
  initialBoard,
  canMove,
  makeMove,
  gameOver,
  getMovements,
  youWon,
} from "../utils/algorithm";

import type { Move } from "../utils/algorithm";

type GameProps = {
  emptyHole: number;
};

export const Game = ({ emptyHole }: GameProps) => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedHole, setSelectedHole] = useState<number | null>(null);
  const [solution, setSolution] = useState<Move[] | null>(null);

  const handleHoleClick = useCallback(
    (index: number) => {
      if (selectedHole === null) {
        if (board[index]) {
          setSelectedHole(index);
        }
      } else {
        if (canMove(board, selectedHole, index)) {
          setBoard(makeMove(board, selectedHole, index));
          setSelectedHole(null);
        } else {
          setSelectedHole(index);
        }
      }
    },
    [board, selectedHole]
  );

  const resetGame = useCallback(() => {
    setBoard(initialBoard);
    setSelectedHole(null);
  }, []);

  const solve = useCallback(() => {
    resetGame();
    const solution = getMovements(initialBoard, emptyHole);

    setSolution(solution);
  }, [emptyHole, resetGame]);

  return (
    <div className="game">
      <h1>Cracker Barrel Peg Game</h1>
      <Board
        board={board}
        onHoleClick={handleHoleClick}
        selectedHole={selectedHole}
      />
      <div className="controls">
        <button onClick={resetGame}>Reset Game</button>
        <button onClick={solve}>I give up! Show steps</button>
      </div>
      {gameOver(board) && (
        <div className="game-over">
          <p>Game Over!</p>
          <p>{youWon(board) ? "You win!" : "You lost"}</p>
          Pegs remaining: {board.filter(Boolean).length}
        </div>
      )}

      {solution && (
        <div className="solution">
          <table>
            <thead>
              <tr>
                <th>From</th>
                <th>Over</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {solution.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{data.from}</td>
                    <td>{data.over}</td>
                    <td>{data.to}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
