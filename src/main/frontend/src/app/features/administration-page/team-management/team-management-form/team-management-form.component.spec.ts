import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamManagementFormComponent } from './team-management-form.component';

describe('TeamManagementFormComponent', () => {
  let component: TeamManagementFormComponent;
  let fixture: ComponentFixture<TeamManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamManagementFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
