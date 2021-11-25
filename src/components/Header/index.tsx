import React, { ReactElement } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { handleLogout } from '../../utils/apiFunctions';
import { RootState } from '../../reducers/index';

function Header() : ReactElement {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const totalCartCount : number = useSelector((state : RootState) => state.cart.totalItemsCount);
    const isLogged : boolean = localStorage.getItem('accessToken') === null ? false : true;
    const username : string | null = localStorage.getItem('username');
    let login : JSX.Element;
    let signup : JSX.Element;
    if(isLogged) {
        login = <li className={styles['profile-username']}>{username}  <button onClick={() => handleLogout(dispatch, navigate)} className={styles['logout-btn']}>{t('logout')}</button></li>;
        signup = <li></li>;
    } else {
        login = <li><Link to="/login">{t('login')}</Link></li>;
        signup = <li><Link to="/signup">{t('signup')}</Link></li>;
    }

    function changeLang(lang : string) : void {
        i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang);
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
                        <button onClick={() => localStorage.clear()} >{t('clearLocalStorage')}</button>
                    </li>
                    <div className={styles['lang-div']}>
                        <li>
                            <button className={styles['lang']} onClick={() => changeLang('en')}>en</button>
                        </li>
                        <li>
                            <button className={styles['lang']} onClick={() => changeLang('srb')}>srb</button>
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