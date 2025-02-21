import { Component, inject, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { mergeMap, Observable, of } from 'rxjs';
import { StudyBarGraphData } from '../../models/study-bar-graph-data.model';
import distinctColors from 'distinct-colors';
import { TeamService } from 'src/app/core/new/services/team.service';
import { DataVisualisationService } from '../../data-visualisation.service';

/**
 * Component for displaying a bar graph of PDs per DV category per study for a team.
 */
@Component({
  selector: 'app-team-study-bar-graph',
  templateUrl: './team-study-bar-graph.component.html',
  styleUrl: './team-study-bar-graph.component.css'
})
export class TeamStudyBarGraphComponent implements OnInit {
  private readonly teamService = inject(TeamService);
  private dataVisualisationService = inject(DataVisualisationService);
  data: StudyBarGraphData = {
    studies: [],
    data: []
  }
  teamName: string = "team";
  colours: string[] = [];
  chart!: Chart;
  private readonly API_REQUEST: Observable<StudyBarGraphData> = this.teamService.currentTeam$.pipe(
    mergeMap(team => {
      if (team != null) {
        this.teamName = team.name;
        return this.dataVisualisationService.getPdsPerDvcatPerStudy$(team.id);
      } else {
        return of({
          studies: [],
          data: []
        })
      }
    })
  );

  /**
   * Lifecycle hook that is called after Angular has initialised all data-bound properties.
   */
  ngOnInit(): void {
    this.API_REQUEST.subscribe(data => {
      this.data = data;
      this.colours = distinctColors({
        count: data.studies.length
      })
        .map(colour => colour.hex('rgba'))
        .reverse();
      this.chart = this.createChart();
    })
  }

  /**
   * Creates the bar chart for displaying the data.
   *
   * @return the created Chart instance
   */
  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    return new Chart('teamStudyBarGraphCanvas', {
      type: 'bar',
      data: {
        labels: this.data.studies,
        datasets: this.data.data.map(d => ({
          label: d.dvcat,
          data: d.count,
          backgroundColor: d.colour,
        }))
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            stacked: true,
            ticks: {
              autoSkip: false,
              color: this.colours
            },
            title: {
              display: true,
              text: 'Study ID',
            }
          },
          x: {
            stacked: true,
            title: {
              display: true,
              text: 'Total number of PDs per DVCAT',
            }
          },
        },
        indexAxis: 'y',
        plugins: {
          title: {
            display: true,
            text: `Total number of PDs per category (DVCAT) per study for ${this.teamName}`,
          },
        }
      },
    });
  }
}