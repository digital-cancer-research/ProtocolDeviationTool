import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementEditDialogueComponent } from './user-management-edit-dialogue.component';

describe('UserManagementEditDialogueComponent', () => {
  let component: UserManagementEditDialogueComponent;
  let fixture: ComponentFixture<UserManagementEditDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementEditDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementEditDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
