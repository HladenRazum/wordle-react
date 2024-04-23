import { useState } from "react";
import Word from "./Word";

const solution = "BELLY";

function App() {
  const [attempts, setAttempts] = useState(Array(6).fill("LESLB"));

  return (
    <>
      <h1>Worlde App</h1>
      {attempts.map((attempt, i) => (
        <Word word={attempt} key={i} solution={solution} />
      ))}
    </>
  );
}

export default App;
