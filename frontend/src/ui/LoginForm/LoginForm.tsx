import { Link } from 'react-router-dom';
import styles from './LoginForm.module.sass';
import useTranslation from '../../hooks/useTranslation';
interface LoginFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    setLogin: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export function LoginForm({ handleSubmit, setLogin, setPassword }: LoginFormProps) {
    const {t} = useTranslation();
    return (
        <div className={styles.loginForm}>
            <div className={styles.formWrapper}>
                <h2>{t.sign.input}</h2>
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
                            autoComplete="current-password"
                            inputMode="text"
                            required
                            className={styles.input}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.button} type="submit">
                        {t.sign.signIn}
                        </button>
                    </div>
                    <div>
                        <Link to="/register" className={styles.loginLink}>
                            {t.sign.acc}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
