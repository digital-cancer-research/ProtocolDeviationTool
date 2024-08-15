import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SiteStudyLevelSelectService } from './site-study-level-select.service';

@Component({
	selector: 'app-site-study-level-select',
	templateUrl: './site-study-level-select.component.html',
	styleUrls: ['./site-study-level-select.component.css']
})
export class SiteStudyLevelSelectComponent implements OnInit {
	studies: string[] = [];
	selectedLevel: string | null = null;
	selectedStudy: string | null = null;
	searchTerm: string = "";
	elementHeight: number = 0;
	@ViewChild('SiteStudyLevelSelectComponent') component!: ElementRef; 

	constructor(
		private router: Router,
		private siteStudyLevelSelectService: SiteStudyLevelSelectService,
		private el:ElementRef
	) { }

	ngOnInit(): void {
		this.loadStudyIds();
		this.selectedLevel = this.siteStudyLevelSelectService.getSelectedLevel();
		this.selectedStudy = this.siteStudyLevelSelectService.getSelectedStudy();
		this.elementHeight = this.el.nativeElement.offsetHeight;
		console.log("Search term: " + this.searchTerm);
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

	onLevelChange(level: string) {
		this.selectedLevel = level;
		this.siteStudyLevelSelectService.setSelectedLevel(level);
	}

	onSelectStudyIdChange() {
		this.siteStudyLevelSelectService.setSelectedStudyId(this.selectedStudy);
	}

}