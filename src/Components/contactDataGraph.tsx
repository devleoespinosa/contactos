import React from "react";
import { Contacto, Nodo } from "../DTO/Contacto.ts";
import Tree from 'react-d3-tree';
import Tabla from "./contactsTableComponent.tsx";
import { Button, Dialog, DialogContent, DialogTitle, Fab, SxProps } from "@mui/material";
import LanIcon from '@mui/icons-material/Lan';
import axios from "axios";


interface Props {
    contactos : Contacto [],
    setContactos: React.Dispatch<React.SetStateAction<Contacto[]>>;
}

function DataGrafo({contactos, setContactos}:Props) {

    const [dataArbol, setDataArbol] = React.useState<any>();
    const [contactosOrdenado, setOrdenados] = React.useState<Contacto[]>([])
    const [open, setOpen] = React.useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleClickOpen = () => {
        if(contactos.length!==0){
            var nodoAux = new Nodo(undefined, undefined, contactos[0])
            for (let index = 1; index < contactos.length; index++) {
                nodoAux = posicionArbol(nodoAux, contactos[index]);
            }
            setDataArbol(construirDataArbol(nodoAux, 'raíz'))
            setOrdenados(ordenacion(nodoAux))
        }else{
            alert("No hay contactos")
        }
        setOpen(true)
    }

    const fabStyle = {
        position: 'absolute',
        bottom: 320,
        right: 250,
        backgroundColor:'#12a14b'
    };

    const posicionArbol = (nodo: Nodo, contactoActual: Contacto)=>{
        if (contactoActual.nombre.toLowerCase() < nodo.contacto.nombre.toLowerCase() || (contactoActual.nombre.toLowerCase() === nodo.contacto.nombre.toLowerCase() && contactoActual.apellido.toLowerCase() < nodo.contacto.apellido.toLowerCase())) {
            if (nodo.izquierdo === undefined) {
                nodo.izquierdo = new Nodo(undefined, undefined, contactoActual);
            }else{
                posicionArbol(nodo.izquierdo, contactoActual);
            }
        }else{
            if (nodo.derecho === undefined) {
                nodo.derecho = new Nodo(undefined, undefined, contactoActual);
            }else{
                posicionArbol(nodo.derecho, contactoActual);
            }
        }
        
        return nodo;
    }

    const construirDataArbol = (nodo: Nodo, posicion: string)=>{
        const data = 
        {
            name: nodo.contacto.nombre + " " + nodo.contacto.apellido,
            attributes: 
            {
                telefono: nodo.contacto.telefono,
                correo: nodo.contacto.correo,
                posicion: posicion
            },
            children: [
                nodo.izquierdo ? construirDataArbol(nodo.izquierdo, 'nodo izquierdo') : undefined,
                nodo.derecho  ? construirDataArbol(nodo.derecho, 'nodo derecho') : undefined
            ].filter(Boolean)
        }

        return data;
    }


    const ordenacion = (nodo: Nodo, ordenados: Contacto[] = []) =>{
        if(nodo.izquierdo)
            ordenacion(nodo.izquierdo, ordenados)

        ordenados.push(nodo.contacto)

        if(nodo.derecho)
            ordenacion(nodo.derecho, ordenados)

        return ordenados;
    }

    const actualizarContactos = async () => {
        try {
            const response = await axios.put("http://localhost:8080/contactos/", contactosOrdenado);
            setContactos(contactosOrdenado);
            handleClose();
            return response.data;
        } catch (error) {
            console.error("Error al actualizar los contactos:", error);
            throw error;
        }
    };

    return(
        <>
        <Fab onClick={handleClickOpen} sx={fabStyle as SxProps}>
            <LanIcon sx={{color:'white'}}/>
        </Fab>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                ÁRBOL DE ORDENACIÓN
            </DialogTitle>
            <DialogContent>
                <div>
                    <Button sx={{backgroundColor:'#12a14b'}} onClick={actualizarContactos} variant="contained" >Guardar Ordenación</Button>
                    <div style={{marginTop:'2rem'}}>
                        <Tabla  setContactos={setContactos} canDelete={false} contactos={contactosOrdenado} />
                    </div>
                    <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                        <div style={{ width: '50em', height: '20em', border:'2px solid', marginTop:'2rem', marginBottom:'3rem' }}>
                            <Tree data={dataArbol} orientation="vertical" separation={{ siblings: 3, nonSiblings: 2 }} />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default DataGrafo;