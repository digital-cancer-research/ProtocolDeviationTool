import { AfterViewInit, Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { FileService } from '../../data-upload/file.service';
import { UploadedFile } from '../../data-upload/models/uploaded-file.model';
import { MatList, MatListOption } from '@angular/material/list';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-file-select',
  templateUrl: './file-select.component.html',
  styleUrl: './file-select.component.css'
})
export class FileSelectComponent implements AfterViewInit {
  private readonly fileService = inject(FileService);
  @ViewChild('list') list!: MatList;
  @Output() selectedFiles: EventEmitter<number[]> = new EventEmitter();
  files: UploadedFile[] = [];

  constructor() {
    this.fileService.getFiles$().subscribe(files => this.files = files);
  }

  ngAfterViewInit(): void {
    console.log(this.list);

  }

  public onFileSelected(selection: SelectionModel<MatListOption>): void {
    this.selectedFiles.emit(
      selection.selected.map(option => (option.value as UploadedFile).id)
    );
  }
}