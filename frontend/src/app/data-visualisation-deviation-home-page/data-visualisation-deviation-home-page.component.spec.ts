import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVisualisationDeviationHomePageComponent } from './data-visualisation-deviation-home-page.component';

describe('DataVisualisationDeviationHomePageComponent', () => {
  let component: DataVisualisationDeviationHomePageComponent;
  let fixture: ComponentFixture<DataVisualisationDeviationHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataVisualisationDeviationHomePageComponent]
    });
    fixture = TestBed.createComponent(DataVisualisationDeviationHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
