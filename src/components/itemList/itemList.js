import React from "react";
import './itemList.css';

const ItemList = ({grosery}) => {
    
    const item = (i) => {
        return i.map((item, key) => {
            return(
                <li key={key} className="list-group-item">
                    <p>{item.name}</p>
                    <p>{`${item.price} руб`}</p>
                    <p>{`код: ${item.key}`}</p>
                </li>
            )
        })
    } 
    const items = item(grosery);
    return(
        <div className="item-conteiner">
            <ul className="items">{items}</ul>
        </div>
    )
    
}
export default ItemList;
