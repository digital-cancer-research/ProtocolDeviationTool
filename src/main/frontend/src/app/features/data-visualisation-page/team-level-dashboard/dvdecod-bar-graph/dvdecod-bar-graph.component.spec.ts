import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DvdecodBarGraphComponent } from './dvdecod-bar-graph.component';

describe('DvdecodBarGraphComponent', () => {
  let component: DvdecodBarGraphComponent;
  let fixture: ComponentFixture<DvdecodBarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DvdecodBarGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DvdecodBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
