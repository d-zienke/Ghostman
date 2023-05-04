import React, {useState, useEffect} from "react"

// React components
import GameOn from "./components/Game-on"
import GameOff from "./components/Game-off"
import GameStatus from "./components/Game-status"
import Keyboard from "./components/Keyboard.jsx"

function Ghostman() {
  const [game, setGame] = useState({
    isOn: false,
    status: "off"
  })
  const [word, setWord] = useState("hello world")
  const [guessedLetters, setGuessedLetters] = useState([])
  const [chances, setChances] = useState(5)
  const [statusMsg, setStatusMsg] = useState("Good luck!")
  const wordArray = word.split("")
  const lettersToGuess = getLettersToGuess()
  const puzzle = getPuzzle()
  
  function getLettersToGuess() {
    return wordArray.filter((letter, index) => {
      return (letter !== " " && wordArray.indexOf(letter) === index) ? letter : null
    })
  } 

  function getPuzzle() {
    return wordArray.map(letter => {
      return (letter === " " || guessedLetters.indexOf(letter) !== -1) ?
      letter : "_"
    }).join("")
  }

  function makeGuess(letter) {
    if(guessedLetters.indexOf(letter) !== -1) {
      showMessage(`already guessed`)
    } else if (wordArray.indexOf(letter) !== -1) {
      handleGoodGuess(letter)
    } else {
      handleWrongGuess(letter)
    }
  }

  function handleGoodGuess(letter) {
    showMessage('well done')
    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters)
    isGameWon(newGuessedLetters) && toggleGame(true, "won")
  }
  
  function handleWrongGuess(letter) {
    showMessage('try again')
    const newChances = chances - 1;
    setChances(newChances)
    isGameOver(newChances) && toggleGame(false, "over")
  }

  function showMessage(message) {
    setStatusMsg(message)
  }

  function isGameWon(guessedLetters) {
    return guessedLetters.length === lettersToGuess.length
  }

  function isGameOver(chances) {
    return chances < 1
  }

  function toggleGame(isOn, status) {
    setGame({isOn: isOn, status: status})
  }

  function setNewGame() {
    toggleGame(true, "on")
    setGuessedLetters([])
    setChances(5)
  }

  function handleButtonClick() {
    if(game.isOn) {
      game.status === "won" ?
      setNewGame() :
      toggleGame(false, "over")
    } else {
      setNewGame()
    }
  }

  return (
    <main className="Ghostman">
      <section className="Ghostman__status">
        <GameStatus game={game} statusMsg={statusMsg}/>
      </section>
      <section className="Ghostman__controls">
        {game.isOn ? 
          <>
            <GameOn puzzle={puzzle} chances={chances}/> 
            <div className="Ghostman__keyboard">
              <Keyboard handleClick={makeGuess} guessedLetters={guessedLetters}/>
            </div>
          </>
          : 
          <GameOff game={game} word={word}/>
        }
        <div className="Ghostman__button-container">
          <button 
            className="btn" 
            onClick={handleButtonClick}
          >{game.isOn && game.status === "on" ? "I give up" : "new game"}</button>
        </div>
      </section>
    </main>
  )
}

export default Ghostman