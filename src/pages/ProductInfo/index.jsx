import styles from './ProductInfo.module.css';
import { useParams } from "react-router-dom";
import { getProductById } from "../../utils/products";
import Header from "../../components/Header";


function ProductInfo({totalCartCount, cartItems, addItemToCart}) {
    let { productId } = useParams();
    let product = getProductById(productId);
    return (
        <div>
            <Header totalCartCount={totalCartCount} cartItems={cartItems}/>
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
                    <button type="button" onClick={() => addItemToCart(product.id)}>Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;