import { Peg } from "./Peg";

interface BoardProps {
  board: boolean[];
  onHoleClick: (index: number) => void;
  selectedHole: number | null;
}

export const Board = ({ board, onHoleClick, selectedHole }: BoardProps) => {
  const rows = [[0], [1, 2], [3, 4, 5], [6, 7, 8, 9], [10, 11, 12, 13, 14]];

  return (
    <div className="board">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((holeIndex) => (
            <Peg
              key={holeIndex}
              hasPeg={board[holeIndex]}
              isSelected={holeIndex === selectedHole}
              onClick={() => onHoleClick(holeIndex)}
              pegNumber={holeIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
