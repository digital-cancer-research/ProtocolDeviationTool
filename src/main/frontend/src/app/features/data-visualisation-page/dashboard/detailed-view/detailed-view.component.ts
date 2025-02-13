import { Component, inject } from '@angular/core';
import { Tab } from 'src/app/shared/tab/tab';
import { TotalPdsComponent } from './total-pds/total-pds.component';
import { TotalPdsOverTimeComponent } from './total-pds-over-time/total-pds-over-time.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StudyService } from 'src/app/core/services/study.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { Team } from 'src/app/core/new/services/models/team/team.model';
import { TeamService } from 'src/app/core/new/services/team.service';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrl: './detailed-view.component.css'
})
export class DetailedViewComponent {
  private static _URL: string = "detailed-view";
  private static _studyId?: string;
  private team: Team | null = null;
  private readonly teamService = inject(TeamService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private studyService = inject(StudyService);
  protected options$: Observable<string[]> = new Observable();
  protected selectedOption: string = "";

  protected tabs: Tab[] = [
    new Tab("Total Protocol Deviations", TotalPdsComponent.URL),
    new Tab("Total Protocol Deviations Over Time", TotalPdsOverTimeComponent.URL)
  ]

  constructor() {
    this.populateFilterOptions();
  }

  populateFilterOptions() {
    this.options$ = this.teamService.currentTeam$.pipe(
      switchMap(team => {
        this.team = team;
        this.parseStudyInUrl(team);
        if (team) {
          return this.studyService.getStudies(team.id).pipe(
            map(studies => {
              const studyNames = studies.map(study => study.externalStudyId);
              return [team.name, ...studyNames];
            })
          );
        } else {
          return of();
        }
      })
    );
  }

  parseStudyInUrl(team: Team | null) {
    this.route.queryParams.subscribe(params => {
      const studyId = params['study'];
      DetailedViewComponent._studyId = studyId;

      if (studyId === "" || studyId === null || studyId === undefined) {
        this.selectedOption = team ? team.name : "";
      } else {
        this.selectedOption = studyId;
      }
    });
  }

  onOptionChange() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        study: this.selectedOption !== this.team?.name ? this.selectedOption : null
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