import { Component, HostBinding, inject, Input } from '@angular/core';
import { QueryParamsHandling } from '@angular/router';
import { Role } from 'src/app/core/new/services/models/user/role.enum';
import { UserService } from 'src/app/core/new/services/user.service';

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
  @Input() disabled?: boolean;
  @Input() disabledByDeactivatedUser?: boolean;
  @Input() MatIcon: string = "";
  @Input() queryParamsHandling: QueryParamsHandling = 'merge';

  private readonly userService = inject(UserService);

  isCurrentUserDeactivated: boolean = true;

  constructor() {
    this.checkIfUserIsDeactivated();
  }

  @HostBinding('class.disabled') get isDisabled() {
    return this.resolveDisabled();
  }

  checkIfUserIsDeactivated(): void {
    this.userService.currentUser$.subscribe(user => {
      if (user === null) {
        this.isCurrentUserDeactivated = false;
      } else {
        this.isCurrentUserDeactivated = (user.role === Role.DEACTIVATED);
      }
    });
  }

  resolveDisabled(): boolean {
    if (this.disabled) {
      if (this.disabledByDeactivatedUser) {
        return this.disabled || (this.disabled && this.isCurrentUserDeactivated)
      } else {
        return this.disabled;
      }
    } else {
      if (this.disabledByDeactivatedUser) {
        return this.isCurrentUserDeactivated;
      }
    }
    return false;
  }
}