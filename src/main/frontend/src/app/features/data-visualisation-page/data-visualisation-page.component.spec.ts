import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVisualisationPageComponent } from './data-visualisation-page.component';

describe('DataVisualisationPageComponent', () => {
  let component: DataVisualisationPageComponent;
  let fixture: ComponentFixture<DataVisualisationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataVisualisationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataVisualisationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
