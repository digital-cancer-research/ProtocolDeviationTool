import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileListService {
  private baseUrl = 'api/files';

  constructor(private http: HttpClient) {}

  // Fetch the list of uploaded files
  getUploadedFiles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/list`);
  }

  // Delete a file by fileId
  deleteFile(fileId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${fileId}`);
  }
}
