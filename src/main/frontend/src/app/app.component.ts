import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private router: Router,
    private userService: UserService
  ) {

    const navigationEnd$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    );
    combineLatest([navigationEnd$, userService.currentUser$])
      .subscribe(([event, currentUser]) => {
        event = event as NavigationEnd;
        if (event.url !== '' && event.url !== '/site' && currentUser?.roleId === 3) {
          this.router.navigateByUrl('');
        }
      })
  }
}
