import { useState } from "react";
import MainSection from "./MainSection";

function App() {
  const [score, setScore] = useState(0);

  return (
    <>
      <h1 className="title">Memory Game</h1>
      <MainSection score={score} setScore={setScore}/>
    </>
  );
}

export default App;
