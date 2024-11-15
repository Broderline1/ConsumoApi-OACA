import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button'; 
import { TareaService } from '../../services/tarea/tarea.service';
import { TareaModel } from '../../models/tarea.model';
import { UserModel } from '../../models/user.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [ButtonModule, DropdownModule, DialogModule, TableModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tarea-list.component.html',
  animations: [
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
  styleUrl: './tarea-list.component.css'
})
export class TareaListComponent {
  tareas: TareaModel[] = [];
  displayDialog: boolean = false;
  tareaForm!: FormGroup;
  usuarios: UserModel[] = [];
  isEditing: boolean = false;

  constructor(private fb: FormBuilder, private tareaService: TareaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.tareaForm = this.fb.group({
      idTarea: [null], //campo oculto para el ID
      tarea: ['', Validators.required],
      descripcion: ['', Validators.required],
      Completada: [false],
      usuarioos: [null, Validators.required],
    });

    this.loadTarea();
    this.loadUsuarios();
  }

  openDialog(tarea?: any){
    console.log(tarea)
    this.displayDialog = true;
    this.isEditing = tarea;
    if(tarea) {
      this.tareaForm.patchValue(tarea);
    }
    else{
      this.tareaForm.reset();
    }
  }

  loadTarea() {
    console.log("Metodo loadtareas")
    this.tareaService.getTareas().subscribe((data) => {
      this.tareas = data;
      console.log(data)
    });
  }

  loadUsuarios() {
    console.log("Metodo loadUsuarios")
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
      console.log(data)
    });
  }

  closeDialog(){
    this.displayDialog = false;
  }

  saveTarea(){
  
    if(this.tareaForm.valid){
      const tareaData = this.tareaForm.value;
      if(this.isEditing) {
        this.updateTarea(tareaData);
      }else{
        this.createTarea(tareaData);
      }
    }
  }

  createTarea(tareaData: any) {
    this.tareaService.createTareas({
      tarea: tareaData.tarea,
      descripcion: tareaData.descripcion,
      idUsuario: tareaData.Usuarioos?.idUsuario
    }).subscribe(() => {
      this.loadTarea();
      this.displayDialog = false;
    });
  }

  updateTarea(tareaData: any){
    this.tareaService.updateTarea(tareaData.idTarea, {
      tarea: tareaData.tarea,
      descripcion: tareaData.descripcion,
    }).subscribe(() => {
      this.loadTarea();
      this.displayDialog = false;
    })
  }

  deleteTarea(id: number){
    this.tareaService.deleteTarea(id).subscribe(() => {
      this.loadTarea();
    });
  }

  finishTarea(tarea: any){
    tarea.Completada = !tarea.Completada;
    this.tareaService.finishTarea(tarea.idTarea).subscribe(() => {
      this.loadTarea();
    })
  }



}
