import { useState, useTransition } from 'react';
import { Link } from 'react-router-dom';
import useTranslation from '../../hooks/useTranslation';
import styles from './SignUpForm.module.sass';

interface SignUpFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    setLogin: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setTelegram: React.Dispatch<React.SetStateAction<string>>;
}

export function SignUpForm({ handleSubmit, setLogin, setTelegram }: SignUpFormProps) {
    const { t } = useTranslation();
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      
        setPassword(newPassword);
        setPasswordValid(passwordRegex.test(newPassword));
      };
      

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
                            className={`${styles.input} ${passwordValid ? '' : styles.invalid}`}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    {!passwordValid && (
                        <div className={styles.passwordRequirements}>
                            Password must contain at least 8 characters, one uppercase letter, and one special symbol.
                        </div>
                    )}

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
                </form>
            </div>
        </div>
    );
}
