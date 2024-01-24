import React, {useState } from "react";
import './change.css';

const money = [
    {price: 500, number: randomInteger(1, 100)},
    {price: 100, number: randomInteger(1, 60)},
    {price: 50, number: randomInteger(1, 50)},
    {price: 10, number: randomInteger(1, 40)},
    {price: 5, number: randomInteger(1, 30)},
    {price: 1, number: randomInteger(1, 20)}
];

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const Change =({balance, grosery, onWithdrawal, onWithdrawalGrocery}) => {

    const [cash, setCash] = useState('');
    const [withdrawal, setWithdrawal] = useState([]);
    const [withdrawalGrocery, setWithdrawalGrocery] = useState([]);
    const [error, setError] = useState('');
    const [isActive, setIsActive] = useState(false);
    
    const withdrawCash = () => {
        const withdrawal = [];
        const withdrawalGrocery = [];
        const withdrawalState = [];
        const withdrawalStateGrocery = [];

        money.forEach((item) =>{
            let count = Math.floor(balance / item.price);

            if (count >= item.number){
                count = item.number;
            }

            item.number -= count;
            withdrawal.push(count);
            balance -= count * item.price;
        });

        if (balance === 0) {

            for (let i = 0; i < money.length; i++) {

                if (withdrawal[i] > 0) {
                    withdrawalState.push({price: money[i].price, number: withdrawal[i]});
                }

            }
            onWithdrawal(balance);

        }else{
            setError('Невозможно получить всю сдачу');

            for (let i = 0; i < money.length; i++) {

                if (withdrawal[i] > 0) {
                    withdrawalState.push({price: money[i].price, number: withdrawal[i]});
                }

            }

            setWithdrawal(withdrawalState);
            setIsActive(true);

            grosery.forEach(item => {
                let count = Math.floor(balance / item.price);

                if (count >= item.count){
                    count = item.count;
                }

                withdrawalGrocery.push(count);
                balance -= count * item.price;
            });
            setCash(balance);
            
            if (balance === 0){
                setError('');
                setIsActive(false);
            }

            for (let i = 0; i < grosery.length; i++) {

                if (withdrawalGrocery[i] > 0) {
                    withdrawalStateGrocery.push({name: grosery[i].name, number: withdrawalGrocery[i]});
                }

            }
            
        }
        setWithdrawal(withdrawalState);
        setWithdrawalGrocery(withdrawalStateGrocery);
        
        setTimeout((() => setWithdrawal([])), 5000);

    }

    const withdrawGrocery = () => {
        onWithdrawalGrocery(withdrawalGrocery);
        onWithdrawal(cash);
        setIsActive(false);
        if (cash === 0) {
            setError('');
        }
    }

    return(
        <div className="change-conteiner">
            <button 
                className="btn btn-change"
                onClick={withdrawCash}
            >Получить сдачу</button>
            <button 
                className={isActive ? "btn btn-change" : "hidden"}
                onClick={withdrawGrocery}
            >Получить сдачу продуктами</button> 
            <p>{error}</p>
            <Update withdrawal={withdrawal}/>  
        </div>
    )
    
}

const Update = ({withdrawal}) => {
    if(withdrawal.length !== 0){
        return (
            <div className="change">
                <ul>
                    {
                        withdrawal.map((item, key)=>(
                            <li key={key}>{`${item.price} руб банкнот:${item.number} `}</li>
                        ))
                    }
                </ul>
            </div>
        )
    }else{
        return
    }
    
}

export default Change;