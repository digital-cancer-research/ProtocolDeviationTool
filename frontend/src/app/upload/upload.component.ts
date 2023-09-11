import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadResponse } from './upload-response.model';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  message: string | null = null;

  constructor(private http: HttpClient) {}

onFileSelected(event: any) {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files && fileInput.files.length > 0) {
    console.log('Selected file:', fileInput.files[0].name);
  }
}


  uploadFile() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const file: File | null = fileInput?.files ? fileInput.files[0] : null;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

	this.http
	  .post<UploadResponse>('http://localhost:8080/api/upload', formData)
	  .subscribe(
	    (response) => {
	      // Handle successful upload
	      this.message = response.message; // Display the message from the JSON response
	    },
	    (error) => {
	      // Handle upload error
	      this.message = 'Data has not been loaded';
	      console.error('Upload error', error);
	    }
	  );


    } else {
      this.message = 'Please select a file to upload';
    }
  }
}
