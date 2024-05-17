import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSponsorPageComponent } from './site-sponsor-page.component';

describe('SiteSponsorPageComponent', () => {
  let component: SiteSponsorPageComponent;
  let fixture: ComponentFixture<SiteSponsorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteSponsorPageComponent]
    });
    fixture = TestBed.createComponent(SiteSponsorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
