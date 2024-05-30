import { Component } from '@angular/core';
import { ListadoHeladosComponent } from '../../components/listado-helados/listado-helados.component';
import { FormAltaHeladoComponent } from '../../components/form-alta-helado/form-alta-helado.component';
import { ModificacionHeladoComponent } from '../../components/modificacion-helado/modificacion-helado.component';
import { BajaHeladoComponent } from '../../components/baja-helado/baja-helado.component';
import { Helado } from '../../models/helado';
import { DataHeladosService } from '../../services/data-helados.service';

@Component({
  selector: 'app-salen-helados',
  standalone: true,
  imports: [
    ListadoHeladosComponent,
    FormAltaHeladoComponent,
    ModificacionHeladoComponent,
    BajaHeladoComponent
  ],
  templateUrl: './salen-helados.component.html',
  styleUrl: './salen-helados.component.css'
})

export class SalenHeladosComponent {
  heladoSeleccionado: Helado | null = null;

  constructor (
    private providerDataHelados: DataHeladosService
  ){ }

  crearHelado(helado: Helado){
    this.providerDataHelados.pushOne(helado);
  }

  seleccionarHelado(helado: Helado){
    this.heladoSeleccionado = helado;
  }
}
