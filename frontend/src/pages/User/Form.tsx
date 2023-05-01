import { FC, useState } from 'react';
import styles from './form.module.sass';

interface FormProps {
    title: string;
    handleClick: (email: string, pass: string) => void;
}

export const Form: FC<FormProps> = ({title, handleClick}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const Token = localStorage.getItem('Token');

    return (
        <div>
            <div className={styles.userRegistration}>
                <div className={styles.form}>
                    <label>Почта:</label>
                    <input className={styles.mail} 
                    type="email" 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                    <label>Пароль:</label>
                    <input className={styles.message} 
                    type="password"
                    name="password" 
                    value={pass}
                    onChange={(e) => setPass(e.target.value)} />
                    <button  className={styles.button} onClick={() => handleClick(email, pass)}>{title}</button>
                </div>
            </div>
        </div>
    );
}
