import { Component } from '@angular/core';
import { Tab } from 'src/app/shared/tab/tab';

@Component({
  selector: 'app-administration-page',
  templateUrl: './administration-page.component.html',
  styleUrl: './administration-page.component.css'
})
export class AdministrationPageComponent {
  tabs: Tab[] = [
    new Tab("User Management", "user-management"),
    new Tab("Team Management", "team-management"),
    new Tab("Site Management", "site-management", true),
    new Tab("Study Management", "study-management"),
    new Tab("Audit Trail", "audit-trail")
  ];
}
