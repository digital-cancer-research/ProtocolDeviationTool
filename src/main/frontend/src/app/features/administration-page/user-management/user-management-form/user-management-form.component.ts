import { Component, ChangeDetectionStrategy, Input, inject, ChangeDetectorRef, Output, EventEmitter, ViewChild, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { merge, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Team } from 'src/app/core/models/team.model';
import { UserManagementService } from '../user-management.service';
import { MultiSelectComponent } from 'src/app/shared/select/multi-select/multi-select.component';

/**
 * Component for managing user creation and role assignment.
 * 
 * This component provides a form for creating a new user with a specified role and team. It includes
 * form validation and error handling, and displays notifications based on the success or failure of
 * user creation.
 */
@Component({
  selector: 'app-user-management-form',
  templateUrl: './user-management-form.component.html',
  styleUrls: ['./user-management-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementFormComponent {

  /** Form control for the user's email address. */
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  /** Form control for the user's role. */
  readonly role = new FormControl('', [Validators.required]);

  /** Change detector reference for manually triggering change detection. */
  private cdr = inject(ChangeDetectorRef);

  /** Snack bar service for displaying notifications. */
  private _snackBar = inject(MatSnackBar);

  /** Configuration for the snack bar notifications. */
  snackBarConfig: MatSnackBarConfig = { duration: 5000 };

  /** Flag indicating if a user creation process is in progress. */
  inProgress: boolean = false;

  /** Array of teams associated with the user being created. */
  userTeams: Team[] = [];

  /** Signal for the email error message. */
  emailErrorMessage = signal('');

  /** Signal for the role error message. */
  roleErrorMessage = signal('');

  /** Observable for role names. */
  @Input() roleNames$: Observable<string[]> = new Observable();

  /** Array of all available teams. */
  @Input() teams: Team[] = [];

  /** Multi-select component for selecting teams. */
  @ViewChild(MultiSelectComponent) multiSelectComponent!: MultiSelectComponent<Team>;

  /**
   * Initialises the component and sets up form control listeners.
   * 
   * @param userManagementService - Service for user management operations.
   */
  constructor(private userManagementService: UserManagementService) {
    this.setupFormListeners();
  }

  /**
   * Sets up listeners for form control changes to update error messages.
   */
  private setupFormListeners(): void {
    merge(this.email.statusChanges, this.email.valueChanges, this.role.statusChanges, this.role.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateEmailErrorMessage();
        this.updateRoleErrorMessage();
      });
  }

  /**
   * Updates the error message for the email form control.
   */
  protected updateEmailErrorMessage(): void {
    if (this.email.hasError('required')) {
      this.emailErrorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.emailErrorMessage.set('Not a valid email');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  /**
   * Updates the error message for the role form control.
   */
  protected updateRoleErrorMessage(): void {
    if (this.role.hasError('required')) {
      this.roleErrorMessage.set('You must select a role');
    } else {
      this.roleErrorMessage.set('');
    }
  }

  /**
   * Sets the teams associated with the user.
   * 
   * @param teams - Array of teams to associate with the user.
   */
  setTeams(teams: Team[]): void {
    this.userTeams = teams;
  }

  /**
   * Handles form submission and communicates with the user management service.
   * Validates the form and performs user creation.
   */
  onConfirm(): void {
    if (this.email.invalid || this.role.invalid) {
      this.updateEmailErrorMessage();
      this.updateRoleErrorMessage();
      return;
    }

    this.inProgress = true;
    const username = this.email.getRawValue() ?? '';
    const teamIds = this.userTeams.map(team => team.teamId);
    const roleName = this.role.getRawValue() ?? "";
    const roleId = this.userManagementService.getRoleId(roleName);

    this.userManagementService.addUserWithRoleTeam({ username, teamId: teamIds, roleId })
      .subscribe({
        complete: () => this.handleSuccess(username),
        error: (error) => this.handleError(username, error)
      });
  }

  /**
   * Handles successful user creation by resetting the form and showing a success message.
   * 
   * @param username - The username of the created user.
   */
  private handleSuccess(username: string): void {
    this.inProgress = false;
    this.resetForm();
    this.showSnackBar('Success', `${username} created`);
  }

  /**
   * Handles errors during user creation by showing an error message.
   * 
   * @param username - The username of the user being created.
   * @param error - Error object containing error details.
   */
  private handleError(username: string, error: any): void {
    this.inProgress = false;
    this.showSnackBar('Error', `There was an error creating ${username}. ${error.message}`);
  }

  /**
   * Resets the form to its initial state.
   */
  private resetForm(): void {
    this.email.reset('');
    this.role.reset('');
    this.userTeams = [];
    this.multiSelectComponent.reset();
    this.cdr.markForCheck();
  }

  /**
   * Displays a snackbar message to the user.
   * 
   * @param type - Type of the message (e.g., 'Success', 'Error').
   * @param message - The message to display.
   */
  private showSnackBar(type: string, message: string): void {
    this._snackBar.open(type, message, this.snackBarConfig)._open();
  }
}