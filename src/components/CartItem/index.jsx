import styles from './CartItem.module.css';
import { removeItemFromCart } from '../../actions';
import { useDispatch } from 'react-redux';

function CartItem({cartItem, removeInCartByOne, addInCartByOne}) {
    const dispatch = useDispatch();
    return (
        <tr>
            <td>{cartItem.id}</td>
            <td>{cartItem.name}</td>
            <td>{cartItem.weight} g</td>
            <td>{cartItem.color}</td>
            <td><button className={styles['count-btn']} type="button" onClick={removeInCartByOne} disabled={(cartItem.inCart > 1) ? false : true} >-1</button>{cartItem.inCart}/{cartItem.count}<button className={styles['count-btn']} type="button" onClick={addInCartByOne} disabled={(cartItem.inCart < cartItem.count) ? false : true}>+1</button></td>
            <td>{cartItem.inCart} x {cartItem.price} RSD</td>
            <td><button className={styles['remove-btn']} type="button" onClick={() => dispatch(removeItemFromCart(cartItem.id))}>X</button></td>
        </tr>
    );
};

export default CartItem;