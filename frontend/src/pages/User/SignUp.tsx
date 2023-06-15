import axios, { isAxiosError } from 'axios';
import type { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpForm } from '../../ui/SignUpForm/SignUpForm';

export function SignUp() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [telegram, setTelegram] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.post(`${backendUrl}/registration`, {
                email: login,
                password,
                telegram,
            });

            if (response.status === 200) {
                alert('Вы успешно зарегистрированы');
                navigate('/login');
            }
        } catch (error: AxiosError | any) {
            if (isAxiosError(error)) {
                alert(error.response?.statusText);
            }
        }
    }

    return (
        <div className="">
            <SignUpForm
                handleSubmit={handleSubmit}
                setLogin={setLogin}
                setPassword={setPassword}
                setTelegram={setTelegram}
            />
        </div>
    );
}
