import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { mergeMap, of, startWith } from 'rxjs';
import { DeviationService } from 'src/app/core/services/deviation.service';
import { DeviationValidators } from 'src/app/core/validators/deviation-validators';
import { EditDataModel, EditType } from '../models/edit-data-model';
import { DataTableEntry } from 'src/app/core/models/data/data-table-entry.model';

@Component({
  selector: 'app-edit-data-dialogue',
  templateUrl: './edit-data-dialogue.component.html',
  styleUrls: ['./edit-data-dialogue.component.css']
})
export class EditDataDialogueComponent implements OnInit {
  /**
   * Form data representing the current entry being edited.
   */
  private data: DataTableEntry = inject(MAT_DIALOG_DATA).entry;

  /**
   * Reactive form for editing data.
   */
  dataForm: FormGroup;

  /**
   * Observable for fetching deviation categories (dvcat).
   */
  dvcats$ = this.deviationService.getDvcats$();

  /**
   * Observable for fetching protocol deviation coded term (dvdecod) filtered by the current dvcat.
   */
  dvdecods$ = this.deviationService.getDvdecodsByDvcat$(this.data.dvcat);

  /**
   * Observable for fetching the current protocol deviation term (dvterm) related to the dvdecod.
   */
  dvterm$? = of(this.data.dvterm);

  /**
   * Observable for tracking changes to dvterm based on dvdecod.
   */
  newDvterm$ = this.dvterm$;

  /**
   * Constructor to initialise the form, services, and dialog reference.
   * 
   * @param fb - FormBuilder service to build the reactive form.
   * @param deviationService - Service for handling deviation-related API calls.
   * @param dialogRef - Reference to the dialog instance.
   */
  constructor(
    private fb: FormBuilder,
    private deviationService: DeviationService,
    private dialogRef: MatDialogRef<EditDataDialogueComponent>
  ) {
    this.dataForm = this.createForm();
    this.subscribeToBackdropClick();
  }

  /**
   * Lifecycle hook for initializing the component and subscribing to dvcat changes.
   */
  ngOnInit() {
    this.subscribeToDvcatChanges();
    this.newDvterm$ = this.getNewDvtermObservable();
  }

  /**
   * Initialises the reactive form with the required fields and default values.
   * 
   * @returns The created form group.
   */
  private createForm(): FormGroup {
    return this.fb.group({
      studyId: [this.data.studyId, Validators.required],
      dvspondes: [{ value: this.data.dvspondes, disabled: true }, Validators.required],
      dvcat: [this.data.dvcat, Validators.required],
      dvdecod: [this.data.dvdecod, Validators.required]
    });
  }

  /**
   * Initialises an observable to track changes in the dvdecod form control and fetch the associated dvterm.
   * 
   * @returns An observable that emits the current dvterm based on the selected dvdecod.
   */
  private getNewDvtermObservable() {
    return this.dataForm.get('dvdecod')?.valueChanges.pipe(
      startWith(this.data.dvterm),
      mergeMap((dvdecod) =>
        dvdecod ? this.deviationService.getDvtermByDvdecod$(dvdecod) : of('')
      )
    );
  }

  /**
   * Subscribes to changes in the dvcat field and updates related fields (dvdecod and dvterm) accordingly.
   */
  private subscribeToDvcatChanges() {
    this.dataForm.get('dvcat')?.valueChanges.subscribe((dvcat) => {
      this.resetDvdecodControl();
      this.updateDvtermObservable();
      if (dvcat) {
        this.dvdecods$ = this.deviationService.getDvdecodsByDvcat$(dvcat);
        this.setDvdecodValidator(dvcat);
      }
    });
  }

  /**
   * Resets the dvdecod form control, clearing its value and updating validation.
   */
  private resetDvdecodControl() {
    const dvdecodControl = this.dataForm.get('dvdecod');
    dvdecodControl?.setValue('');
    dvdecodControl?.updateValueAndValidity();
  }

  /**
   * Updates the dvterm observable with any new dvterm values based on changes to dvdecod.
   */
  private updateDvtermObservable() {
    if (this.newDvterm$) {
      this.dvterm$ = this.newDvterm$;
    }
  }

  /**
   * Sets a custom asynchronous validator for the dvdecod field, ensuring the selected dvdecod is valid for the current dvcat.
   * 
   * @param dvcat - The current dvcat value used to filter dvdecods.
   */
  private setDvdecodValidator(dvcat: string) {
    this.dataForm.get('dvdecod')?.setAsyncValidators(
      DeviationValidators.dvdecodIsValidForDvcat(this.deviationService, dvcat)
    );
  }

  /**
   * Subscribes to the dialog's backdrop click event and triggers the onSubmit method with a 'close' action.
   */
  private subscribeToBackdropClick() {
    this.dialogRef.backdropClick().subscribe(() => this.onSubmit('close'));
  }

  /**
   * Handles the form submission, either confirming or canceling the edit based on the type of action.
   * 
   * @param type - The type of action to perform ('confirm', 'cancel', or 'close').
   */
  onSubmit(type: string) {
    const editType = this.getEditType(type);
    this.closeDialog(editType);
  }

  /**
   * Maps a string action type to the corresponding EditType enum value.
   * 
   * @param type - The action type string.
   * @returns The corresponding EditType, or null if the type is invalid.
   */
  private getEditType(type: string): EditType {
    switch (type) {
      case 'close': return EditType.CLOSE;
      case 'confirm': return EditType.CONFIRM;
      default: return EditType.CANCEL;
    }
  }

  /**
   * Closes the dialog and returns the edited data along with the action type.
   * 
   * @param editType - The type of action (confirm, cancel, or close).
   */
  private closeDialog(editType: EditType) {
    this.dialogRef.close({
      type: editType,
      data: this.getEditedData()
    } as EditDataModel);
  }

  /**
   * Retrieves the updated form data to return upon form submission.
   * 
   * @returns A DataTableEntry object containing the updated form data.
   */
  private getEditedData(): DataTableEntry {
    return {
      ...this.data,
      studyId: this.dataForm.get('studyId')?.value ?? this.data.studyId,
      dvspondes: this.dataForm.get('dvspondes')?.value ?? this.data.dvspondes,
      dvcat: this.dataForm.get('dvcat')?.value ?? this.data.dvcat,
      dvdecod: this.dataForm.get('dvdecod')?.value ?? this.data.dvdecod
    };
  }
}