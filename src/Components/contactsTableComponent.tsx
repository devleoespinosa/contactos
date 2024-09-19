import React from 'react';
import { Contacto } from '../DTO/Contacto';

interface Props {
    contactos : Contacto []
}

function Tabla({contactos}:Props) {
    return(
        <>
        <div style={{width: '100%', borderRight:'2px solid black'}}>
            <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
            <table cellPadding="10" >
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {contactos.map((persona, index) => (
                        <tr key={index}>
                            <td>{persona.nombre}</td>
                            <td>{persona.apellido}</td>
                            <td>{persona.correo}</td>
                            <td>{persona.telefono}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        </>
    )
}

export default Tabla;