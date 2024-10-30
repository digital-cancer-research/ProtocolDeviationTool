import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataVisualisationPageModule } from '../../../data-visualisation-page.module';
import { DetailedViewComponent } from '../../detailed-view/detailed-view.component';
import { TotalPdsComponent } from '../../detailed-view/total-pds/total-pds.component';

@Component({
  selector: 'app-select-dialog',
  templateUrl: './select-dialog.component.html',
  styleUrl: './select-dialog.component.css'
})
export class SelectDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  selectedStudy: string = "";

  constructor(
    private router: Router,
  ) { }

  navigate() {
    this.router.navigate([`${DataVisualisationPageModule.URL}/${DetailedViewComponent.URL}/${TotalPdsComponent.URL}`],
      {
        queryParams: {
          studyId: this.selectedStudy ? this.selectedStudy : null
        },
        queryParamsHandling: 'merge'
      }
    )
  }
}
