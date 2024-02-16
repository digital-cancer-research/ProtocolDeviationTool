import { Component, Input } from '@angular/core';
import { UserService } from '../user/user.service';
import { AuthService } from '../user/auth.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-site-team-data-select',
  templateUrl: './site-team-data-select.component.html',
  styleUrls: ['./site-team-data-select.component.css']
})
export class SiteTeamDataSelectComponent {
	@Input() team: any;
}
