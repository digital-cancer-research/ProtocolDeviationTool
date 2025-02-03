import { AfterViewInit, Component, inject, signal, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { UploadError } from './models/upload-error.model';
import { UploadedFilesTableComponent } from './uploaded-files-table/uploaded-files-table.component';
import { MatDialog } from '@angular/material/dialog';
import { AiStatementDialogueComponent } from './ai-statement-dialogue/ai-statement-dialogue.component';

/**
 * Component for managing data uploads.
 */
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
  protected useAi: boolean = false;
  protected consent = signal(false);
  private readonly dialog = inject(MatDialog);

  /**
   * Lifecycle hook that is called after a component's view has been fully initialized.
   */
  ngAfterViewInit(): void {
    this.filesPanel.open();
  }

  /**
   * Handles successful file upload.
   */
  onSuccessfulUpload(): void {
    this.uploadedFilesTable.setDataSource();
  }

  /**
   * Handles file change event.
   *
   * @param files the new files
   */
  onFileChange(files: File[]): void {
    this.hasFilesPanelGotNewFiles = this.filesPanel ? !this.filesPanel.expanded : false;
    this.newFiles = files;
  }

  /**
   * Handles file errors event.
   *
   * @param newErrors the new errors
   */
  onFileErrors(newErrors: UploadError[]): void {
    this.hasErrorsPanelGotNewFiles = this.filesPanel ? !this.errorsPanel.expanded : false;
    this.errors = [...this.errors, ...newErrors];
  }

  /**
   * Handles AI checkbox change event.
   */
  onAiCheckbox() {
    if (this.useAi && !this.consent()) {
      const dialogRef = this.dialog.open(AiStatementDialogueComponent, {
        data: { consent: this.consent }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && result === true) {
          this.consent.set(result);
        } else {
          this.useAi = false;
        }
      });
    }
  }

  /**
   * Determines if the file panel badges are visible.
   *
   * @return true if the file panel badges are visible, false otherwise
   */
  get isFilePanelBadgesVisible(): boolean {
    if (this.filesPanel) {
      return !this.filesPanel.expanded && this.hasFilesPanelGotNewFiles;
    } else {
      return false;
    }
  }

  /**
   * Determines if the error panel badges are visible.
   *
   * @return true if the error panel badges are visible, false otherwise
   */
  get isErrorPanelBadgesVisible(): boolean {
    if (this.errorsPanel) {
      return !this.errorsPanel.expanded && this.hasErrorsPanelGotNewFiles;
    } {
      return false;
    }
  }
}