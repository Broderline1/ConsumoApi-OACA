import { UserModel } from "./user.model";

export interface TareaModel{
    IdTarea: number;
    Tarea: string;
    Descripcion: string;
    Usuarioos: UserModel;
    Completada?: boolean;
}
