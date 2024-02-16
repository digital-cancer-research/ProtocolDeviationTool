import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTeamDataSelectMultiteamComponent } from './site-team-data-select-multiteam.component';

describe('SiteTeamDataSelectMultiteamComponent', () => {
  let component: SiteTeamDataSelectMultiteamComponent;
  let fixture: ComponentFixture<SiteTeamDataSelectMultiteamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteTeamDataSelectMultiteamComponent]
    });
    fixture = TestBed.createComponent(SiteTeamDataSelectMultiteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
