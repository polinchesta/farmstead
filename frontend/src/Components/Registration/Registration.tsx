import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUp from '../User/SignUp';
import styles from './Registration.module.sass';

export function Registration() {

    return (
        <div className={styles.registration}>
            <h2>Регистрация</h2>
            <SignUp />
            <h2>
                <Link to="/login">Есть аккаунт?</Link>
            </h2>
        </div>
    );
}
