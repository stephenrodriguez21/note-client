import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }

  goLogin(model: any) {
    return this.http.post('http://0.0.0.0:8000/authenticate', model)
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  setAuthToken(token: string): void {
    localStorage.setItem("token", token);
  }
}
