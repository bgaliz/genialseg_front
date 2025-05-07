import "./home.css"
import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useQuery } from '@tanstack/react-query';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';

import InsertClientForm from "../../components/ClientForm";
import clientServices from "../../services/clientServices";
import GroupOfCards from "../../components/CardsGroup";
import Header from "../../components/Header";

import { ClientType } from "./types";
import { CLIENT_FORM_INIT } from "./constants";

const Home = () => {
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [open, setOpen] = useState(false);
    const [client, setClient] = useState<ClientType>(CLIENT_FORM_INIT);

    const navigate = useNavigate()
    const handleClose = () => setOpen(false);
    const handleRedirect = () => navigate("/register")
    

    const isMobileScreen = useMemo(() => {
        return window.innerWidth < 768;
    }, []);

    const { data: clients, isLoading: isLoadingClients, refetch } = useQuery({
        queryKey: ['listar-clientes'],
        queryFn: clientServices.listClients
    });

    const handleEditClient = (id: string) => {
        const clientById = clients.find((client: ClientType) => client.id === id)
        console.log("clientById",clientById)
        setClient(clientById)
        setOpen(true)
    };

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoadingFetch(true);
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
            const response = await clientServices.editClient(client.id!, data)
            setLoadingFetch(false);
            setOpen(false);
            toast.success(response.data.message)
            refetch();
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            setLoadingFetch(false);
        }
    }, [client, refetch]);

    const handleGeneratePDF = () => {
        setLoadingFetch(true)
        if(!clients.length) {
            toast.warning("Não há nenhum cliente cadastrado para gerar PDF!")
            return;
        }
        setLoadingFetch(false)
    }

    return (
        <div className="wrapper-home">
            <Header 
                clients={clients}
                isMobileScreen={isMobileScreen}
                handleRedirect={handleRedirect}
                handleGeneratePDF={handleGeneratePDF} 
            />
            <div className="clients">
                {
                    isLoadingClients ? 
                    <IconButton loading={isLoadingClients}/> : 
                    <GroupOfCards clients={clients} handleEditClient={handleEditClient} />
                }
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <InsertClientForm client={client} handleSubmit={handleSubmit} loading={loadingFetch}/>
            </Modal>
        </div>
    )
}

export default Home;