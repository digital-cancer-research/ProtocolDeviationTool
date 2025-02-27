import { Component, inject } from '@angular/core';
import { FileService } from '../../data-upload/file.service';
import { UploadedFile } from '../../data-upload/models/uploaded-file.model';

@Component({
  selector: 'app-file-select',
  templateUrl: './file-select.component.html',
  styleUrl: './file-select.component.css'
})
export class FileSelectComponent {
  private readonly fileService = inject(FileService);
  files: UploadedFile[] = [];

  constructor() {
    this.fileService.getFiles$().subscribe(files => this.files = files);
  }
}