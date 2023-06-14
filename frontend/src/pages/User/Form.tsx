import { FC, useState } from 'react';
import styles from './Form.module.sass';
import useTranslation from '../../hooks/useTranslation';

interface FormProps {
    title: string;
    handleClick: (email: string, pass: string) => void;
}

export const Form: FC<FormProps> = ({ title, handleClick }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const Token = localStorage.getItem('Token');
    const { t } = useTranslation();

    return (
        <div>
            <div className={styles.userRegistration}>
                <div className={styles.form}>
                    <label>{t.sign.email}:</label>
                    <input
                        className={styles.mail}
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>{t.sign.password}</label>
                    <input
                        className={styles.message}
                        type="password"
                        name="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <button className={styles.button} onClick={() => handleClick(email, pass)}>
                        {title}
                    </button>
                </div>
            </div>
        </div>
    );
};
