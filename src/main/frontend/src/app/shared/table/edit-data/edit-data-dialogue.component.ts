import { Component, inject, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { flatMap, map, mergeMap, Observable, of, startWith, switchMap } from 'rxjs';
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
  data: DataTableEntry = inject(MAT_DIALOG_DATA).entry;
  dataForm = this.fb.group({
    studyId: [this.data.studyId, Validators.required],
    dvspondes: [this.data.dvspondes, Validators.required],
    dvcat: [this.data.dvcat, Validators.required],
    dvdecod: [this.data.dvdecod, Validators.required]
  });

  dvcats$ = this.deviationService.getDvcats$();
  dvdecods$ = this.deviationService.getDvdecodsByDvcat$(this.data.dvcat);
  dvterm$ = of(this.data.dvterm);
  newDvterm$ = this.dataForm.get('dvdecod')?.valueChanges.pipe(
    startWith(this.data.dvterm),
    mergeMap((dvdecod) => {
      if (dvdecod !== '' && dvdecod !== null) {
        return this.deviationService.getDvtermByDvdecod$(dvdecod);
      } else {
        return of('');
      }
    }
    ));

  constructor(
    private fb: FormBuilder,
    private deviationService: DeviationService,
    private dialogRef: MatDialogRef<EditDataDialogueComponent>
  ) {
    dialogRef.backdropClick().subscribe((event) => {
      this.onSubmit('close');
    })
  }

  ngOnInit() {
    this.subscribeToDvcatChanges();
  }

  subscribeToDvcatChanges() {
    this.dataForm.get('dvcat')?.valueChanges.subscribe((dvcat) => {
      this.dataForm.get('dvdecod')?.setValue('');
      if (this.newDvterm$) {
        this.dvterm$ = this.newDvterm$;
      }
      if (dvcat) {
        this.dvdecods$ = this.deviationService.getDvdecodsByDvcat$(dvcat);
        this.dataForm.get('dvdecod')?.setAsyncValidators(
          DeviationValidators.dvdecodIsValidForDvcat(this.deviationService, dvcat)
        );
      }
      this.dataForm.get('dvdecod')?.updateValueAndValidity();
    });
  }

  onSubmit(type: string) {
    switch (type) {
      case ("close"): {
        const editType = EditType.CLOSE;
        this.closeDialog(editType);
        break;
      }
      case ("cancel"): {
        const editType = EditType.CANCEL;
        this.closeDialog(editType);
        break;
      }
      case ("confirm"): {
        const editType = EditType.CONFIRM;
        this.closeDialog(editType);
        break;
      }
      default: {
        return;
      }
    }
  }

  closeDialog(editType: EditType) {
    this.dialogRef.close(
      {
        type: editType,
        data: this.getEditedData()
      } as EditDataModel);
  }

  getEditedData(): DataTableEntry {
    let studyId = this.dataForm.get('studyId')?.value
    let dvspondes = this.dataForm.get('dvspondes')?.value
    let dvcat = this.dataForm.get('dvcat')?.value
    let dvdecod = this.dataForm.get('dvdecod')?.value
    return {
      ...this.data,
      studyId: studyId ? studyId : this.data.studyId,
      dvspondes: dvspondes ? dvspondes : this.data.dvspondes,
      dvcat: dvcat ? dvcat : this.data.dvcat,
      dvdecod: dvdecod ? dvdecod : this.data.dvdecod
    }
  }
}
