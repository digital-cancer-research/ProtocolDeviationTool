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

@Component({
  selector: 'app-study-management',
  templateUrl: './study-management.component.html',
  styleUrl: './study-management.component.css'
})
export class StudyManagementComponent implements AfterViewInit {
  protected displayedColumns: string[] = ["name", "studies", "actions"];
  protected dataSource!: MatTableDataSource<TeamWithStudies>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly teamService = inject(TeamService);
  private readonly userService = inject(UserService);
  private readonly studyService = inject(StudyService);
  private data$ = this.teamService.getTeamsWithStudies$();
  studies: Study[] = [];
  isEdited: Map<number, boolean> = new Map();

  ngAfterViewInit(): void {
    this.studyService.getStudies().pipe(
      tap(studies => {
        this.studies = studies;
      }),
      switchMap(() => this.data$)
    ).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.filterPredicate
    });
  }

  getTeamStudies(team: TeamWithStudies) {
    return team.studies.map(study => study.externalStudyId)
      .join(', ');
  }

  findIndexOfTeam(team: TeamWithStudies) {
    return this.dataSource.data.findIndex(d => d.id === team.id);
  }

  updateTeam(team: TeamWithStudies) {
    this.userService.currentUser$.subscribe(user => {
      if (user !== null) {
        const teamUpdate = {
          id: team.id,
          adminId: user.id,
          studyIds: team.studies.map(s => s.id)
        };
        this.teamService.setStudies$(teamUpdate).subscribe();
      } else {
        console.error("User is not logged in");
      }
    })
    this.isEdited.set(team.id, false);
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
}
