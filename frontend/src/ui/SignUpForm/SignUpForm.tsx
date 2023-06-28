import { useState, useTransition } from 'react';
import { Link } from 'react-router-dom';
import useTranslation from '../../hooks/useTranslation';
import styles from './SignUpForm.module.sass';

interface SignUpFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    setLogin: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export function SignUpForm({ handleSubmit, setLogin, setPassword }: SignUpFormProps) {
    const { t } = useTranslation();

    return (
        <div className={styles.signupForm}>
            <div className={styles.formWrapper}>
                <h2>{t.sign.reg}</h2>
                <form className={styles.form} onSubmit={handleSubmit} method="POST">
                    <label htmlFor="email" className={styles.label}>
                        {t.sign.email}
                    </label>
                    <div className={styles.inputWrapper}>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            inputMode="email"
                            required
                            className={styles.input}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>
                    <label htmlFor="password" className={styles.label}>
                        {t.sign.password}
                    </label>
                    <div className={styles.inputWrapper}>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            inputMode="text"
                            required
                            className={styles.input}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.button} type="submit">
                            {t.sign.signUp}
                        </button>
                    </div>
                    <div>
                        <Link to="/login" className={styles.loginLink}>
                            {t.sign.acc1}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
