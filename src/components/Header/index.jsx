import styles from './Header.module.css';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

function Header() {
    const dispatch = useDispatch();
    const totalCartCount = useSelector(state => state.cart.totalItemsCount);
    const isLogged = useSelector(state => state.auth.isLogged);
    const username = useSelector(state => state.auth.username);
    let login;
    if(isLogged) {
        login = <li>{username}  <button onClick={() => handleLogout()} className={styles['logout-btn']}>Logout</button></li>;
    } else {
        login = <li><Link to="/login">Login</Link></li>
    }

    function handleLogout() {
        console.log("hi");
        dispatch(logout());
        localStorage.setItem("accessToken", '');
        localStorage.setItem("refreshToken", '');
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
                </div>
                <div className={styles['header-div-right']}>
                    <li>
                        <Link to="/cart">Cart ({totalCartCount})</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                    {login}
                </div>
            </ul>
        </nav>
    );
};

export default Header;