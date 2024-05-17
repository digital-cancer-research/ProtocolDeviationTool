import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitePageComponent } from './site-page.component';

describe('SitePageComponent', () => {
  let component: SitePageComponent;
  let fixture: ComponentFixture<SiteSponsorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SitePageComponent]
    });
    fixture = TestBed.createComponent(SitePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
