import React from 'react'
import { Link } from 'react-router-dom';
import Login from '../User/login';
import styles from './login.module.sass';
import useTranslation from '../../hooks/useTranslation';

export function LoginPage() {
    const {t} = useTranslation();
    return (
        <div className={styles.login}>
            <h2>{t.sign.input}</h2>
            <Login />
            <Link to="/signup">{t.sign.acc}</Link>
        </div>
    )
}
