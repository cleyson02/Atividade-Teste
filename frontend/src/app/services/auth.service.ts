import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  login(credentials: { login: string, senha: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  recuperarSenha(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recuperar-senha`, { email });
  }
}