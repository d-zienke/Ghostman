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
  const [chances, setChances] = useState(3)
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
      showMessage('well done')
      setGuessedLetters(prevState => [...prevState, letter])
    } else {
      showMessage('try again')
      setChances(prevChances => prevChances - 1)
    }
  }

  function showMessage(message) {
    setStatusMsg(message)
  }

  function startGame() {
    setGame({isOn: true, status: "on"})
  }

  function endGame() {
    setGame({isOn: false, status: "over"})
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
            onClick={game.isOn ? endGame : startGame}
          >{game.isOn ? "I give up" : "new game"}</button>
        </div>
      </section>
    </main>
  )
}

export default Ghostman