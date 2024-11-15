import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [ButtonModule, DropdownModule, DialogModule, TableModule, FormsModule, ReactiveFormsModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent {
  usuarios: UserModel[] = [];
  displayDialog: boolean = false;
  usuarioForm!: FormGroup;
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(){
        this.usuarioForm = this.fb.group({
      IdUsuario: [null],
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }
  openDialog(){
    this.displayDialog = true;
  }

  closeDialog(){
    this.displayDialog = false;
  }
}