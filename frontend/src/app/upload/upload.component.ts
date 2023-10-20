import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadResponse } from './upload-response.model';
import { UserService } from '../user/user.service';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  message: string | null = null;

  constructor(private http: HttpClient, private userService: UserService) {}

onFileSelected(event: any) {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files && fileInput.files.length > 0) {
    console.log('Selected file:', fileInput.files[0].name);
  }
}


uploadFile() {
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  const file: File | null = fileInput?.files ? fileInput.files[0] : null;
  
  // Get the current user's username from your service
  const currentUsername = this.userService.getCurrentUser();

  if (!currentUsername) {
    this.message = 'Please select a user before uploading a file.';
    return;
  }

  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    
    // Append the current user's username to the FormData
    formData.append('username', currentUsername);

    this.http
      .post<UploadResponse>('http://localhost:8080/api/upload', formData)
      .subscribe(
        (response) => {
          // Handle the message from the server
          this.message = response.message;
        },
        (error) => {
          // Handle upload error
          if (error.error && error.error.message) {
            this.message = error.error.message;
          } else {
            this.message = 'An unknown error occurred.';
          }
          console.error('Upload error', error);
        }
      );
  } else {
    this.message = 'Please select a file to upload';
  }
}
}
