import "./home.css"
import { useCallback, useState } from "react";
import api from "../../services/api";
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Typography } from "@mui/material";
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: 1,
    p: 4,
  };


const Home = () => {
    const [clients, setClients] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchClients = useCallback(async () => {
        const response = await api.get('/listar-clientes');
        setClients(response.data);
        return response.data;
    }, []);

    const { data, isLoading } = useQuery({ 
        queryKey: ["listar-clientes"], 
        queryFn: fetchClients,  
        enabled: clients.length > 0,
    })

    return (
        <div className="wrapper-home">
            <header className="header-home">
                <h2>Lista de Clientes</h2>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Cadastrar
                </Button>
            </header>

            <div>
                {data}
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default Home;