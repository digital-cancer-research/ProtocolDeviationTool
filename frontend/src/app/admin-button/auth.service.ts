import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  checkAdminRole(username: string): Observable<boolean> {
    // Make an HTTP GET request to check if the user has the admin role
    return this.http.get<boolean>(`${this.baseUrl}/check-admin-role?username=${username}`);
  }
}
