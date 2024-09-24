import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamStudyBarGraphComponent } from './team-study-bar-graph.component';

describe('TeamStudyBarGraphComponent', () => {
  let component: TeamStudyBarGraphComponent;
  let fixture: ComponentFixture<TeamStudyBarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamStudyBarGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamStudyBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
