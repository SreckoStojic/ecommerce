import styles from './ProductInfo.module.css';
import { useParams } from "react-router-dom";
import { getProductById } from "../../utils/products";
import Header from "../../components/Header";
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../actions'


function ProductInfo() {
    const dispatch = useDispatch();
    let { productId } = useParams();
    let product = getProductById(productId);
    return (
        <div>
            <Header />
            <div className={styles['product-info']}>
                <div className={styles['product-info-img']}>
                    <img alt={product.name} src={product.imgUrl} />
                </div>
                <div className={styles['product-info-details']}>
                    <h3>{product.name}</h3>
                    <p>Weight: {product.weight} g</p>
                    <p>Color: {product.color}</p>
                    <p>Products left: {product.count}</p>
                    <p>Price:<span> {product.price} RSD </span></p>
                    <button type="button" onClick={() => dispatch(addItemToCart(product.id))}>Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;