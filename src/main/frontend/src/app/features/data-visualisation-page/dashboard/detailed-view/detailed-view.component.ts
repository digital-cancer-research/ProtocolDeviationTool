import { Component } from '@angular/core';
import { Tab } from 'src/app/shared/tab/tab';
import { TotalPdsComponent } from './total-pds/total-pds.component';
import { TotalPdsOverTimeComponent } from './total-pds-over-time/total-pds-over-time.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrl: './detailed-view.component.css'
})
export class DetailedViewComponent {
  private static _URL: string = "detailed-view";
  private static _studyId?: string;
  protected tabs: Tab[] = [
    {
      label: "Total Protocol Deviations",
      link: TotalPdsComponent.URL
    },
    {
      label: "Total Protocol Deviations Over Time",
      link: TotalPdsOverTimeComponent.URL
    }
  ]

  constructor(route: ActivatedRoute) {
    route.queryParams.subscribe(params => {
      DetailedViewComponent._studyId = params['studyId'];
    })
  }

  public static get URL() {
    return this._URL
  }

  public static get studyId() {
    return this._studyId;
  }
}