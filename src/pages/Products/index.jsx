import Product from '../../components/Product';
import Header from "../../components/Header";
import { getProducts }  from '../../utils/products';
import { useSearchParams } from "react-router-dom";
import styles from './Products.module.css';

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <div>
            <Header />
            <input className={styles['search']} placeholder="Search..." value={searchParams.get("search") || ''} 
            onChange={event => {
                let search = event.target.value;
                if (search) {
                    setSearchParams({ search });
                } else {
                    setSearchParams({});
                }
            }}/>
            <div className={styles['products']}>
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
                    <Product product={p} key={p.id} />
                )}
            </div>
        </div>
    );
};

export default Products;