import { Box, Button, Input, Typography } from "@mui/material"
import { style } from "./style.form"
import SendIcon from '@mui/icons-material/Send';
import { ClientType } from "../../pages/Home/types";

type InsertClientFormType = {
    loading: boolean
    client?: ClientType
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
}

const InsertClientForm: React.FunctionComponent<InsertClientFormType>  = ({ client, handleSubmit, loading }:InsertClientFormType) => {
    return (
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Editar Cliente
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nome:</label>
                        <Input type="text" id="name" name="name" defaultValue={client?.name} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail:</label>
                        <Input type="text" id="email" name="email" defaultValue={client?.email} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <Input type="phone" id="phone" name="phone" defaultValue={client?.phone} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="zipcode">Zip Code:</label>
                        <Input type="text" id="zipcode" name="zipcode" defaultValue={client?.address.zipcode} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="street">Street:</label>
                        <Input type="text" id="street" name="street" defaultValue={client?.address.street} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="neighborhood">Neighborhood:</label>
                        <Input type="text" id="neighborhood" name="neighborhood" defaultValue={client?.address.neighborhood} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="number">Number:</label>
                        <Input type="text" id="number" name="number" defaultValue={client?.address.number} required/>
                    </div>
                    <Button 
                        type="submit" 
                        variant="contained" endIcon={<SendIcon />}
                        loading={loading}
                    >
                        Edit
                    </Button>
                </form>
            </Typography>
        </Box>
    )
}

export default InsertClientForm