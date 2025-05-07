import { Button } from "@mui/material"
import { PDFDownloadLink } from "@react-pdf/renderer"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import UserListPDF from "../../components/RenderPDF";
import { ClientType } from "../../pages/Home/types";

type HeaderType = {
    clients: ClientType[],
    isMobileScreen: boolean,
    handleRedirect: () => void,
    handleGeneratePDF: () => void,
}

const Header: React.FunctionComponent<HeaderType> = ({
    clients,
    isMobileScreen,
    handleRedirect,
    handleGeneratePDF,
}) => {
    return (
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
    )
}

export default Header