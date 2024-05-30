import { Component } from '@angular/core';
import { ListadoPaisesComponent } from '../../components/listado-paises/listado-paises.component';
import { FormAltaRepartidorComponent } from '../../components/form-alta-repartidor/form-alta-repartidor.component';

@Component({
  selector: 'app-altas-repartidor',
  standalone: true,
  imports: [
    ListadoPaisesComponent,
    FormAltaRepartidorComponent
  ],
  templateUrl: './altas-repartidor.component.html',
  styleUrl: './altas-repartidor.component.css'
})
export class AltasRepartidorComponent {
  paisSeleccionado: string = 'Argentina';

  getPais(pais: string){
    this.paisSeleccionado = pais;
  }
}
