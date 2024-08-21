import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTrailComponent } from './data-trail.component';

describe('DataTrailComponent', () => {
  let component: DataTrailComponent;
  let fixture: ComponentFixture<DataTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTrailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
