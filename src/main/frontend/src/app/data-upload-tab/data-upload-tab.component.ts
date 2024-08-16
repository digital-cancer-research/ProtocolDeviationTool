import { Component } from '@angular/core';

@Component({
  selector: 'app-data-upload-tab',
  templateUrl: './data-upload-tab.component.html',
  styleUrl: './data-upload-tab.component.css'
})
export class DataUploadTabComponent {
  buttons: {label: string, link: string}[] = [
    {label: "DATA UPLOAD", link: ""},
    {label: "DATA UPLOAD SUMMARY", link: ""},
    {label: "AUDIT TRAIL", link: ""},
    {label: "DATA TRAIL", link: ""},
    {label: "DATA CATEGORISATION", link: ""}
  ];

  constructor() { }
  
  

}
