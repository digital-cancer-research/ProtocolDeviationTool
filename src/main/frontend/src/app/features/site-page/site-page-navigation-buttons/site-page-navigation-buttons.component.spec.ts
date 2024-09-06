import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitePageNavigationButtonsComponent } from './site-page-navigation-buttons.component';

describe('SitePageNavigationButtonsComponent', () => {
  let component: SitePageNavigationButtonsComponent;
  let fixture: ComponentFixture<SitePageNavigationButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SitePageNavigationButtonsComponent]
    });
    fixture = TestBed.createComponent(SitePageNavigationButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
