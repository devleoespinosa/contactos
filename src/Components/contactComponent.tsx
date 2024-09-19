import React from 'react';
import Tabla from './contactsTableComponent.tsx';
import { Contacto } from '../DTO/Contacto.ts';
import Formulario from './formComponent.tsx';
import DataGrafo from './contactDataGraph.tsx';

function Contact() {

    const [ancho, setAncho] = React.useState('50%');
    const [displayVar, setDisplay] = React.useState('inline-block')
    const [contactos, setContactos] = React.useState<Contacto[]>([])

    React.useEffect(() => {
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleResize = () => {
        if (window.innerWidth < 600) {
            setAncho('100%');
            setDisplay('block');
        }else{
            setAncho('50%');
            setDisplay('inline-block');
        }
        
    };

    return(
        <>
        <div style={{width:'100%'}}>
            <div style={{width:ancho, display:displayVar}}>
                <h3>Tabla de Contactos</h3>
                <Tabla contactos={contactos} /> 
            </div>
            <div style={{width: ancho, display:displayVar}}>
                <h3>Formulario</h3>
                <Formulario contacts={contactos} setContactos={setContactos} />
            </div>
        </div>
        <DataGrafo contactos={contactos} />
        </>
    )
}

export default Contact;