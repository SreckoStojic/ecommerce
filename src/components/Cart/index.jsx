import React from "react";
import CartItem from "../CartItem";
import Header from "../Header";
import './Cart.css';

function Cart(props) {
    function calculateTotalPrice() {
        let total = 0;
        props.cartItems.forEach(item => {
            total += item.price;
        });
        return total;
    }
    return (
        <div>
            <Header cartCount={props.cartItems.length}/>
            <table className="css-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Weight</th>
                        <th>Color</th>
                        <th>Price</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.cartItems.map(ci => 
                        <CartItem id={ci.id} key={ci.id} name={ci.name} color={ci.color} weight={ci.weight} price={ci.price} count={ci.count} handleClick={() => props.removeItemFromCart(ci.id)}/>
                    )
                    
                }
                <tr className="css-total-price-tr">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><span>Total Price:</span></td> 
                    <td><span>{calculateTotalPrice()} RSD</span></td>
                    <td><button type="button" onClick={() => props.clearCart()}>Clear All</button></td>
                </tr>
                </tbody>
            </table>
        </div>
        
    );
};

export default Cart;