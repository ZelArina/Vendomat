import React, { useEffect, useState } from "react";
import './getGrocery.css';

const GetGrocery = ({choosedItemName, choosedItemCount, choosedGrosery}) => {
    const [name, setItem] = useState('');
    const [grosery, setGrosery] = useState('');

    useEffect(() => {
        setItem(choosedItemName);
        setTimeout((() => setItem('')), 5000);
    }, [choosedItemName, choosedItemCount ]);
    
    useEffect(() => {
        setGrosery(choosedGrosery);
        setTimeout((() => setGrosery('')), 10000);
    }, [choosedGrosery]);

    return(
        <div className="item-wrap">
            <Grosery grosery={grosery} name={name}/>
        </div>
    )
}

export default GetGrocery;


const Grosery = ({grosery, name}) => {
    if (name){
        return(
            <div className="item">
                <p>{name}</p>
            </div>
        )
    }else if(grosery.length > 0){
        return (
            <div className="item">
                <ul>
                    {
                        grosery.map((item, key) => (
                            <li key={key}>{`${item.name} кол-во: ${item.number}`}</li>
                        ))
                    }
                </ul>
            </div>
        )
    }else{
        return
    }  
}