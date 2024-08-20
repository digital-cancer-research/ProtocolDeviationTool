import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUploadSummaryComponent } from './data-upload-summary.component';

describe('DataUploadSummaryComponent', () => {
  let component: DataUploadSummaryComponent;
  let fixture: ComponentFixture<DataUploadSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataUploadSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataUploadSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
