import { Component, signal, ChangeDetectionStrategy, Input, inject, ChangeDetectorRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { merge, Observable } from 'rxjs';
import { Team } from 'src/app/core/models/team.model';
import { UserManagementService } from '../user-management.service';
import { MultiSelectComponent } from 'src/app/shared/select/multi-select/multi-select.component';

@Component({
  selector: 'app-user-management-form',
  templateUrl: './user-management-form.component.html',
  styleUrl: './user-management-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementFormComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly role = new FormControl('', [Validators.required]);
  private cdr = inject(ChangeDetectorRef);
  
  inProgress: boolean = false;
  userTeams: Team[] = [];

  @Input() roleNames$: Observable<string[]> = new Observable();
  @Input() teams: Team[] = [];

  emailErrorMessage = signal('');
  roleErrorMessage = signal('');

  private _snackBar = inject(MatSnackBar);
  snackBarConfig = {
    duration: 5000
  } as MatSnackBarConfig

  @ViewChild(MultiSelectComponent) multiSelectComponent!: MultiSelectComponent<Team>;

  constructor(
    private userManagementService: UserManagementService
  ) {
    merge(this.email.statusChanges, this.email.valueChanges, this.role.statusChanges, this.role.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateErrorMessage();
        this.updateRoleErrorMessage();
      });
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.emailErrorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.emailErrorMessage.set('Not a valid email');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  updateRoleErrorMessage() {
    if (this.role.hasError('required')) {
      this.roleErrorMessage.set('You must select a role');
    } else {
      this.roleErrorMessage.set('');
    }
  }

  setTeams(teams: Team[]) {
    this.userTeams = teams;
  }

  onConfirm() {
    this.inProgress = true;
    const username = this.email.getRawValue() ?? '';
    this.userManagementService.addUserWithRoleTeam(
      {
        username: username,
        teamId: this.userTeams.map(team => team.teamId),
        roleId: this.roleId
      }).subscribe({
        complete: () => {
          this.inProgress = false;
          this.email.reset('');
          this.role.reset('');
          this.userTeams = [];
          this.multiSelectComponent.reset();
          this.cdr.markForCheck();
          let snackBarRef = this._snackBar.open('Success', `${username} created`,
            this.snackBarConfig
          );
          snackBarRef._open();
        },
        error: (error) => {
          this.inProgress = false;
          this.cdr.markForCheck();
          let snackBarRef = this._snackBar.open('Error',
            `There was an error creating ${username}. ${error.message}`,
            this.snackBarConfig);
            snackBarRef._open();
        }
      });
  }

  get roleId(): number {
    const roleName = this.role.getRawValue();
    switch (roleName) {
      case "Admin": {
        return 1;
      }
      case "User": {
        return 2;
      }
      default: {
        return 3
      }
    }
  }
}