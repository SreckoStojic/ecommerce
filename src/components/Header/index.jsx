import styles from './Header.module.css';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


function Header() {
    const navigate = useNavigate();
    const totalCartCount = useSelector(state => state.cart.totalItemsCount);
    const isLogged = localStorage.getItem('accessToken') === null ? false : true;
    const username = localStorage.getItem('username');
    let login;
    let signup;
    if(isLogged === true) {
        login = <li>{username}  <button onClick={() => handleLogout()} className={styles['logout-btn']}>Logout</button></li>;
    } else {
        login = <li><Link to="/login">Login</Link></li>
    }

    if(isLogged === false) {
        signup = <Link to="/signup">Sign Up</Link>
    } else {
        signup = ''
    }

    async function handleLogout() {
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
        console.log(response);
        if(response.ok) {
            localStorage.clear();
            window.location.reload(true);
            navigate('/login');
        } else {
            alert(response.status);
        }
    }
    return (
        <nav>
            <ul>
                <div className={styles['header-div-left']}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>
                        <button onClick={() => localStorage.clear()} >Clear local storage</button>
                    </li>
                </div>
                <div className={styles['header-div-right']}>
                    <li>
                        <Link to="/cart">Cart ({totalCartCount})</Link>
                    </li>
                    {signup}
                    {login}
                </div>
            </ul>
        </nav>
    );
};

export default Header;