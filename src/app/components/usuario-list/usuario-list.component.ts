import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { UserModel } from '../../models/user.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [ButtonModule, DropdownModule, DialogModule, TableModule, FormsModule, ReactiveFormsModule],
  templateUrl: './usuario-list.component.html',
  animations:[
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter', [
        animate('500ms 0s ease-in')
      ]),
      transition(':leave', [
        animate('500ms 0s ease-out', style({
          opacity: 0
        }))
      ])
    ])
  ],
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent {
  usuarios: UserModel[] = [];
  displayDialog: boolean = false;
  usuarioForm!: FormGroup;
  isEditing : boolean = false;
  
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {}

  ngOnInit(){
    this.usuarioForm = this.fb.group({
      IdUsuario: [null],
      names: ['', Validators.required],
      users: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
      console.log(data)
    });
  }

  saveUsuario() {
    if(this.usuarioForm.valid){
      const usuarioData = this.usuarioForm.value;
      if(this.isEditing){
        this.updateUsuario(usuarioData);
      } else {
        this.createUsuario(usuarioData);
      }
    }
  }

  openDialog(usuario?: any){
    this.displayDialog = true;
    this.isEditing = usuario;
    if(usuario) {
      this.usuarioForm.patchValue({
        IdUsuario: usuario.idUsuario,
        names: usuario.nombre,
        users: usuario.usuario,
        password: usuario.contrasena,
      });
    } else {
      this.usuarioForm.reset();
    }
  }

  closeDialog(){
    this.displayDialog = false;
  }

  createUsuario(usuario: any) {
    this.usuarioService.createUsuario({
      nombre: usuario.names,
      usuario: usuario.users,
      contrasena: usuario.password ,
    }).subscribe((data) => {
      this.loadUsuarios();
      this.displayDialog = false;
    })
  }

  updateUsuario(usuario: any) {
    this.usuarioService.updateUsuario(usuario.IdUsuario, {
      nombre: usuario.names,
      usuario: usuario.users,
      contrasena: usuario.password,
    }).subscribe((data) => {
      this.loadUsuarios();
      this.displayDialog = false;
    })
  }

  deleteUsuario(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe(() => {
      this.loadUsuarios();
    })
  }

}
