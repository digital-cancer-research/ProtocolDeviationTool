import { AfterViewInit, Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TeamWithDetails } from 'src/app/core/models/team/team-with-details.model';
import { TeamService } from 'src/app/core/services/team.service';
import { TeamManagementEditDialogueComponent } from '../team-management-edit-dialogue/team-management-edit-dialogue.component';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Team } from 'src/app/core/models/team/team.model';

@Component({
  selector: 'app-team-management-table',
  templateUrl: './team-management-table.component.html',
  styleUrl: './team-management-table.component.css'
})
export class TeamManagementTableComponent implements AfterViewInit, OnChanges {

  private teamService = inject(TeamService);
  private _snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  @Input() teams: TeamWithDetails[] = [];
  @Output() dataUpdate: EventEmitter<TeamWithDetails[]> = new EventEmitter();

  displayedColumns: string[] = ['teamName', 'username', 'dateCreated', 'actions'];
  dataSource!: MatTableDataSource<TableData>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    const teamChanges = changes['teams'];
    if (teamChanges && !teamChanges.firstChange) {
      this.setupTable(teamChanges.currentValue);
    }
  }

  ngAfterViewInit(): void {
    this.setupTable(this.teams);
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
        switchMap(editedTeam => this.updateTeam(editedTeam, row)),
        tap(editedTeam => this.handleSuccessfulEdit(editedTeam, row)),
        catchError(error => this.handleEditError(error, row))
      )
      .subscribe();
  }

  private openEditDialog(row: TableData) {
    return this.dialog.open(TeamManagementEditDialogueComponent, {
      data: { team: row, teams: this.teams }
    });
  }

  private updateTeam(newTeam: Team, originalTeam: TableData) {
    return this.teamService.updateTeam$(newTeam).pipe(
      map(updatedTeam => ({
        ...updatedTeam,
        username: originalTeam.username
      } as TeamWithDetails))
    );
  }

  private handleSuccessfulEdit(editedTeam: TeamWithDetails, originalTeam: TableData) {
    const message = `${originalTeam.teamName} updated successfully`;
    const undoAction = "Undo";

    this.openSnackbar(message, undoAction)
      .onAction()
      .pipe(
        switchMap(() => this.revertTeamChanges(originalTeam)),
        tap(() => {
          this.openSnackbar(`${originalTeam.teamName} reverted successfully`, "")
          this.updateLocalTeamData(originalTeam)
        }),
        catchError(error => this.handleRevertError(error, originalTeam))
      )
      .subscribe();

    this.updateLocalTeamData(editedTeam);
  }

  private revertTeamChanges(team: TableData) {
    return this.teamService.updateTeam$(team);
  }

  private updateLocalTeamData(team: TeamWithDetails) {
    const index = this.getIndexOfTeam(team);
    if (index !== -1) {
      this.teams[index] = team;
      this.notifyParentOfChangeInData();
    }
  }

  private handleRevertError(error: any, team: TableData) {
    console.error('Error reverting team changes:', error);
    this.openSnackbar(`Error reverting changes for ${team.teamName}`, "");
    return of(null);
  }

  private handleEditError(error: any, team: TableData) {
    console.error('Error updating team:', error);
    this.openSnackbar(`Error updating ${team.teamName}`, "");
    return of(null);
  }

  getIndexOfTeam(target: Team): number {
    const index = this.teams.findIndex(team => team.teamId === target.teamId);
    return index ? index : -1;
  }

  onDelete(row: TableData): void {
    row.disabled = true;
    this.teamService.deleteTeam$(row.teamId).subscribe(
      {
        complete: () => {
          this.openSnackbar(`${row.teamName} deleted successfully`, "");
          this.teams = this.teams.filter(team => team.teamId !== row.teamId);
          this.notifyParentOfChangeInData();
        },
        next: () => {
          row.disabled = false;
        },
        error: (error) => {
          this.openSnackbar(`Error deleting ${row.teamName}`, "");
        }
      }
    )
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