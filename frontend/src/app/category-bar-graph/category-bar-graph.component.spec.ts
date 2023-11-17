import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBarGraphComponent } from './category-bar-graph.component';

describe('CategoryBarGraphComponent', () => {
  let component: CategoryBarGraphComponent;
  let fixture: ComponentFixture<CategoryBarGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryBarGraphComponent]
    });
    fixture = TestBed.createComponent(CategoryBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
