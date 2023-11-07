import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataEntryDTO } from './category-table.model';
import { DvTermCategoryDTO } from './pd-category.model';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.sass']
})
export class CategoryTableComponent implements OnInit {
  categories: DataEntryDTO[] = [];
  dvTerms: DvTermCategoryDTO[] = [];
  selectedDvTerm: (string | null)[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
    this.fetchDvTermData();
  }

  fetchData(): void {
    this.http.get<DataEntryDTO[]>('/api/table/data').subscribe(
      (data) => {
        // Sort data by studyId in ascending order
        this.categories = data.sort((a, b) => (a.studyId > b.studyId ? 1 : -1));
        // Initialize selectedDvTerm for each row
        this.selectedDvTerm = data.map((category) => category.dvterm);
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }
  
  fetchDvTermData(): void {
    this.http.get<DvTermCategoryDTO[]>('/api/table/dvterm-data').subscribe(
      (data) => {
        this.dvTerms = data;
      },
      (error) => {
        console.error('Error fetching DVTERM data: ', error);
      }
    );
  }
  
onDvTermSelect(rowIndex: number): void {
  const selectedDvTermForRow = this.selectedDvTerm[rowIndex];

  const selectedDvTermObj = this.dvTerms.find((dvTerm) => dvTerm.dvterm === selectedDvTermForRow);

  if (selectedDvTermObj) {
    // Update the category for the selected row
    this.categories[rowIndex].dvterm = selectedDvTermObj.dvterm;
    this.categories[rowIndex].dvdecod = selectedDvTermObj.dvdecod;
    this.categories[rowIndex].dvcat = selectedDvTermObj.dvcat;

    // Send an HTTP POST request to update the database
    const entryId = this.categories[rowIndex].entryId;
    const dvterm = selectedDvTermObj.dvterm;

    this.http.post('/api/table/update-category', {
      entryId,
      dvterm,
    }).subscribe(
      () => {
        console.log('Category updated in the database');
      },
      (error) => {
        console.error('Error updating category in the database: ', error);
      }
    );
  }
}

}