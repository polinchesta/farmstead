import React, { useState } from 'react';
import styles from './Header.module.sass';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

export function Header() {
    const [showTip, setShowTip] = useState(false);
    return (
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
                            {showTip && <div className={styles.info}>*Maik-агробизнес глазами автора</div>}
                            </div>

                        </Link>
                    </div>
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
    );
}
