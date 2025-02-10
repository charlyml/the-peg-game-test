type PegProps = {
  hasPeg: boolean;
  isSelected: boolean;
  onClick: () => void;
  pegNumber: number;
};

export const Peg = ({ hasPeg, isSelected, onClick, pegNumber }: PegProps) => {
  return (
    <div
      className={`peg ${hasPeg ? "has-peg" : "empty"} ${
        isSelected ? "selected" : ""
      }`}
      onClick={onClick}
    >
      <div className={`${hasPeg ? "peg-inner" : ""}`}>
        <span>{pegNumber}</span>
      </div>
    </div>
  );
};
