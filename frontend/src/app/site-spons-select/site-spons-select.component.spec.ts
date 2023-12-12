import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSponsSelectComponent } from './site-spons-select.component';

describe('SiteSponsSelectComponent', () => {
  let component: SiteSponsSelectComponent;
  let fixture: ComponentFixture<SiteSponsSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteSponsSelectComponent]
    });
    fixture = TestBed.createComponent(SiteSponsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
