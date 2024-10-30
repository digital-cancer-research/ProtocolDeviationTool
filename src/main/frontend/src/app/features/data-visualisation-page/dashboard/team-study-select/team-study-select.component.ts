import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Team } from 'src/app/core/models/team.model';
import { StudyService } from 'src/app/core/services/study.service';
import { UserService } from 'src/app/core/services/user.service';
import { SelectDialogComponent } from './select-dialog/select-dialog.component';
import { DetailedViewComponent } from '../detailed-view/detailed-view.component';
import { TotalPdsComponent } from '../detailed-view/total-pds/total-pds.component';

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

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(SelectDialogComponent, {
      data: {
        studies: this.studies
      }
    });
  }

  /** Observable for the currently selected team */
  team$: Observable<Team | null> = this.userService.currentUserSelectedTeam$;

  teamName: string = "";

  studies: string[] = [];

  /**
   * Constructor that injects the UserService and StudyService.
   * @param userService - Service to manage user-related data and operations.
   * @param studyService - Service to manage study-related data and operations.
   */
  constructor(
    private userService: UserService,
    private studyService: StudyService
  ) {
    userService.currentUserSelectedTeam$.subscribe((team) => {
      if (team) {
        this.teamName = team.teamName;
        studyService.getStudiesForTeam(team.teamId)
          .subscribe(studies => this.studies = studies);
      }
    })
  }
}