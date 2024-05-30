import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataRepartidoresService } from '../../services/data-repartidores.service';
import { CommonModule } from '@angular/common';
import { Repartidor } from '../../models/repartidor';

@Component({
  selector: 'app-detalle-repartidor',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './detalle-repartidor.component.html',
  styleUrl: './detalle-repartidor.component.css'
})
export class DetalleRepartidorComponent implements OnChanges {
  @Input() idRepartidor: number = -1;
  repartidor: Repartidor | null = null;

  constructor (
    public dataProviderRepartidores: DataRepartidoresService
  ) { }

  ngOnChanges(): void {
      if (this.idRepartidor > -1){
        this.dataProviderRepartidores.fetchOne(this.idRepartidor).then(doc => {
          this.repartidor = new Repartidor(doc.dni, doc.nombre, doc.edad, doc.capacidadDeTransporte, doc.pais, doc.unidadPropia);
        });
      }
  }

  renderBoolean(flag: boolean): string{
    return flag ? 'Sí' : 'No' ;
  }
}
