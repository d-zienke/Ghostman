import React, {useState, useEffect} from "react"
import Keyboard from "./components/Keyboard.jsx"

import picGameOff from "./assets/images/ghost_game-off.png"
import picGameOn from "./assets/images/ghost_game-on.png"
import picGameOver from "./assets/images/ghost_game-over.png"
import picGameWon from "./assets/images/ghost_game-won.png"
import heartIcon from "./assets/images/heart_icon.svg"

function Ghostman() {
  const [game, setGame] = useState({
    isOn: true,
    status: "On" // keep this capitalized to match the name of img
  })
  const [word, setWord] = useState("hello world")
  const [guessedLetters, setGuessedLetters] = useState(["h", "l", "o"])
  const [chances, setChances] = useState(5)
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

  function renderHearts() {
    const hearts = []
    for(let i = 1; i <= chances; i++) {
      hearts.push(
        <img src={heartIcon}></img>
      )
    }
    return hearts
  }

  function switchPics() {
    let pic = ""
    switch (game.status) {
      case "Off":
        pic = picGameOff
        break;
      case "On":
        pic = picGameOn
        break;
      case "Over":
        pic = picGameOver
        break;
      case "Won":
        pic = picGameWon
        break;
    }
    return pic
  }

  return (
    <main className="Ghostman">
      <section className="Ghostman__status">
        <div className="Ghostman__picture">
          <img src={switchPics()} alt="ghost picture" />
        </div>
        {game.isOn && 
        <div className="Ghostman__message">
          <p>Good Luck!</p>
        </div>}
      </section>
      {
      game.isOn ? /* if the game is NOT active */
      <section className="Ghostman__controls">
        <div className="Ghostman__hearts">{renderHearts()}</div>
        <div className="Ghostman__puzzle"><p>{puzzle}</p></div>
        <Keyboard />
        <div className="Ghostman__button">
          <button className="btn">new game</button>
        </div>
      </section>
      : /* if the game is NOT active */
      <section className="Ghostman__controls">
        <div className="Ghostman__intro">
          <p>Ghostman</p>
          <p>This simple word game is based on the well-known classic “Hangman”</p>
          <p>Try to guess the hidden word, one letter at a time</p>
        </div>
        <div className="Ghostman__call-to-start">
          <p>Hit the button below to start</p>
        </div>
        <div className="Ghostman__button">
          <button className="btn">new game</button>
        </div>
      </section>
      }
    </main>
  )
}

export default Ghostman