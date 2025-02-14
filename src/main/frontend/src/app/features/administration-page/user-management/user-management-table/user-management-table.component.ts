import { Component, OnInit, ViewChild, inject, Input, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Role } from 'src/app/core/new/services/models/user/role.enum';
import { Team } from 'src/app/core/new/services/models/team/team.model';
import { UserService } from 'src/app/core/new/services/user.service';
import { UserWithTeams } from 'src/app/core/new/services/models/user/user-with-teams.model';
import { MatDialog } from '@angular/material/dialog';
import { UserManagementEditDialogueComponent } from '../user-management-edit-dialogue/user-management-edit-dialogue.component';
import { UserUpdateWithTeams } from 'src/app/core/new/services/models/user/user-update-with-teams.model';

@Component({
  selector: 'app-user-management-table',
  templateUrl: './user-management-table.component.html',
  styleUrls: ['./user-management-table.component.css']
})
export class UserManagementTableComponent implements AfterViewInit {

  private readonly userService = inject(UserService);
  private readonly dialogue = inject(MatDialog);

  /**
   * Observable stream of role names.
   */
  roles = Object.values(Role);

  /**
   * Observable stream of user management data.
   */
  dataSubscription!: Subscription;

  data: TableDataEntry[] = [];

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
  displayedColumns: string[] = ['username', 'dateCreated', 'role', 'teams', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private _snackBar = inject(MatSnackBar);
  snackBarConfig: MatSnackBarConfig = { duration: 5000 };

  /**
   * Reassign pagaintor and sorter after view is initialised.
   */
  ngAfterViewInit(): void {
    this.dataSubscription = this.userService.getUsersWithTeams$().subscribe((data) => {
      this.data = this.formatData(data);
      this.configureDatasource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateData() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    this.ngAfterViewInit();
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

  getUserTeams(user: UserWithTeams) {
    return user.teams.map(team => team.name).join(', ')
  }

  openEditDialogue(user: UserWithTeams) {
    const dialogueRef = this.dialogue.open(UserManagementEditDialogueComponent, {
      data: { 
        user: user,
        teams: this.teams
       }
    });

    dialogueRef.afterClosed().subscribe((result: { role: Role, teams: Team[] }) => {
      if (result) {
        this.userService.currentUser$.subscribe(admin => {
          if (admin !== null) {
            const userUpdate = {
              ...user,
              role: result.role,
              teamIds: result.teams.map(team => team.id),
              adminId: admin.id
            } as UserUpdateWithTeams
            this.makeEditRequest(userUpdate);
            user.role = result.role;
            user.teams = result.teams;
            this.configureDatasource(this.data);
          } else {
            this.showSnackBar('You must be logged in to edit data', 'Dismiss');
          }
        })
      }
    });
  }

  makeEditRequest(user: UserUpdateWithTeams) {
    this.userService.updateUserWithTeams$(user).subscribe({
      next: () => {
        this.showSnackBar('User updated successfully', 'Dismiss');
      },
      error: (error) => {
        this.showSnackBar(`Error updating user. ${error.message}`, 'Dismiss');
      }
    })
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

interface TableDataEntry extends UserWithTeams {
  isEdited: boolean;
  isLoading: boolean;
}