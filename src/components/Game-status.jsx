// Images to be rendered in game
import picGameOff from "../assets/images/ghost_game-off.png"
import picGameOn from "../assets/images/ghost_game-on.png"
import picGameOver from "../assets/images/ghost_game-over.png"
import picGameWon from "../assets/images/ghost_game-won.png"

function GameStatus({ game }) {

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
    <section className="Ghostman__status">
    <div className="Ghostman__picture">
      <img src={switchPics()} alt="ghost picture" />
    </div>
    {game.isOn && 
    <div className="Ghostman__message">
      <p>Good Luck!</p>
    </div>}
  </section>
  )
}

export default GameStatus