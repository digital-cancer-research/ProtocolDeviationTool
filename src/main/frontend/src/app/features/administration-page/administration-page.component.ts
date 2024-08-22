import { Component } from '@angular/core';

@Component({
  selector: 'app-administration-page',
  templateUrl: './administration-page.component.html',
  styleUrl: './administration-page.component.css'
})
export class AdministrationPageComponent {
  tabs: { label: string, link: string }[] = [
    { label: "User Management", link: "/administration-page" },
    { label: "Team Management", link: "team-management" },
    { label: "Site Management", link: "site-management" },
    { label: "Audit Trail", link: "audit-trail" }
  ];
}
