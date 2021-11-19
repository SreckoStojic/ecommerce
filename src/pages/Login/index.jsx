import Header from '../../components/Header';
import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    //localStorage.clear();
    async function handleLogin(username, password){
        try {
            var response = await fetch('http://localhost:4000/login', {
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
            console.log(data);
            dispatch(login(username, password));
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            navigate("/products");
        } else {
            alert(`Invalid username or password. Try again!`)
        }
    }
    return (
        <div>
            <Header />
            <div className={styles['sign-up']}>
                <h2>Login</h2>
                <form>
                    <input className={styles['sign-up-input']} type="text" value={username} onInput={e => setUsername(e.target.value)} name="username" placeholder="Username..." />
                    <input className={styles['sign-up-input']} type="password" value={password} onInput={e => setPassword(e.target.value)} name="password" placeholder="Password..." />
                    <button className={styles['sign-up-btn']} type="button" onClick={() => handleLogin(username, password)}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;