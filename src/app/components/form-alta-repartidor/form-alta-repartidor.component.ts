import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Repartidor } from '../../models/repartidor';
import { DataRepartidoresService } from '../../services/data-repartidores.service';

@Component({
  selector: 'app-form-alta-repartidor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-alta-repartidor.component.html',
  styleUrl: './form-alta-repartidor.component.css'
})

export class FormAltaRepartidorComponent implements OnInit, OnChanges {
  @Input() inputPais: string = 'Argentina';
  form!: FormGroup;
  namesRegex: string = "[a-zA-ZáéíóúÁÉÍÓÚöÖüÜ ']*";

  constructor(
    private providerDataRepartidores: DataRepartidoresService
  ) {}


  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl(null, [Validators.required, Validators.pattern(this.namesRegex), Validators.minLength(3), Validators.maxLength(25)]),
      dni: new FormControl(null, [Validators.required, Validators.pattern('[0-9-]*'), Validators.min(1)]),
      edad: new FormControl(null, [Validators.required, Validators.pattern('[0-9-]*'), Validators.min(18), Validators.max(99)]),
      capacidadTransporte: new FormControl(null, [Validators.required, Validators.pattern('[0-9-]*'), Validators.min(1)]),
      pais: new FormControl({value: this.inputPais, disabled: true}),
      unidadPropia: new FormControl(false),
    })
  }
  
  ngOnChanges(): void {
    if (this.form != undefined){
      const formControl = this.form.get('pais');
      if (formControl){
        formControl.setValue(this.inputPais);
      }
    }
  }

  getControlErrors(control: string): ValidationErrors | null {
    return this.form.controls[control].errors;
  }

  isControlInvalid(control: string): boolean{
    return this.form.controls[control].invalid;
  }

  isControlTouched(control: string): boolean{
    return this.form.controls[control].dirty || this.form.controls[control].touched;
  }

  OnFormSubmitted(){
    let repartidor: Repartidor = new Repartidor(
      parseInt(this.form.get('dni')?.value),
      this.form.get('nombre')?.value,
      parseInt(this.form.get('edad')?.value),
      parseInt(this.form.get('capacidadTransporte')?.value),
      this.form.get('pais')?.value,
      this.form.get('unidadPropia')?.value,
    );
    
    this.providerDataRepartidores.pushOne(repartidor);

    this.form.reset();
    this.form.get('pais')?.setValue(this.inputPais);
    this.form.get('unidadPropia')?.setValue(false);
  }
}
