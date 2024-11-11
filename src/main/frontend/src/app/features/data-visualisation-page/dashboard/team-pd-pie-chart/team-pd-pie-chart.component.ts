import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import distinctColors from 'distinct-colors';
import { Team } from 'src/app/core/models/team.model';
import { UserService } from 'src/app/core/services/user.service';
import { PieChartService } from './pie-chart.service';
import { mergeMap, Observable, of } from 'rxjs';
import { PieChartDataEntry } from '../../models/pie-chart-data-entry.model';

@Component({
  selector: 'app-team-pd-pie-chart',
  templateUrl: './team-pd-pie-chart.component.html',
  styleUrl: './team-pd-pie-chart.component.css'
})
export class TeamPdPieChartComponent implements OnInit {
  protected chart!: Chart<'pie', number[], string>;
  private data: PieChartDataEntry[] = [];
  private team: Team | null = null;
  private colours: string[] = [];
  private teamName: string = "team";
  private data$: Observable<PieChartDataEntry[]> = this.userService.currentUserSelectedTeam$.pipe(
    mergeMap((team) => {
      if (team !== null) {
        this.teamName = team.teamName;
        return this.pieChartService.getCountPerStudiesByTeam$(team.teamId);
      } else {
        this.teamName = "team";
        return of([]);
      }
    })
  )

  constructor(
    private pieChartService: PieChartService,
    private userService: UserService
  ) { }

  /**
   * Initialises the component by subscribing to the data stream and setting up the chart.
   * This method is automatically called by Angular when the component is initialised.
   * 
   * It performs the following actions:
   * 1. Subscribes to the data$ Observable.
   * 2. Updates the component's data property with the received data.
   * 3. Generates distinct colors based on the number of data entries.
   * 4. Creates and assigns a new chart using the createChart method.
   */
  ngOnInit(): void {
    this.data$.subscribe((data) => {
      this.data = data;
      this.colours = distinctColors({
        count: data.length
      }).map(colour => colour.hex('rgba'));
      this.chart = this.createChart();
    });
  }


  /**
   * Creates and returns a new pie chart using Chart.js.
   * If a chart already exists, it destroys the old one before creating a new one.
   * The chart displays the total number of PDs per study for the selected team.
   * 
   * @returns {Chart<'pie', number[], string>} A new Chart.js pie chart instance.
   */
  createChart(): Chart<'pie', number[], string> {
    if (this.chart !== undefined) {
      this.chart.destroy();
    }

    const chartData = {
      labels: this.data.map(study => study.studyId),
      datasets: [
        {
          data: this.data.map(study => study.entryCount),
          hoverOffset: 4,
          backgroundColor: this.colours,
        },
      ],
    };

    return new Chart('pieCanvas', {
      type: 'pie',
      data: chartData,
      options: {
        plugins: {
          title: {
            display: true,
            text: `Total number of PDs per study for ${this.teamName}`,
          },
        },
      },
    });
  }

}