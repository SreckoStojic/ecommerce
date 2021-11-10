import products from '../data/products';

export function getProducts() {
    return products;
}

export function getProductById(id) {
    let product = null;
    products.forEach(p => {
        if(p.id === Number(id)) {
            product = p;
        }
    });
    return product;
}