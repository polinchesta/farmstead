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
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
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
    }

    return (
        <div className="">
            <LoginForm handleSubmit={handleSubmit} setLogin={setLogin} setPassword={setPassword} />
        </div>
    );
}
