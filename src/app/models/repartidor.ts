export class Repartidor {
    dni: number;
    nombre: string;
    edad: number;
    capacidadDeTransporte: number;
    pais: string;
    unidadPropia: boolean;

    constructor(dni: number, nombre: string, edad: number, capacidadTransporte: number, pais: string, unidadPropia: boolean){
        this.dni = dni;
        this.nombre = nombre;
        this.edad = edad;
        this.capacidadDeTransporte = capacidadTransporte;
        this.pais = pais;
        this.unidadPropia = unidadPropia;
    }
}
