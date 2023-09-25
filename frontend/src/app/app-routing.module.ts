import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component'
import { UserSelectionComponent } from './user/user-selection.component'
import { UserManagementComponent } from './user-management/user-management.component'

const routes: Routes = [
  { path: '', component: UploadComponent },
  { path: '', component: UserSelectionComponent },
  { path: 'admin', component: UserManagementComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
