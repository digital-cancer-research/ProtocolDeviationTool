import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitePageTeamSelectComponent } from './site-page-team-select.component';

describe('SitePageTeamSelectComponent', () => {
  let component: SitePageTeamSelectComponent;
  let fixture: ComponentFixture<SitePageTeamSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SitePageTeamSelectComponent]
    });
    fixture = TestBed.createComponent(SitePageTeamSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
