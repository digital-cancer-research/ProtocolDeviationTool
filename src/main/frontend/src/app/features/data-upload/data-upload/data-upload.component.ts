import { Component } from '@angular/core';
import { UploadError } from './models/upload-error.model';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrl: './data-upload.component.css'
})
export class DataUploadComponent {
  public static readonly URL = 'data-upload';
  protected files: File[] = [];
  protected errors: string = "";

  onFileChange(files: File[]): void {
    this.files = files;
  }

  onFileErrors(error: string): void {
    this.errors = error;
  }
}
