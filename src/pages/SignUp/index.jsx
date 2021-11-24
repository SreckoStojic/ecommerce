import Header from '../../components/Header';
import styles from './SignUp.module.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { signUp } from '../../utils/apiFunctions';

function SignUp() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    
    return (
        <div>
            <Header />
            <div className={styles['sign-up']}>
                <h1 className={styles['h1']}>{t('signup')}</h1>
                <form className={styles['sign-up-form']}>
                    <input className={styles['sign-up-input']} type="text" value={username} onInput={e => setUsername(e.target.value)} name="username" placeholder={t('username')+'...'} />
                    <input className={styles['sign-up-input']} type="password" value={password} onInput={e => setPassword(e.target.value)} name="password" placeholder={t('password')+'...'} />
                    <button className={styles['sign-up-btn']} type="button" onClick={() => signUp(username, password, navigate)}>{t('signup')}</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;