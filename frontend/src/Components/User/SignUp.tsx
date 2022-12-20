import React from 'react';
import {setUser} from '../../store/slices/userSlice';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Form } from './Form';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { app } from '../firebase';

export default function SignUp() {
    const dispatch = useAppDispatch();
    console.log(app);
    
    const handleRegister = (email: string, password: string) => {
        const auth = getAuth(app);  
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
            .catch((e) => alert(e))
    }
  return (
    <Form 
        title = "Зарегистрироваться"
        handleClick = {handleRegister} />
  )
}
