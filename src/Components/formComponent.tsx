import React from "react"
import { Contacto } from "../DTO/Contacto.ts";
import { Box, Button, TextField } from "@mui/material";
import axios from 'axios';

export const guardarContacto = async (contacto) => {
    try {
        const response = await axios.post(`http://localhost:8080/contactos/add`, contacto);
        return response.data;
    } catch (error) {
        console.error("Error al guardar el contacto:", error);
        throw error;
    }
};

interface FormularioContactoProps {
    setContactos: React.Dispatch<React.SetStateAction<Contacto[]>>;
    contacts: Contacto []
}

function Formulario({setContactos, contacts}:FormularioContactoProps) {

    const [formData, setFormData] = React.useState({
        nombre: '',
        apellido: '',
        correo: '',
        celular: ''
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        }); 
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        var accion = true
        for (let index = 0; index < contacts.length; index++) {
            if (formData.nombre.toLowerCase() === contacts[index].nombre.toLowerCase() && formData.apellido.toLowerCase() === contacts[index].apellido.toLowerCase()) {
                alert("No puedes tener dos contactos con exactamente el mismo nombre")
                accion = false
            }
            if (formData.celular === contacts[index].telefono) {
                alert("No puedes tener dos contactos con el mismo número de teléfono")
                accion = false
            }
            if (formData.correo.toLowerCase() === contacts[index].correo.toLowerCase()) {
                alert("No puedes tener dos contactos con el mismo correo")
                accion = false
            }
        }
        if(accion){
            var id = await guardarContacto(
                {
                    orden: contacts.length,
                    nombre: formData.nombre,
                    apellido: formData.apellido,
                    correo: formData.correo,
                    telefono: formData.celular
                }
            )
            setContactos((contactos) =>[...contactos, new Contacto(id,formData.nombre, formData.apellido, formData.correo, formData.celular, contacts.length)])
        }
        setFormData({
            nombre: '',
            apellido: '',
            correo: '',
            celular: ''
        })
    };
    
    return(
        <>
        <div style={{width: '20rem'}}>
            <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Apellido"
                        variant="outlined"
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Correo electrónico"
                        variant="outlined"
                        type="email"
                        id="correo"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Celular"
                        variant="outlined"
                        type="tel"
                        id="celular"
                        name="celular"
                        value={formData.celular}
                        onChange={handleChange}
                        required
                        fullWidth
                        inputProps={{ pattern: "[0-9]{10}" }}
                    />

                    <Button type="submit" variant="contained" sx={{backgroundColor:'#87CEEB', color:'black'}}>
                        Enviar
                    </Button>
                </Box>
            </div>
        </div>
        </>
    )
}

export default Formulario;