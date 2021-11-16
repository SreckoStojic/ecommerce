export const addItemToCart = (productId) => {
    return {
        type: 'ADD_ITEM_TO_CART',
        param: productId
    }
}

export const removeItemFromCart = (productId) => {
    return {
        type: 'REMOVE_ITEM_FROM_CART',
        param: productId
    }
}