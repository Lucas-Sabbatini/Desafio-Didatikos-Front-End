import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      this.tokenSubject.next(token);
    }
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const authString = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${authString}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/login`, null, {
      headers,
      responseType: 'text'
    }).pipe(
      map(token => ({ token } as LoginResponse)),
      tap({
        next: (response) => {
          console.log('Login successful, response:', response);
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.tokenSubject.next(response.token);
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          console.error('Error details:', {
            status: error.status,
            message: error.message,
            error: error.error
          });
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }
}
