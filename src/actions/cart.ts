export const addItemToCart = (productId : number) => {
    return {
        type: 'ADD_ITEM_TO_CART',
        payload: productId
    }
}

export const removeItemFromCart = (productId : number) => {
    return {
        type: 'REMOVE_ITEM_FROM_CART',
        payload: productId
    }
}

export const clearCart = () => {
    return {
        type: 'CLEAR_CART'
    }
}

export const addInCartByOne = (productId : number) => {
    return {
        type: 'ADD_IN_CART_BY_ONE',
        payload: productId
    }
}

export const removeInCartByOne = (productId : number) => {
    return {
        type: 'REMOVE_IN_CART_BY_ONE',
        payload: productId
    }
}

export const purchase = () => {
    return {
        type: 'PURCHASE'
    }
}