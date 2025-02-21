import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeviationService } from 'src/app/core/services/deviation.service';
import { EditDataModel, EditType } from '../models/edit-data-model';
import { DataTableEntry } from 'src/app/core/models/data/data-table-entry.model';
import { Dvcat } from 'src/app/core/new/services/models/dvcat/dvcat.model';
import { Dvdecod } from 'src/app/core/new/services/models/dvdecod/dvdecod.model';

@Component({
  selector: 'app-edit-data-dialogue',
  templateUrl: './edit-data-dialogue.component.html',
  styleUrls: ['./edit-data-dialogue.component.css']
})
export class EditDataDialogueComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly deviationService = inject(DeviationService);
  private readonly dialogRef = inject(MatDialogRef<EditDataDialogueComponent>);

  /**
   * Form data representing the current entry being edited.
   */
  data: DataTableEntry = inject(MAT_DIALOG_DATA).entry;

  /**
   * Reactive form for editing data.
   */
  dataForm: FormGroup;

  dvcats: Dvcat[] = [];
  dvcatDescriptions: string[] = [];
  dvdecods: Dvdecod[] = [];
  dvdecodDescriptions: string[] = [];

  /**
   * Constructor to initialise the form, services, and dialog reference.
   * 
   * @param fb - FormBuilder service to build the reactive form.
   * @param deviationService - Service for handling deviation-related API calls.
   * @param dialogRef - Reference to the dialog instance.
   */
  constructor() {
    this.dataForm = this.createForm();
    this.fetchDeviations();
    this.subscribeToBackdropClick();
  }

  fetchDeviations() {
    this.dvcatDescriptions = this.dvcats.map(dvcat => dvcat.description);
    this.dvdecodDescriptions = this.getDvdecodsForDvcats().map(dvd => dvd.description);

    this.deviationService.getDvcats$().subscribe(dvcats => {
      this.dvcats = dvcats;
      this.dvcatDescriptions = dvcats.map(dvcat => dvcat.description);
    });
    this.deviationService.getDvdecods$().subscribe(dvdecods => {
      this.dvdecods = dvdecods;
      this.dvdecodDescriptions = dvdecods.map(dvdecod => dvdecod.description);
    });
  }

  get dvterms(): string[] {
    const selectedDvdecods: string[] | undefined = this.dataForm.get('dvdecod')?.value;
    if (selectedDvdecods) {
      return this.dvdecods.filter(dvd => selectedDvdecods.includes(dvd.description))
        .map(dvd => dvd.dvterm);
    } else {
      return []
    }
  }

  /**
   * Lifecycle hook for initialising the component and subscribing to dvcat changes.
   */
  ngOnInit() {
    this.subscribeToDvcatChanges();
    // this.newDvterm$ = this.getNewDvtermObservable();
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
   * Subscribes to changes in the dvcat field and updates related fields (dvdecod and dvterm) accordingly.
   */
  private subscribeToDvcatChanges() {
    this.dataForm.get('dvcat')?.valueChanges.subscribe(() => {
      this.dvdecodDescriptions = this.getDvdecodsForDvcats().map(dv => dv.description);
    });
  }

  getDvdecodsForDvcats() {
    const selectedDvcatDescriptions: string[] | undefined = this.dataForm.get('dvcat')?.value;
    if (selectedDvcatDescriptions) {
      const selectedDvcatIds = this.dvcats.filter(dv => selectedDvcatDescriptions.includes(dv.description))
        .map(dv => dv.id);
      return this.dvdecods.filter(dvdecod => selectedDvcatIds.includes(dvdecod.dvcatId));
    } else {
      return [];
    }
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