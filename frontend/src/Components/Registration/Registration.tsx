import React, { useState } from 'react';
import SignUp from '../User/SignUp';
import styles from './Registration.module.sass';

export function Registration() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('')

    return (
        <div className={styles.user}>
            <h2>Регистрация</h2>
            <SignUp />
        </div>
    );
}
