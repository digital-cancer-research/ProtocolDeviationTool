import { Component, Input } from '@angular/core';

/**
 * @class PageButtonComponent
 * This component is used for large buttons. @property disabled = false by default
 * @example <app-page-button
        link="/home"
        icon = "assets/my-icon.svg"
        alt = "This is a button to take you to the home page" 
        label ="Home"
        [disabled]="false">
      </app-page-button>
 */
@Component({
  selector: 'app-page-button',
  templateUrl: './page-button.component.html',
  styleUrls: ['./page-button.component.css']
})
export class PageButtonComponent {
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() alt: string = "";
  @Input() link: string = "";
  @Input() disabled: boolean = false;
}