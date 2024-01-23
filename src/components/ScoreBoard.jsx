export default function ScoreBoard({score, bestScore}) {
    return (
        <div className="score-board">
            Score: {score} BestScore: {bestScore}
        </div>
    )
}