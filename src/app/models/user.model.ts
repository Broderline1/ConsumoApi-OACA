import { TareaModel } from "./tarea.model";

export interface UserModel{
    IdUsuario: number;
    nombre: string;
    usuario: string;
    contrasena: string;
    tasks: TareaModel[];
}
