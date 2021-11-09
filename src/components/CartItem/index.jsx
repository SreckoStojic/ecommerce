import React from "react";
import './CartItem.css';

function CartItem(props) {
    return (
        <tr className="css-cart-item">
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.weight} g</td>
            <td>{props.color}</td>
            <td><button className="css-count-btn" type="button" onClick={props.removeInCartByOne} disabled={(props.inCart > 1) ? false : true} >-1</button>{props.inCart}/{props.count}<button className="css-count-btn" type="button" onClick={props.addInCartByOne} disabled={(props.inCart < props.count) ? false : true}>+1</button></td>
            <td>{props.inCart} x {props.price} RSD</td>
            <td><button className="css-remove-btn" type="button" onClick={props.handleClick}>X</button></td>
        </tr>
    );
};

export default CartItem;