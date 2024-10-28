import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamStudySelectComponent } from './team-study-select.component';

describe('TeamStudySelectComponent', () => {
  let component: TeamStudySelectComponent;
  let fixture: ComponentFixture<TeamStudySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamStudySelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamStudySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
