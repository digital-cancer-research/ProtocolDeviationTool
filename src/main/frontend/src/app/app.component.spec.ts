import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { Router } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';
import { SitePageComponent } from './features/site-page/site-page.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [Router]
    }).compileComponents();

    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeDefined();
  });

  it(`should have as title 'frontend'`, () => {
    expect(component.title).toEqual('frontend');
  });
  
  it('should correctly display the footer', () => {
    testFooterVisibility();
  });
  
  it('should correctly display the footer with query params', () => {
    testFooterVisibility('?testParam=foo');
  });
  
  const testFooterVisibility = (queryParam: string = '') => {
    const truthyUrls = [`/${HomePageComponent.URL}`, `/${SitePageComponent.URL}`];
    const falsyUrls = router.config
      .map(route => route.path)
      .filter(path => path && !truthyUrls.includes('/' + path))
      .map(path => '/' + path);
  
    const testUrls = (urls: string[], expectedVisibility: boolean) => {
      urls.forEach(route => {
        expect(component.shouldFooterBeVisible(route + queryParam))
          .withContext(`The footer should ${expectedVisibility ? '' : 'not '}display for ${route + queryParam}`)
          .toBe(expectedVisibility);
      });
    };
  
    testUrls(truthyUrls, true);
    testUrls(falsyUrls, false);
  };

});
