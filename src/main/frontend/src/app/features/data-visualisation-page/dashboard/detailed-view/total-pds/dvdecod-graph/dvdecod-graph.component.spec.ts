import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DvdecodGraphComponent } from './dvdecod-graph.component';

describe('DvdecodGraphComponent', () => {
  let component: DvdecodGraphComponent;
  let fixture: ComponentFixture<DvdecodGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DvdecodGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DvdecodGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
