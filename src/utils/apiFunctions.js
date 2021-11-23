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

export async function handleLogin(username, password, navigate){
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
        localStorage.setItem("username", username);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        getPurchases();
        navigate('/products');
        window.location.reload(true);
    } else {
        alert(`Invalid username or password. Try again!`)
    }
}