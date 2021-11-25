import { Action } from "redux";

interface IStateLogin { 
    isLogged : string | boolean
}

const initialState : IStateLogin = {
    isLogged : localStorage.getItem('isLogged') || false
}

const loginReducer = (state = initialState, action : Action) => {
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