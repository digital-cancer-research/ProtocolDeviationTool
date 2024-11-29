import { UploadResponse } from "src/app/shared/upload/upload-response.model";

export interface UploadError {
    filename: string;
    response: UploadResponse
}