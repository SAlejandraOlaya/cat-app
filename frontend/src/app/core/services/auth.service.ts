import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUser, IAuthResponse } from "../../shared/interfaces/user.interface";
import { Observable, tap, map } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<IUser> {
    return this.http
      .post<IAuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          this.saveToken(response.token);
          const { token, ...user } = response;
          this.saveUser(user);
        }),
        map(({ token, ...user }) => user)
      );
  }

  register(name: string, email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/register`, {
      name,
      email,
      password,
    });
  }

  getProfile(): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/profile`).pipe(
      tap((user) => this.saveUser(user))
    );
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  saveToken(token: string): void {
    localStorage.setItem("token", token);
  }

  saveUser(user: IUser): void {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser(): IUser | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
}
