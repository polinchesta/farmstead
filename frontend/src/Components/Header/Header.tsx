import React, { useState } from 'react';
import styles from './Header.module.sass';
import logo from '../../../public/logo.svg';
import { Link } from 'react-router-dom';
import { I18nProvider, LOCALES } from '../i18n';
import { removeUser } from '../../store/slices/userSlice'
import { useAuth } from '../../hooks/use-auth';
import { useAppDispatch } from '../../hooks/redux-hooks';
import translate from '../i18n/translate';

export function Header() {
    //TRANSLATE 
    const Token = localStorage.getItem('token')
    const dispatch = useAppDispatch();
    const { isAuth, email } = useAuth();
    const [locale, setLocale] = useState(LOCALES.ENGLISH)
    const [showTip, setShowTip] = useState(false);
    return (
        <I18nProvider locale={locale}>
            <>
                <header>
                    <ul className={styles.lightrope}>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <div className={styles.headerContainer}>
                        <h1>?????????????? ????????????????</h1>
                        <div className={styles.logo}>
                            <Link className={styles.link} to="/">
                                <div
                                    onMouseEnter={() => setShowTip(true)}
                                    onMouseLeave={() => setShowTip(false)}
                                ><img src={logo} alt="WebSite Logo" />
                                    {/* TRANSLATE 
                                    {translate('maik')} */}
                                    {showTip && <div className={styles.info}>*Maik-???????????????????? ?????????????? ????????????</div>}
                                </div>

                            </Link>
                        </div>
                        {/* TRANSLATE 
                        <button onChange={() => setLocale(LOCALES.ENGLISH)}>English</button> */}
                        <Link className={styles.login} to="/login" >
                            ????????/??????????????????????
                        </Link>
                        <button className={styles.login} style={{display: `${Token? "block" : "none"}`}}
                            onClick={() => {dispatch(removeUser()), localStorage.removeItem("token")}}
                        >?????????? ???? ???????????????? {email}</button>
                        <div className={styles.menu}>
                            <nav className={styles.blocks}>
                                <Link className={styles.block} to="/">
                                    ??????????????
                                </Link>
                                <Link className={styles.block} to="/product">
                                    ??????????????????
                                </Link>
                                <Link className={styles.block} to="/farmsteadall" >
                                    ??????????????????????
                                </Link>
                                <Link className={styles.block} to="/about">
                                    ?? ??????
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>
            </>
        </I18nProvider>
    );
}
