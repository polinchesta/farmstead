import React, { useState, useTransition } from 'react';
import styles from './header.module.sass';
import logo from '/logo.svg';
import { Link } from 'react-router-dom';
import { removeUser } from '../../store/auth/authSlice';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../hooks/redux-hooks';
import useTranslation from '../../hooks/useTranslation';

export function Header() {
    const { t, toggleLanguage } = useTranslation();
    const Token = localStorage.getItem('token')
    const dispatch = useAppDispatch();
    const { isAuth, email } = useAuth();
    const [showTip, setShowTip] = useState(false);
    return (
        <>
            <header>
                <div className={styles.headerContainer}>
                    <h1>{t.header.logo.name}</h1>
                    <div className={styles.logo}>
                        <Link className={styles.link} to="/">
                            <div
                                onMouseEnter={() => setShowTip(true)}
                                onMouseLeave={() => setShowTip(false)}
                            ><img src={logo} alt="WebSite Logo" />
                                {showTip && <div className={styles.info}>{t.header.aboutMaik}</div>}
                            </div>
                        </Link>
                    </div>
                    <button className={styles.language} onClick={toggleLanguage} >
                        Смена Языка
                    </button>
                    <button className={styles.login} style={{ display: `${Token ? "block" : "none"}` }}
                        onClick={() => { dispatch(removeUser()), localStorage.removeItem("token") }}
                    >Выйти из аккаунта {email}</button>
                    <div className={styles.menu}>
                        <nav className={styles.blocks}>
                            <Link className={styles.block} to="/">
                                {t.header.links.main}
                            </Link>
                            <Link className={styles.block} to="/product">
                                {t.header.links.products}
                            </Link>
                            <Link className={styles.block} to="/farmsteadall" >
                                {t.header.links.farmstead}
                            </Link>
                            <Link className={styles.block} to="/login">
                                {t.header.links.sign}
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}