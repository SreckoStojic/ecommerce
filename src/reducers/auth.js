const initialState = {
    username: '',
    password: '',
    isLogged: false
}

function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'SIGN_UP': {
            state.username = action.username;
            state.password = action.password;
            return Object.assign({}, state);
        }
        case 'LOGIN': {
            state.username = action.username;
            state.password = action.password;
            state.isLogged = true;
            return Object.assign({}, state);
        }
        case 'LOGOUT': {
            state.username = '';
            state.password = '';
            state.isLogged = false;
            return Object.assign({}, state);
        }
        default:
            return state;    
    }
}

export default authReducer;