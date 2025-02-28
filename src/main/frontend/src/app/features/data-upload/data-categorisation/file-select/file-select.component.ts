import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FileService } from '../../data-upload/file.service';
import { UploadedFile } from '../../data-upload/models/uploaded-file.model';
import { MatListOption } from '@angular/material/list';
import { SelectionModel } from '@angular/cdk/collections';
import { map } from 'rxjs';

@Component({
  selector: 'app-file-select',
  templateUrl: './file-select.component.html',
  styleUrl: './file-select.component.css'
})
export class FileSelectComponent {
  private readonly fileService = inject(FileService);
  @Output() selectedFiles: EventEmitter<number[]> = new EventEmitter();
  files: UploadedFile[] = [];

  constructor() {
    this.fileService.getFiles$()
      .pipe(
        map(files => files.sort((a, b) => a.fileName.localeCompare(b.fileName)))
      )
      .subscribe(files => this.files = files);
  }

  public onFileSelected(selection: SelectionModel<MatListOption>): void {
    this.selectedFiles.emit(
      selection.selected.map(option => (option.value as UploadedFile).id)
    );
  }
}