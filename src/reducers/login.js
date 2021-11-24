const initialState = {
    isLogged : localStorage.getItem('isLogged') || false
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            state.isLogged = true;
            console.log(state);
            return Object.assign({}, state);
        case 'LOGOUT':
            state.isLogged = false;
            return Object.assign({}, state);
        default:
            return state;
    }
}

export default loginReducer;