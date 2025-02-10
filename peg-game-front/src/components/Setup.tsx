import { Dispatch, SetStateAction } from "react";
import { setBoard } from "../utils/algorithm";

type SetupProps = {
  setEmptyHole: Dispatch<SetStateAction<number>>;
};

export const Setup = ({ setEmptyHole }: SetupProps) => {
  const setupBoard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.currentTarget.value;
    setBoard(value);
    setEmptyHole(value);
  };

  return (
    <div>
      <label>
        Enter the empty hole:{" "}
        <input type="number" name="emptyHole" onChange={setupBoard} />
      </label>
    </div>
  );
};
