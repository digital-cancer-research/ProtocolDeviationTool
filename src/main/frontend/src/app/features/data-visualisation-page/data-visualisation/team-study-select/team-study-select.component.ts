import { Component } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, map, combineLatest, startWith, of, switchMap } from 'rxjs';
import { Team } from 'src/app/core/models/team.model';
import { StudyService } from 'src/app/core/services/study.service';
import { UserService } from 'src/app/core/services/user.service';

/**
 * Component for selecting the user's team or
 * a study associated with the team and redirecting the
 * user to a new page to visualise associated data.
 * @class TeamStudySelectComponent
 */
@Component({
  selector: 'app-team-study-select',
  templateUrl: './team-study-select.component.html',
  styleUrl: './team-study-select.component.css'
})
export class TeamStudySelectComponent {
  
  /** Observable for the currently selected team */
  team$: Observable<Team | null> = this.userService.currentUserSelectedTeam$;
  
  /** Observable that combines team and studies into a single list of options */
  options$: Observable<string[]> = this.team$.pipe(
    switchMap(team => team ? this.studyService.getStudiesForTeam(team.teamId).pipe(
      map(studies => team ? [team.teamName, ...studies] : studies)) : [])
  );
  
  /** Array that holds the available options for selection */
  options: string[] = [];
  
  /** Observable that holds the filtered options based on the input */
  filteredOptions$: Observable<string[]> = new Observable();
  
  /** Form control for managing user input and validation */
  myControl = new FormControl('');
  
  /**
   * Constructor that injects the UserService and StudyService.
   * @param userService - Service to manage user-related data and operations.
   * @param studyService - Service to manage study-related data and operations.
   */
  constructor(
    private userService: UserService,
    private studyService: StudyService
  ) {}

  /**
   * Angular lifecycle hook called when the component is initialised.
   */
  ngOnInit(): void {
    this.initOptions();
  }

  /**
   * Initialises the list of options by subscribing to the options$ observable.
   * Sets up a validator for the input field to ensure a valid option is selected.
   * Sets up a filter based on the input.
   */
  private initOptions(): void {
    this.options$.subscribe(options => {
      this.options = options;
      this.myControl.setValidators([this.isSelectedOptionValid()]);
      this.myControl.updateValueAndValidity();
      this.setUpFilter();
    });
  }

  /**
   * Sets up the filter logic to filter options based on user input.
   * Filters the options in real-time as the user types.
   */
  private setUpFilter(): void {
    this.filteredOptions$ = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  /**
   * Filters the options based on the user's input.
   * @param value - The input value to filter the options.
   * @returns The filtered list of options that match the input.
   */
  private _filter(value: string): string[] {
    const filterValue = value.trim().toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  /**
   * Validator function that checks if the selected option is valid.
   * Ensures that the input value exists in the list of available options.
   * @returns A validation function that returns null if valid, or a validation error if not.
   */
  private isSelectedOptionValid(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return this.options.includes(value) ? null : { optionNotExists: true };
    };
  }
}
