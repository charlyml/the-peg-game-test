import { useState } from "react";
import "./App.css";
import { Game } from "./components/Game";
import { Setup } from "./components/Setup";

function App() {
  const [emptyHole, setEmptyHole] = useState<number>(-1);

  return (
    <div className="App">
      {emptyHole >= 0 ? (
        <Game emptyHole={emptyHole} />
      ) : (
        <Setup setEmptyHole={setEmptyHole} />
      )}
    </div>
  );
}

export default App;
