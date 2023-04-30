import Keyboard from "./Keyboard.jsx"

// images to be rendered in game
import heartIcon from "../assets/images/heart_icon.svg"

function GameOn({ puzzle, chances }) {

  function renderHearts() {
    const hearts = []
    for(let i = 1; i <= chances; i++) {
      hearts.push(
        <img key={i} src={heartIcon}></img>
      )
    }
    return hearts
  }

  return (
    <>
      <div className="Ghostman__hearts">
        {renderHearts()}
      </div>
      <div className="Ghostman__puzzle">
        <p>{puzzle}</p>
      </div>
      <Keyboard />
    </>
  )
}

export default GameOn