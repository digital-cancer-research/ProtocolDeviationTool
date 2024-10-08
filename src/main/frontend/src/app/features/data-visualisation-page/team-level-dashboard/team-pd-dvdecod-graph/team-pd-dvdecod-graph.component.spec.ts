import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPdDvdecodGraphComponent } from './team-pd-dvdecod-graph.component';

describe('TeamPdDvdecodGraphComponent', () => {
  let component: TeamPdDvdecodGraphComponent;
  let fixture: ComponentFixture<TeamPdDvdecodGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamPdDvdecodGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamPdDvdecodGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
