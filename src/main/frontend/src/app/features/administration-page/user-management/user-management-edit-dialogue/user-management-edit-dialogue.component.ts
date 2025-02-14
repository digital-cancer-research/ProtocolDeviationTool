import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Team } from 'src/app/core/new/services/models/team/team.model';
import { Role } from 'src/app/core/new/services/models/user/role.enum';
import { UserWithTeams } from 'src/app/core/new/services/models/user/user-with-teams.model';

@Component({
  selector: 'app-user-management-edit-dialogue',
  templateUrl: './user-management-edit-dialogue.component.html',
  styleUrl: './user-management-edit-dialogue.component.css'
})
export class UserManagementEditDialogueComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogueRef = inject(MatDialogRef<UserManagementEditDialogueComponent>);
  protected readonly user: UserWithTeams = inject(MAT_DIALOG_DATA).user;
  protected teams: Team[] = inject(MAT_DIALOG_DATA).teams;
  protected form = this.fb.group({
    role: [this.user.role, Validators.required],
    teams: [this.user.teams],
  });
  protected roles = Object.values(Role);

  onSelectTeams(teams: Team[]): void {
    this.form.patchValue({ teams });
  }

  onConfirm() {
    const formTeamValue = this.form.get('teams')?.value;
    let selectedTeams = formTeamValue ? formTeamValue : [];
    
    const formRoleValue = this.form.get('role')?.value;
    let selectedRole = formRoleValue ? formRoleValue : this.user.role;
    this.dialogueRef.close({
      role: selectedRole,
      teams: selectedTeams
    });
  }

  isUserEdited() {
    const formTeamValue = this.form.get('teams')?.value;
    let selectedTeams = (formTeamValue ? formTeamValue : []).map(team => team.id);
    let originalTeams = this.user.teams.map(team => team.id);
    let isTeamsChanged = JSON.stringify(selectedTeams.sort()) !== JSON.stringify(originalTeams.sort());
    
    return (
      isTeamsChanged ||
      this.user.role !== this.form.get('role')?.value
    );
  }
}