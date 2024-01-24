import React, { useState } from "react";
import './app.css';
import ItemList from "../itemList/itemList";
import ChooseItems from "../chooseItems/chooseItems";
import GetGrocery from "../GetGrocery/GetGrocery";

const App = () => {
    const [grosery, setGrosery] = useState([
        {name: 'mars' , price: 25, key: 1, count: 3},
        {name: 'juice' , price: 50, key: 2, count: 30},
        {name: 'snickers' , price: 37, key: 3, count: 50},
        {name: 'water' , price: 15, key: 4, count: 10},
        {name: 'cola' , price: 70, key: 5, count: 30},
        {name: 'chips' , price: 58, key: 6, count: 20},
        {name: 'cookie' , price: 43, key: 7, count: 10},
        {name: 'm&ms' , price: 75, key: 8, count: 40}
    ]);
    const [choosedItemCount, setChoosedItemCount] = useState('');
    const [choosedItemName, setChoosedItemName] = useState('');
    const [choosedGrosery, setChoosedGrosery] = useState([]);

    const onGetgrosery = (choosedGros) => {
        setChoosedGrosery(choosedGros);
        setGrosery(items => {
            return items.map(item => {
                let newItem = {...item};
                for (let i = 0; i < choosedGros.length; i++) {
                    if(choosedGros[i].name === newItem.name){
                        newItem.count = newItem.count - choosedGros[i].number;
                    }
                }
                if(newItem.count <= 0){
                    newItem.name = '';
                    newItem.price = '';
                }
                return newItem
            });
        });
    }

    const onGetItem = (chosedItem) => {
        setGrosery(items => {
            const index = items.findIndex(item => item.key === chosedItem.key);
            let newGros = [];

            if (index >= 0){
                newGros = items.splice(index, 1);
            }else{
                return
            }
            let newItem = newGros[0];
            if (newItem.count > 0){
                newItem.count = newItem.count - 1;
                setChoosedItemName(newItem.name);
                setChoosedItemCount(newItem.count);
                
                if (newItem.count <= 0) {
                    newItem.name = '';
                    newItem.price = '';
                    return [...items.slice(0, index),newItem,...items.slice(index)] 
                }

                return [...items.slice(0, index),newItem,...items.slice(index)];
            }else{
                newItem.name = '';
                newItem.price = '';
                return [...items.slice(0, index),newItem,...items.slice(index)] 
            }
             
        });
        
    }

    return (
        <div className="wrapper">
            <div className="main">
                <div className="container-items">
                    <div className="container-itemList">
                        <ItemList grosery={grosery}/>
                    </div>
                    <div className="conteiner-itemDeteils">
                        <GetGrocery 
                            choosedItemName={choosedItemName} 
                            choosedItemCount={choosedItemCount} 
                            choosedGrosery={choosedGrosery}/>
                    </div> 
                </div>
                <div className="container-choose">
                    <div className="chooseItems">
                        <ChooseItems 
                            grosery={grosery} 
                            onGetItem={onGetItem} 
                            onGetgrosery={onGetgrosery}/>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default App;