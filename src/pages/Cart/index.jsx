import CartItem from "../../components/CartItem"
import Header from "../../components/Header";
import styles from './Cart.module.css';

const columns = ['ID', 'Name', 'Weight', 'Color', 'Count', 'Price', 'Remove'];

function Cart({cartItems, totalCartCount, buy, removeInCartByOne, removeItemFromCart, addInCartByOne, clearCart}) {
    function calculateTotalPrice() {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.inCart;
        });
        return total;
    }
    return (
        <div>
            <Header totalCartCount={totalCartCount}/>
            <table className={styles['table']}>
                <thead>
                    <tr>
                        {columns.map(column => <th key={column}>{column} </th>)}
                    </tr>
                </thead>
                <tbody>
                {
                    cartItems.map(ci => 
                        <CartItem cartItem={ci} key={ci.id}  handleClick={() => removeItemFromCart(ci.id)} addInCartByOne={() => addInCartByOne(ci.id) } removeInCartByOne={() => removeInCartByOne(ci.id)}/>
                    )
                }
                <tr className={styles['total-price-tr']}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><span>Total Price:</span></td> 
                    <td><span>{calculateTotalPrice()} RSD</span></td>
                    <td><button className={styles['clear-all-btn']} type="button" onClick={() => clearCart()}>Clear All</button></td>
                </tr>
                <tr className={styles['total-price-tr']}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td> 
                    <td></td>
                    <td><button className={styles['buy-btn']} type="button" onClick={() => buy()}>Buy</button></td>
                </tr>
                </tbody>
            </table>
        </div>
        
    );
};

export default Cart;