import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SiteSelectService } from './site-select.service';
import { ShareSiteDataService } from '../site-select/share-site-data.service';

@Component({
  selector: 'app-site-select',
  templateUrl: './site-select.component.html',
})

export class SiteSelectComponent implements OnInit {
	
	@Output() siteSelected: EventEmitter<string> = new EventEmitter<string>();
	@Input() selectedSiteId: string | undefined;

	uniqueSiteIds: string[] = [];

  constructor(private siteSelectService: SiteSelectService, private shareSiteDataService: ShareSiteDataService) {}

  ngOnInit() {
	    this.loadUniqueSiteIds();
	  }

  loadUniqueSiteIds() {
    this.siteSelectService.getUniqueSiteIds().subscribe(
      (data) => {
        this.uniqueSiteIds = data;
      },
      (error) => {
        console.error('Error loading unique siteIds: ', error);
      }
    );
  }

  onSiteChange() {
	  console.log('Selected Site ID:', this.selectedSiteId);
	  this.shareSiteDataService.updateSelectedSiteId(this.selectedSiteId);
	  this.siteSelected.emit(this.selectedSiteId);
	}

}
