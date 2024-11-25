import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { urlBack } from './Finals';
//import { environment } from 'src/environments/environment'; // Asegúrate de tener un archivo de entorno para tus configuraciones

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = urlBack; 

  constructor(private http: HttpClient, private router: Router) {}

  // Método para iniciar sesión y obtener el token
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}token/`, { username, password });
  }

  // Método para obtener un nuevo token de acceso usando el token de refresco
  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}token/refresh/`, { refresh: refreshToken });
  }

  // Método para almacenar el token de acceso en el almacenamiento local
  storeToken(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  // Método para obtener el token de acceso almacenado
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
  getArea(): string | null {
    return localStorage.getItem('area');
  }

  // Método para eliminar el token de acceso
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('area');
    this.router.navigate(['/']);
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }
  validateToken(token: any){
    return this.http.post<any>(urlBack+'validatetoken/',{token})
  }
}