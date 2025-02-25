import { Component } from '@angular/core';
import { Tab } from 'src/app/shared/tab/tab';

@Component({
  selector: 'app-data-upload-page',
  templateUrl: './data-upload-page.component.html',
  styleUrl: './data-upload-page.component.css'
})
export class DataUploadPageComponent {
  tabs: Tab[] = [
    new Tab("DATA UPLOAD", "/data-upload"),
    new Tab("AUDIT TRAIL", "audit-trail"),
    new Tab("DATA TRAIL", "data-trail"),
    new Tab("DATA CATEGORISATION", "data-categorisation")
  ];
}
