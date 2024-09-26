import { Injectable } from '@angular/core';
import { filter, map, Observable, switchMap } from 'rxjs';
import { TeamWithStudies } from 'src/app/core/models/team-with-studies.model';
import { Team } from 'src/app/core/models/team.model';
import { StudyService } from 'src/app/core/services/study.service';
import { TeamService } from 'src/app/core/services/team.service';

@Injectable({
  providedIn: 'root'
})
export class AdministrationDataService {
  teams$ = this.teamService.teams$;
  teamsWithStudies$: Observable<TeamWithStudies[]> = new Observable();
  teams: Team[] = [];
  teamIds: number[] = [];

  studies: Observable<string[]> = this.studyService.getStudies();

  constructor(
    private teamService: TeamService,
    private studyService: StudyService
  ) {
    this.teamsWithStudies$ = this.teams$.pipe(
      switchMap(teams => {
        const teamIds = teams.map(team => team.teamId);
        return this.teamService.getTeamStudyAccess(teamIds).pipe(
          map(teamWithStudiesArray => {
            return teamWithStudiesArray.map((teamWithStudies: TeamWithStudies) => {
              const team = teams.find(t => t.teamId === teamWithStudies.teamId);
              return {
                teamId: teamWithStudies.teamId,
                teamName: team ? team.teamName : '',
                studies: teamWithStudies.studies
              } as TeamWithStudies;
            });
          })
        );
      })
    );
  }
  

  transformTeamWithStudies(teamsWithStudies$: Observable<TeamWithStudies[]>): Observable<TeamWithStudies[]> {
    return teamsWithStudies$ = teamsWithStudies$.pipe(
      map((teamWithStudiesArray: TeamWithStudies[]) => {
        return teamWithStudiesArray.map((teamWithStudies: TeamWithStudies) => {
          return {
            teamId: teamWithStudies.teamId,
            teamName: this.teams.filter((team: Team) => { return team.teamId === teamWithStudies.teamId })[0].teamName,
            studies: teamWithStudies.studies
          } as TeamWithStudies
        })
      })
    )
  }

  updateTeamStudyAccess(teamWithStudiesArray: TeamWithStudies[]) {
    return this.teamService.updateTeamStudyAccess(teamWithStudiesArray);
  }
}
