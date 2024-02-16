import { Component, ViewChild } from '@angular/core';
import { FileListComponent } from '../file-list/file-list.component';
import { CategoryTableComponent } from '../category-table/category-table.component';

@Component({
  selector: 'app-data-upload-page',
  templateUrl: './data-upload-page.component.html',
  styleUrls: ['./data-upload-page.component.css']
})
export class DataUploadPageComponent {
  @ViewChild(FileListComponent) fileListComponent!: FileListComponent;
  @ViewChild(CategoryTableComponent) categoryTableComponent!: CategoryTableComponent;

  refreshData(): void {
    // Call the loadFiles() method of FileListComponent
    this.fileListComponent.loadFiles();

    // Call the fetchData() and fetchDvTermData() methods of CategoryTableComponent
    this.categoryTableComponent.fetchData();
    this.categoryTableComponent.fetchDvTermData();
  }
}
