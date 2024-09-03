import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationPageRoutingModule } from './administration-page-routing.module';
import { AdministrationPageComponent } from './administration-page.component';
import { SharedModule } from "../../shared/shared.module";
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AdministrationPageComponent,
  ],
  imports: [
    CommonModule,
    AdministrationPageRoutingModule,
    SharedModule,
    MatSnackBarModule
]
})
export class AdministrationPageModule { }
