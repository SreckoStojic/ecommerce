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

export const clearCart = () => {
    return {
        type: 'CLEAR_CART'
    }
}

export const addInCartByOne = (productId) => {
    return {
        type: 'ADD_IN_CART_BY_ONE',
        param: productId
    }
}

export const removeInCartByOne = (productId) => {
    return {
        type: 'REMOVE_IN_CART_BY_ONE',
        param: productId
    }
}

export const buy = () => {
    return {
        type: 'BUY'
    }
}