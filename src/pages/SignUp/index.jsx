import Header from '../../components/Header';
import styles from './SignUp.module.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    
    async function signUp(username, password){
        try {
            var response = await fetch(`${process.env.REACT_APP_API}/users`, {
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
            alert(`You have successfully registered, ${username}!`);
            navigate("/login");
        } else {
            alert(`Username ${username} is taken.`)
        }
    }
    return (
        <div>
            <Header />
            <div className={styles['sign-up']}>
                <h1 className={styles['h1']}>Sign Up Here</h1>
                <form className={styles['sign-up-form']}>
                    <input className={styles['sign-up-input']} type="text" value={username} onInput={e => setUsername(e.target.value)} name="username" placeholder="Username..." />
                    <input className={styles['sign-up-input']} type="password" value={password} onInput={e => setPassword(e.target.value)} name="password" placeholder="Password..." />
                    <button className={styles['sign-up-btn']} type="button" onClick={() => signUp(username, password)}>Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;