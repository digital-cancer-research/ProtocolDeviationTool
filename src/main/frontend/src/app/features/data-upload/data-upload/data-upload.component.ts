import { Component } from '@angular/core';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrl: './data-upload.component.css'
})
export class DataUploadComponent {
  public static readonly URL = 'data-upload';
  protected files: File[] = [];

  onFileChange(files: File[]): void {
    this.files = files;
  }
}
