import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-ribbon',
  templateUrl: './navigation-ribbon.component.html',
  styleUrls: ['./navigation-ribbon.component.css']
})
export class NavigationRibbonComponent {
  @Input() buttons: { label: string, route: string }[] = [];
}
