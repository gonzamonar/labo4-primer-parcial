export class Helado {
    id: number;
    sabor: string;
    tipo: string;
    precio: number;
    peso: number;

    constructor(id:number, sabor: string, tipo: string, precio: number, peso: number){
        this.id = id;
        this.sabor = sabor;
        this.tipo = tipo;
        this.precio = precio;
        this.peso = peso;
    }

}
