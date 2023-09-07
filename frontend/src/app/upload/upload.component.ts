import { Component } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent {
  constructor(private uploadService: UploadService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadService.uploadFile(file).subscribe(
      response => {
        console.log('Upload successful', response);
      },
      error => {
        console.error('Upload error', error);
      }
    );
  }
}