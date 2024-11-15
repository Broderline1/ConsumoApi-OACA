import { UserModel } from "./user.model";

export interface CreateTareaModel{
    tarea: string;
    descripcion: string;
    idUsuario: number;
}