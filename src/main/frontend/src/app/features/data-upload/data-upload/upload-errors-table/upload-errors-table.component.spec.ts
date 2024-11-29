import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadErrorsTableComponent } from './upload-errors-table.component';

describe('UploadErrorsTableComponent', () => {
  let component: UploadErrorsTableComponent;
  let fixture: ComponentFixture<UploadErrorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadErrorsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadErrorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
