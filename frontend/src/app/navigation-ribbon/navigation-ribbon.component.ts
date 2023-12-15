import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-navigation-ribbon',
  templateUrl: './navigation-ribbon.component.html',
  styleUrls: ['./navigation-ribbon.component.css']
})
export class NavigationRibbonComponent implements OnInit {
  @Input() buttons: { label: string, route: string }[] = [];
  isAdmin = false; // Default to false

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Fetch the isAdmin status when the component initializes
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }
}
