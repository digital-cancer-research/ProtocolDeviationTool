import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { UploadError } from './models/upload-error.model';
import { UploadedFilesTableComponent } from './uploaded-files-table/uploaded-files-table.component';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrl: './data-upload.component.css'
})
export class DataUploadComponent implements AfterViewInit {
  public static readonly URL = 'data-upload';
  @ViewChild('uploadedFilesTable') uploadedFilesTable!: UploadedFilesTableComponent;
  @ViewChild('filesPanel') filesPanel!: MatExpansionPanel;
  @ViewChild('errorsPanel') errorsPanel!: MatExpansionPanel;
  protected hasFilesPanelGotNewFiles: boolean = false;
  protected hasErrorsPanelGotNewFiles: boolean = false;
  protected newFiles: File[] = [];
  protected errors: UploadError[] = [];

  ngAfterViewInit(): void {
    this.filesPanel.open();
  }

  onSuccessfulUpload(): void {
    this.uploadedFilesTable.setDataSource();
  }

  onFileChange(files: File[]): void {
    this.hasFilesPanelGotNewFiles = this.filesPanel ? !this.filesPanel.expanded : false;
    this.newFiles = files;
  }
  
  onFileErrors(newErrors: UploadError): void {
    this.hasErrorsPanelGotNewFiles = this.filesPanel ? !this.errorsPanel.expanded : false;
    this.errors = [...this.errors, newErrors];
  }

  get isFilePanelBadgesVisible(): boolean {
    if (this.filesPanel) {
      return !this.filesPanel.expanded && this.hasFilesPanelGotNewFiles;
    } else {
      return false
    }
  }

  get isErrorPanelBadgesVisible(): boolean {
    if (this.errorsPanel) {
      return !this.errorsPanel.expanded && this.hasErrorsPanelGotNewFiles;
    } {
      return false;
    }
  }
}