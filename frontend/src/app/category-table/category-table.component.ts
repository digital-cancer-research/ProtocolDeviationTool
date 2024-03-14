import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataEntryDTO } from './category-table.model';
import { DvTermCategoryDTO } from './pd-category.model';
import { UpdateCategoryDTO } from './update-category.model';
import { UserService } from '../user/user.service';
import { CategoryEditAuditDTO } from './category-audit.model';
import { CategoryTableDataDTO } from './category-table-data.model';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css']
})
export class CategoryTableComponent implements OnInit {
  categories: CategoryTableDataDTO[] = [];
  dvTerms: DvTermCategoryDTO[] = [];
  selectedDvTerm: (string | null)[][] = [];
  isAuditPopupOpen = false;
  auditEntries: CategoryEditAuditDTO[] = [];

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchData();
    this.fetchDvTermData();
  }
  
  removeDuplicates(array: string[]): string[] {
	    return array.filter((value, index, self) => self.indexOf(value) === index);
	  }


  fetchData(): void {
    this.http.get<CategoryTableDataDTO[]>('/api/table/data').subscribe(
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
	  const selectedDvTermsForRow = this.selectedDvTerm[rowIndex];
	  const oldDvtermsForRow = this.categories[rowIndex].dvterm;

	  // Convert selectedDvTermsForRow to an array of dvterm values
	  const selectedDvtermValues = Array.from(selectedDvTermsForRow)
	    .filter((dvterm: string | null): dvterm is string => dvterm !== null) // Filter out null values
	    .map((selectedDvterm: string) => {
	      const selectedDvTermObj = this.dvTerms.find((dvTerm) => dvTerm.dvterm === selectedDvterm);
	      return selectedDvTermObj ? selectedDvTermObj.dvterm : null;
	    });

	  // Filter out null values from selectedDvtermValues
	  const filteredSelectedDvtermValues: string[] = selectedDvtermValues.filter((dvterm: string | null): dvterm is string => dvterm !== null);

	  // Update the category for the selected row
	  this.categories[rowIndex].dvterm = filteredSelectedDvtermValues;
	  
	  // Send an HTTP POST request to update the database
	  const entryId = this.categories[rowIndex].entryId;

	  // Include the old dvterm and the username in the request
	  const currentUsername = this.userService.getCurrentUser();

	  this.http.post('/api/table/update-category', {
	    entryId,
	    dvterms: filteredSelectedDvtermValues,
	    oldDvterms: oldDvtermsForRow,
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

//Method to fetch audit entries
getAuditEntries(entryId: number): void {
this.http.get<CategoryEditAuditDTO[]>(`/api/table/audit-entries/${entryId}`).subscribe(
 (data) => {
   this.auditEntries = data;

   // Sort the audit entries by date
   this.auditEntries.sort((a, b) => {
     const dateA = new Date(a.dateTimeEdited).getTime();
     const dateB = new Date(b.dateTimeEdited).getTime();

     return dateB - dateA; // Sort in descending order, change to dateA - dateB for ascending order
   });
 },
 (error) => {
   console.error('Error fetching audit entries: ', error);
 }
);
}




}