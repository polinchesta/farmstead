import React from 'react'
import { Link } from 'react-router-dom';
import Login from '../User/Login';
import styles from './LoginPage.module.sass';

export function LoginPage() {
    return (
        <div className={styles.login}>
            <h2>Вход</h2>
            <Login />
            <h2 className={styles.link}>
                <Link to="/signup">Нет аккаунта?</Link>
            </h2>
        </div>
    )
}
