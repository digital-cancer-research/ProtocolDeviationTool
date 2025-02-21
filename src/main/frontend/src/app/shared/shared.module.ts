import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { PageButtonComponent } from './page-button/page-button.component';
import { TabComponent } from './tab/tab.component';
import { MultiSelectComponent } from './select/multi-select/multi-select.component';
import { SingleSelectComponent } from './select/single-select/single-select.component';
import { StudyDataTableComponent } from './study-data-table/study-data-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SentenceCasePipe } from './pipes/sentence-case.pipe';
import { DataTableComponent } from './table/data-table/data-table.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { EditDataDialogueComponent } from './table/edit-data/edit-data-dialogue.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    MultiSelectComponent,
    PageButtonComponent,
    SingleSelectComponent,
    TabComponent,
    StudyDataTableComponent,
    SentenceCasePipe,
    DataTableComponent,
    EditDataDialogueComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatDialogModule,
    MatSelectModule
  ],
  exports: [
    MultiSelectComponent,
    PageButtonComponent,
    SingleSelectComponent,
    TabComponent,
    StudyDataTableComponent,
    SentenceCasePipe,
    DataTableComponent
  ]
})
export class SharedModule { }
