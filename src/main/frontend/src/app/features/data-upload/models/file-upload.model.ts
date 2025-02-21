export interface FileUpload {
    file: File
    
    /**
     * Id of the user who is uploading the file
     *
     * @type {number}
     * @memberof FileUpload
     */
    userId: number
}