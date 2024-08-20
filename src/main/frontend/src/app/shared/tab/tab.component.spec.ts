import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd } from '@angular/router';
import { TabComponent } from './tab.component';
import { Tab } from './tab';
import { of } from 'rxjs';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the first tab as active if the route does not match any tabs', () => {
    component.tabs = [
      new Tab('Tab 1', 'tab1'),
      new Tab('Tab 2', 'tab2')
    ];
    fixture.detectChanges();
    
    component.ngOnInit();
    
    expect(component.activeTab).toBe(component.tabs[0]);
  });
});
