import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTeamDataSelectComponent } from './site-team-data-select.component';

describe('SiteTeamDataSelectComponent', () => {
  let component: SiteTeamDataSelectComponent;
  let fixture: ComponentFixture<SiteTeamDataSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteTeamDataSelectComponent]
    });
    fixture = TestBed.createComponent(SiteTeamDataSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
