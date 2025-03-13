import { Component, inject, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import distinctColors from 'distinct-colors';
import { mergeMap, Observable, of } from 'rxjs';
import { PieChartDataEntry } from '../../models/pie-chart-data-entry.model';
import { TeamService } from 'src/app/core/new/services/team.service';
import { DataVisualisationService } from '../../data-visualisation.service';

/**
 * Component for displaying a pie chart of PDs per study for a team.
 */
@Component({
  selector: 'app-team-pd-pie-chart',
  templateUrl: './team-pd-pie-chart.component.html',
  styleUrl: './team-pd-pie-chart.component.css'
})
export class TeamPdPieChartComponent implements OnInit {
  protected chart!: Chart<'pie', number[], string>;
  private readonly teamService = inject(TeamService);
  private readonly dataVisualisationService = inject(DataVisualisationService);
  private data: PieChartDataEntry[] = [];
  private colours: string[] = [];
  private teamName: string = "team";
  private data$: Observable<PieChartDataEntry[]> = this.teamService.currentTeam$.pipe(
    mergeMap((team) => {
      if (team !== null) {
        this.teamName = team.name;
        return this.dataVisualisationService.getPdsPerStudy$(team.id);
      } else {
        this.teamName = "team";
        return of([]);
      }
    })
  )

  /**
   * Initialises the component by subscribing to the data stream and setting up the chart.
   * This method is automatically called by Angular when the component is initialised.
   */
  ngOnInit(): void {
    this.data$.subscribe((data) => {
      this.data = data.reverse();
      this.colours = distinctColors({
        count: data.length
      }).map(colour => colour.hex('rgba')).reverse();
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
      labels: this.data.map(study => study.study),
      datasets: [
        {
          data: this.data.map(study => study.count),
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