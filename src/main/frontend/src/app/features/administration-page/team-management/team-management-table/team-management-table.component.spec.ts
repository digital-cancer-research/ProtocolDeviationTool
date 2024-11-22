import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamManagementTableComponent } from './team-management-table.component';

describe('TeamManagementTableComponent', () => {
  let component: TeamManagementTableComponent;
  let fixture: ComponentFixture<TeamManagementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamManagementTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
