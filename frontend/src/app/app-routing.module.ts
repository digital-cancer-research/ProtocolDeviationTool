import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  { path: 'admin', component: UserManagementComponent},
  { path: '', component: HomeComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
