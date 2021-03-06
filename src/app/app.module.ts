import { EmployeeTasksAssignComponent } from './employee-tasks-assign/employee-tasks-assign.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HomeEmployeeComponent } from './home-employee/home-employee.component';
import { CreateNewEmployeeComponent } from './create-new-employee/create-new-employee.component';
import { CreateNewTaskComponent } from './create-new-task/create-new-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { CreateNewNoteComponent } from './create-new-note/create-new-note.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    HomeEmployeeComponent,
    CreateNewEmployeeComponent,
    EmployeeTasksAssignComponent,
    CreateNewTaskComponent,
    ViewTaskComponent,
    CreateNewNoteComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
