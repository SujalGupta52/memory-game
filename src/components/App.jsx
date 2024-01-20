import { useState } from "react";

function App() {
  const [score, setScore] = useState(0);

  return (
    <>
      <h1 className="title">Memory Game</h1>
      <MainSection />
      <ScoreBoard />
      <Footer />
    </>
  );
}

export default App;
