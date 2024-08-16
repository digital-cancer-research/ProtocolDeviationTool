import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUploadTabComponent } from './data-upload-tab.component';

describe('DataUploadTabComponent', () => {
  let component: DataUploadTabComponent;
  let fixture: ComponentFixture<DataUploadTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataUploadTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataUploadTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
