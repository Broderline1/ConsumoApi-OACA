import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { Observable, ObservableLike } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateUserModel } from '../../models/createuser.model';
import { UpdateUserModel } from '../../models/updateuser.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'https://localhost:44336/api/User';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl)
  }

  createUsuario(user: CreateUserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrl, user);
  }

  updateUsuario(id: number, user: UpdateUserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.apiUrl}/${id}`, user);
  }

  deleteUsuario(id: number): Observable<UserModel> {
    return this.http.delete<UserModel>(`${this.apiUrl}/${id}`);
  }
}
