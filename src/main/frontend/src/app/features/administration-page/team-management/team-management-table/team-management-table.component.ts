import { AfterViewInit, Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TeamWithDetails } from 'src/app/core/models/team/team-with-details.model';
import { TeamManagementEditDialogueComponent } from '../team-management-edit-dialogue/team-management-edit-dialogue.component';
import { catchError, of, Subscription, switchMap, tap } from 'rxjs';
import { TeamService } from 'src/app/core/new/services/team.service';
import { Team } from 'src/app/core/new/services/models/team/team.model';
import { UserService } from 'src/app/core/new/services/user.service';
import { TeamUpdate } from 'src/app/core/new/services/models/team/team-update.model';

@Component({
  selector: 'app-team-management-table',
  templateUrl: './team-management-table.component.html',
  styleUrl: './team-management-table.component.css'
})
export class TeamManagementTableComponent implements AfterViewInit {

  private readonly teamService = inject(TeamService);
  private readonly userService = inject(UserService);
  private _snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  teams$ = this.teamService.getTeamsWithDetails$();
  teams: TeamWithDetails[] = [];
  teamSubscription!: Subscription;
  displayedColumns: string[] = ['name', 'username', 'dateCreated', 'actions'];
  dataSource!: MatTableDataSource<TableData>;

  @Output() dataUpdate: EventEmitter<TeamWithDetails[]> = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  updateTable() {
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
    this.ngAfterViewInit();
  }

  ngAfterViewInit(): void {
    this.teamSubscription = this.teams$.subscribe(teams => {
      this.teams = teams;
      this.setupTable(this.teams);
    });
  }

  setupTable(teams: TeamWithDetails[]): void {
    const data = teams.map(team => {
      return {
        ...team,
        actions: true,
        disabled: false
      };
    })
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(row: TableData): void {
    this.openEditDialog(row).afterClosed()
      .pipe(
        switchMap(editedTeam => {
          if (editedTeam) {
            return this.updateTeam(editedTeam);
          } else {
            return of(null);
          }
        }),
        tap(editedTeam => {
          if (editedTeam !== null) {
            this.handleSuccessfulEdit(editedTeam, row);
          }
        }),
        catchError(error => this.handleEditError(error, row))
      )
      .subscribe();
  }

  private openEditDialog(row: TableData) {
    return this.dialog.open(TeamManagementEditDialogueComponent, {
      data: { team: row, teams: this.teams }
    });
  }

  private updateTeam(team: Team) {
    return this.userService.currentUser$.pipe(
      switchMap(user => {
        if (user !== null) {
          const teamUpdate = {
            adminId: user.id,
            teamId: team.id,
            name: team.name
          } as TeamUpdate;
          return this.teamService.updateTeam$(teamUpdate).pipe();
        } else {
          this.openSnackbar("You must be logged in to update a team", "Dismiss");
          return of(null);
        }
      })
    );
  }

  private handleSuccessfulEdit(editedTeam: Team, originalTeam: TableData) {
    const message = `${originalTeam.name} updated successfully`;
    this.openSnackbar(message, "Dismiss");
    const newTeamWithDetails = {
      ...originalTeam,
      name: editedTeam.name
    } as TeamWithDetails;
    this.updateLocalTeamData(newTeamWithDetails);
  }

  private updateLocalTeamData(team: TeamWithDetails) {
    const index = this.getIndexOfTeam(team);
    if (index !== -1) {
      this.teams[index] = team;
      this.notifyParentOfChangeInData();
    }
  }

  private handleEditError(error: any, team: TableData) {
    this.openSnackbar(`Error updating ${team.name}. ${error.message}`, "Dismiss");
    return of(null);
  }

  /**
   * Finds the index of a specified team within the component's teams array.
   * 
   * @param target - The team object to search for in the array.
   *                 It should have a 'teamId' property that matches the team to find.
   * 
   * @returns The index of the team in the array if found, or -1 if the team is not present.
   */
  getIndexOfTeam(target: TeamWithDetails): number {
    const index = this.teams.findIndex(team => team.id === target.id);
    return index;
  }


  /**
   * Initiates the deletion process for a team from the table.
   * 
   * This function disables the row, sends a delete request to the server,
   * and handles the response by updating the UI accordingly.
   * 
   * @param row - The TableData object representing the team to be deleted.
   *              It contains all the information about the team, including its ID and name.
   * 
   * @returns void This function doesn't return a value, but it updates the component's state
   *               and triggers UI updates based on the deletion outcome.
   */
  onDelete(row: TableData): void {
    row.disabled = true;
    this.userService.currentUser$.subscribe(user => {
      if (user !== null) {
        this.teamService.deleteTeam$(row.id, user.id).subscribe(
          {
            complete: () => {
              this.openSnackbar(`${row.name} deleted successfully`, "");
              this.teams = this.teams.filter(team => team.id !== row.id);
              this.notifyParentOfChangeInData();
              row.disabled = false;
            },
            error: (error) => {
              this.openSnackbar(`Error deleting ${row.name}. ${error.message}`, "");
              row.disabled = false;
            }
          }
        )
      } else {
        this.openSnackbar("You must be logged in to delete a team", "Dismiss");
        row.disabled = false;
      }
    })

  }


  /**
   * Notifies the parent component of changes in the team data and updates the table.
   * 
   * @returns {void} This function does not return a value.
   */
  notifyParentOfChangeInData(): void {
    this.dataUpdate.emit(this.teams);
    this.setupTable(this.teams);
  }


  /**
   * Opens a snackbar to display a message to the user.
   * 
   * @param message - The text content to be displayed in the snackbar.
   * @param action - The label for the snackbar's action button. If empty, no action button is shown.
   * @returns A MatSnackBarRef<T> object, which can be used to dismiss the snackbar or subscribe to its events.
   */
  openSnackbar(message: string, action: string) {
    return this._snackBar.open(message, action, {
      duration: 5000
    });
  }
}

interface TableData extends TeamWithDetails {
  actions: boolean;
  disabled: boolean;
}