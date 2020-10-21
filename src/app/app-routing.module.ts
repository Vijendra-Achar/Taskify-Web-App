import { EmployeeTasksAssignComponent } from './employee-tasks-assign/employee-tasks-assign.component';
import { CreateNewEmployeeComponent } from './create-new-employee/create-new-employee.component';
import { HomeEmployeeComponent } from './home-employee/home-employee.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'emp-tasks-assign/:uid', component: EmployeeTasksAssignComponent },
  { path: 'home-emp', component: HomeEmployeeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-new-employee', component: CreateNewEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
