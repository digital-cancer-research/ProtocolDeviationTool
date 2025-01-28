import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadedFile } from './models/uploaded-file.model';

@Injectable({
  providedIn: 'root',
})
export class FileListService {
  private baseUrl = 'api/files';

  constructor(private http: HttpClient) { }

  getUploadedFiles(): Observable<UploadedFile[]> {
    return this.http.get<UploadedFile[]>(`${this.baseUrl}`);
  }

  deleteFile(fileId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${fileId}`);
  }
}
