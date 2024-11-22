import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeamWithDetails } from 'src/app/core/models/team/team-with-details.model';
import { Team } from 'src/app/core/models/team/team.model';
import { ValidateNameTaken } from 'src/app/shared/validators/name-taken.validator';

@Component({
  selector: 'app-team-management-edit-dialogue',
  templateUrl: './team-management-edit-dialogue.component.html',
  styleUrl: './team-management-edit-dialogue.component.css'
})
export class TeamManagementEditDialogueComponent {
  private data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<Team>);

  private teams: TeamWithDetails[] = this.data.teams;
  private currentTeam: TeamWithDetails = this.data.team;
  private fb = new FormBuilder();
  protected teamEditForm = this.fb.group({
    createdBy: new FormControl({ value: this.currentTeam.username, disabled: true }),
    dateCreated: new FormControl({ value: this.currentTeam.dateCreated, disabled: true }),
  });
  protected teamName = new FormControl(this.currentTeam.teamName, [
    Validators.required,
    ValidateNameTaken(this.teams.map(team => team.teamName))
  ]);
  protected errorMessage = signal('');

  updateErrorMessage() {
    if (this.teamName.hasError('nameIsTaken')) {
      if (this.teamName.value === this.currentTeam.teamName) {
        this.errorMessage.set("This is the same name. Please use a different name.");
      } else {
        this.errorMessage.set("This name is taken. Please choose another name.");
      }
    } else if (this.teamName.hasError('required')) {
      this.errorMessage.set("You must enter a team name.");
    } else {
      this.errorMessage.set("");
    }
  }

  onConfirm() {
    this.dialogRef.close(
      {
        ...this.currentTeam,
        teamName: this.teamName.value
      } as TeamWithDetails
    )
  }
}