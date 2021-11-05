import React from "react";
import Product from '../Product';
import Header from "../Header";
import products  from '../../data/products';
import { useSearchParams } from "react-router-dom";
import './Products.css';

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();    
    
    return (
        <div>
            <Header />
            <input className="css-search" placeholder="Search..." value={searchParams.get("search") || ''} 
            onChange={event => {
                let search = event.target.value;
                if (search) {
                    setSearchParams({ search });
                } else {
                    setSearchParams({});
                }
            }}/>
            <div className="css-products">
                {products.filter(prod => {
                    let search = searchParams.get("search"); 
                    if(!search) {
                        return true;
                    }
                    if (prod.name.toLowerCase().includes(search.toLowerCase())) {
                        return true;
                    }
                })
                .map(p => 
                    <Product id={p.id} key={p.id} name={p.name} price={p.price} weight={p.weight} color={p.color} count={p.count} imgUrl={p.imgUrl} />
                )}
            </div>
        </div>
    );
};

export default Products;