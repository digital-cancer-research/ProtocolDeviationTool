import { Component, OnInit, OnDestroy, ViewChild, inject, Input } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { map, Observable, Subscription } from 'rxjs';
import { UserManagementData } from '../models/user-management-data.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Team } from 'src/app/core/models/team.model';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-management-table',
  templateUrl: './user-management-table.component.html',
  styleUrl: './user-management-table.component.css'
})
export class UserManagementTableComponent implements OnInit {
  @Input() roleNames$: Observable<string[]> = new Observable();
  @Input() data$: Observable<UserManagementData[]> = new Observable();
  @Input() teams$: Observable<Team[]> = new Observable();
  teams: Team[] = [];
  dataSource = new MatTableDataSource<UserManagementData>();
  displayedColumns: string[] = ['username', 'date', 'role', 'teams', 'confirm'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private _snackBar = inject(MatSnackBar);
  snackBarConfig = {
    duration: 5000
  } as MatSnackBarConfig

  constructor(
    private userManagementService: UserManagementService
  ) { }

  ngOnInit(): void {
    this.data$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.teams$.subscribe(((teams) => this.teams = teams));
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

  setTeams(teams: Team[], user: UserManagementData) {
    user.teams = teams;
    user.isEdited = true;
  }

  onConfirm(user: UserManagementData) {
    user.isLoading = true;
    this.userManagementService.changeUserTeam(
      {
        userId: user.userId,
        teamId: user.teams.map(team => team.teamId)
      }
    ).subscribe({
      complete: () => {
        let snackBarRef = this._snackBar.open('Success', `${user.username} updated`,
          this.snackBarConfig
        );
        snackBarRef._open();
        user.isLoading = false;
        user.isEdited = false;
      },
      error: (error) => {
        let snackBarRef = this._snackBar.open('Error',
          `There was an error updating ${user.username}. ${error.message}`,
          this.snackBarConfig);
        snackBarRef._open();
        user.isLoading = false;
        user.isEdited = false;
      }
    }
    );
  }
}