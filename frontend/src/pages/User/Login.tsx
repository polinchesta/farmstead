import React, { useState } from 'react';
import { setUser } from '../../store/auth/authSlice';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form } from './Form';
import { useAppDispatch } from '../../hooks/redux-hooks';
import useTranslation from '../../hooks/useTranslation';

export default function Login() {
    const [error, setError] = useState({ isError: false, message: "" });
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const handleLogin = (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                }))
                    localStorage.setItem("token", user.refreshToken)
                    alert("Вход выполнен успешно")
                
            })
            .catch(() => {
                setError({ isError: true, message: "ERROR" })
            })
    }
    return (
        <>
            <Form
                title={t.sign.signIn}
                handleClick={handleLogin} />
            {error.isError && <p>{error.message}</p>}
        </>
    )
}
