import React from "react";
import './Product.css';

function Product(props) {
    return (
        <div className="css-product">
            <img alt={props.name} src={props.imgUrl} />
            <h2>{props.name}</h2>
            <h1>{props.price} RSD</h1>
            <button type="button">Add To Cart</button>
        </div>
    );
};

export default Product;