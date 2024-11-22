import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamManagementEditDialogueComponent } from './team-management-edit-dialogue.component';

describe('TeamManagementEditDialogueComponent', () => {
  let component: TeamManagementEditDialogueComponent;
  let fixture: ComponentFixture<TeamManagementEditDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamManagementEditDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamManagementEditDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
