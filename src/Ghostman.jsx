import React, {useState, useEffect, useMemo} from "react"
import { createClient } from '@supabase/supabase-js'

// React components
import GameOn from "./components/Game-on"
import GameOff from "./components/Game-off"
import GameStatus from "./components/Game-status"
import Keyboard from "./components/Keyboard.jsx"

// import data from "./data"

function Ghostman() {
  const [game, setGame] = useState({
    isOn: false,
    status: "off"
  })
  const [word, setWord] = useState("")
  const [guessedLetters, setGuessedLetters] = useState([])
  const [chances, setChances] = useState(6)
  const [statusMsg, setStatusMsg] = useState("Good luck!")
  const wordArray = word.split("")
  const lettersToGuess = getLettersToGuess()
  const puzzle = getPuzzle()

  useEffect(()=>{
    getWord()
      .then(data => {
        setWord(data[0].puzzle_eng)
      })
      .catch(error => {
        console.log(`Error: ${error}`)
      })
  },[])
  
  async function getWord() {
    const randomIndex = Math.floor(Math.random() * 100) + 1;
    
    const supabaseUrl = 'https://dtwbyxxwpwmlzdhjmcql.supabase.co'
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    let { data: randomWord, error } = await supabase
    .from('puzzles-eng')
    .select('puzzle_eng')
    .eq('id', randomIndex)

    return randomWord
  }

  getWord()
  // function getWord() {
  //   const wordsArray = data
  //   const randomIndex = Math.floor(Math.random() * (data.length + 1));
  //   return String(wordsArray[randomIndex].puzzle_eng)
  // }

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
    getWord()
    .then(data => {
      setWord(data[0].puzzle_eng)
      toggleGame(true, "on")
      setGuessedLetters([])
      setChances(6)
    })
    .catch(error => {
      console.log(`Error: ${error}`)
    })
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