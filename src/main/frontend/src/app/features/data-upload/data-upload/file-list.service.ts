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
    return this.http.get<UploadedFile[]>(`${this.baseUrl}/list`);
  }

  deleteFile(fileId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${fileId}`);
  }
}
