import { Component, OnInit } from '@angular/core';
import { AdministrationDataService } from '../administration-data.service';
import { map, Observable } from 'rxjs';
import { TeamWithStudies } from 'src/app/core/models/team-with-studies.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Study } from 'src/app/core/models/study.model';

@Component({
  selector: 'app-study-management',
  templateUrl: './study-management.component.html',
  styleUrl: './study-management.component.css'
})
export class StudyManagementComponent implements OnInit {
  teams$: Observable<TeamWithStudies[]> = new Observable();
  displayedColumns: string[] = ["teamId", "teamName", "studies", "confirm"];
  selection = new SelectionModel<TeamWithStudies>(true, []);
  studies: string[] = [];
  isEdited: boolean[] = [];

  constructor(private administrationDataService: AdministrationDataService) {
  }

  ngOnInit(): void {
    this.administrationDataService.studies.subscribe(studies => {
      this.studies = studies;
    });
  
    this.teams$ = this.administrationDataService.teamsWithStudies$.pipe(
      map(teams => {
        console.log(teams);
        return teams.map((team: TeamWithStudies) => ({
          ...team,
          isEdited: false
        }));
      })
    );
  }
  

  getListOfStudyIds(team: TeamWithStudies): string[] {
    return team.studies.map((study) => { return study.studyId });
  }

  isStudyForThisTeam(team: TeamWithStudies, studyId: string) {
    return this.getListOfStudyIds(team).includes(studyId);
  }

  updateTeamStudyAccess(checked: boolean, team: TeamWithStudies, studyId: string) {
    team.isEdited = true;
    if (checked) {
      if (!this.isStudyForThisTeam(team, studyId)) {
        team.studies.push({
          studyId: studyId,
          flag: checked
        } as Study);
      }
    }
    else {
      if (this.isStudyForThisTeam(team, studyId)) {
        team.studies[this.getListOfStudyIds(team).indexOf(studyId)].flag = false;
      }
    }
  }

  confirmTeamStudyAccess(team: TeamWithStudies) {
    this.administrationDataService.updateTeamStudyAccess([team])
      .subscribe();
    team.isEdited = false;
  }
}
