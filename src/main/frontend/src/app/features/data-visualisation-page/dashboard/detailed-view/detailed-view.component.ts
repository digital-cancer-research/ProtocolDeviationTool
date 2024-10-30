import { Component } from '@angular/core';
import { Tab } from 'src/app/shared/tab/tab';
import { TotalPdsComponent } from './total-pds/total-pds.component';
import { TotalPdsOverTimeComponent } from './total-pds-over-time/total-pds-over-time.component';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrl: './detailed-view.component.css'
})
export class DetailedViewComponent {
  public static readonly URL = "detailed-view";
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
}