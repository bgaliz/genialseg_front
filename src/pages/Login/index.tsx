import "./login.css"
import { Input } from "@mui/material";
import Button from '@mui/material/Button';
import api from '../../services/api';


const Login = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const loginData = await api.post('/login', {
            username: event.currentTarget.username.value,
            password: event.currentTarget.password.value
        });

        if (loginData.status === 200) {
            localStorage.setItem('token', loginData.data.token);
            window.location.href = '/home';
        }
    }

    return (
        <div className="wrapper-login">
            <div>
                <h1>Olá,</h1>
                <p>Bem vindo(a) à página de login!</p>
                <p>Por favor, informe suas credenciais abaixo:</p>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Login:</label>
                        <Input type="text" id="username" name="username" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha:</label>
                        <Input type="pass" id="password" name="password" required/>
                    </div>
                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Login;