import { CreateNewNoteComponent } from './create-new-note/create-new-note.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { AuthGuard } from './services/auth.guard';
import { CreateNewTaskComponent } from './create-new-task/create-new-task.component';
import { EmployeeTasksAssignComponent } from './employee-tasks-assign/employee-tasks-assign.component';
import { CreateNewEmployeeComponent } from './create-new-employee/create-new-employee.component';
import { HomeEmployeeComponent } from './home-employee/home-employee.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'emp-tasks-assign/:uid',
    component: EmployeeTasksAssignComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-new-task/:uid',
    component: CreateNewTaskComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view-task/:taskId',
    component: ViewTaskComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-new-note/:taskId',
    component: CreateNewNoteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home-emp',
    component: HomeEmployeeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'create-new-employee',
    component: CreateNewEmployeeComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
