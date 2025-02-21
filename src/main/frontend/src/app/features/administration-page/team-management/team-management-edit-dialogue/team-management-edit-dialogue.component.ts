import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeamWithDetails } from 'src/app/core/models/team/team-with-details.model';
import { Team } from 'src/app/core/new/services/models/team/team.model';
import { ValidateNameTaken } from 'src/app/shared/validators/name-taken.validator';

@Component({
  selector: 'app-team-management-edit-dialogue',
  templateUrl: './team-management-edit-dialogue.component.html',
  styleUrl: './team-management-edit-dialogue.component.css'
})
export class TeamManagementEditDialogueComponent {
  private data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<Team>);

  private fb = new FormBuilder();
  private teams: TeamWithDetails[] = this.data.teams;
  protected currentTeam: TeamWithDetails = this.data.team;
  protected teamEditForm = this.fb.group({
    name: [this.currentTeam.name, [Validators.required, ValidateNameTaken(this.teams.map(team => team.name))]]
  });
  protected errorMessage = signal('');

  /**
   * Updates the error message based on the validation state of the team name input.
   * 
   * This function checks for specific validation errors on the teamName form control
   * and sets an appropriate error message. If no errors are present, it clears the error message.
   * The validation errors are specified in the `teamName` field.
   * Hence, the else block executes only if no errors are found.
   * 
   * @returns {void}
   */
  updateErrorMessage() {
    if (this.teamName.hasError('nameIsTaken')) {
      this.errorMessage.set("This name is taken. Please choose another name.");
    } else if (this.teamName.hasError('required')) {
      this.errorMessage.set("You must enter a team name.");
    } else {
      this.errorMessage.set("");
    }
  }

  get teamName() {
    return this.teamEditForm.get('name') as unknown as AbstractControl<string | null, string | null>;
  }

  /**
   * Closes the dialog and returns the updated team details.
   * 
   * This method is called when the user confirms the changes in the edit dialog.
   * It creates a new TeamWithDetails object by spreading the current team's properties
   * and updating the teamName with the new value from the form control.
   * 
   * @returns {void} This method doesn't return a value, but it closes the dialog
   *                 with the updated TeamWithDetails object as the result.
   */
  onConfirm() {
    this.dialogRef.close(
      {
        ...this.currentTeam,
        name: this.teamName.value?.trim()
      } as TeamWithDetails
    )
  }
}