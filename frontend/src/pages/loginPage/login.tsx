import React from 'react'
import { Link } from 'react-router-dom';
import Login from '../user/login';
import styles from './login.module.sass';

export function LoginPage() {
    return (
        <div className={styles.login}>
            <h2>Вход</h2>
            <Login />
            <Link to="/signup">Нет аккаунта?</Link>
        </div>
    )
}
