import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTasksAssignComponent } from './employee-tasks-assign.component';

describe('EmployeeTasksAssignComponent', () => {
  let component: EmployeeTasksAssignComponent;
  let fixture: ComponentFixture<EmployeeTasksAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTasksAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTasksAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
