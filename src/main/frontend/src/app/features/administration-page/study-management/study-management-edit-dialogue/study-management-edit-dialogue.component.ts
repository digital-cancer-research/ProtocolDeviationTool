import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Study } from 'src/app/core/new/services/models/study/study.model';
import { TeamWithStudies } from 'src/app/core/new/services/models/team/team-with-studies.model';

@Component({
  selector: 'app-study-management-edit-dialogue',
  templateUrl: './study-management-edit-dialogue.component.html',
  styleUrl: './study-management-edit-dialogue.component.css'
})
export class StudyManagementEditDialogueComponent {
  private fb = inject(FormBuilder);
  private dialogueRef = inject(MatDialogRef<StudyManagementEditDialogueComponent>);
  protected data: {
    team: TeamWithStudies
    studies: Study[];
  } = inject(MAT_DIALOG_DATA);
  protected form = this.fb.group({
    selectedStudies: this.fb.array(this.data.team.studies)
  });
  private originalStudyIds: number[] = this.data.team.studies.map(s => s.id).sort();

  updateSelectedStudies(studies: Study[]): void {
    const selectedStudiesArray = this.form.get('selectedStudies') as FormArray;
    selectedStudiesArray.clear();
    studies.forEach(study => selectedStudiesArray.push(new FormControl(study)));
  }

  isConfirmDisabled() {
    var selectedStudies = this.form.getRawValue().selectedStudies;
    var selectedStudyIds: number[] = [];
    if (selectedStudies) {
      selectedStudyIds = selectedStudies
        .filter(study => study !== null)
        .map(study => study!.id)
        .sort();
    } else {
      return true;
    }
    return JSON.stringify(this.originalStudyIds) === JSON.stringify(selectedStudyIds);
  }

  onConfirm() {
    this.dialogueRef.close(
      this.form.getRawValue().selectedStudies.sort()
    );
  }
}
