import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataVisualisationPageModule } from '../../../data-visualisation-page.module';
import { DetailedViewComponent } from '../../detailed-view/detailed-view.component';
import { TotalPdsComponent } from '../../detailed-view/total-pds/total-pds.component';
import { Study } from 'src/app/core/new/services/models/study/study.model';
import { StudyService } from 'src/app/core/services/study.service';

@Component({
  selector: 'app-select-dialog',
  templateUrl: './select-dialog.component.html',
  styleUrl: './select-dialog.component.css'
})
export class SelectDialogComponent {
  private readonly router = inject(Router);
  private readonly studyService = inject(StudyService);
     
  data = inject(MAT_DIALOG_DATA);
  selectedStudy: Study | null = null;

  navigate() {
    this.studyService.setStudy(this.selectedStudy);
    this.router.navigate([`${DataVisualisationPageModule.URL}/${DetailedViewComponent.URL}/${TotalPdsComponent.URL}`],
      {
        queryParams: {
          study: this.selectedStudy ? this.selectedStudy.externalStudyId : null
        },
        queryParamsHandling: 'merge'
      }
    )
  }
}
