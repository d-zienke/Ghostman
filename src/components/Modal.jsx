export default function Modal({ toggleModal }) {
  return (
    <div className="modal">
      <div className="modal__backdrop"></div>
      <div className="modal__window">
        <span className="modal__heading">How to play</span>
        <span className="modal__text">
          To win the game you need to guess the hidden word.
        </span>
        <span className="modal__text">
          Use the keyboard to try a letter. If the word to guess contains the letter you chose, it will appear on screen.
        </span>
        <span className="modal__text"> 
          Picking wrong letter costs you one heart<br/>(the hearts are displayed at the top of the screen).<br/>
        </span>
        <span className="modal__text"> 
          When you lose all the hearts, the game is over.
        </span>
        <button className="modal__btn btn" onClick={()=>{toggleModal(false)}}>continue</button>
      </div>
    </div>
  )
}