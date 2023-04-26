import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = 'http://localhost:3001';
  private readonly jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.API_URL}/login`, { username, password }).pipe(
      tap((res: LoginResponse) => localStorage.setItem('access_token', res.token))
    );
  }
  
  logout() {
    //console.log("logout")
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    //console.log(token)
    return !this.jwtHelper.isTokenExpired(token);
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
}