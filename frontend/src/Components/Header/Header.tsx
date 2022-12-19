import React, { useState } from 'react';
import styles from './Header.module.sass';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

export function Header() {
    
    return (
        <>
            <header>
                <div className={styles.headerContainer}>
                    <h1>Зелёный микрофон</h1>
                    <div className={styles.logo}>
                        <Link to="/">
                            <img src={logo} alt="WebSite Logo" />
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
                            <Link className={styles.block} to="/input" >
                                Вход
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}
