import styles from './ProductInfo.module.css';
import { useParams } from "react-router-dom";
import { getProductById } from "../../utils/products";
import Header from "../../components/Header";
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../actions/cart'
import { useTranslation } from 'react-i18next';


function ProductInfo() {
    const { t } = useTranslation();
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
                    <p>{t('weight')}: {product.weight} g</p>
                    <p>{t('color')}: {product.color}</p>
                    <p>{t('count')}: {product.count}</p>
                    <p>{t('price')}:<span> {product.price} RSD </span></p>
                    <button type="button" onClick={() => dispatch(addItemToCart(product.id))}>{t('addToCart')}</button>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;