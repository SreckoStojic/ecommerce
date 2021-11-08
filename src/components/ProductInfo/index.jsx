import React from "react";
import './ProductInfo.css';
import { useParams } from "react-router-dom";
import { getProductById } from "../../data/products";
import Header from "../Header";


function ProductInfo(props) {
    let { productId } = useParams();
    let product = getProductById(productId);
    return (
        <div>
            <Header cartCount={props.cartItems.length} cartItems={props.cartItems}/>
            <div className="css-product-info">
                <div className="css-product-info-img">
                    <img alt={product.name} src={product.imgUrl} />
                </div>
                <div className="css-product-info-details">
                    <h3>{product.name}</h3>
                    <p>Weight: {product.weight} g</p>
                    <p>Color: {product.color}</p>
                    <p>Products left: {product.count}</p>
                    <p>Count: {product.count}</p>
                    <p>Price:<span> {product.price} RSD </span></p>
                    <button type="button" onClick={() => props.addItemToCart(product.id)}>Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;