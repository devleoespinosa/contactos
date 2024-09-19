import React from "react"
import { Contacto } from "../DTO/Contacto.ts";

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

    const handleSubmit = (e: React.FormEvent) => {
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
        if(accion)
            setContactos((contactos) =>[...contactos, new Contacto(formData.nombre, formData.apellido, formData.correo, formData.celular)])
        setFormData({
            nombre: '',
            apellido: '',
            correo: '',
            celular: ''
        })
    };
    
    return(
        <>
        <div style={{width: '100%'}}>
            <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nombre">Nombre:</label><br />
                    <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required /><br /><br />

                    <label htmlFor="apellido">Apellido:</label><br />
                    <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required /><br /><br />

                    <label htmlFor="correo">Correo electrónico:</label><br />
                    <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} required /><br /><br />

                    <label htmlFor="celular">Celular:</label><br />
                    <input type="tel" id="celular" name="celular" value={formData.celular} onChange={handleChange} pattern="[0-9]{10}" required /><br /><br />

                    <input type="submit" value="Enviar" />
                </form>
            </div>
        </div>
        </>
    )
}

export default Formulario;