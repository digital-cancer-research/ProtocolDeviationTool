import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageButtonComponent } from './page-button/page-button.component';



@NgModule({
  declarations: [
    PageButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageButtonComponent
  ]
})
export class SharedModule { }
