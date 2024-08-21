import { Component, ViewChild } from '@angular/core';
import { FileListComponent } from '../shared/file-list/file-list.component';
import { CategoryTableComponent } from '../category-table/category-table.component';

@Component({
  selector: 'app-data-upload-page',
  templateUrl: './data-upload-page.component.html',
  styleUrls: ['./data-upload-page.component.css']
})
export class DataUploadPageComponent {
  @ViewChild(FileListComponent) fileListComponent!: FileListComponent;
  @ViewChild(CategoryTableComponent) categoryTableComponent!: CategoryTableComponent;
  tabs: {label: string, link: string}[] = [
    {label: "DATA UPLOAD", link: "data-upload"},
    {label: "DATA UPLOAD SUMMARY", link: "summary"},
    {label: "AUDIT TRAIL", link: "audit-trail"},
    {label: "DATA TRAIL", link: "data-trail"},
    {label: "DATA CATEGORISATION", link: "data-categorisation"}
  ];

  refreshData(): void {
    // Call the loadFiles() method of FileListComponent
    this.fileListComponent.loadFiles();

    // Call the fetchData() and fetchDvTermData() methods of CategoryTableComponent
    this.categoryTableComponent.fetchData();
    this.categoryTableComponent.fetchDvTermData();
  }
}
