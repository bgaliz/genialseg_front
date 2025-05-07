import { ClientType } from "../../pages/Home/types"

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import React from "react";

type GroupOfCardsType = {
    clients: ClientType[]
    handleEditClient: (id: string) => void
}

const GroupOfCards: React.FunctionComponent<GroupOfCardsType> = ({
    clients,
    handleEditClient
}) => {
    return (
        <div className="group-cards">
            {
                clients.map((client: ClientType) => (
                    <div key={client.id} className="card">
                        <div className="profile">
                            <AccountCircleIcon />
                            <span>{client.name}</span>
                            <span>{client.phone}</span>
                            <span>{client.email}</span>
                        </div>
                        <div className="profile-config">
                            <EditIcon className="icon-edit" onClick={() => handleEditClient(client.id!)}/>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default GroupOfCards