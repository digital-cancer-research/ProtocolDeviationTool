import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementTableComponent } from './user-management-table.component';

describe('UserManagementTableComponent', () => {
  let component: UserManagementTableComponent;
  let fixture: ComponentFixture<UserManagementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
