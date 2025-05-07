import './userRegister.css'
import { useCallback, useState } from "react";
import { ClientType } from "../Home/types";
import { toast } from "react-toastify";
import api from "../../services/api";
import { Button, Input } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';


const UserRegister = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const handleReturnHome = () => navigate("/home")

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        const rawData = Object.fromEntries(formData.entries());
        const data: ClientType = {
            name: rawData.name as string,
            email: rawData.email as string,
            phone: rawData.phone as string,
            address: {
                street: rawData.street as string,
                zipcode: rawData.zipcode as string,
                number: rawData.number as string,
                neighborhood: rawData.neighborhood as string,
            },
        };
        try {
            const response = await api.post("/cadastrar-cliente", data);
            setLoading(false);
            toast.success(response.data.message)
            navigate("/home")
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            setLoading(false);
        }
    }, []);
    
    return (
        <form onSubmit={handleSubmit} className="form-register">
            <h1>Cadastrar Cliente</h1>
            <p>Cadastre agora um cliente na sua base de dados!</p>
            <div className="form-group">
                <label htmlFor="name">Nome:</label>
                <Input type="text" id="name" name="name"  required/>
            </div>
            <div className="form-group">
                <label htmlFor="email">E-mail:</label>
                <Input type="text" id="email" name="email"  required/>
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <Input type="phone" id="phone" name="phone"  required/>
            </div>
            <div className="form-group">
                <label htmlFor="zipcode">Zip Code:</label>
                <Input type="text" id="zipcode" name="zipcode" required/>
            </div>
            <div className="form-group">
                <label htmlFor="street">Street:</label>
                <Input type="text" id="street" name="street"  required/>
            </div>
            <div className="form-group">
                <label htmlFor="neighborhood">Neighborhood:</label>
                <Input type="text" id="neighborhood" name="neighborhood"  required/>
            </div>
            <div className="form-group">
                <label htmlFor="number">Number:</label>
                <Input type="text" id="number" name="number" required/>
            </div>
            <div className='form-submit'>
                <Button 
                    type="submit" 
                    variant="contained" endIcon={<SendIcon />}
                    loading={loading}
                >
                    Submit
                </Button>
                <Button  
                    variant="contained" endIcon={<CloseIcon />}
                    loading={loading}
                    color='error'
                    onClick={handleReturnHome}
                >
                    Cancel
                </Button>
            </div>
        </form>
    )
}

export default UserRegister