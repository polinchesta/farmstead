import React, { useState } from 'react';
import styles from './header.module.sass';
import logo from '/logo.svg';
import { Link } from 'react-router-dom';
import { removeUser } from '../../store/auth/authSlice';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../hooks/redux-hooks';
import useTranslation from '../../hooks/useTranslation';
import { LanguageType } from '../../types/languageTypes';
import CurrencyConverter from '../currency/currency';

export function Header() {
    const { t, setLanguage } = useTranslation();
    const Token = localStorage.getItem('token');
    const dispatch = useAppDispatch();
    const { isAuth, email } = useAuth();
    const [showTip, setShowTip] = useState(false);
    const [showPopover, setShowPopover] = useState(false);
    const handlePopoverClick = () => {
        setShowPopover(true);
    };
    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setShowPopover(false);
    };

    const handleLanguageChange = (language: LanguageType) => {
        setLanguage(language);
    };

    return (
        <>
            <header>
                <div className={styles.headerContainer}>
                    <div className={styles.logo}>
                        <Link className={styles.link} to="/">
                            <div
                                onMouseEnter={() => setShowTip(true)}
                                onMouseLeave={() => setShowTip(false)}>
                                <img src={logo} alt="WebSite Logo" />
                                {showTip && <div className={styles.info}>{t.header.aboutMaik}</div>}
                            </div>
                        </Link>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.language}>
                            <button
                                className={styles.language}
                                onClick={() => handleLanguageChange('ru')}>
                                RU
                            </button>
                            <button
                                className={styles.language}
                                onClick={() => handleLanguageChange('en')}>
                                ENG
                            </button>
                            <button
                                className={styles.language}
                                onClick={() => handleLanguageChange('pl')}>
                                PL
                            </button>
                            <button
                                className={styles.language}
                                onClick={() => handleLanguageChange('by')}>
                                BY
                            </button>
                        </div>
                        <div className={styles.line}></div>
                        <div className={styles.converterPopover} onClick={handlePopoverClick}>
                            <button className={styles.openButton}>{t.open.currency}</button>
                            {showPopover && (
                                <>
                                    <div className={styles.modalOverlay}></div>
                                    <div className={styles.modalContainer}>
                                        <button
                                            className={styles.closeButton}
                                            onClick={handleClose}>
                                            &times;
                                        </button>
                                        <CurrencyConverter />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className={styles.line}></div>
                        <button className={styles.language}>
                            <a href="https://www.instagram.com/maik_grodno/" target="_blank">Instagram</a>
                        </button>

                    </div>

                    <button
                        className={styles.login}
                        style={{ display: `${Token ? 'block' : 'none'}` }}
                        onClick={() => {
                            dispatch(removeUser());
                            localStorage.removeItem('token');
                        }}>
                        Выйти из аккаунта {email}
                    </button>
                    <div className={styles.menu}>
                        <nav className={styles.blocks}>
                            <Link className={styles.block} to="/">
                                {t.header.links.main}
                            </Link>
                            <Link className={styles.block} to="/product">
                                {t.header.links.products}
                            </Link>
                            <Link className={styles.block} to="/farmstead">
                                {t.header.links.farmstead}
                            </Link>
                            <Link className={styles.block} to="/login">
                                {t.header.links.sign}
                            </Link>
                        </nav>
                    </div>
                </div>
            </header >
        </>
    );
}
