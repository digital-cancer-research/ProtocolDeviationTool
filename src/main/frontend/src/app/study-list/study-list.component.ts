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
  uniqueStudies: StudyList[] = [];

  constructor(private studyListService: StudyListService) { }

  ngOnInit(): void {
    this.loadStudies();
  }

  loadStudies(): void {
    this.studyListService.getStudies().subscribe((data: StudyList[]) => {
      this.studies = data;
      // Sort the studies alphabetically by studyId
      this.sortStudiesAlphabetically();
      // Filter out duplicates
      this.uniqueStudies = this.getUniqueStudies(this.studies);
    });
  }

  sortStudiesAlphabetically(): void {
    this.studies.sort((a, b) => {
      // Use localeCompare to perform alphabetical comparison
      return a.studyId.localeCompare(b.studyId);
    });
  }

  getUniqueStudies(studies: StudyList[]): StudyList[] {
    return studies.filter((study, index, self) =>
      index === self.findIndex((s) => s.studyId === study.studyId)
    );
  }


  updateStudyName(studyId: string, newName: string): void {
    // Check if the new name is empty or contains only whitespace
    if (!newName || newName.trim() === '') {
      console.error('Study name cannot be empty.');
      return; // Do not proceed with the update
    }

    // Trim whitespace from the new name
    const trimmedName = newName.trim();

    this.studyListService.updateStudyName(studyId, trimmedName).subscribe(
      () => {
        // Update the study name in the local list
        const studyToUpdate = this.studies.find((study) => study.studyId === studyId);
        if (studyToUpdate) {
          studyToUpdate.studyName = trimmedName;
        }

        // Sort the studies alphabetically after updating the study name
        this.sortStudiesAlphabetically();
        this.uniqueStudies = this.getUniqueStudies(this.studies);
      },
      (error) => {
        console.error(`Error updating study ID ${studyId}:`, error);
      }
    );
  }
}