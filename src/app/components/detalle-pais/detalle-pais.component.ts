import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataPaisesService } from '../../services/data-paises.service';
import { Pais } from '../../models/pais';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule, KeyValue } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-pais',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './detalle-pais.component.html',
  styleUrl: './detalle-pais.component.css'
})

export class DetallePaisComponent implements OnChanges {
  @Input() nombrePais = '';
  pais: Pais | null = null;
  API_error: boolean = false;
  loading: boolean = false;

  constructor (
    private dataPaisesProvider: DataPaisesService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.nombrePais != ''){
      this.pais = null;
      this.loading = true;
      this.API_error = false;

      this.dataPaisesProvider.fetchOne(this.nombrePais).subscribe(
        response => {
          this.loading = false;
          if (response){
            this.pais = response.map((e: any) => {
              return new Pais(e.name.common, e.name.official, e.capital, e.continents, e.flags.png, e.flags.alt, this.dictToArray(e.languages));
            })[0];
          }
      },
      (error) => {
        this.loading = false;
        this.API_error = true;
      });
    }
  }

  dictToArray(dict: KeyValue<string,string>): any[] {
    let array;
    if (dict) {
      array = Object.entries(dict).map(([key, value]) => ( value ));
    }
    return array ? array : [] ;
  }
  
  renderArray(array: string[]){
    return array.join(', ');
  }
}
