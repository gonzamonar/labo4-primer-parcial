import { Component, EventEmitter, Output } from '@angular/core';
import { Pais } from '../../models/pais';
import { CommonModule, KeyValue } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataPaisesService } from '../../services/data-paises.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listado-paises',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './listado-paises.component.html',
  styleUrl: './listado-paises.component.css'
})

export class ListadoPaisesComponent {
  @Output() selectCountryEvent = new EventEmitter<string>();

  listadoPaises: Pais[] | null = null;
  API_error: boolean = false;
  continentes: string[] = ['Europe', 'Africa'];
  loading: boolean = false;

  constructor (
    private dataPaisesProvider: DataPaisesService
  ) {
    this.loading = true;
    dataPaisesProvider.fetchAll().subscribe(
      response => {
        if (response){
          this.listadoPaises = response.map((e: any) => {
            return new Pais(e.name.common, e.name.official, e.capital, e.continents, e.flags.png, e.flags.alt, this.dictToArray(e.languages));
          });
          if (this.listadoPaises){
            this.listadoPaises = this.listadoPaises.filter((e) => { return e.continentes.some(c => this.continentes.includes(c)) });
            this.listadoPaises.sort((a, b) => { return a.nombre.localeCompare(b.nombre) } );
          }
          this.loading = false;
        }
    },
    (error) => {
      this.loading = false;
      this.API_error = true;
    });
  }

  returnCountry(countryName: string) {
    this.selectCountryEvent.emit(countryName);
  }

  dictToArray(dict: KeyValue<string,string>): any[] {
    let array;
    if (dict) {
      array = Object.entries(dict).map(([key, value]) => ( value ));
    }
    return array ? array : [] ;
  }
}
