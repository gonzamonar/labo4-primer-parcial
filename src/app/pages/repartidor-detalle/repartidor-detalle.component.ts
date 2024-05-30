import { Component } from '@angular/core';
import { ListadoRepartidoresComponent } from '../../components/listado-repartidores/listado-repartidores.component';
import { DetalleRepartidorComponent } from '../../components/detalle-repartidor/detalle-repartidor.component';
import { DetallePaisComponent } from '../../components/detalle-pais/detalle-pais.component';

@Component({
  selector: 'app-repartidor-detalle',
  standalone: true,
  imports: [
    ListadoRepartidoresComponent,
    DetalleRepartidorComponent,
    DetallePaisComponent
  ],
  templateUrl: './repartidor-detalle.component.html',
  styleUrl: './repartidor-detalle.component.css'
})
export class RepartidorDetalleComponent {
  idSelectedRepartidor: number = -1;
  paisSelectedRepartidor: string = '';

  getIdRepartidor(id: number){
    this.idSelectedRepartidor = id;
  }

  getPaisRepartidor(pais: string){
    this.paisSelectedRepartidor = pais;
  }
}
