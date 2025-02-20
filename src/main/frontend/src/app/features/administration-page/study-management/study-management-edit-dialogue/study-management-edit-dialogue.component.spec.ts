import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyManagementEditDialogueComponent } from './study-management-edit-dialogue.component';

describe('StudyManagementEditDialogueComponent', () => {
  let component: StudyManagementEditDialogueComponent;
  let fixture: ComponentFixture<StudyManagementEditDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyManagementEditDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyManagementEditDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
