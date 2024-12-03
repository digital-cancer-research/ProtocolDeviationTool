export class UploadResponse {
  message: string;
  missingCells: string[];

  constructor(message: string, missingCells: string[] = []) {
    this.message = message;
    this.missingCells = missingCells;
  }
}
