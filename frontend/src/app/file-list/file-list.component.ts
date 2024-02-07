import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileListService } from './file-list.service';


@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css'],
})
export class FileListComponent implements OnInit {
  files: any[] = [];

  constructor(private fileListService: FileListService) {}

  ngOnInit(): void {
    this.loadFiles();
    console.log(this.files);
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

  deleteFile(fileId: number): void {
    this.fileListService.deleteFile(fileId).subscribe(
      () => {
        this.files = this.files.filter((file) => file.fileId !== fileId);
      },
      (error) => {
        console.error('Error deleting file:', error);
      }
    );
  }
}