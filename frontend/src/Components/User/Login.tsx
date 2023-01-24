import React, { useState } from 'react';
import { setUser } from '../../store/slices/userSlice';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form } from './Form';
import { useAppDispatch } from '../../hooks/redux-hooks';

export default function Login() {
    const [error, setError] = useState({ isError: false, message: "" });
    const dispatch = useAppDispatch();
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
                setError({ isError: true, message: "Что-то пошло не так! Проверьте введённые данные" })
            })
    }
    return (
        <>
            <Form
                title="Войти"
                handleClick={handleLogin} />
            {error.isError && <p>{error.message}</p>}
        </>
    )
}
