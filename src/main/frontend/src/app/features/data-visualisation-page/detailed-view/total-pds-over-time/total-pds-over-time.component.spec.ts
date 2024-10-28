import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPdsOverTimeComponent } from './total-pds-over-time.component';

describe('TotalPdsOverTimeComponent', () => {
  let component: TotalPdsOverTimeComponent;
  let fixture: ComponentFixture<TotalPdsOverTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalPdsOverTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalPdsOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
