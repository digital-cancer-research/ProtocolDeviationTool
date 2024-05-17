import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVisualisationDeviationsPageComponent } from './data-visualisation-deviations-page.component';

describe('DataVisualisationDeviationsPageComponent', () => {
  let component: DataVisualisationDeviationsPageComponent;
  let fixture: ComponentFixture<DataVisualisationDeviationsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataVisualisationDeviationsPageComponent]
    });
    fixture = TestBed.createComponent(DataVisualisationDeviationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
