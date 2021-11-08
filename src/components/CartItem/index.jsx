import React from "react";
import './CartItem.css';

function CartItem(props) {
    return (
        <tr className="css-cart-item">
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.weight} g</td>
            <td>{props.color}</td>
            <td>{props.price} RSD</td>
            <td><button className="css-remove-btn" type="button" onClick={props.handleClick}>X</button></td>
        </tr>
    );
};

export default CartItem;