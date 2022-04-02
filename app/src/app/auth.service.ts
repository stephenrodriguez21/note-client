import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoggedInUser } from './models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = "http://0.0.0.0:8000";

  constructor(public http: HttpClient) { }

  goLogin(model: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/authenticate`, model)
  }

  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedin_user');
  }

  logout(): Observable<any> {
    return of(this.clearLocalStorage())
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  setAuthToken(token: string): void {
    localStorage.setItem("token", token);
  }

  getLoggedInUser(): LoggedInUser | null {
    const user = localStorage.getItem('loggedin_user');
    if(user){
      return JSON.parse(user)
    }
    return null;
  }

  setLoggedInUser(user: LoggedInUser): void {
    localStorage.setItem("loggedin_user", JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    return this.getAuthToken() == null
  }
}
