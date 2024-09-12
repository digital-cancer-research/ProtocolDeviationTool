import { Component, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { UserManagementService } from './user-management.service';
import { map, Observable, of, Subscription } from 'rxjs';
import { UserManagementData } from './models/user-management-data.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Team } from 'src/app/core/models/team.model';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
	selector: 'app-user-management',
	templateUrl: './user-management.component.html',
	styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
	roleNames$: Observable<string[]> = this.userManagementService.roleNames$;
	data$: Observable<UserManagementData[]> = this.userManagementService.userManagementData$;
	teams$: Observable<Team[]> = this.userManagementService.teams$.pipe(
		map((teams) => {
			return teams.map((team) => {
				return {
					teamId: team.teamId,
					teamName: team.teamName
				}
			})
		})
	);
	teams: Team[] = [];

	private _snackBar = inject(MatSnackBar);
	snackBarConfig = {
		duration: 5000
	} as MatSnackBarConfig

	constructor(
		private userManagementService: UserManagementService
	) { }

	ngOnInit(): void {
		this.teams$.subscribe(((teams) => this.teams = teams));
	}
}
