import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Component for displaying the AI statement dialogue.
 */
@Component({
  selector: 'app-ai-statement-dialogue',
  templateUrl: './ai-statement-dialogue.component.html',
  styleUrl: './ai-statement-dialogue.component.css'
})
export class AiStatementDialogueComponent {
  readonly dialogRef = inject(MatDialogRef<AiStatementDialogueComponent>);
  readonly data = inject<DialogueData>(MAT_DIALOG_DATA);
  consent = model(this.data.consent);
}

/**
 * Interface representing the data passed to the dialogue.
 */
interface DialogueData {
  consent: boolean;
}
