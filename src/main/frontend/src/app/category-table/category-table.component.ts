import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
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
  selectedDvdecod: (string | null)[][] = [];
  isAuditPopupOpen = false;
  auditEntries: CategoryEditAuditDTO[] = [];
  filteredCategories: CategoryTableDataDTO[] = [];
  
//Pagination properties
 itemsPerPage: number = 5;
 currentPage: number = 1;
 pagedCategories: CategoryTableDataDTO[] = [];
 disabledFirstButton: boolean = false;
 disabledPreviousButton: boolean = false;
 disabledNextButton: boolean = false;
 disabledLastButton: boolean = false;
 
 sortedColumn: string = 'studyId'; // Default sorting column
 sortDirection: 'asc' | 'desc' = 'asc';
 dvspondesFilter: string = '';
 
 editingStudyId: number | null = null; // Track the currently edited Study ID
 
 @Input() filterValue: string | null = null;

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchData();
    this.fetchDvTermData();
    this.applyFilter();
    this.updatePage();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
	    if (changes['filterValue'] && this.filterValue !== null) {
	    	this.fetchData();
	        this.fetchDvTermData();
	      this.applyFilter();
	      this.updatePage();
	    }
	  }
  
  removeDuplicates(array: string[]): string[] {
	    return array.filter((value, index, self) => self.indexOf(value) === index);
	  }



  fetchData(): void {
    this.http.get<CategoryTableDataDTO[]>('/api/table/data').subscribe(
      (data) => {
    	  
    	//Sort data by studyId in ascending order and then by dvspondes
    	  this.categories = data.sort((a, b) => {
    	     // Compare studyId first
    	     if (a.studyId !== b.studyId) {
    	         return a.studyId.localeCompare(b.studyId); // Sort studyId in ascending order
    	     } else {
    	         // If studyId is the same, compare dvspondes
    	         return a.dvspondesValue.localeCompare(b.dvspondesValue); // Sort dvspondes in ascending order
    	     }
    	  });
        // Initialize selectedDvTerm for each row
        this.selectedDvdecod = data.map((category) => category.dvdecod);
        this.updatePage();
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
  
  applyFilter(): void {
	    if (this.filterValue) {
	      this.filteredCategories = this.categories.filter(category => category.dvdecod.includes(this.filterValue!));
	    } else {
	      this.filteredCategories = this.categories;
	    }
	    this.updatePage();
	  }
  
  updatePage(): void {
	  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
	  this.pagedCategories = this.filteredCategories.slice(startIndex, startIndex + this.itemsPerPage);
	  this.updateNavigationButtons();
	}

	setPage(page: number): void {
	  if (page < 1 || page > this.pages.length) return;
	  this.currentPage = page;
	  this.updatePage();
	}

	updateNavigationButtons(): void {
	  this.disabledFirstButton = this.currentPage === 1;
	  this.disabledPreviousButton = this.currentPage === 1;
	  this.disabledNextButton = this.currentPage === this.pages.length;
	  this.disabledLastButton = this.currentPage === this.pages.length;
	}

	get pages(): number[] {
	  return Array.from({ length: Math.ceil(this.categories.length / this.itemsPerPage) }, (_, i) => i + 1);
	}
	
	sortTable(column: string): void {
	    if (this.sortedColumn === column) {
	      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
	    } else {
	      this.sortedColumn = column;
	      this.sortDirection = 'asc';
	    }

	    // Sort the entire dataset
	    this.filteredCategories.sort((a, b) => {
	      const aValue = this.getColumnValue(a, column);
	      const bValue = this.getColumnValue(b, column);

	      if (this.sortDirection === 'asc') {
	        return aValue.localeCompare(bValue);
	      } else {
	        return bValue.localeCompare(aValue);
	      }
	    });

	    // Update pagination after sorting
	    this.updatePage();
	  }

	  getColumnValue(category: CategoryTableDataDTO, column: string): string {
	    switch (column) {
	      case 'studyId':
	        return category.studyId;
	      case 'dvspondesValue':
	        return category.dvspondesValue;
	      case 'dvcat':
	        return category.dvcat.join(', '); // Join DVCAT array into a string for sorting
	      case 'dvdecod':
	        return category.dvdecod.join(', '); // Join DVDECOD array into a string for sorting
	      default:
	        return '';
	    }
	  }

	  
	  applyDvspondesFilter(): void {
		    this.currentPage = 1; // Reset to the first page when applying filter
		    this.filteredCategories = this.categories.filter(category =>
		      category.dvspondesValue.toLowerCase().includes(this.dvspondesFilter.toLowerCase())
		    );
		    this.updatePage();
		  }
  
  onDvTermSelect(rowIndex: number): void {
	  const selectedDvTermsForRow = this.selectedDvdecod[rowIndex];
	  const oldDvdecodForRow = this.categories[rowIndex].dvdecod;
	  
	  // Convert selectedDvTermsForRow to an array of dvterm values
	  const selectedDvdecodValues = Array.from(selectedDvTermsForRow)
		.filter((dvdecod: string | null): dvdecod is string => dvdecod !== null) // Filter out null values
	    .map((selectedDvdecod: string) => {
	      const selectedDvTermObj = this.dvTerms.find((dvTerm) => dvTerm.dvdecod === selectedDvdecod);
	      return selectedDvTermObj ? selectedDvTermObj.dvdecod : null;
	    });
	 
	  // Filter out null values from selectedDvtermValues
	  const filteredSelectedDvdecodValues: string[] = selectedDvdecodValues.filter((dvdecod: string | null): dvdecod is string => dvdecod !== null);
	  
	  // Update the category for the selected row
	  this.categories[rowIndex].dvdecod = filteredSelectedDvdecodValues;
	  
	  // Send an HTTP POST request to update the database
	  const entryId = this.categories[rowIndex].entryId;

	  // Include the old dvterm and the username in the request
	  const currentUsername = this.userService.getCurrentUser();

	  this.http.post('/api/table/update-category', {
	    entryId,
	    dvdecods: filteredSelectedDvdecodValues,
	    oldDvdecods: oldDvdecodForRow,
	    username: currentUsername,
	  }).subscribe(
	    () => {
	      console.log('Category updated in the database');
	    },
	    (error) => {
	      console.error('Error updating category in the database: ', error);
	    }
	  );
	  this.fetchData();
	    this.fetchDvTermData();
	    this.updatePage();
	}
  
  startEditingStudyId(entryId: number): void {
	    this.editingStudyId = entryId;
	  }

	  stopEditingStudyId(category: CategoryTableDataDTO): void {
	    if (this.editingStudyId !== null) {
	      this.updateStudyId(category, category.studyId);
	      this.editingStudyId = null;
	    }
	  }

	  updateStudyId(category: CategoryTableDataDTO, newStudyId: string): void {
	    if (!newStudyId || newStudyId.trim() === '') {
	      console.error('Study ID cannot be empty.');
	      return; // Do not proceed with the update
	    }

	    const trimmedStudyId = newStudyId.trim();

	    this.http.post('/api/table/update-study-id', { entryId: category.entryId, newStudyId: trimmedStudyId }).subscribe(
	      () => {
	        category.studyId = trimmedStudyId; // Update the study ID in the local list
	        this.sortTable(this.sortedColumn); // Re-sort the table if necessary
	      },
	      (error) => {
	        console.error(`Error updating study ID ${category.entryId}:`, error);
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