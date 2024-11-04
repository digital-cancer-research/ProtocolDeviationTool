import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Team } from '../../../core/models/team.model';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Component for selecting a team on the site page.
 *
 * The `SitePageTeamSelectComponent` allows users to select a team from a provided list of teams.
 * It listens for changes in the currently selected team and updates the selection accordingly.
 * Users can also manually set the selected team, and the selected team is synchronized with the `UserService`.
 * 
 * @export
 * @class SitePageTeamSelectComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-site-page-team-select',
  templateUrl: './site-page-team-select.component.html',
  styleUrls: ['./site-page-team-select.component.css']
})
export class SitePageTeamSelectComponent implements OnInit, OnDestroy {
  /**
   * List of teams available for selection.
   * 
   * @type {Team[]}
   * @memberof SitePageTeamSelectComponent
   */
  @Input() teams: Team[] = [];
  selectedTeam: Team | null = null;

  /**
     * Subscription to listen for changes to the currently selected team.
     * @type {Subscription}
     */
  selectedTeamSubscription!: Subscription;

  /**
   * Creates an instance of SitePageTeamSelectComponent.
   * @param {UserService} userService Service to handle user-related data.
   */
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * Initialises the component by subscribing to the currently selected team.
   */
  ngOnInit(): void {
    this.selectedTeamSubscription = this.userService.currentUserSelectedTeam$.subscribe((team) => {
      this.selectedTeam = team;
    });
    this.selectedTeamSubscription.unsubscribe();
  }

  /**
   * Unsubscribes from any subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    if (this.selectedTeamSubscription) {
      this.selectedTeamSubscription.unsubscribe();
    }
  }

  /**
   * Sets the selected team and notifies the `UserService` of the new selection.
   * 
   * @param {(Team | null)} team The team to set as selected.
   */
  setTeam(team: Team | null): void {
    if (team) {
      this.userService.currentUserSelectedTeamSubject.next(team);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {teamId: team.teamId},
        queryParamsHandling: 'merge'
      })
    }
  }
}