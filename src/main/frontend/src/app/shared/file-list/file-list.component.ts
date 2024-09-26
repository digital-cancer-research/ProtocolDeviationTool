import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FileListService } from './file-list.service';


@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css'],
})
export class FileListComponent implements OnInit {
	@Output() fileDeleted: EventEmitter<void> = new EventEmitter<void>();
  files: any[] = [];

  constructor(private fileListService: FileListService) {}

  ngOnInit(): void {
    this.loadFiles();
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
        
     	// Emit event when file is deleted
        this.fileDeleted.emit();
      },
      (error) => {
        console.error('Error deleting file:', error);
      }
    );
  }
}