import styles from './CartItem.module.css';
import { removeItemFromCart, addInCartByOne, removeInCartByOne } from '../../actions/cart';
import { useDispatch } from 'react-redux';
import { ReactElement } from 'react';

interface PropsTypeCartItem {
    cartItem: ICartItem
}

export interface ICartItem {
    id: number;
    name: string;
    count: number;
    price: number;
    weight: number;
    imgUrl: string;
    color: string;
    inCart: number;
}

function CartItem({cartItem} : PropsTypeCartItem) : ReactElement {
    const dispatch = useDispatch();
    return (
        <tr>
            <td>{cartItem.id}</td>
            <td>{cartItem.name}</td>
            <td>{cartItem.weight} g</td>
            <td>{cartItem.color}</td>
            <td><button className={styles['count-btn']} type="button" onClick={() => dispatch(removeInCartByOne(cartItem.id))} disabled={(cartItem.inCart > 1) ? false : true} >-1</button>{cartItem.inCart}/{cartItem.count}<button className={styles['count-btn']} type="button" onClick={() => dispatch(addInCartByOne(cartItem.id))} disabled={(cartItem.inCart < cartItem.count) ? false : true}>+1</button></td>
            <td>{cartItem.inCart} x {cartItem.price} RSD</td>
            <td><button className={styles['remove-btn']} type="button" onClick={() => dispatch(removeItemFromCart(cartItem.id))}>X</button></td>
        </tr>
    );
};

export default CartItem;