import { Component } from '@angular/core';

@Component({
	selector: 'app-data-visualisation-deviation-home-page',
	templateUrl: './data-visualisation-deviation-home-page.component.html',
	styleUrls: ['./data-visualisation-deviation-home-page.component.css']
})
export class DataVisualisationDeviationHomePageComponent {
	isCategoryTableVisible: boolean = false;
	selectedDvdecod: string | null = null;

	showCategoryTable(dvdecod: string) {
		this.selectedDvdecod = dvdecod;
		this.isCategoryTableVisible = true;
	}

}