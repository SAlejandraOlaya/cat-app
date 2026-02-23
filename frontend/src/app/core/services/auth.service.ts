import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(user => this.saveUser(user))
    );
  }

  register(name: string, email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/register`, { name, email, password });
  }

  saveUser(user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): IUser | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}
