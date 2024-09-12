import { Component, signal, ChangeDetectionStrategy, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { merge, Observable } from 'rxjs';
import { Team } from 'src/app/core/models/team.model';

@Component({
  selector: 'app-user-management-form',
  templateUrl: './user-management-form.component.html',
  styleUrl: './user-management-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementFormComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly role = new FormControl('', [Validators.required]);

  @Input() roleNames$: Observable<string[]> = new Observable();
  @Input() teams: Team[] = [];
  emailErrorMessage = signal('');
  roleErrorMessage = signal('');

	private _snackBar = inject(MatSnackBar);
	snackBarConfig = {
		duration: 5000
	} as MatSnackBarConfig

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges, this.role.statusChanges, this.role.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => {
      this.updateErrorMessage();
      this.updateRoleErrorMessage();
    });
  }

  updateErrorMessage() {
    console.log(this.email)
    if (this.email.hasError('required')) {
      this.emailErrorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.emailErrorMessage.set('Not a valid email');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  updateRoleErrorMessage() {
    console.log(this.role);
    if (this.role.hasError('required')) {
      this.roleErrorMessage.set('You must select a role');
    } else {
      this.roleErrorMessage.set('');
    }
  }

  setTeams(teams: Team[]) {
    
  }
}