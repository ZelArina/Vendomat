import React from "react";
import './money.css';

const Money = ({onMoneyPut}) => {

    const counter = (e) => {
        onMoneyPut(e.target.value);
    }

    return(
        <div className="money">
            <button 
                className="btn m-btn"
                value={50}
                onClick={counter}
            >50 руб</button>
            <button 
                className="btn m-btn"
                value={100}
                onClick={counter}
            >100 руб</button>
            <button 
                className="btn m-btn"
                value={500}
                onClick={counter}
            >500 руб</button>
            <button 
                className="btn m-btn"
                value={1000}
                onClick={counter}
            >1000 руб</button>
        </div>
    )
}

export default Money;