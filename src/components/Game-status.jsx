// Images to be rendered in game
import picGameOff from "../assets/images/ghost_game-off.png"
import picGameOn from "../assets/images/ghost_game-on.png"
import picGameOver from "../assets/images/ghost_game-over.png"
import picGameWon from "../assets/images/ghost_game-won.png"

function GameStatus({ game, statusMsg }) {

  function switchPics() {
    let pic = ""
    switch (game.status) {
      case "off":
        pic = picGameOff
        break;
      case "on":
        pic = picGameOn
        break;
      case "over":
        pic = picGameOver
        break;
      case "won":
        pic = picGameWon
        break;
    }
    return pic
  }

  return (
    <>
      <div className="Ghostman__picture">
        <img src={switchPics()} alt="ghost picture" />
      </div>
      {game.isOn && 
      <div className="Ghostman__message">
        <p>{statusMsg}</p>
      </div>}
    </>
  )
}

export default GameStatus