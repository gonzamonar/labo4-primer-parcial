import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataRepartidoresService } from '../../services/data-repartidores.service';
import { Repartidor } from '../../models/repartidor';


@Component({
  selector: 'app-listado-repartidores',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './listado-repartidores.component.html',
  styleUrl: './listado-repartidores.component.css'
})
export class ListadoRepartidoresComponent implements OnInit {
  @Output() rowClickIdEvent = new EventEmitter<number>();
  @Output() rowClickCountryEvent = new EventEmitter<string>();
  
  headers: string[] = ['DNI', 'Nombre', 'Edad', 'Capacidad de Transporte', 'País', 'Unidad Propia'];
  DataRepartidores: Repartidor[] | null = null;

  constructor (
    private dataProviderRepartidores: DataRepartidoresService
  ) {}

  ngOnInit(): void {
    let observer = this.dataProviderRepartidores.fetchAll();
    observer.subscribe(
      (response) => {
        this.DataRepartidores = response.map((e: any) => {
          return new Repartidor(e.dni, e.nombre, e.edad, e.capacidadDeTransporte, e.pais, e.unidadPropia);
        });
    });
  }
  
  returnId(dni: number) {
    this.rowClickIdEvent.emit(dni);
  }

  returnCountry(country: string) {
    this.rowClickCountryEvent.emit(country);
  }
  
  renderBoolean(flag: boolean): string{
    return flag ? 'Sí' : 'No' ;
  }
}
