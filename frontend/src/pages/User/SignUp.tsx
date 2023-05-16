import React, { useState } from 'react';
import {setUser} from '../../store/auth/authSlice';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from '../../hooks/redux-hooks';
import { app } from './firebase';
import { Form } from './Form';

export default function SignUp() {
    const [error, setError] = useState({ isError: false, message: "" });
    const dispatch = useAppDispatch();
    
    const handleRegister = (email: string, password: string) => {
        const auth = getAuth(app);  
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => 
            {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                }
                ))
                alert("Регистрация выполнена успешно")
            })
            .catch(() => {
                setError({ isError: true, message: "ERROR" })
            })
    }
  return (
    <Form 
        title = "Зарегистрироваться"
        handleClick = {handleRegister} />
  )
}
