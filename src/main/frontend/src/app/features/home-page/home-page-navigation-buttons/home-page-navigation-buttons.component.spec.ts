import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageNavigationButtonsComponent } from './home-page-navigation-buttons.component';

describe('HomePageNavigationButtonsComponent', () => {
  let component: HomePageNavigationButtonsComponent;
  let fixture: ComponentFixture<HomePageNavigationButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageNavigationButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageNavigationButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
