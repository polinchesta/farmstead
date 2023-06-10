import axios from "axios";
import { LoginForm } from "../../ui/LoginForm/LoginForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

export function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(`${backendUrl}/user/login`, {
      email: login,
      password,
    });

    if (response.status === 200) {
      console.log(response);
      signIn({
        token: response.data.id,
        expiresIn: 10000000,
        tokenType: "Bearer",
        authState: {
          id: response.data.data.user.id,
          email: login,
          password,
        },
      });
      navigate("/works");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <LoginForm handleSubmit={handleSubmit} setLogin={setLogin} setPassword={setPassword} />
    </div>
  );
}
