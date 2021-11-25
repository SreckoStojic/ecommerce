import CartItem from "../../components/CartItem"
import Header from "../../components/Header";
import styles from './Cart.module.css';
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from '../../actions/cart';
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { handlePurchase } from '../../utils/apiFunctions';
import { ReactElement } from "react";
import { ICartItem } from '../../components/CartItem';
import { RootState } from '../../reducers/index';

function Cart() : ReactElement {
    const { t } = useTranslation();
    const columns : string[] = ['ID', t('name'), t('weight'), t('color'), t('count'), t('price'), t('remove')];
    const navigate = useNavigate();
    const cartItems : ICartItem[] = useSelector((state : RootState) => state.cart.cartItems);
    const dispatch = useDispatch();
    
    function calculateTotalPrice() : number {
        let total = 0;
        cartItems.forEach((item : ICartItem) => {
            total += item.price * item.inCart;
        });
        return total;
    }

    return (
        <div>
            <Header />
            <table className={styles['table']}>
                <thead>
                    <tr>
                        {columns.map(column => <th key={column}>{column} </th>)}
                    </tr>
                </thead>
                <tbody>
                {
                    cartItems.map(ci => <CartItem cartItem={ci} key={ci.id} />)
                }
                <tr className={styles['total-price-tr']}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><span>{t('totalPrice')}:</span></td> 
                    <td><span>{calculateTotalPrice()} RSD</span></td>
                    <td><button className={styles['clear-all-btn']} type="button" onClick={() => dispatch(clearCart())}>{t('clearAll')}</button></td>
                </tr>
                <tr className={styles['total-price-tr']}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td> 
                    <td></td>
                    <td><button className={styles['buy-btn']} type="button" onClick={() => handlePurchase(dispatch, navigate, cartItems)}>{t('purchase')}</button></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Cart;