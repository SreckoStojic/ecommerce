import React from 'react';
import Header from '../../components/Header';
import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../../utils/apiFunctions'; 
import { useTranslation } from 'react-i18next';


function Login() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    
    return (
        <div>
            <Header />
            <div className={styles['sign-up']}>
                <h1 className={styles['h1']}>{t('login')}</h1>
                <form className={styles['login-form']}>
                    <input className={styles['sign-up-input']} type="text" value={username} onInput={e => setUsername(e.target.value)} name="username" placeholder={t('username')+'...'} />
                    <input className={styles['sign-up-input']} type="password" value={password} onInput={e => setPassword(e.target.value)} name="password" placeholder={t('password')+'...'} />
                    <button data-testid="login-btn-id" className={styles['login-btn']} type="button" onClick={() => handleLogin(username, password, navigate)}>{t('login')}</button>
                </form>
            </div>
        </div>
    );
}

export default Login;