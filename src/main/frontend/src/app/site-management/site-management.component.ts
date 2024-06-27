import { Component, OnInit } from '@angular/core';
import { SiteManagementService } from './site-management.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-site-management',
  templateUrl: './site-management.component.html',
  styleUrls: ['./site-management.component.css']
})

export class SiteManagementComponent implements OnInit {
	  sites: any[] = [];
	  newSites: { [siteId: string]: boolean } = {};
	  
	  
	  // Pagination properties
	  itemsPerPage: number = 8;
	  currentPage: number = 1;
	  pagedSites: any[] = [];
	  disabledFirstButton: boolean = false;
	  disabledPreviousButton: boolean = false;
	  disabledNextButton: boolean = false;
	  disabledLastButton: boolean = false;
	  
	  sortedColumn: string = 'siteId'; // Default sorting column
	  sortDirection: 'asc' | 'desc' = 'asc';

	  constructor(private siteManagementService: SiteManagementService) {}

	  ngOnInit(): void {
	    this.getSites();
	    this.updatePage();
	  }
	  
	  initializeComponent(): void {
		  this.getSites();
		  this.updatePage();
		  }
	  
	  getSites(): void {
		    // Make an API call to get sites
		    this.siteManagementService.getUniqueSites().subscribe((data: any[]) => {
		        this.sites = data;
		        this.updatePage();
		    }, error => {
		        console.error('Error fetching sites:', error);
		    });
		}
	  
	  updateSites(): void {
		    const selectedSites = Object.keys(this.newSites).filter(siteId => this.newSites[siteId]);
		    
		    this.siteManagementService.updateSites(selectedSites).subscribe({
		      next: () => {
		        console.log('Sites updated successfully');
		        this.getSites();
		        this.updatePage();
		      },
		      error: (error) => {
		        console.error('Failed to update sites:', error);
		      }
		    });
		  }


	  updatePage(): void {
	    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
	    this.pagedSites = this.sites.slice(startIndex, startIndex + this.itemsPerPage);
	  }

	  setPage(page: number): void {
	      this.currentPage = page;
	      this.updateNavigationButtons();
	      this.updatePage();
	  }

	  updateNavigationButtons(): void {
	      this.disabledFirstButton = this.currentPage === 1;
	      this.disabledPreviousButton = this.currentPage === 1;
	      this.disabledNextButton = this.currentPage === this.pages.length;
	      this.disabledLastButton = this.currentPage === this.pages.length;
	  }

	  
	  get pages(): number[] {
		  return Array.from({ length: Math.ceil(this.sites.length / this.itemsPerPage) }, (_, i) => i + 1);
		}
	  
	  sortTable(column: string): void {
		  if (this.sortedColumn === column) {
		    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
		  } else {
		    this.sortedColumn = column;
		    this.sortDirection = 'asc';
		  }

		  // Sort the entire dataset
		  this.sites.sort((a, b) => {
		    const aValue = a[this.sortedColumn];
		    const bValue = b[this.sortedColumn];

		    if (this.sortDirection === 'asc') {
		      return aValue.localeCompare(bValue);
		    } else {
		      return bValue.localeCompare(aValue);
		    }
		  });

		  // Update pagination after sorting
		  this.setPage(this.currentPage);
		}
	}