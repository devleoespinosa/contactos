import React from 'react';
import Tabla from './contactsTableComponent.tsx';
import { Contacto } from '../DTO/Contacto.ts';
import Formulario from './formComponent.tsx';
import DataGrafo from './contactDataGraph.tsx';
import {Box, Container, Dialog, DialogContent, DialogTitle, Fab, SxProps, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const obtenerContactos = async () => {
    try {
        const response = await axios.get("http://localhost:8080/contactos/");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los contactos:", error);
        throw error;
    }
};

function Contact() {

    const [contactos, setContactos] = React.useState<Contacto[]>([])
    const [open, setOpen] = React.useState(false)


    React.useEffect(() => {
        const cargarContactos = async () => {
            try {
                const data = await obtenerContactos();
                setContactos(data);
            } catch (error) {
                console.error("Error al cargar los contactos:", error);
            }
        };
        cargarContactos();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const fabStyle1 = {
        position: 'absolute',
        bottom: 250,
        right: 250,
        backgroundColor:'#87CEEB'
    };
    
    return(
        <>
        <div style={{width:'100%'}}> 
            <Container sx={{marginTop:'2rem'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'center'}}>
                    <Box sx={{width:'60%'}}>
                        <Typography variant='h6' sx={{marginBottom:'1rem'}}>TABLA DE CONTACTOS</Typography>
                        <Tabla setContactos={setContactos} canDelete={true} contactos={contactos} /> 
                    </Box>
                </Box>
                {contactos.length>0? <DataGrafo setContactos={setContactos} contactos={contactos}/> : <></>}
                <Fab onClick={handleClickOpen} sx={fabStyle1 as SxProps}>
                    <AddIcon/>
                </Fab>
            </Container>
        </div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>NUEVO CONTACTO</DialogTitle>
            <DialogContent>
                <Formulario setContactos={setContactos} contacts={contactos} />
            </DialogContent>
        </Dialog>
        </>
    )
}

export default Contact;