import React from 'react';
import {setUser} from '../../store/slices/userSlice';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form } from './Form';
import { useAppDispatch } from '../../hooks/redux-hooks';

export default function Login() {
    const dispatch = useAppDispatch();
    const handleLogin = (email: string, password: string) => {
        const auth = getAuth();  
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => 
            {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                }
                ))
            })
            .catch(() => alert('Invalid user'))
    }
    return (
        <Form 
            title = "Войти"
            handleClick = {handleLogin} />
    )
}
