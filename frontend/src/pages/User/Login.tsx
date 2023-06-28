import axios from 'axios';
import { LoginForm } from '../../ui/LoginForm/LoginForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';

export function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const signIn = useSignIn();
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!login || !password) {
            alert('Пожалуйста, введите логин и пароль');
            return;
          }
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        try {
            const response = await axios.post(`${backendUrl}/login`, {
              email: login,
              password,
            });
      

        if (response.status === 200) {
            alert('Вы вошли в аккаунт');
            console.log(response);
            signIn({
                token: response.data.id,
                expiresIn: 10000000,
                tokenType: 'Bearer',
                authState: {
                    id: response.data.data.user.id,
                    email: login,
                    password,
                },
            });
            navigate('/');
        }
    } catch (error) {
        alert('Неправильный логин или пароль. Попробуйте еще раз.');
      }
    }


    return (
        <div className="">
            <LoginForm handleSubmit={handleSubmit} setLogin={setLogin} setPassword={setPassword} />
        </div>
    );
}
