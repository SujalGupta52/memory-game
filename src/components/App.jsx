import { useState } from "react";
import MainSection from "./MainSection";
import ScoreBoard from "./ScoreBoard";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameLost, setGameLost] = useState(false);
  if(score > bestScore) setBestScore(score);
  if(gameLost) {
    setScore(0);
    setGameLost(false);
  }

  return (
    <>
      <h1 className="title">Memory Game</h1>
      <MainSection score={score} setScore={setScore} setGameLost={setGameLost}/>
      <ScoreBoard score={score} bestScore={bestScore}/>
    </>
  );
}

export default App;
