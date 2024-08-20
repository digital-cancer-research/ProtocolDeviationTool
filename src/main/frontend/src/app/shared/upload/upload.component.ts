import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadResponse } from './upload-response.model';
import { UserService } from '../../core/services/user.service';
import { FileListService } from '../file-list/file-list.service';
import { StudyListService } from '../../study-list/study-list.service';
import { StudyList } from '../../study-list/study-list.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  @Input() messageType: string = '';
  @Output() fileUploaded: EventEmitter<void> = new EventEmitter<void>();
  message: string | null = null;
  files: any[] = [];
  studies: StudyList[] = [];
  selectedFileName: string = ''; // Variable to store the selected file name
  isLoading: boolean = false;

  constructor(private http: HttpClient, private userService: UserService, private fileListService: FileListService, private studyListService: StudyListService) { }

  //Function to handle the file selection event
  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFileName = 'File Selected: ' + fileInput.files[0].name; // Update the selected file name
      this.message = "";
    } else {
      this.selectedFileName = ''; // Clear the file name if no file is selected
      this.message = "";
    }
  }

  loadFiles(): void {
    this.fileListService.getUploadedFiles().subscribe(
      (data: any[]) => {
        this.files = data;
      },
      (error) => {
        console.error('Error loading files:', error);
      }
    );
  }

  loadStudies(): void {
    this.studyListService.getStudies().subscribe((data: StudyList[]) => {
      this.studies = data;
    });
  }

  uploadFile() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const file: File | null = fileInput?.files ? fileInput.files[0] : null;

    // Get the current user's username from service
    let currentUsername: string | undefined;
    this.userService.currentUser$.subscribe(
      (user) => {
        this.isLoading = true;
        currentUsername = user?.username;
        if (!currentUsername) {
          this.messageType = 'error';
          this.message = 'Please select a user before uploading a file.';
          this.isLoading = false
          return;
        }

        if (file) {
          const formData = new FormData();
          formData.append('file', file);

          // Append the current user's username to the FormData
          if (currentUsername) {
            formData.append('username', currentUsername);
          }


          this.http
            .post<UploadResponse>('api/upload', formData)
            .subscribe(
              (response) => {
                this.messageType = 'success';
                // Handle the message from the server
                this.message = response.message;
                if (this.message.includes("Failed")) {
                  this.messageType = "error";
                }
                // Refresh the uploaded file list and the study list
                this.loadFiles();
                this.loadStudies();

                // Emit event when file is uploaded
                this.fileUploaded.emit();
                this.isLoading = false;
              },
              (error) => {
                this.messageType = 'error';
                if (error.error && error.error.message) {
                  this.message = error.error.message;
                  this.isLoading = false;
                } else {
                  this.message = 'An unknown error occurred.';
                  this.isLoading = false;
                }
              }
            );
            fileInput.value = "";
          } else {
            this.messageType = 'error';
            this.selectedFileName = "";
            this.message = 'Please select a file to upload';
            this.isLoading = false;
        }
      }
    );
  }
}