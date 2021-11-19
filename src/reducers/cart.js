import { getProductById, getProducts } from "../utils/products";

const initialState = {
    cartItems: [],
    totalItemsCount: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM_TO_CART':
            addItemToCart(state, action.param);
            state.totalItemsCount = calculateTotalCartCount(state);
            return Object.assign({}, state);
        case 'REMOVE_ITEM_FROM_CART':
            return Object.assign({}, removeItemFromCart(state, action.param));
        case 'CLEAR_CART':
            return Object.assign({}, clearCart(state));
        case 'ADD_IN_CART_BY_ONE':
            let newStateAddByOne = addInCartByOne(state, action.param);
            newStateAddByOne.cartItems = [...newStateAddByOne.cartItems];
            return Object.assign({}, newStateAddByOne);
        case 'REMOVE_IN_CART_BY_ONE':
            let newStateRemoveByOne = removeInCartByOne(state, action.param);
            newStateRemoveByOne.cartItems = [...newStateRemoveByOne.cartItems];
            return Object.assign({}, newStateRemoveByOne);
        case 'PURCHASE':
            return Object.assign({}, purchase(state));
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
    state.cartItems = state.cartItems.filter(cartItem => {
        return cartItem.id !== productId;
    });
    state.totalItemsCount = calculateTotalCartCount(state);
    return state;
  }

  function clearCart(state) {
    state.cartItems = [];
    state.totalItemsCount = 0;
    clearInCartCount();
    return state;
  }

  function clearInCartCount() {
    getProducts().forEach(p => {
      p.inCart = 0;
    });
  }

  function addInCartByOne(state, productId) {
    state.cartItems.forEach(ci => {
      if(ci.id === Number(productId)) {
        ci.inCart += 1;
      }
    });
    state.totalItemsCount = calculateTotalCartCount(state);
    return state;
  }

  function removeInCartByOne(state, productId) {
    state.cartItems.forEach(ci => {
      if(ci.id === Number(productId)) {
        ci.inCart -= 1;
      }
    });
    state.totalItemsCount = calculateTotalCartCount(state);
    return state;
  }
  
  function purchase(state) {
    if(state.cartItems.length !== 0) {
      alert("Thanks for buying our products. Receipt is sent to your email address.");
      let newState = resetInCart(state);
      clearCart(newState);
      return newState;
    } else {
      alert("Cart is empty.");
    }
    return state;
  }

  function resetInCart(state) {
    getProducts().forEach(product => {
      state.cartItems.forEach(ci => {
        if(product.id === ci.id){
          product.count -= ci.inCart; 
        }
      });
    });
    return state;
  }

  function calculateTotalCartCount(state) {
    let totalCartCnt = 0;
    if(state.cartItems.length !== 0){
        state.cartItems.forEach(ci => {
            totalCartCnt += ci.inCart;
        });
    }
    return totalCartCnt;
  }