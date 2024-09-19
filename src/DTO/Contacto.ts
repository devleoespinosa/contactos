
export class Contacto{
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;

    constructor(nombre: string, apellido: string, correo: string, telefono: string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.telefono = telefono;
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