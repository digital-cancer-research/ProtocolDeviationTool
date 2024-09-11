import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UserManagementService } from './user-management.service';
import { Observable, Subscription } from 'rxjs';
import { UserManagementData } from './models/user-management-data.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Team } from 'src/app/core/models/team.model';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
	selector: 'app-user-management',
	templateUrl: './user-management.component.html',
	styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit, OnDestroy {
	roleNames$: Observable<string[]> = this.userManagementService.roleNames$;
	data$: Observable<UserManagementData[]> = this.userManagementService.userManagementData$;
	teams$: Observable<Team[]> = this.userManagementService.teams$;
	dataSubscription!: Subscription;
	dataSource = new MatTableDataSource<UserManagementData>();
	displayedColumns: string[] = ['username', 'date', 'role', 'teams', 'confirm'];
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor(
		private userManagementService: UserManagementService
	) { }

	ngOnInit(): void {
		this.data$.subscribe((data) => {
			this.dataSource = new MatTableDataSource(data);
			this.dataSource.paginator = this.paginator;
		});
	}

	ngOnDestroy(): void {
		if (this.dataSubscription) {
			this.dataSubscription.unsubscribe();
		};
	}

	isUserPartOfTeam(teamName: string, user: UserManagementData) {
		return user.teams.map(team => team.teamName).includes(teamName);
	}

	changeRole(roleName: string, event: MatOptionSelectionChange, user: UserManagementData) {
		if (event.isUserInput) {
			user.isEdited = true;
			user.roleName = roleName;
		}
	}

	changeTeam(team: Team, event: MatCheckboxChange, user: UserManagementData) {
		if (event.checked) {
			user.teams.push(team);
		}
		else {
			user.teams.splice(user.teams.map(team => team.teamName).indexOf(team.teamName), 1);
		}
		user.isEdited = true;
	}

	confirm(user: UserManagementData) {
	}
}
