import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailedViewComponent } from '../../../detailed-view/detailed-view.component';
import { DataVisualisationPageModule } from '../../../data-visualisation-page.module';

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
    private route: ActivatedRoute
  ) { }

  navigate() {
    this.router.navigate([`${DataVisualisationPageModule.URL}/${DetailedViewComponent.URL}`],
      {
        queryParams: {
          studyId: this.selectedStudy ? this.selectedStudy : null
        },
        queryParamsHandling: 'merge'
      }
    )
  }
}
