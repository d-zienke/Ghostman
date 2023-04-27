import React from "react"
import Keyboard from "./components/Keyboard.jsx"

import picGameOff from "./assets/images/ghost_game-off.png"
import picGameOn from "./assets/images/ghost_game-on.png"
import picGameOver from "./assets/images/ghost_game-over.png"
import picGameWon from "./assets/images/ghost_game-won.png"

function Ghostman() {
  return (
    <main className="Ghostman">
      <section className="Ghostman__status">
        <div className="Ghostman__picture-container">
          <img className="Ghostman__picture" src={picGameOff} alt="ghost picture" />
          <p className="Ghostman__status-msg">Good Luck!</p>
        </div>
      </section>
      <section className="Ghostman__controls">
        <div className="Ghostman__puzzle-container">
          <p className="Ghostman__puzzle">
            {false ? "h____ _____" : "Hit the button below to start"}
          </p>
        </div>
        <Keyboard />
        <a className="Ghostman__button">New Game</a>
      </section>
    </main>
  )
}

export default Ghostman