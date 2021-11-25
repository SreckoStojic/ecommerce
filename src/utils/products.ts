import { ICartItem } from '../components/CartItem';
import products from '../data/products';

export function getProducts() : ICartItem[] {
    return products;
}

export function getProductById(id : number) : ICartItem | null {
    let product : ICartItem | null = null;
    products.forEach(p => {
        if(p.id === Number(id)) {
            product = p;
        }
    });
    return product;
}