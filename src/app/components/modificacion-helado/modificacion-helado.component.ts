import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Helado } from '../../models/helado';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataHeladosService } from '../../services/data-helados.service';

@Component({
  selector: 'app-modificacion-helado',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './modificacion-helado.component.html',
  styleUrl: './modificacion-helado.component.css'
})
export class ModificacionHeladoComponent implements OnChanges {
  @Input() inputHelado: Helado | null = null;
  form!: FormGroup;

  constructor(
    private providerDataHelados: DataHeladosService
  ){}


  ngOnChanges(): void {
    this.updateForm();
  }

  OnFormSubmitted(){
    if (this.inputHelado){
      this.inputHelado.tipo = this.form.get('tipo')?.value;
      this.inputHelado.precio = parseInt(this.form.get('precio')?.value);
      this.inputHelado.peso = parseInt(this.form.get('peso')?.value);
      this.providerDataHelados.modificacionHelado(this.inputHelado);
      this.updateForm();
    }
  }

  updateForm(){
    this.form = new FormGroup({
      sabor: new FormControl({value: this.inputHelado?.sabor, disabled: true}),
      tipo: new FormControl(this.inputHelado?.tipo, [Validators.required]),
      precio: new FormControl(this.inputHelado?.precio, [Validators.required, Validators.pattern('[0-9-.]*'), Validators.min(1)]),
      peso: new FormControl(this.inputHelado?.peso, [Validators.required, Validators.pattern('[0-9-]*'), Validators.min(250), Validators.max(1000)]),
    })
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
}
