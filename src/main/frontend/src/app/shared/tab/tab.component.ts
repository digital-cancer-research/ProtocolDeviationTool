import { Component, Input } from '@angular/core';
import { Tab } from './tab';
import { ActivatedRoute, NavigationEnd, NavigationExtras, QueryParamsHandling, Router } from '@angular/router';
import { filter } from 'rxjs';

/**
 * @class TabComponent
 * @description
 * A component that represents a set of tabs. The component highlights the active tab based on the current route. 
 * 1st tab is highlighted by default.
 *
 * Usage:
 * - Include a `<router-outlet>` element wherever you use this component to display the routed content.
 * - Pass an array of `Tab` objects to the `tabs` input to define the available tabs.
 *
 * @example
 * <app-tab [tabs]="myTabs"></app-tab>
 * <router-outlet></router-outlet>
 */
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent {
  @Input() tabs: Tab[] = [];
  @Input() queryParamsHandling: QueryParamsHandling = 'merge';
  activeTab: Tab = new Tab();
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * Sets activeTab based on URL when component is created.
   * Subscribes to the URL to keep activeTab updated during lifecycle.
   */
  ngOnInit() {
    this.updateActiveTab();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveTab();
      });
  }

  /**
   * Updates the activeTab based on the current route.
   * Finds the tab that matches the current route or defaults to the first tab if no match is found.
   * 
   * @private
   */
  private updateActiveTab() {
    const currentRoute = this.router.url
    .split('/').pop()
    ?.split('?').reverse().pop();
    this.activeTab = this.tabs.find((tab) => currentRoute == tab.link) || this.tabs[0];
  }

  /**
   * Handles navigation when clicking a tab 
   * @param tab Tab clicked
   */
  protected navigateToTab(tab: Tab) {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: this.queryParamsHandling, 
      relativeTo: this.route
    };
    this.router.navigate([tab.link], navigationExtras);
  }
}
