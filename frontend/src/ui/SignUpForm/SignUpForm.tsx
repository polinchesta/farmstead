import { useState, useTransition } from 'react';
import { Link } from 'react-router-dom';
import useTranslation from '../../hooks/useTranslation';
import Telegram from '../../pages/User/TelegramLogin';
import styles from './SignUpForm.module.sass';

interface SignUpFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    setLogin: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setTelegram: React.Dispatch<React.SetStateAction<string>>;
}

export function SignUpForm({ handleSubmit, setLogin, setPassword, setTelegram }: SignUpFormProps) {
    const { t } = useTranslation();

    return (
        <div className={styles.signupForm}>
            <div className={styles.formWrapper}>
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
                    <label htmlFor="password" className={styles.label}>
                        Telegram
                    </label>
                    <div className={styles.inputWrapper}>
                        <input
                            id="telegram"
                            name="telegram"
                            type="text"
                            autoComplete="telegram"
                            inputMode="text"
                            required
                            className={styles.input}
                            onChange={(e) => setTelegram(e.target.value)}
                        />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.button} type="submit">
                            Sign up
                        </button>
                    </div>
                    <div>
                        <Link to="/login" className={styles.loginLink}>
                            Log in
                        </Link>
                    </div>
                    <Telegram />
                </form>
            </div>
        </div>
    );
}
