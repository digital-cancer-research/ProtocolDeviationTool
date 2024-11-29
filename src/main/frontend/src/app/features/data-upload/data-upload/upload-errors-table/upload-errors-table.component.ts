import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-upload-errors-table',
  templateUrl: './upload-errors-table.component.html',
  styleUrl: './upload-errors-table.component.css'
})
export class UploadErrorsTableComponent implements OnChanges {
  @Input() errors: string = "";

  ngOnChanges(changes: SimpleChanges): void {
    const errorChanges = changes['errors'];
    if (errorChanges) {
      this.errors = errorChanges.currentValue;
    }
  }
}
