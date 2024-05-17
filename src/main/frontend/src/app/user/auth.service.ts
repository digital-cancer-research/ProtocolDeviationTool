import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:8080/api/users';

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();

  constructor(private http: HttpClient) {}

  checkAdminRole(username: string): Observable<boolean> {
    // Make an HTTP GET request to check if the user has the admin role
    return this.http.get<boolean>(`${this.baseUrl}/check-admin-role?username=${username}`)
      .pipe(
        // Update the isAdminSubject with the received value
        tap(isAdmin => this.isAdminSubject.next(isAdmin))
      );
  }

  get isAdmin(): boolean {
    return this.isAdminSubject.value;
  }
}
