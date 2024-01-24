import React, { useState} from "react";
import Money from "../Money/money";
import './chooseItems.css';
import Change from "../change/change";

const ChooseItems = ({grosery, onGetItem, onGetgrosery}) => {
    const [number, setNumber] = useState('');
    const [errorNumber, setErrorNumber] = useState('');
    const [money, setMoney] = useState(0);
    const [errorMoney, setErrorMoney] = useState('');

    const onValueChange = (e) => {
        const event = +e.target.value;
        setNumber(event);
        if(event < 0 || event > 8 || !event || !(typeof event === 'number') || isNaN(event)){
            setErrorNumber('Неверный код');
        }else{
            setErrorNumber('');
            setNumber(event);
        }
    }

    const onMoneyPut = (value) => {
        setMoney(m =>  m + (+value));
    }

    const onWithdrawal = (balance) => {
        setMoney(balance);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (errorNumber){
            setErrorNumber('');
            setNumber('');
        }else if(!number){
            setErrorNumber('Код не введен');
        }else{
            onChooseItem(grosery,number,money)
        }

    }

    const onChooseItem = (items, number, money) => {
        const item = items.find((item) => {
            return item.key === +number;
        })
        let balance = money - item.price;
        if ((balance) < 0){
            setErrorMoney('Недостаточно средств');
        }else if(item.name === ''){
            setErrorNumber('Товар закончился');
        }else{
            setErrorNumber('');
            setErrorMoney('');
            setMoney(balance);
            setNumber('');
            onGetItem(item);
        }
    }

    const onWithdrawalGrocery = (WithdrawaGrocery) => {
        onGetgrosery(WithdrawaGrocery);
    }

    return(
        <div className="info-conteiner">
            <div className="information">
                <p>{`Внесено ${money} руб`}</p>
                <p>{errorMoney}</p>
                <p>{`Выбран товар: ${number}`}</p>
                <p>{errorNumber}</p>
            </div>
            <form 
                className="form-wrap"
                >
                <div className="form-choose">
                    <input
                        type="text"
                        placeholder="Введите код товара"
                        className="input-number"
                        onChange={onValueChange}
                        value={number}
                        />
                    <button
                        type="submit"
                        className="btn"
                        onClick={onSubmit}
                    >OK</button>
                </div>
            </form>
            <Money onMoneyPut={onMoneyPut}/>
            <Change 
                grosery={grosery}
                balance={money} 
                onWithdrawal={onWithdrawal} 
                onWithdrawalGrocery={onWithdrawalGrocery}/>
        </div>
        
    )
    
}

export default ChooseItems;