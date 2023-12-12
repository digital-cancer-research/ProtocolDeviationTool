import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationRibbonComponent } from './navigation-ribbon.component';

describe('NavigationRibbonComponent', () => {
  let component: NavigationRibbonComponent;
  let fixture: ComponentFixture<NavigationRibbonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationRibbonComponent]
    });
    fixture = TestBed.createComponent(NavigationRibbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
