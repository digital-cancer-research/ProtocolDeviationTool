import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPdPieChartComponent } from './team-pd-pie-chart.component';

describe('TeamPdPieChartComponent', () => {
  let component: TeamPdPieChartComponent;
  let fixture: ComponentFixture<TeamPdPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamPdPieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamPdPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
