import Product from '../Product';
import Header from "../Header";
import { getProducts }  from '../../data/products';
import { useSearchParams } from "react-router-dom";
import './Products.css';

function Products(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    
    return (
        <div>
            <Header cartCount={props.cartItems.length} cartItems={props.cartItems}/>
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
                {getProducts().filter(prod => {
                    let search = searchParams.get("search"); 
                    if(!search) {
                        return true;
                    }
                    if (prod.name.toLowerCase().includes(search.toLowerCase())) {
                        return true;
                    }
                })
                .map(p => 
                    <Product cartItems={props.cartItems} id={p.id} key={p.id} name={p.name} price={p.price} weight={p.weight} color={p.color} count={p.count} inCart={p.inCart} imgUrl={p.imgUrl} handleClick={() => props.addItemToCart(p.id)}/>
                )}
            </div>
        </div>
    );
};

export default Products;