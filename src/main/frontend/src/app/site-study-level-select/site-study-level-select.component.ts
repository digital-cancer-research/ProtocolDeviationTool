import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SiteStudyLevelSelectService } from './site-study-level-select.service';

@Component({
  selector: 'app-site-study-level-select',
  templateUrl: './site-study-level-select.component.html',
  styleUrls: ['./site-study-level-select.component.css']
})
export class SiteStudyLevelSelectComponent {
	  selectedLevel: string | null = null;
	  searchTerm: string = '';
	  selectedStudy: string | null = null;
	  studies: string[] = [];

	  constructor(
	    private router: Router,
	    private siteStudyLevelSelectService: SiteStudyLevelSelectService
	  ) {}

	  ngOnInit(): void {
	    this.loadStudyIds();
	  }

	  loadStudyIds(): void {
	    this.siteStudyLevelSelectService.getAllStudyIds().subscribe(
	      (studyIds) => {
	        this.studies = studyIds;
	      },
	      (error) => {
	        console.error('Error fetching study IDs:', error);
	      }
	    );
	  }

	  goToPage(): void {
	    if (this.selectedLevel === 'Site Level') {
	      this.router.navigate(['/data-visualisation-deviation-home']);
	    } else if (this.selectedLevel === 'Study Level' && this.studies.length) {
	      // dropdown selection
	    }
	  }

	  get filteredStudies(): string[] {
		    return this.studies.filter(studyId =>
		      studyId.toLowerCase().includes(this.searchTerm.toLowerCase())
		    );
	  }
	}