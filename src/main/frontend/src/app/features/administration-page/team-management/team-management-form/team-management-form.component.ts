import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/core/new/services/models/team/team.model';
import { User } from 'src/app/core/new/services/models/user/user.model';
import { TeamService } from 'src/app/core/new/services/team.service';
import { UserService } from 'src/app/core/new/services/user.service';
import { ValidateNameTaken } from 'src/app/shared/validators/name-taken.validator';

@Component({
  selector: 'app-team-management-form',
  templateUrl: './team-management-form.component.html',
  styleUrl: './team-management-form.component.css'
})
export class TeamManagementFormComponent {

  private teamService = inject(TeamService);
  private userService = inject(UserService);
  private _snackBar = inject(MatSnackBar);

  teams: Team[] = [];
  teamsSubscription!: Subscription;
  @Output() dataUpdate: EventEmitter<void> = new EventEmitter();

  private user: User | null = null;

  protected errorMessage = signal('');
  protected readonly teamName = new FormControl('', Validators.required);

  constructor() {
    this.userService.currentUser$.subscribe(user => this.user = user);
    this.getTeams();
  }

  getTeams(teams: Team[] = []) {
    if (this.teamsSubscription) {
      this.teamsSubscription.unsubscribe();
    }
    if (teams.length > 0) {
      this.teams = teams;
      this.addValidators();
      return;
    } else {
      this.teamsSubscription = this.teamService.getTeams$().subscribe(teams => {
        this.teams = teams
        this.addValidators();
      });
    }
  }

  /**
   * Adds a required and name taken validator to the teamName form control.
   * 
   * @returns {void} This method does not return a value.
   */
  private addValidators(): void {
    this.teamName.setValidators([
      Validators.required,
      ValidateNameTaken(this.teams.map(team => team.name))
    ]);
    this.teamName.updateValueAndValidity();
  }


  /**
   * Initiates the process of creating a new team.
   * 
   * This function validates the team name and user ID, then calls the team service
   * to add the new team. It handles both successful team creation and potential errors.
   * If the user is not logged in, it displays a notification.
   * 
   * @remarks
   * This method relies on the following class properties and methods:
   * - `teamName`: FormControl containing the team name
   * - `user`: The current user object
   * - `isFormValid()`: Method to validate form inputs
   * - `teamService.addTeam$()`: Service method to create a new team
   * - `handleTeamCreationSuccess()`: Method to handle successful team creation
   * - `handleTeamCreationError()`: Method to handle team creation errors
   * - `openSnackbar()`: Method to display notifications
   * 
   * @returns void
   */
  createTeam() {
    let teamName = this.teamName.value;
    let userId = this.user?.id;
    if (this.isFormValid(teamName, userId)) {
      teamName = (teamName as string).trim();
      userId = userId as number;
      this.teamService.createTeam$({
        name: teamName,
        adminId: userId
      }).subscribe({
        next: (team) => {
          this.handleTeamCreationSuccess(team);
        },
        error: (error) => {
          this.handleTeamCreationError(error);
        }
      })
    } else if (userId === undefined) {
      this.openSnackbar("Please log in to create a team", "");
    }
  }


  /**
   * Validates the form inputs for team creation.
   * 
   * @param teamName - The name of the team to be created. Can be null or a string.
   * @param userId - The ID of the user creating the team. Can be undefined.
   * @returns A boolean indicating whether the form inputs are valid (true) or not (false).
   */
  private isFormValid(teamName: string | null, userId: number | undefined): boolean {
    if (!userId) {
      this.openSnackbar('Please log in to create a team.', 'Dismiss');
      return false;
    }

    if (teamName === null || teamName.trim() === '') {
      this.openSnackbar('You must enter a valid team name.', 'Dismiss');
      return false;
    }

    return true;
  }


  /**
   * Handles the successful creation of a team by displaying a snackbar notification with an undo option.
   * If the user chooses to undo, it deletes the newly created team.
   *
   * @param team - The Team object representing the newly created team.
   *               It contains properties like teamId and teamName.
   * @returns void
   */
  private handleTeamCreationSuccess(team: Team): void {
    this.dataUpdate.emit();
    this.teamName.setValue(null);
    this.teamName.reset();
    this.teamName.markAsUntouched();
    this.teams.push(team);
    this.addValidators();
  }


  /**
   * Handles errors that occur during team creation.
   * This function extracts an error message from the error object and displays it to the user via a snackbar.
   *
   * @param error - The error object received from the team creation attempt.
   *                This can be any type, but typically contains either a 'message' or 'error' property.
   * @returns void
   */
  private handleTeamCreationError(error: any): void {
    const errorMessage = error.message || error.error;
    this.openSnackbar(`Error creating team: ${errorMessage}`, '');
  }


  /**
   * Updates the error message based on the current state of the teamName form control.
   * This function checks for specific validation errors and sets an appropriate error message.
   * 
   * @returns void
   */
  updateErrorMessage() {
    if (this.teamName.hasError('nameIsTaken')) {
      this.errorMessage.set("This name is taken. Please choose another name.");
    } else if (this.teamName.hasError('required')) {
      this.errorMessage.set("You must enter a team name.");
    }
  }


  /**
   * Opens a snackbar to display a message to the user.
   * 
   * @param message - The text content to be displayed in the snackbar.
   * @param action - The label for the snackbar's action button. If empty, no action button is shown.
   * @returns A MatSnackBarRef<T> object, which can be used to dismiss the snackbar or subscribe to its events.
   */
  openSnackbar(message: string, action: string) {
    return this._snackBar.open(message, action, {
      duration: 5000
    });
  }
}