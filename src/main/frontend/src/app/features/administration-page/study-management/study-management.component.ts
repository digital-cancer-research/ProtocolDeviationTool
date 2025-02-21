import { Component, inject, OnInit } from '@angular/core';
import { TeamService } from 'src/app/core/new/services/team.service';
import { TeamWithStudies } from 'src/app/core/new/services/models/team/team-with-studies.model';
import { UserService } from 'src/app/core/new/services/user.service';
import { StudyService } from 'src/app/core/services/study.service';
import { Study } from 'src/app/core/new/services/models/study/study.model';

@Component({
  selector: 'app-study-management',
  templateUrl: './study-management.component.html',
  styleUrl: './study-management.component.css'
})
export class StudyManagementComponent {
  private readonly teamService = inject(TeamService);
  private readonly userService = inject(UserService);
  private readonly studyService = inject(StudyService);
  private data$ = this.teamService.getTeamsWithStudies$();
  displayedColumns: string[] = ["name", "studies", "actions"];
  studies: Study[] = [];
  isEdited: Map<number, boolean> = new Map();
  data: TeamWithStudies[] = [];

  constructor() {
    this.data$.subscribe(data => this.data = data)
    this.studyService.getStudies().subscribe(studies => {
      this.studies = studies;
    });
  };

  assignStudyToTeam(team: TeamWithStudies, study: Study) {
    const index = this.findIndexOfTeam(team);
    this.data[index].studies.push(study);
    this.isEdited.set(team.id, true);
  }

  isStudySelected(team: TeamWithStudies, study: Study) {
    const index = this.findIndexOfTeam(team);
    const studies = this.data[index].studies;
    return studies.map(s => s.id).includes(study.id);
  }

  findIndexOfTeam(team: TeamWithStudies) {
    return this.data.findIndex(d => d.id === team.id);
  }

  isConfirmButtonActive(team: TeamWithStudies) {
    return this.isEdited.get(team.id) ? this.isEdited.get(team.id) : false;
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
}
