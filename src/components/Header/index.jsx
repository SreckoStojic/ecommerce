import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


function Header() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const totalCartCount = useSelector(state => state.cart.totalItemsCount);
    const isLogged = localStorage.getItem('accessToken') === null ? false : true;
    const username = localStorage.getItem('username');
    let login;
    let signup;
    if(isLogged) {
        login = <li className={styles['profile-username']}>{username}  <button onClick={() => handleLogout()} className={styles['logout-btn']}>{t('logout')}</button></li>;
        signup = '';
    } else {
        login = <li><Link to="/login">{t('login')}</Link></li>;
        signup = <Link to="/signup">{t('signup')}</Link>;
    }

    function changLang(lang) {
        i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang);
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
        if(response.ok) {
            localStorage.clear();
            navigate('/login');
            window.location.reload(true);
        } else {
            alert(response.status);
        }
    }
    return (
        <nav>
            <ul>
                <div className={styles['header-div-left']}>
                    <li>
                        <Link to="/">{t('home')}</Link>
                    </li>
                    <li>
                        <Link to="/products">{t('products')}</Link>
                    </li>
                    <li>
                        <button onClick={() => localStorage.clear()} >Clear local storage</button>
                    </li>
                    <div className={styles['lang-div']}>
                        <li>
                            <button className={styles['lang']} onClick={() => changLang('en')}>en</button>
                        </li>
                        <li>
                            <button className={styles['lang']} onClick={() => changLang('srb')}>srb</button>
                        </li>
                    </div>
                </div>
                <div className={styles['header-div-right']}>
                    <li>
                        <Link to="/cart">{t('cart')} ({totalCartCount})</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">{t('dashboard')}</Link>
                    </li>
                    {signup}
                    {login}
                </div>
            </ul>
        </nav>
    );
};

export default Header;