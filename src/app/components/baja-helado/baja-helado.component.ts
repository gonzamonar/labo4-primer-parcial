import { Component, Input } from '@angular/core';
import { Helado } from '../../models/helado';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataHeladosService } from '../../services/data-helados.service';

@Component({
  selector: 'app-baja-helado',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './baja-helado.component.html',
  styleUrl: './baja-helado.component.css'
})
export class BajaHeladoComponent {
  @Input() inputHelado: Helado | null = null;

  constructor(
    private providerDataHelados: DataHeladosService
  ){}

  eliminarHelado(){
    if(this.inputHelado){
      this.providerDataHelados.bajaHelado(this.inputHelado);
      this.inputHelado = null;
    }
  }
}
