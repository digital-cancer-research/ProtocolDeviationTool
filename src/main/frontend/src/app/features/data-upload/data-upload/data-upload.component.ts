import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrl: './data-upload.component.css'
})
export class DataUploadComponent implements AfterViewInit {
  public static readonly URL = 'data-upload';
  @ViewChild('FilesPanel') filesPanel!: MatExpansionPanel;
  @ViewChild('ErrorsPanel') errorsPanel!: MatExpansionPanel;
  protected hasFilesPanelGotNewFiles: boolean = false;
  protected hasErrorsPanelGotNewFiles: boolean = false;
  protected files: File[] = [];
  protected errors: string = "";

  ngAfterViewInit(): void {
  }

  onFileChange(files: File[]): void {
    this.hasFilesPanelGotNewFiles = true;
    this.files = files;
  }

  onFileErrors(error: string): void {
    this.hasErrorsPanelGotNewFiles = true;
    this.errors = error;
  }

  get isFilePanelVisible(): boolean {
    if (this.filesPanel) {
      return !this.filesPanel.expanded && this.hasFilesPanelGotNewFiles;
    } else {
      return false
    }
  }

  get isErrorPanelVisible(): boolean {
    if (this.errorsPanel) {
      return !this.errorsPanel.expanded && this.hasErrorsPanelGotNewFiles;
    } {
      return false;
    }
  }
}
