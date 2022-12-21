import React, { useState } from 'react';
import styles from './Header.module.sass';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { I18nProvider, LOCALES } from '../i18n';
import { removeUser } from '../../store/slices/userSlice'
import { useAuth } from '../../hooks/use-auth';
import { useAppDispatch } from '../../hooks/redux-hooks';
import translate from '../i18n/translate';

export function Header() {
    //TRANSLATE 
    const dispatch = useAppDispatch();
    const { isAuth, email } = useAuth();

    const [locale, setLocale] = useState(LOCALES.ENGLISH)
    const [showTip, setShowTip] = useState(false);
    return (
        <I18nProvider locale={locale}>
            <>
                <header>
                    <div className={styles.headerContainer}>
                        <h1>Зелёный микрофон</h1>
                        <div className={styles.logo}>
                            <Link className={styles.link} to="/">
                                <div
                                    onMouseEnter={() => setShowTip(true)}
                                    onMouseLeave={() => setShowTip(false)}
                                ><img src={logo} alt="WebSite Logo" />
                                    {/* TRANSLATE 
                                    {translate('maik')} */}
                                    {showTip && <div className={styles.info}>*Maik-агробизнес глазами автора</div>}
                                </div>

                            </Link>
                        </div>
                        {/* TRANSLATE 
                        <button onChange={() => setLocale(LOCALES.ENGLISH)}>English</button> */}
                        <button
                            onClick={() => dispatch(removeUser())}
                        >Log out from {email}</button>
                        <div className={styles.menu}>
                            <nav className={styles.blocks}>
                                <Link className={styles.block} to="/">
                                    Главная
                                </Link>
                                <Link className={styles.block} to="/product">
                                    Продукция
                                </Link>
                                <Link className={styles.block} to="/about">
                                    О нас
                                </Link>
                                <Link className={styles.block} to="/signup" >
                                    Вход
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>
            </>
        </I18nProvider>
    );
}
