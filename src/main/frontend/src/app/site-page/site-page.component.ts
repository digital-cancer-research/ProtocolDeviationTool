import { Component } from '@angular/core';

@Component({
	selector: 'app-site-page',
	templateUrl: './site-page.component.html',
	styleUrls: ['./site-page.component.css']
})
export class SitePageComponent {
	userTeams: any[] = [];
	handleUserTeams(teams: any[]): void {
		this.userTeams = teams;
	}
}
