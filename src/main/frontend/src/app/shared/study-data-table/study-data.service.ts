import { Injectable } from '@angular/core';
import { StudyData } from './study-data';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudyDataService {

  private data: StudyData[] = [];

  constructor() {
    this.getStudyData$().subscribe(
      data => this.data = data
    );
  }

  getData() {
    return this.data;
  }

  getStudyData$() {
    return of(mockData);
  }
}

const mockData: StudyData[] = [
  { studyId: 'ST001', dvspondes: 'Sponsor1', dvcat: 'Category1', dvdecod: 'Deviation1' },
  { studyId: 'ST002', dvspondes: 'Sponsor2', dvcat: 'Category2', dvdecod: 'Deviation2' },
  { studyId: 'ST003', dvspondes: 'Sponsor3', dvcat: 'Category1', dvdecod: 'Deviation3' },
  { studyId: 'ST004', dvspondes: 'Sponsor4', dvcat: 'Category3', dvdecod: 'Deviation4' },
  { studyId: 'ST005', dvspondes: 'Sponsor1', dvcat: 'Category2', dvdecod: 'Deviation1' },
  { studyId: 'ST006', dvspondes: 'Sponsor5', dvcat: 'Category4', dvdecod: 'Deviation5' },
  { studyId: 'ST007', dvspondes: 'Sponsor6', dvcat: 'Category3', dvdecod: 'Deviation2' },
  { studyId: 'ST008', dvspondes: 'Sponsor2', dvcat: 'Category4', dvdecod: 'Deviation3' },
  { studyId: 'ST009', dvspondes: 'Sponsor4', dvcat: 'Category5', dvdecod: 'Deviation6' },
  { studyId: 'ST010', dvspondes: 'Sponsor3', dvcat: 'Category5', dvdecod: 'Deviation4' }
];
