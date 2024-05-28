import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBarGraphSegmentedComponent } from './category-bar-graph-segmented.component';

describe('CategoryBarGraphSegmentedComponent', () => {
  let component: CategoryBarGraphSegmentedComponent;
  let fixture: ComponentFixture<CategoryBarGraphSegmentedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryBarGraphSegmentedComponent]
    });
    fixture = TestBed.createComponent(CategoryBarGraphSegmentedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
