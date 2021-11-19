import styles from './Product.module.css';
import { Link } from 'react-router-dom';
import { addItemToCart } from '../../actions/cart';
import { useDispatch } from 'react-redux';
 
function Product({product}) {
    const dispatch = useDispatch();
    return (
        <div className={styles['product']}>
            <Link to={`/products/product/${product.id}`} ><img alt={product.name} src={product.imgUrl} /></Link>
            <h2>{product.name}</h2>
            <h1>{product.price} RSD</h1>
            <button type="button" onClick={() => dispatch(addItemToCart(product.id))}>Add To Cart</button>
        </div>
    );
};

export default Product;