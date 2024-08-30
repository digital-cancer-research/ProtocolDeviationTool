import { Component, Input } from '@angular/core';

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
  @Input() disabled: string = "false";
}
