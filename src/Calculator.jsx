import { useState } from "react";

function Calculaor(){

    let [input, setInput] = useState("");

    const buttons = [
        "1", "2", "3", "+",
        "4", "5", "6", "-",
        "7", "8", "9", "*",
        "0", ".", "=", "/",
    ];

    function manageButtonClick(value){

        if (value === "=") {
            try {
                setInput(eval(input).toString());
            } catch (error) {
                setInput("Error");
            }
        } else {
            setInput(input + value);
        }
    };

    function reset(){

        setInput("");
    }

    function manageDel(){

        if(input.length > 0){
            setInput(input.slice(0, -1));
        }
    }

    return(
        <div className="calculator">
            <div className="display">
                {input}
            </div>
            <div className="my-button">
                {buttons.map((btn) => <button onClick={() => manageButtonClick(btn)} key={btn}>{btn}</button>)}
                <button onClick={reset}>AC</button>
                <button onClick={manageDel}>Del</button>
            </div>
        </div>
    );
}
export default Calculaor