import styles from './Product.module.css';
import { Link } from 'react-router-dom';
import { addItemToCart } from '../../actions/cart';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
 
function Product({product}) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    return (
        <div className={styles['product']}>
            <Link to={`/products/product/${product.id}`} ><img alt={product.name} src={product.imgUrl} /></Link>
            <h2>{product.name}</h2>
            <h1>{product.price} RSD</h1>
            <button type="button" onClick={() => dispatch(addItemToCart(product.id))}>{t('addToCart')}</button>
        </div>
    );
};

export default Product;