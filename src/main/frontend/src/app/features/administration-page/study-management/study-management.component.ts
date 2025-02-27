import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { TeamService } from 'src/app/core/new/services/team.service';
import { TeamWithStudies } from 'src/app/core/new/services/models/team/team-with-studies.model';
import { UserService } from 'src/app/core/new/services/user.service';
import { StudyService } from 'src/app/core/services/study.service';
import { Study } from 'src/app/core/new/services/models/study/study.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StudyManagementEditDialogueComponent } from './study-management-edit-dialogue/study-management-edit-dialogue.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-study-management',
  templateUrl: './study-management.component.html',
  styleUrl: './study-management.component.css'
})
export class StudyManagementComponent implements AfterViewInit {
  protected displayedColumns: string[] = ["name", "studies", "actions"];
  protected dataSource!: MatTableDataSource<TableDataEntry>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly teamService = inject(TeamService);
  private readonly userService = inject(UserService);
  private readonly studyService = inject(StudyService);
  private data$ = this.teamService.getTeamsWithStudies$();
  studies: Study[] = [];
  isEdited: Map<number, boolean> = new Map();

  private readonly dialogue = inject(MatDialog);

  ngAfterViewInit(): void {
    this.studyService.getStudies().pipe(
      tap(studies => {
        this.studies = studies;
      }),
      switchMap(() => this.data$)
    ).subscribe(data => {
      this.dataSource = new MatTableDataSource(this.formatData(data));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.filterPredicate
    });
  }

  formatData(data: TeamWithStudies[]): TableDataEntry[] {
    return data.map(team => ({
      ...team,
      inProgress: false
    }));
  }

  getTeamStudies(team: TeamWithStudies) {
    return team.studies.map(study => study.externalStudyId)
      .join(', ');
  }

  findIndexOfTeam(team: TeamWithStudies) {
    return this.dataSource.data.findIndex(d => d.id === team.id);
  }

  openDialogue(team: TableDataEntry) {
    const dialogueRef = this.dialogue.open(StudyManagementEditDialogueComponent, {
      data: {
        team: team,
        studies: this.studies
      }
    })

    dialogueRef.afterClosed().subscribe((studies: Study[]) => {
      if (studies) {
        team.inProgress = true;
        const updateTeam = {
          name: team.name,
          id: team.id,
          studies: studies,
          inProgress: false
        } as TableDataEntry
        this.updateTeam(updateTeam);
      }
    });
  }

  updateTeam(team: TableDataEntry) {
    this.userService.currentUser$.subscribe(user => {
      if (user !== null) {
        const teamUpdate = {
          id: team.id,
          adminId: user.id,
          studyIds: team.studies.map(s => s.id)
        };
        this.teamService.setStudies$(teamUpdate).subscribe({
          next: () => {
            this.updateLocalData(team);
            this._snackBar.open(`Studies updated successfully for ${team.name}`);
          },
          error: (error) => {
            this.resetFailedUpdate(team);
            console.error(`Error updating team studies: ${error.message}`);
            this._snackBar.open(`Error updating team studies: ${error.message}`, "Dismiss");
            this.isEdited.set(team.id, false);
          }
        });
      } else {
        this.resetFailedUpdate(team);
        this.openSnackBar("You must be logged in to edit team study access", "Dismiss");
      }
    })
    this.isEdited.set(team.id, false);
  }

  updateLocalData(team: TableDataEntry) {
    const index = this.findIndexOfTeam(team);
    const data = this.dataSource.data;
    data[index] = team;
    this.dataSource.data = data;
  }

  resetFailedUpdate(team: TableDataEntry) {
    const index = this.findIndexOfTeam(team);
    const data = this.dataSource.data;
    const originalTeam = data[index];
    originalTeam.inProgress = false;
    this.dataSource.data = data;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterPredicate(team: TeamWithStudies, filter: string) {
    const filterText = filter.trim().toLowerCase();
    const teamNameMatch = team.name.toLowerCase().includes(filterText);
    const studyIdsMatch = team.studies
      .map(study => study.externalStudyId.toLowerCase())
      .some(id => id.includes(filterText));

    return teamNameMatch || studyIdsMatch;
  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }
}

interface TableDataEntry extends TeamWithStudies {
  inProgress: boolean;
}