import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadedFile } from './models/uploaded-file.model';
import { FileDelete } from './models/file-delete.model';
import { FileAudit } from './models/file-audit.model';

/**
 * Service for managing file-related operations.
 */
@Injectable({
  providedIn: 'root',
})
export class FileService {
  private baseUrl = 'api/files';

  constructor(private http: HttpClient) { }

  /**
   * Retrieves all uploaded files.
   * 
   * @returns An Observable that emits an array of UploadedFile objects.
   */
  getFiles$(): Observable<UploadedFile[]> {
    return this.http.get<UploadedFile[]>(`${this.baseUrl}`);
  }

  /**
   * Deletes a file.
   * 
   * @param file - The file delete object containing the file ID and admin ID.
   * @returns An Observable that completes when the file is deleted.
   */
  deleteFile$(file: FileDelete): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${file.fileId}?adminId=${file.adminId}`);
  }

  /**
   * Uploads a file.
   * 
   * @param fd - The FormData object containing the file to upload.
   * @returns An Observable that emits the response from the server.
   * 
   * Example:
   * const fd = new FormData();
   * fd.append('file', fileInput.files[0]);
   * fd.append('description', 'File description');
   */
  uploadFile$(fd: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, fd);
  }

  fileAudits$(): Observable<FileAudit[]> {
    return this.http.get<FileAudit[]>(`${this.baseUrl}/audit`)
  }
}
