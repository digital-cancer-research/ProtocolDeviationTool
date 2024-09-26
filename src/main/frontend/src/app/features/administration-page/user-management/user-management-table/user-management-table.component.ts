import { Component, OnInit, ViewChild, inject, Input, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { Observable, Subscription } from 'rxjs';
import { UserManagementData } from '../models/user-management-data.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Team } from 'src/app/core/models/team.model';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { UserTeam } from '../models/user-team.model';

@Component({
  selector: 'app-user-management-table',
  templateUrl: './user-management-table.component.html',
  styleUrls: ['./user-management-table.component.css']
})
export class UserManagementTableComponent implements OnInit, OnDestroy, AfterViewInit {

  /**
   * Observable stream of role names.
   */
  @Input() roleNames$: Observable<string[]> = new Observable();

  /**
   * Observable stream of user management data.
   */
  @Input() data$: Observable<UserManagementData[]> = new Observable();

  /**
   * List of teams.
   */
  @Input() teams: Team[] = [];

  /**
   * Data source for the material table.
   */
  dataSource = new MatTableDataSource<UserManagementData>();

  /**
   * Columns to be displayed in the table.
   */
  displayedColumns: string[] = ['username', 'date', 'role', 'teams', 'confirm'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Currently logged-in user.
   */
  currentUser!: User;

  /**
   * Currently selected team by the user.
   */
  currentTeam!: Team;

  /**
   * Subscription for the data.
   */
  dataSubscription!: Subscription;

  private _snackBar = inject(MatSnackBar);
  snackBarConfig: MatSnackBarConfig = { duration: 5000 };

  private cdr = inject(ChangeDetectorRef);

  constructor(
    private userManagementService: UserManagementService,
    private userService: UserService
  ) { }

  /**
   * Initialies the component and sets up subscriptions.
   */
  ngOnInit(): void {
    this.setupSubscriptions();
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  /**
   * Reassign pagaintor and sorter after view is initialised.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Sets up subscriptions for user and team data.
   */
  setupSubscriptions(): void {
    this.dataSubscription = this.data$.subscribe((data) => this.configureDatasource(data));

    this.userService.currentUser$.subscribe((user) => {
      if (user) this.currentUser = user;
    });

    this.userService.currentUserSelectedTeam$.subscribe((team) => {
      if (team) this.currentTeam = team;
    });
  }

  /**
   * Configures the data source for the material table.
   * @param data - Array of user management data.
   */
  configureDatasource(data: UserManagementData[]): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Checks if the user is part of the specified team.
   * @param teamName - Name of the team to check.
   * @param user - User management data to check.
   * @returns True if the user is part of the team; otherwise, false.
   */
  isUserPartOfTeam(teamName: string, user: UserManagementData): boolean {
    return user.teams.map(team => team.teamName).includes(teamName);
  }

  /**
   * Handles teams changes for a user.
   * @param teams - List of teams to assign.
   * @param user - User management data to update.
   */
  setTeams(teams: Team[], user: UserManagementData): void {
    user.teams = teams;
    user.isEdited = true;
  }

  /**
   * Handles role change for a user.
   * @param roleName - New role name to set.
   * @param event - MatOptionSelectionChange event.
   * @param user - User management data to update.
   */
  setRole(roleName: string, event: MatOptionSelectionChange, user: UserManagementData): void {
    if (event.isUserInput) {
      user.isEdited = true;
      user.roleName = roleName;
      user.roleId = this.userManagementService.getRoleId(roleName);
    }
  }

  /**
   * Handles team changes for a user in the backend.
   * @param user - User whos data is being modified.
   */
  changeTeam(user: UserManagementData) {
    this.userManagementService.changeUserTeam({
      userId: user.userId,
      teamId: user.teams.map(team => team.teamId)
    }).subscribe({
      complete: () => this.handleSuccess(user),
      error: (error) => this.handleError(user, error)
    });
  }

  /**
  * Handles role changes for a user in the backend.
  * @param user - User whos data is being modified.
  */
  changeRole(user: UserManagementData) {
    this.userManagementService.changeUserRole(user.userId, user.roleId)
    .subscribe();
  }

  /**
   * Confirms the changes for a user.
   * @param user - User management data to confirm changes for.
   */
  onConfirm(user: UserManagementData): void {
    user.isLoading = true;
    this.changeTeam(user);
    this.changeRole(user);
  }

  /**
   * Handles a successful update.
   * @param user - User management data that was successfully updated.
   */
  handleSuccess(user: UserManagementData): void {
    this.finishUpdating(user);
    this.showSnackBar('Success', `${user.username} updated`);

    if (user.userId === this.currentUser.userId &&
      !user.teams.map((team) => team.teamName).includes(this.currentTeam.teamName)) {
      this.userService.currentUserSelectedTeamSubject.next(null);
    }
    this.cdr.markForCheck();
  }

  /**
   * Handles an error during update.
   * @param user - User management data that failed to update.
   * @param error - Error object containing details of the failure.
   */
  handleError(user: UserManagementData, error: any): void {
    this.finishUpdating(user);
    this.showSnackBar('Error', `There was an error updating ${user.username}. ${error.message}`);
    this.cdr.markForCheck();
  }

  /**
   * Completes the update process by resetting state.
   * @param user - User management data being updated.
   */
  finishUpdating(user: UserManagementData): void {
    user.isEdited = false;
    user.isLoading = false;
  }

  /**
   * Displays a snackbar message.
   * @param type - Type of message (e.g., 'Success', 'Error').
   * @param message - Message content to display.
   */
  showSnackBar(type: string, message: string): void {
    let snackBarRef = this._snackBar.open(type, message, this.snackBarConfig);
    snackBarRef._open();
  }
}