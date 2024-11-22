
export class Contacto{
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    id: number;
    orden: number;

    constructor(id:number,  nombre: string, apellido: string, correo: string, telefono: string, orden: number){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.telefono = telefono;
        this.orden = orden;
    }


}

export class Nodo{
    izquierdo: Nodo | undefined
    derecho: Nodo | undefined
    contacto: Contacto

    constructor(izquierdo: Nodo|undefined, derecho: Nodo|undefined, contacto: Contacto | undefined){
        this.izquierdo = izquierdo;
        this.derecho = derecho;
        this.contacto = contacto;
    }

}