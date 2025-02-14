import { Component, ChangeDetectionStrategy, Input, inject, ChangeDetectorRef, ViewChild, signal, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { map, merge, mergeMap, Observable, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MultiSelectComponent } from 'src/app/shared/select/multi-select/multi-select.component';
import { Team } from 'src/app/core/new/services/models/team/team.model';
import { UserService } from 'src/app/core/new/services/user.service';
import { Role } from 'src/app/core/new/services/models/user/role.enum';
import { UserCreateWithTeams } from 'src/app/core/new/services/models/user/user-create-with-teams.model';
import { UserWithTeams } from 'src/app/core/new/services/models/user/user-with-teams.model';

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

  private readonly userService = inject(UserService);

  /** Form control for the user's email address. */
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  /** Form control for the user's role. */
  readonly role = new FormControl('', [Validators.required]);

  /** Change detector reference for manually triggering change detection. */
  private cdr = inject(ChangeDetectorRef);

  /** Snack bar service for displaying notifications. */
  private _snackBar = inject(MatSnackBar);

  user$ = this.userService.currentUser$;

  /** Configuration for the snack bar notifications. */
  snackBarConfig: MatSnackBarConfig = { duration: 5000 };

  /** Flag indicating if a user creation process is in progress. */
  inProgress: boolean = false;

  /** Signal for the email error message. */
  emailErrorMessage = signal('');

  /** Signal for the role error message. */
  roleErrorMessage = signal('');

  selectedTeams: Team[] = [];

  /** Observable for role names. */
  roles: string[] = Object.keys(Role);

  /** Array of all available teams. */
  @Input() teams: Team[] = [];


  @Output() userCreated = new EventEmitter<void>();

  /** Multi-select component for selecting teams. */
  @ViewChild(MultiSelectComponent) multiSelectComponent!: MultiSelectComponent<Team>;

  /**
   * Initializes the component and sets up form control listeners.
   */
  constructor() {
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
   * Updates the selected teams when the user selects or deselects teams in the multi-select component.
   * 
   * @param teams - The array of selected teams.
   */
  onSelectTeam(teams: Team[]) {
    this.selectedTeams = teams;
  }

  /**
   * Handles form submission and communicates with the user management service.
   * Validates the form and performs user creation.
   */
  onConfirm(): void {
    this.inProgress = true;

    if (this.email.invalid || this.role.invalid) {
      this.updateEmailErrorMessage();
      this.updateRoleErrorMessage();
      this.inProgress = false;
      return;
    }

    const username = this.email.getRawValue() ?? '';
    const teamIds = this.selectedTeams.map(team => team.id);
    const role = this.role.getRawValue() as Role;

    const createRequest: Observable<UserWithTeams | null> = this.userService.currentUser$.pipe(
      mergeMap(user => {
        if (user !== null) {
          const newUser: UserCreateWithTeams = {
            username: username,
            role: role,
            isSite: true,
            isSponsor: false,
            teamIds: teamIds,
            adminId: user.id
          };
          return this.userService.createUserWithTeams$(newUser);
        } else {
          this.handleError("User is not logged in.");
          return of(null);
        }
      })
    );

    createRequest.subscribe({
      next: (response) => {
        if (response !== null) {
          this.handleSuccess();
        }
      },
      error: (error) => this.handleError(error)
    });
  }

  /**
   * Handles successful user creation by resetting the form and showing a success message.
   */
  private handleSuccess(): void {
    this.userCreated.emit();
    this.inProgress = false;
    const username = this.email.getRawValue() ?? 'User';
    this.resetForm();
    this.showSnackBar('Success', `${username} created`);
  }

  /**
   * Handles errors during user creation by showing an error message.
   * 
   * @param error - Error object containing error details.
   */
  private handleError(error: any): void {
    this.inProgress = false;
    const username = this.email.getRawValue() ?? 'the user';
    this.showSnackBar('Error', `There was an error creating ${username}. ${error.message}`);
  }

  /**
   * Resets the form to its initial state.
   */
  private resetForm(): void {
    this.email.reset('');
    this.role.reset('');
    this.selectedTeams = [];
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