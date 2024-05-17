import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteStudyLevelSelectComponent } from './site-study-level-select.component';

describe('SiteStudyLevelSelectComponent', () => {
  let component: SiteStudyLevelSelectComponent;
  let fixture: ComponentFixture<SiteStudyLevelSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteStudyLevelSelectComponent]
    });
    fixture = TestBed.createComponent(SiteStudyLevelSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
