import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-admin-button',
  templateUrl: './admin-button.component.html',
})
export class AdminButtonComponent implements OnInit {
  isAdmin = false; // Default to false

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Check if the user has the admin role

  }
}
