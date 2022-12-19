import React from 'react';
import {setUser} from '../../store/slices/userSlice';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Form } from './Form';
import { useAppDispatch } from '../../hooks/redux-hooks';

export default function SignUp() {
    const dispatch = useAppDispatch();
    const handleRegister = (email: string, password: string) => {
        const auth = getAuth();  
        createUserWithEmailAndPassword(auth, email, password)
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
            .catch(console.error)
    }
  return (
    <Form 
        title = "Зарегистрироваться"
        handleClick = {handleRegister} />
  )
}
