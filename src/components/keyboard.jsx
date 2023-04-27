function Keyboard() {
    const keysArray = [
        "q","w","e","r","t","y","u","i","o","p",
        "a","s","d","f","g","h","j","k","l",
        "z","x","c","v","b","n","m"
    ]

    // const keysElements = keysArray.map(key => <a>{key}</a>)

    const keysElements = keysArray.map((key, index) => (
        <a 
        className={`keyboard__key keyboard__row-${
            index <= 9 ?
            1 :
            index <= 18 ?
            2 : 3
        }`}
        key={key}
        >{key}</a>
    ))
    return (
        <div className="keyboard">
            {keysElements}
        </div>
    )
}

export default Keyboard