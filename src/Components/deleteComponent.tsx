import React from "react";
import { Contacto } from "../DTO/Contacto";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TableCell } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";



interface props {
    contactos: Contacto [], 
    contactoID: number,
    setContactos: React.Dispatch<React.SetStateAction<Contacto[]>>;
}

function DeleteComponent({contactos, contactoID, setContactos}:props) {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () =>{
        setOpen(true)
    }

    const handleClose = () =>{
        setOpen(false)
    }


    const deleteContact = async () =>{
        setContactos(contactos.filter(contacto => contacto.id !== contactoID))
        try {
            const response = await axios.delete(`http://localhost:8080/contactos/delete/${contactoID}`);
            handleClose()
            return response.data;
        } catch (error) {
            console.error("Error al eliminar el contacto:", error);
            throw error;
        }
    }

    return(
        <>
            <TableCell><IconButton onClick={handleClickOpen}><DeleteIcon sx={{color:'red'}}/></IconButton></TableCell>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>CONFIRMAR ELIMINACIÓN</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro/a que deseas eliminar el contacto?
                    </DialogContentText>
                    <DialogActions>
                        <Button color="inherit" onClick={handleClose}>Cancelar</Button>
                        <Button color="error" onClick={deleteContact} >Sí, eliminar</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DeleteComponent;