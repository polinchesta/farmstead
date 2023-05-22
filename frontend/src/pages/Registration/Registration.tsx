import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUp from '../User/signUp';
import styles from './registration.module.sass';
import useTranslation from '../../hooks/useTranslation';

export function Registration() {
    const {t} = useTranslation();
    return (
        <div className={styles.registration}>
            <h2>{t.sign.reg}</h2>
            <SignUp />
            <Link to="/login">{t.sign.acc1}</Link>
        </div>
    );
}
