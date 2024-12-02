import { Component, EventEmitter, inject, Output, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FileUploadComponent {
  private _snackBar = inject(MatSnackBar);
  @Output() readonly filesChange: EventEmitter<File[]> = new EventEmitter();

  /**
  * Handles the file drop event, processes the dropped files, and emits the updated file list.
  * 
  * @param files - An array of NgxFileDropEntry objects representing the dropped files.
  *                Each entry contains information about a dropped file or folder.
  * 
  * @returns void - This function does not return a value, but it emits the updated file list
  *                 through the filesChange EventEmitter.
  */
  protected onFileDrop(filesDropped: NgxFileDropEntry[]) {
    const files: File[] = [];
    for (const droppedFile of filesDropped) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file) => {
          files.push(file);
          this.filesChange.emit(files);
        }, (error) => {
          const errorMessage = "Error loading the file."
          this.openSnackBar(`${errorMessage}. ${error}`, "Dismiss")
          console.error('Error loading the file:', error);
        })
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
