import { AfterViewInit, Component, inject, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TeamWithDetails } from 'src/app/core/models/team/team-with-details.model';
import { TeamService } from 'src/app/core/services/team.service';
import { TeamManagementEditDialogueComponent } from '../team-management-edit-dialogue/team-management-edit-dialogue.component';
import { mergeMap } from 'rxjs';

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
    const data = this.teams.map(team => {
      return {
        ...team,
        actions: true
      };
    });
    this.setupTable(this.teams)
  }

  setupTable(teams: TeamWithDetails[]): void {
    const data = MOCK_DATA.map(team => {
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
    this.dialog.open(TeamManagementEditDialogueComponent, {
      data: {
        team: row,
        teams: this.teams
      }
    }).afterClosed().pipe(
      mergeMap(newTeam => this.teamService.updateTeam$(newTeam))
    ).subscribe(
      {
        next: (editedTeam) => {
          this.openSnackbar(`${editedTeam.teamName} updated successfully`, "Undo").onAction().pipe(
            mergeMap(() => this.teamService.updateTeam$(row))
          ).subscribe(
            {
              next: (team) => {
                this.openSnackbar(`${team.teamName} updated successfully`, "")
              },
              error: (error) => {
                this.openSnackbar(`Error updating ${editedTeam.teamName}`, "");
              }
            }
          );
        },
        error: (error) => {
          this.openSnackbar(`Error updating ${row.teamName}`, "");
        }
      }
    );
  }

  onDelete(row: TableData): void {
    row.disabled = true;
    this.teamService.deleteTeam$(row.teamId).subscribe(
      {
        complete: () => {
          this.openSnackbar("Team deleted successfully", "");
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

const MOCK_DATA = [
  {
    "teamId": 1,
    "teamName": "Clinical Operations Team",
    "userId": 1,
    "dateCreated": "01/01/2023",
    "username": "drjohndoe@gmail.com"
  },
  {
    "teamId": 2,
    "teamName": "Cardiovascular Research Team",
    "userId": 1,
    "dateCreated": "01/01/2023",
    "username": "drjohndoe@gmail.com"
  },
  {
    "teamId": 3,
    "teamName": "Oncology Clinical Trials Unit",
    "userId": 1,
    "dateCreated": "01/01/2023",
    "username": "drjohndoe@gmail.com"
  },
  {
    "teamId": 4,
    "teamName": "Neuroscience Investigative Group",
    "userId": 1,
    "dateCreated": "01/01/2023",
    "username": "drjohndoe@gmail.com"
  },
  {
    "teamId": 5,
    "teamName": "Pediatric Clinical Research Consortium",
    "userId": 1,
    "dateCreated": "01/01/2023",
    "username": "drjohndoe@gmail.com"
  },
  {
    "teamId": 6,
    "teamName": "Infectious Diseases Research Team",
    "userId": 1,
    "dateCreated": "01/01/2023",
    "username": "drjohndoe@gmail.com"
  },
  {
    "teamId": 7,
    "teamName": "Endocrinology and Metabolism Study Group",
    "userId": 1,
    "dateCreated": "01/01/2023",
    "username": "drjohndoe@gmail.com"
  },
  {
    "teamId": 8,
    "teamName": "Women's Health Research Alliance",
    "userId": 1,
    "dateCreated": "01/01/2023",
    "username": "drjohndoe@gmail.com"
  },
  {
    "teamId": 9,
    "teamName": "Surgical Outcomes Research Network",
    "userId": 1,
    "dateCreated": "01/01/2023",
    "username": "drjohndoe@gmail.com"
  },
  {
    "teamId": 10,
    "teamName": "Geriatrics and Aging Research Collaborative",
    "userId": 1,
    "dateCreated": "01/01/2023",
    "username": "drjohndoe@gmail.com"
  },
  {
    "teamId": 11,
    "teamName": "Translational Medicine Investigation Team",
    "userId": 1,
    "dateCreated": "01/01/2023",
    "username": "drjohndoe@gmail.com"
  },
  {
    "teamId": 12,
    "teamName": "New Team",
    "userId": 3,
    "dateCreated": "08-Nov-2024 12:00",
    "username": "healthpro123@hotmail.com"
  },
  {
    "teamId": 16,
    "teamName": "Testing user form",
    "userId": 1,
    "dateCreated": "2024-11-18T10:48:43.1418856",
    "username": "drjohndoe@gmail.com"
  },
  {
    "teamId": 17,
    "teamName": "Tests name taken",
    "userId": 1,
    "dateCreated": "2024-11-18T12:32:06.7411307",
    "username": "drjohndoe@gmail.com"
  },
  {
    "teamId": 19,
    "teamName": "a",
    "userId": 1,
    "dateCreated": "2024-11-18T12:50:32.2586404",
    "username": "drjohndoe@gmail.com"
  },
  {
    "teamId": 20,
    "teamName": "b",
    "userId": 1,
    "dateCreated": "2024-11-18T15:43:52.6526649",
    "username": "drjohndoe@gmail.com"
  },
  {
    "teamId": 21,
    "teamName": "c",
    "userId": 1,
    "dateCreated": "2024-11-18T15:57:55.9630036",
    "username": "drjohndoe@gmail.com"
  },
  {
    "teamId": 23,
    "teamName": "d",
    "userId": 1,
    "dateCreated": "2024-11-18T16:00:46.4636796",
    "username": "drjohndoe@gmail.com"
  }
]
