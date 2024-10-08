import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLevelDashboardComponent } from './team-level-dashboard.component';

describe('TeamLevelDashboardComponent', () => {
  let component: TeamLevelDashboardComponent;
  let fixture: ComponentFixture<TeamLevelDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamLevelDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamLevelDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
