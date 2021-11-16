import { getProductById } from "../utils/products";

const initialState = {
    cartItems: [],
    totalItemsPrice: 0,
    totalItemsCount: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM_TO_CART':
            addItemToCart(state, action.param);
            state.totalItemsCount += 1;
            return Object.assign({}, state);
        case 'REMOVE_ITEM_FROM_CART':
            const newState = {}
            const cItems = removeItemFromCart(state, action.param);
            newState.cartItems = [...cItems];
            return Object.assign({}, newState);
        default:
            return state;
    }
}

export default cartReducer;


function addItemToCart(state, productId) {
    let found = false;
    const product = getProductById(productId);
    if(state.cartItems.length === 0) {
      if(product.count > 0){
        product.inCart += 1;
        state.cartItems.push(product);
      }
    } else {
      state.cartItems.forEach(ci => {
        if(ci.id === product.id){
          if(ci.inCart < ci.count && ci.count > 0){
            ci.inCart += 1;
          }
          found = true;
        }
      });
      if(found === false) {
        if(product.count > 0){
          product.inCart += 1;
          state.cartItems.push(product);
        }
      }
    }
  }

  function removeItemFromCart(state, productId) {
    state.cartItems.forEach(cartItem => {
        if(Number(cartItem.id) === Number(productId)) {
            state.cartItems.pop(cartItem);
        }
    });
    return state.cartItems;
  }