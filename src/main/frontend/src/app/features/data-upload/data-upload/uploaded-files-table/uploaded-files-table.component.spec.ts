import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedFilesTableComponent } from './uploaded-files-table.component';

describe('UploadedFilesTableComponent', () => {
  let component: UploadedFilesTableComponent;
  let fixture: ComponentFixture<UploadedFilesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadedFilesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadedFilesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
