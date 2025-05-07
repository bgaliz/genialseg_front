import "./home.css"
import { useCallback, useMemo, useState } from "react";
import api from "../../services/api";
import { useQuery } from '@tanstack/react-query';
import { Button } from "@mui/material";
import Modal from '@mui/material/Modal';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import IconButton from '@mui/material/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { toast } from "react-toastify";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import InsertClientForm from "../../components/ClientForm";
import { ClientType } from "./types";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import UserListPDF from "../../components/RenderPDF";

const CLIENT_FORM_INIT = {
    name: "",
    email: "",
    phone: "",
    address: {
        street: "",
        zipcode: "",
        number: "",
        neighborhood: "",
    },
}

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [client, setClient] = useState<ClientType>(CLIENT_FORM_INIT);

    const navigate = useNavigate()
    const handleClose = () => setOpen(false);
    const handleRedirect = () => navigate("/register")
    

    const isMobileScreen = useMemo(() => {
        console.log(window.innerWidth)
        return window.innerWidth < 500;
    }, []);

    const { data: clients, isLoading, refetch } = useQuery({
        queryKey: ['listar-clientes'],
        queryFn: async () => {
          const response = await api.get('/listar-clientes');
          return response.data;
        }
    });

    const handleOpen = (id: string) => {
        const clientById = clients.find((client: ClientType) => client.id === id)
        console.log("clientById",clientById)
        setClient(clientById)
        setOpen(true)
    };

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
            const response = await api.put("/editar-cliente", data, {
                params: { id: client.id }
            });
            setLoading(false);
            setOpen(false);
            toast.success(response.data.message)
            refetch();
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            setLoading(false);
        }
    }, [client, refetch]);

    const handleGeneratePDF = () => {
        setLoading(true)
        if(!clients.length) {
            toast.warning("Não há nenhum cliente cadastrado para gerar PDF!")
            return;
        }
        setLoading(false)
    }

    return (
        <div className="wrapper-home">
            <header className="header-home">
                <h2>Lista de Clientes</h2>
                <div className="header-actions">
                    <Button variant="contained" color="primary" onClick={handleRedirect}>
                        {isMobileScreen ? <PersonAddIcon /> : "Cadastrar"}
                    </Button>
                    <PDFDownloadLink
                        document={<UserListPDF clients={clients} />}
                        fileName="lista-de-clientes.pdf"
                        className="pdf-button"
                    >
                        {
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={!isMobileScreen && <PictureAsPdfIcon />}
                                onClick={handleGeneratePDF}
                            
                            >
                                {isMobileScreen ? <PictureAsPdfIcon /> : "Gerar PDF"}
                            </Button>
                        }
                        </PDFDownloadLink>
                </div>
            </header>

            <div className="clients">
                {
                    isLoading ? 
                    <IconButton loading={isLoading}/> 
                    : 
                    (
                        <div className="group-cards">
                            {
                                clients.map((client: any) => (
                                    <div key={client.id} className="card">
                                        <div className="profile">
                                            <AccountCircleIcon />
                                            <span>{client.name}</span>
                                            <span>{client.phone}</span>
                                            <span>{client.email}</span>
                                        </div>
                                        <div className="profile-config">
                                            <EditIcon className="icon-edit" onClick={() => handleOpen(client.id)}/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
                <IconButton   />
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <InsertClientForm client={client} handleSubmit={handleSubmit} loading={loading}/>
            </Modal>
        </div>
    )
}

export default Home;