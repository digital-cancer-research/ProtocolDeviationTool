import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/core/models/user.model';
import { UploadResponse } from './upload-response.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) { }

  uploadFile(file: File, user: User) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', user.username);
    return this.http.post<UploadResponse>('api/upload', formData);
  }
}