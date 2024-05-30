import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Helado } from '../../models/helado';
import { DataHeladosService } from '../../services/data-helados.service';

@Component({
  selector: 'app-form-alta-helado',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './form-alta-helado.component.html',
  styleUrl: './form-alta-helado.component.css'
})
export class FormAltaHeladoComponent implements OnInit {
  @Output() altaHeladoEvent = new EventEmitter<Helado>();
  form!: FormGroup;
  nextId!: number;

  constructor(
    private providerDataHelados: DataHeladosService
  ) {
    this.getNextId();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      sabor: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3), Validators.maxLength(25)]),
      tipo: new FormControl('agua', [Validators.required]),
      precio: new FormControl(null, [Validators.required, Validators.pattern('[0-9-.]*'), Validators.min(1)]),
      peso: new FormControl(null, [Validators.required, Validators.pattern('[0-9-]*'), Validators.min(250), Validators.max(1000)]),
    })
  }

  OnFormSubmitted(){
    let helado: Helado = new Helado(
      this.nextId,
      this.form.get('sabor')?.value,
      this.form.get('tipo')?.value,
      parseInt(this.form.get('precio')?.value),
      parseInt(this.form.get('peso')?.value),
    );
    
    this.altaHeladoEvent.emit(helado);
    this.form.reset();
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

  getNextId(){
    this.providerDataHelados.fetchAll().subscribe(
      response => {
        if (response.length == 0) {
          this.nextId = 1;
        } else {
          this.nextId = Math.max(...response.map((e: any) => { return parseInt(e.id) })) + 1;
        }
    });
  }
}
