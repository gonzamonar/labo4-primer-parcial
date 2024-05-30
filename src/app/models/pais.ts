export class Pais {
    nombre: string;
    nombreOficial: string;
    capitales: string[];
    continentes: string[];
    banderaSrc: string;
    banderaAlt: string;
    idiomas: string[];

    constructor (
        nombre: string,
        nombreOficial: string,
        capitales: string[],
        continentes: string[],
        flagSrc: string,
        flagAlt: string,
        idiomas: string[]
    ){
        this.nombre = nombre;
        this.nombreOficial = nombreOficial;
        this.capitales = capitales;
        this.continentes = continentes;
        this.banderaSrc = flagSrc;
        this.banderaAlt = flagAlt;
        this.idiomas = idiomas;
    }
}
