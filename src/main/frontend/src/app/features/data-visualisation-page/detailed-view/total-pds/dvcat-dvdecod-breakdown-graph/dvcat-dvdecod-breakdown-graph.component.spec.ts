import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DvcatDvdecodBreakdownGraphComponent } from './dvcat-dvdecod-breakdown-graph.component';

describe('DvcatDvdecodBreakdownGraphComponent', () => {
  let component: DvcatDvdecodBreakdownGraphComponent;
  let fixture: ComponentFixture<DvcatDvdecodBreakdownGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DvcatDvdecodBreakdownGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DvcatDvdecodBreakdownGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
