import { Component, inject, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataVisualisationService } from '../../data-visualisation.service';
import { CategoryBarGraphData } from '../../models/category-bar-graph-data.model';
import { Team } from 'src/app/core/new/services/models/team/team.model';
import { TeamService } from 'src/app/core/new/services/team.service';

/**
 * Component for displaying a bar graph of PDs per DV category for a team.
 */
@Component({
  selector: 'app-category-bar-graph',
  templateUrl: './category-bar-graph.component.html',
  styleUrl: './category-bar-graph.component.css'
})
export class CategoryBarGraphComponent implements OnInit {
  private readonly dataVisualisationService = inject(DataVisualisationService);
  private readonly teamService = inject(TeamService);
  protected chart!: Chart;
  protected data: CategoryBarGraphData[] = [];
  protected team: Team | null = null;

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   */
  ngOnInit(): void {
    this.teamService.currentTeam$.subscribe((team) => {
      if (team !== null) {
        this.team = team;
        this.dataVisualisationService.getPdsPerDvcat$(team.id)
          .subscribe(data => {
            this.createChart(data);
          });
      }
    })
  }

  /**
   * Creates the bar chart for displaying the data.
   *
   * @param data the data to display in the chart
   * @return the created Chart instance
   */
  createChart(data: CategoryBarGraphData[]): Chart {
    if (this.chart) {
      this.chart.destroy();
    }

    return new Chart('categoryBarGraphCanvas', {
      type: 'bar',
      data: {
        labels: data.map(category => category.dvcat),
        datasets: [
          {
            label: 'DVCAT',
            data: data.map(category => category.count),
            borderWidth: 1,
            backgroundColor: data.map(category => category.colour)
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Category for Protocol Deviation',
            },
            ticks: {
              autoSkip: false
            }
          },
          x: {
            title: {
              display: true,
              text: 'Total number of PDs per category',
            }
          },
        },
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: `Total number of PDs per category (DVCAT) for ${this.team?.name ?? "team"}`,
          },
        }
      },
    });
  }
}