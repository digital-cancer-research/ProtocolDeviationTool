import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPdsComponent } from './total-pds.component';

describe('TotalPdsComponent', () => {
  let component: TotalPdsComponent;
  let fixture: ComponentFixture<TotalPdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalPdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalPdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
