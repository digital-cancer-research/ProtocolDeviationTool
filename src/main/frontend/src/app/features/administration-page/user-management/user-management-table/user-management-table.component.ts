import { Component, OnInit, ViewChild, inject, Input, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Role } from 'src/app/core/new/services/models/user/role.enum';
import { Team } from 'src/app/core/new/services/models/team/team.model';
import { UserService } from 'src/app/core/new/services/user.service';
import { User } from 'src/app/core/new/services/models/user/user.model';
import { TeamService } from 'src/app/core/new/services/team.service';
import { UserWithTeams } from 'src/app/core/new/services/models/user/user-with-teams.model';

@Component({
  selector: 'app-user-management-table',
  templateUrl: './user-management-table.component.html',
  styleUrls: ['./user-management-table.component.css']
})
export class UserManagementTableComponent implements OnInit, OnDestroy, AfterViewInit {

  /**
   * Observable stream of role names.
   */
  roles = Object.values(Role);

  /**
   * Observable stream of user management data.
   */
  @Input() data$: Observable<UserWithTeams[]> = new Observable();

  /**
   * List of teams.
   */
  @Input() teams: Team[] = [];

  /**
   * Data source for the material table.
   */
  dataSource = new MatTableDataSource<TableDataEntry>();

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
    private userService: UserService,
    private teamService: TeamService
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
    this.dataSubscription = this.data$.subscribe((data) => this.configureDatasource(this.formatData(data)));

    this.userService.currentUser$.subscribe((user) => {
      if (user) this.currentUser = user;
    });

    this.teamService.currentTeam$.subscribe((team) => {
      if (team) this.currentTeam = team;
    });
  }

  formatData(data: UserWithTeams[]) {
    return data.map((user) => {
      return {
        ...user,
        isEdited: false,
        isLoading: false
      }
    });
  }

  /**
   * Configures the data source for the material table.
   * @param data - Array of user management data.
   */
  configureDatasource(data: TableDataEntry[]): void {
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
  isUserPartOfTeam(teamName: string, user: TableDataEntry): boolean {
    return user.teams.map(team => team.name).includes(teamName);
  }

  /**
   * Handles team changes for a user in the backend.
   * @param user - User whos data is being modified.
   */
  changeTeam(user: TableDataEntry) {
    
  }

  getUserTeams(user: UserWithTeams) {
    return user.teams.map(team => team.name).join(', ')
  }

  /**
   * Confirms the changes for a user.
   * @param user - User management data to confirm changes for.
   */
  onConfirm(user: TableDataEntry): void {
    if (user.id === this.currentUser.id
    ) {
      this.showSnackBar('Error', 'You cannot deactivate your own account');
      return
    }
    user.isLoading = true;
  }

  /**
   * Handles a successful update.
   * @param user - User management data that was successfully updated.
   */
  handleSuccess(user: TableDataEntry): void {
    this.finishUpdating(user);
    this.showSnackBar('Success', `${user.username} updated`);

    if (user.id === this.currentUser.id &&
      !user.teams.map((team) => team.name).includes(this.currentTeam.name)) {
      this.teamService.currentTeamSubject.next(null);
    }
    this.cdr.markForCheck();
  }

  /**
   * Handles an error during update.
   * @param user - User management data that failed to update.
   * @param error - Error object containing details of the failure.
   */
  handleError(user: TableDataEntry, error: any): void {
    this.finishUpdating(user);
    this.showSnackBar('Error', `There was an error updating ${user.username}. ${error.message}`);
    this.cdr.markForCheck();
  }

  /**
   * Completes the update process by resetting state.
   * @param user - User management data being updated.
   */
  finishUpdating(user: TableDataEntry): void {
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

interface TableDataEntry extends UserWithTeams {
  isEdited: boolean;
  isLoading: boolean;
}