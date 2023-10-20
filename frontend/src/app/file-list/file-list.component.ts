import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileListService } from './file-list.service';


@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
})
export class FileListComponent implements OnInit {
  files: any[] = [];

  constructor(private fileService: FileListService) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles(): void {
    this.fileService.getUploadedFiles().subscribe(
      (data: any[]) => {
        this.files = data;
      },
      (error) => {
        console.error('Error loading files:', error);
      }
    );
  }

  deleteFile(fileId: number): void {
    this.fileService.deleteFile(fileId).subscribe(
      () => {
        this.files = this.files.filter((file) => file.fileId !== fileId);
        // Refresh the file list after deleting a file
	      this.loadFiles();
      },
      (error) => {
        console.error('Error deleting file:', error);
      }
    );
  }
}