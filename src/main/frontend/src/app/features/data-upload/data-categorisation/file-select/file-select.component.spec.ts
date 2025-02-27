import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSelectComponent } from './file-select.component';

describe('FileSelectComponent', () => {
  let component: FileSelectComponent;
  let fixture: ComponentFixture<FileSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
