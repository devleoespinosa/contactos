import React from 'react';
import { Contacto } from '../DTO/Contacto';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteComponent from './deleteComponent.tsx';

interface Props {
    contactos : Contacto [],
    canDelete: Boolean,
    setContactos: React.Dispatch<React.SetStateAction<Contacto[]>>;
}

function Tabla({contactos, canDelete, setContactos}:Props) {
    return(
        <>
        <div style={{width: '100%'}}>
            <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
            <TableContainer>
                <Table>
                    <TableHead sx={{backgroundColor:'#87CEEB'}} >
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Correo</TableCell>
                            <TableCell>Teléfono</TableCell>
                            {canDelete ? <TableCell>Acciones</TableCell> : <></>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contactos.map((persona, index)=> (
                            <TableRow key={index}>
                                <TableCell>
                                    {persona.nombre}
                                </TableCell>
                                <TableCell>{persona.apellido}</TableCell>
                                <TableCell>{persona.correo}</TableCell>
                                <TableCell>{persona.telefono}</TableCell>
                                {canDelete ? <DeleteComponent setContactos={setContactos} contactos={contactos} contactoID={persona.id} /> : <></>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        </div>
        </>
    )
}

export default Tabla;