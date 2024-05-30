import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataHeladosService } from '../../services/data-helados.service';
import { Helado } from '../../models/helado';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado-helados',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './listado-helados.component.html',
  styleUrl: './listado-helados.component.css'
})
export class ListadoHeladosComponent implements OnInit {
  @Output() rowClickEvent = new EventEmitter<Helado>();
  
  headers: string[] = ['Sabor', 'Tipo', 'Precio', 'Peso'];
  DataHelados: Helado[] = [];

  constructor (
    private providerDataHelados: DataHeladosService
  ) {}

  ngOnInit(): void {
    this.providerDataHelados.fetchAll().subscribe(
      response => {
        this.DataHelados = response.map((e:any) => { return new Helado(e.id, e.sabor, e.tipo, e.precio, e.peso)});
    });
  }
  
  returnHelado(helado: Helado) {
    this.rowClickEvent.emit(helado);
  }
  
}
