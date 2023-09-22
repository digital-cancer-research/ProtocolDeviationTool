import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component'
import { UserSelectionComponent } from './user/user-selection.component'

const routes: Routes = [
  { path: '', component: UploadComponent },
  { path: '', component: UserSelectionComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
