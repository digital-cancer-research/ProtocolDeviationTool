import { Component } from '@angular/core';

@Component({
  selector: 'app-data-upload-page',
  templateUrl: './data-upload-page.component.html',
  styleUrl: './data-upload-page.component.css'
})
export class DataUploadPageComponent {
  tabs: { label: string, link: string }[] = [
    { label: "DATA UPLOAD", link: "/data-upload" },
    { label: "DATA UPLOAD SUMMARY", link: "summary" },
    { label: "AUDIT TRAIL", link: "audit-trail" },
    { label: "DATA TRAIL", link: "data-trail" },
    { label: "DATA CATEGORISATION", link: "data-categorisation" }
  ];
}
