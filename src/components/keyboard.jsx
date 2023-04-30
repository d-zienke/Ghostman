function Keyboard({ handleClick, guessedLetters }) {
    const keysArray = [
        "q","w","e","r","t","y","u","i","o","p",
        "a","s","d","f","g","h","j","k","l",
        "z","x","c","v","b","n","m"
    ]

    // const keysElements = keysArray.map(key => <a>{key}</a>)

    const keysElements = keysArray.map((key, index) => {
        
        let className = `Keyboard__key Keyboard__row-${
            index <= 9 ?
            1 :
            index <= 18 ?
            2 : 3
        }`
        if(guessedLetters.indexOf(key) !== -1) className += ` Keyboard__key--used`

        
        return <a 
        className={className}
        key={key}
        onClick={() => handleClick(key)}
        >{key}</a>
    })
    return (
        <div className="Keyboard">
            {keysElements}
        </div>
    )
}

export default Keyboard