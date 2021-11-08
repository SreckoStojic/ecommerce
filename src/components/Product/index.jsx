import React from "react";
import './Product.css';

function Product(props) {
    return (
        <div className="css-product">
            <a href={`/products/product/${props.id}`} ><img alt={props.name} src={props.imgUrl} /></a>
            <h2>{props.name}</h2>
            <h1>{props.price} RSD</h1>
            <button type="button" onClick={props.handleClick}>Add To Cart</button>
        </div>
    );
};

export default Product;