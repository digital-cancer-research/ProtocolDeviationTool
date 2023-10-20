import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudyListService } from './study-list.service';
import { StudyList } from './study-list.model';

@Component({
  selector: 'app-study-list',
  templateUrl: './study-list.component.html',
})
export class StudyListComponent implements OnInit {
  studies: StudyList[] = [];

  constructor(private studyListService: StudyListService) {}

  ngOnInit(): void {
    this.loadStudies();
  }

  loadStudies(): void {
    this.studyListService.getStudies().subscribe((data: StudyList[]) => {
      this.studies = data;
    });
  }

  updateStudyName(studyId: string, newName: string): void {

  this.studyListService.updateStudyName(studyId, newName).subscribe(
    () => {

      // Update the study name in the local list
      const studyToUpdate = this.studies.find((study) => study.studyId === studyId);
      if (studyToUpdate) {
        studyToUpdate.studyName = newName;
      }
    },
    (error) => {
      console.error(`Error updating study ID ${studyId}:`, error);
    }
  );
}

}