import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataEntryDTO } from './category-table.model';
import { DvTermCategoryDTO } from './pd-category.model';
import { UpdateCategoryDTO } from './update-category.model';
import { UserService } from '../user/user.service';
import { CategoryEditAuditDTO } from './category-audit.model';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.sass']
})
export class CategoryTableComponent implements OnInit {
  categories: UpdateCategoryDTO[] = [];
  dvTerms: DvTermCategoryDTO[] = [];
  selectedDvTerm: (string | null)[] = [];
  isAuditPopupOpen = false;
  auditEntries: CategoryEditAuditDTO[] = [];

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchData();
    this.fetchDvTermData();
  }

  fetchData(): void {
    this.http.get<UpdateCategoryDTO[]>('/api/table/data').subscribe(
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
  const oldDvtermForRow = this.categories[rowIndex].dvterm;

  if (selectedDvTermObj) {
    // Update the category for the selected row
    this.categories[rowIndex].dvterm = selectedDvTermObj.dvterm;
    this.categories[rowIndex].dvdecod = selectedDvTermObj.dvdecod;
    this.categories[rowIndex].dvcat = selectedDvTermObj.dvcat;

    // Send an HTTP POST request to update the database
    const entryId = this.categories[rowIndex].entryId;
    const dvterm = selectedDvTermObj.dvterm;

    // Include the old dvterm and the username in the request
    const currentUsername = this.userService.getCurrentUser();
    
    this.http.post('/api/table/update-category', {
      entryId,
      dvterm,
      oldDvterm: oldDvtermForRow,
      username: currentUsername,
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

openAuditPopup(entryId: number): void {

  // Call the method to fetch audit entries for the entryId
  this.getAuditEntries(entryId);
  
  // Open the custom popup
  const popup = document.getElementById('audit-popup');
  if (popup) {
    popup.style.display = 'block';
  }
}

closeAuditPopup(): void {

  // Close the custom popup
  const popup = document.getElementById('audit-popup');
  if (popup) {
    popup.style.display = 'none';
  }
}

// Method to fetch audit entries
getAuditEntries(entryId: number): void {
  this.http.get<CategoryEditAuditDTO[]>(`/api/table/audit-entries/${entryId}`).subscribe(
    (data) => {
      this.auditEntries = data;
    },
    (error) => {
      console.error('Error fetching audit entries: ', error);
    }
  );
}



}