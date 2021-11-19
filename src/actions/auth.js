export const signUp = (username, password) => {
    return {
        type: 'SIGN_UP',
        username: username,
        password: password
    }
}

export const login = (username, password) => {
    return {
        type: 'LOGIN',
        username: username,
        password: password
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}