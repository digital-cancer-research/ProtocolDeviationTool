import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-dialog',
  templateUrl: './select-dialog.component.html',
  styleUrl: './select-dialog.component.css'
})
export class SelectDialogComponent {
  data = inject(MAT_DIALOG_DATA);

  selectedStudy: string = "";
}
