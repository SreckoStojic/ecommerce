import { purchase } from '../actions/cart';
import { login, logout } from '../actions/login';

export async function getPurchases() {
    try {
        var response = await fetch(`${process.env.REACT_APP_API}/purchases`, {
            method: 'GET',
            headers: { 
                "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    } catch (error) {
        console.error(error);
    }
    if(response.ok){
        let data = await response.json();
        let dataForLocalStorage = [];
        data.forEach(dataItem => {
            dataForLocalStorage.push({
                id: dataItem.id,
                products: dataItem.products,
                createdAt: dataItem.createdAt
            })
        });
        localStorage.setItem('data', JSON.stringify(dataForLocalStorage));
    } else {
        refreshTokenFunction();
    }
}

export async function refreshTokenFunction(navigate) {
    try {
        var response = await fetch(`${process.env.REACT_APP_AUTH_API}/token`, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            })
        });
    } catch (error) {
        console.error(error);
    }
    if(response.ok) {
        let data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        getPurchases();
    } else {
        navigate('/login');
    }
}

export async function handleLogin(dispatch, username, password, navigate){
    try {
        var response = await fetch(`${process.env.REACT_APP_AUTH_API}/login`, {
            method: 'POST',
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
    } catch (error) {
        console.error(error);
    }
    if(response.ok) {
        const data = await response.json();
        dispatch(login());
        localStorage.setItem("isLogged", true);
        localStorage.setItem("username", username);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        getPurchases();
        navigate('/products');
    } else {
        alert(`Invalid username or password. Try again!`)
    }
}

export async function signUp(username, password, navigate){
    try {
        var response = await fetch(`${process.env.REACT_APP_API}/users`, {
            method: 'POST',
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
    } catch (error) {
        console.error(error);
    }
    if(response.ok) {
        alert(`You have successfully registered, ${username}!`);
        navigate("/login");
    } else {
        alert(`Username ${username} is taken.`)
    }
}

export async function handlePurchase(dispatch, navigate, cartItems) {
    try {
        var response = await fetch(`${process.env.REACT_APP_API}/purchases`, {
            method: 'POST',
            headers: { 
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                products: cartItems
            })
        });
    } catch (error) {
        console.error(error);
    }
    if(response.ok) {
        dispatch(purchase());
        getPurchases();
        navigate('/products');
    } else {
        refreshTokenFunction(navigate);
        handlePurchase();
    }
}

export async function handleLogout(dispatch, navigate) {
    try {
        var response = await fetch('http://localhost:4000/logout', {
            method: 'DELETE',
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            })
        });
    } catch (error) {
        console.error(error);
    }
    if(response.ok) {
        dispatch(logout());
        localStorage.clear();
        navigate('/login');
    } else {
        alert(response.status);
    }
}