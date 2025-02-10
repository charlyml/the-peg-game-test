import { Dispatch, SetStateAction } from "react";
import { setBoard } from "../utils/algorithm";

type SetupProps = {
  setEmptyHole: Dispatch<SetStateAction<number>>;
};

export const Setup = ({ setEmptyHole }: SetupProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDataValue = formData.get("emptyHole");
    const emptyHole = +formDataValue!;
    setEmptyHole(emptyHole);
    setBoard(emptyHole);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter the empty hole: <input type="number" name="emptyHole" />
        </label>
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
};
