function GameOff({ game, word }) {
  const isGameOver = !game.isOn && game.status === "over"

  return (
    <>
      <div className="Ghostman__intro">
        <p>{!isGameOver && "Ghostman"}</p>
        <p>{isGameOver ? `Better luck next time :) The word to guess was: ` : 
        `This simple word game is based on the well-known classic “Hangman”`
        }</p>
        {isGameOver ? <p className="Ghostman__word">{word}</p> : <p>Try to guess the hidden word, one letter at a time</p>}
      </div>
      <div className="Ghostman__call-to-start">
        <p>Hit the button below to start</p>
      </div>
    </>
  )
}
  
export default GameOff