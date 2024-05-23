import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBarGraphSegmentedSiteComponent } from './category-bar-graph-segmented-site.component';

describe('CategoryBarGraphSegmentedSiteComponent', () => {
  let component: CategoryBarGraphSegmentedSiteComponent;
  let fixture: ComponentFixture<CategoryBarGraphSegmentedSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryBarGraphSegmentedSiteComponent]
    });
    fixture = TestBed.createComponent(CategoryBarGraphSegmentedSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
