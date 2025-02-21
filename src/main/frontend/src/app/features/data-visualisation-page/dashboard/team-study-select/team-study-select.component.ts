import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StudyService } from 'src/app/core/services/study.service';
import { SelectDialogComponent } from './select-dialog/select-dialog.component';
import { DetailedViewComponent } from '../detailed-view/detailed-view.component';
import { TotalPdsComponent } from '../detailed-view/total-pds/total-pds.component';
import { TeamService } from 'src/app/core/new/services/team.service';
import { Team } from 'src/app/core/new/services/models/team/team.model';
import { Study } from 'src/app/core/new/services/models/study/study.model';

/**
 * Component for selecting the user's team or
 * a study associated with the team and redirecting the
 * user to a new page to visualise associated data.
 * @class TeamStudySelectComponent
 */
@Component({
  selector: 'app-team-study-select',
  templateUrl: './team-study-select.component.html',
  styleUrl: './team-study-select.component.css'
})
export class TeamStudySelectComponent {
  protected readonly teamURL = `${DetailedViewComponent.URL}/${TotalPdsComponent.URL}`;
  private readonly teamService = inject(TeamService);
  private readonly studyService = inject(StudyService);
  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(SelectDialogComponent, {
      data: {
        studies: this.studies
      }
    });
  }

  /** Observable for the currently selected team */
  team$: Observable<Team | null> = this.teamService.currentTeam$;

  teamName: string = "";

  studies: Study[] = [];

  /**
   * Constructor that injects the UserService and StudyService.
   * @param userService - Service to manage user-related data and operations.
   * @param studyService - Service to manage study-related data and operations.
   */
  constructor() {
    this.teamService.currentTeam$.subscribe((team) => {
      if (team) {
        this.teamName = team.name;
        this.studyService.getStudies(team.id)
          .subscribe(studies => this.studies = studies);
      }
    })
  }
}