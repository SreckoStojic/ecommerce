export async function getPurchases() {
    try {
        var response = await fetch('http://localhost:3001/purchases', {
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
        var response = await fetch('http://localhost:4000/token', {
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