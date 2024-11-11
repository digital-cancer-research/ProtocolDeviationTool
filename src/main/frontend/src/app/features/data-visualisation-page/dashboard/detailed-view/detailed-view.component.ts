import { Component } from '@angular/core';
import { Tab } from 'src/app/shared/tab/tab';
import { TotalPdsComponent } from './total-pds/total-pds.component';
import { TotalPdsOverTimeComponent } from './total-pds-over-time/total-pds-over-time.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { Team } from 'src/app/core/models/team.model';
import { StudyService } from 'src/app/core/services/study.service';
import { map, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrl: './detailed-view.component.css'
})
export class DetailedViewComponent {
  private static _URL: string = "detailed-view";
  private static _studyId?: string;
  private team: Team | null = null;
  protected options$: Observable<string[]> = new Observable();
  protected selectedOption: string = "";

  protected tabs: Tab[] = [
    {
      label: "Total Protocol Deviations",
      link: TotalPdsComponent.URL
    },
    {
      label: "Total Protocol Deviations Over Time",
      link: TotalPdsOverTimeComponent.URL
    }
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private studyService: StudyService
  ) {
    this.populateFilterOptions();
  }

  populateFilterOptions() {
    this.options$ = this.userService.currentUserSelectedTeam$.pipe(
      switchMap(team => {
        this.team = team;
        this.parseStudyInUrl(team);
        if (team) {
          return this.studyService.getStudiesForTeam(team.teamId).pipe(
            map(studies => [team.teamName, ...studies])
          );
        } else {
          return of();
        }
      })
    );
  }

  parseStudyInUrl(team: Team | null) {
    this.route.queryParams.subscribe(params => {
      const studyId = params['studyId'];
      DetailedViewComponent._studyId = studyId;

      if (studyId === "" || studyId === null || studyId === undefined) {
        this.selectedOption = team ? team.teamName : "";
      } else {
        this.selectedOption = studyId;
      }
    });
  }
  
  onOptionChange() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        studyId: this.selectedOption !== this.team?.teamName ? this.selectedOption : null
      },
      queryParamsHandling: 'merge',
    });
  }

  public static get URL() {
    return this._URL
  }

  public static get studyId() {
    return this._studyId;
  }
}