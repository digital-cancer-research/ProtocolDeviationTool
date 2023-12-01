import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPieGraphComponent } from './category-pie-graph.component';

describe('CategoryPieGraphComponent', () => {
  let component: CategoryPieGraphComponent;
  let fixture: ComponentFixture<CategoryPieGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryPieGraphComponent]
    });
    fixture = TestBed.createComponent(CategoryPieGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
