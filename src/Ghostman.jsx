import React, {useState, useEffect, useMemo} from "react"
import { createClient } from '@supabase/supabase-js'
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

// React components
import GameOn from "./components/Game-on"
import GameOff from "./components/Game-off"
import GameStatus from "./components/Game-status"
import Keyboard from "./components/Keyboard.jsx"
import Modal from "./components/Modal"

function Ghostman() {
  const [game, setGame] = useState({
    isOn: false,
    status: "off"
  })
  const [word, setWord] = useState("")
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [chances, setChances] = useState(6)
  const [statusMsg, setStatusMsg] = useState("Good luck!")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const wordArray = word.split("")
  const lettersToGuess = getLettersToGuess()
  const puzzle = getPuzzle()

  // turn off for testing -------------
  useEffect(()=>{
    getWord()
      .then(data => {
        setWord(data[0].puzzle_word)
      })
      .catch(error => {
        console.log(`Error: ${error}`)
      })
  },[])
  
  async function getWord() {
    const randomIndex = Math.floor(Math.random() * 220) + 1;
    
    const supabaseUrl = 'https://dtwbyxxwpwmlzdhjmcql.supabase.co'
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    let { data: randomWord, error } = await supabase
    .from('puzzles')
    .select('puzzle_word')
    .eq('id', randomIndex)
    return randomWord
  }
  //

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
    const newWrongLetters = [...wrongLetters, letter]
    setWrongLetters(newWrongLetters)
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

  // turn off for testing -------------
  function setNewGame() {
    getWord()
    .then(data => {
      setWord(data[0].puzzle_word)
      toggleGame(true, "on")
      setGuessedLetters([])
      setWrongLetters([])
      setStatusMsg("Good luck!")
      setChances(6)
    })
    .catch(error => {
      console.log(`Error: ${error}`)
    })
  }
  //

  /* uncomment for testing ------------
  function setNewGame() {
    setWord("hello world")
    toggleGame(true, "on")
    setGuessedLetters([])
    setChances(6)
  }
  */

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
    <>
      {game.status==="won" && <Confetti/>}
      {(game.isOn && isModalOpen) && <Modal toggleModal={setIsModalOpen}/>}
      <header className="header">
        <span className="repository">
          <a href="https://github.com/d-zienke/Ghostman">GitHub repository</a>
        </span>
        <span className="version">v. 1.2.0</span>
      </header>
      <main className="Ghostman">
        <section className="Ghostman__status">
          <GameStatus game={game} statusMsg={statusMsg}/>
        </section>
        <section className={game.isOn ? "Ghostman__controls" : "Ghostman__controls Ghostman__controls--inactive"}>
          {game.isOn ? 
            <>
              <GameOn puzzle={puzzle} chances={chances}/> 
              <div className="Ghostman__keyboard">
                <Keyboard handleClick={makeGuess} guessedLetters={guessedLetters} wrongLetters={wrongLetters}/>
              </div>
            </>
            : 
            <GameOff game={game} word={word}/>
          }
          <div className="Ghostman__button-container">
            {game.isOn && <button 
              className="btn btn--outline" 
              onClick={()=>{setIsModalOpen(true)}}
            >how to play</button>}
            <button 
              className="btn" 
              onClick={handleButtonClick}
            >{game.isOn && game.status === "on" ? "I give up" : "new game"}</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <span className="author">Designed and created by <a href="https://github.com/d-zienke?tab=repositories">Damian Zienke</a></span>
        <div className="credits">
          <p>Pictures and icons by <a href="https://www.freepik.com/author/andhndstd">andhndstd</a> on Freepik,<br></br> <a href="https://www.iconfinder.com/quizanswers">Vlad Marin</a> and <a href="https://www.iconfinder.com/korawan_m">BomSymbols</a> on Iconfinder</p>
        </div>
      </footer>
    </>
  )
}

export default Ghostman
