import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyDataTableComponent } from './study-data-table.component';

describe('StudyDataTableComponent', () => {
  let component: StudyDataTableComponent;
  let fixture: ComponentFixture<StudyDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
