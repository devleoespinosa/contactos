import React from "react";
import { Contacto, Nodo } from "../DTO/Contacto.ts";
import Tree from 'react-d3-tree';
import Tabla from "./contactsTableComponent.tsx";

interface Props {
    contactos : Contacto []
}

function DataGrafo({contactos}:Props) {

    const [boolGrafo, setBool] = React.useState(false);
    const [dataArbol, setDataArbol] = React.useState<any>();
    const [contactosOrdenado, setOrdenados] = React.useState<Contacto[]>([])

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(contactos.length!==0){
            var nodoAux = new Nodo(undefined, undefined, contactos[0])
            for (let index = 1; index < contactos.length; index++) {
                nodoAux = posicionArbol(nodoAux, contactos[index]);
            }
            setDataArbol(construirDataArbol(nodoAux, 'raíz'))
            setOrdenados(ordenacion(nodoAux))
            setBool(true);
        }else{
            alert("No hay contactos")
        }
    };

    const ordenacion = (nodo: Nodo, ordenados: Contacto[] = []) =>{
        if(nodo.izquierdo)
            ordenacion(nodo.izquierdo, ordenados)

        ordenados.push(nodo.contacto)

        if(nodo.derecho)
            ordenacion(nodo.derecho, ordenados)

        return ordenados;
    }

    return(
        <>
        <div>
            <button onClick={handleSubmit}>Imprimir árbol</button>
            {
                boolGrafo ? 
                <>
                <div style={{marginTop:'2rem'}}>
                    <Tabla contactos={contactosOrdenado} />
                </div>
                <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                    <div style={{ width: '50em', height: '20em', border:'2px solid', marginTop:'2rem', marginBottom:'3rem' }}>
                        <Tree data={dataArbol} orientation="vertical" separation={{ siblings: 3, nonSiblings: 2 }} />
                    </div>
                </div>
                </>   
                :<></>
            }
        </div>
        </>
    )
}

export default DataGrafo;