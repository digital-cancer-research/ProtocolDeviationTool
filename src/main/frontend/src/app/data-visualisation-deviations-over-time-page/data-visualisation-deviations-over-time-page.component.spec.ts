import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVisualisationDeviationsOverTimePageComponent } from './data-visualisation-deviations-over-time-page.component';

describe('DataVisualisationDeviationsOverTimePageComponent', () => {
  let component: DataVisualisationDeviationsOverTimePageComponent;
  let fixture: ComponentFixture<DataVisualisationDeviationsOverTimePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataVisualisationDeviationsOverTimePageComponent]
    });
    fixture = TestBed.createComponent(DataVisualisationDeviationsOverTimePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
