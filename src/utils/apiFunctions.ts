import { purchase } from '../actions/cart';
import { login, logout } from '../actions/login';
import { ICartItem } from '../components/CartItem';
import { IDashboardListItem } from '../components/DashboardList';

export async function getPurchases(navigate : any) : Promise<void> {
    let response : Response | null = null;
    try {
        response  = await fetch(`${process.env.REACT_APP_API}/purchases`, {
            method: 'GET',
            headers: { 
                "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    } catch (error) {
        console.error(error);
    }
    if(response!.ok){
        let data = await response!.json();
        let dataForLocalStorage : IDashboardListItem[] = [];
        data.forEach((dataItem : IDashboardListItem) => {
            dataForLocalStorage.push({
                id: dataItem.id,
                products: dataItem.products,
                createdAt: dataItem.createdAt
            })
        });
        localStorage.setItem('data', JSON.stringify(dataForLocalStorage));
    } else {
        refreshTokenFunction(navigate);
    }
}

export async function refreshTokenFunction(navigate : any) : Promise<void> {
    let response : Response | null = null;
    try {
        response = await fetch(`${process.env.REACT_APP_AUTH_API}/token`, {
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
    if(response!.ok) {
        let data = await response!.json();
        localStorage.setItem("accessToken", data.accessToken);
        getPurchases(navigate);
    } else {
        navigate('/login');
    }
}

export async function handleLogin(dispatch : any, username : string, password : string, navigate : any) : Promise<void> {
    let response : Response | null = null;
    try {
        response = await fetch(`${process.env.REACT_APP_AUTH_API}/login`, {
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
    if(response!.ok) {
        const data = await response!.json();
        dispatch(login());
        localStorage.setItem("isLogged", 'true');
        localStorage.setItem("username", username);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        getPurchases(navigate);
        navigate('/products');
    } else {
        alert(`Invalid username or password. Try again!`)
    }
}

export async function signUp(username : string, password : string, navigate : any) : Promise<void> {
    let response : Response | null = null;
    try {
        response = await fetch(`${process.env.REACT_APP_API}/users`, {
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
    if(response!.ok) {
        alert(`You have successfully registered, ${username}!`);
        navigate("/login");
    } else {
        alert(`Username ${username} is taken.`)
    }
}

export async function handlePurchase(dispatch : any, navigate : any, cartItems : ICartItem[]) : Promise<void> {
    let response : Response | null = null;
    try {
        response = await fetch(`${process.env.REACT_APP_API}/purchases`, {
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
    if(response!.ok) {
        dispatch(purchase());
        getPurchases(navigate);
        navigate('/products');
    } else {
        refreshTokenFunction(navigate);
        handlePurchase(dispatch, navigate, cartItems);
    }
}

export async function handleLogout(dispatch : any, navigate : any) : Promise<void> {
    let response : Response | null = null;
    try {
        response = await fetch('http://localhost:4000/logout', {
            method: 'DELETE',
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            })
        });
    } catch (error) {
        console.error(error);
    }
    if(response!.ok) {
        dispatch(logout());
        localStorage.clear();
        navigate('/login');
    } else {
        alert(response!.status);
    }
}