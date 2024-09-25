import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataVisualisationService } from '../../data-visualisation.service';
import { CategoryBarGraphData } from '../../models/category-bar-graph-data.model';
import { UserService } from 'src/app/core/services/user.service';
import { Team } from 'src/app/core/models/team.model';

@Component({
  selector: 'app-category-bar-graph',
  templateUrl: './category-bar-graph.component.html',
  styleUrl: './category-bar-graph.component.css'
})
export class CategoryBarGraphComponent implements OnInit {
  chart!: Chart;
  data: CategoryBarGraphData[] = [];
  team: Team | null = null;

  ngOnInit(): void {
    this.userService.currentUserSelectedTeam$.subscribe((team) => {
      if (team !== null) {
        this.team = team;
        this.dataVisualisationService.getCategoryBarGraphData$(team.teamId)
          .subscribe(data => {
            this.data = data;
            this.createChart();
          });
      }
    })
  }

  createChart(): Chart {
    if (this.chart) {
      this.chart.destroy();
    }

    return new Chart('categoryBarGraphCanvas', {
      type: 'bar',
      data: {
        labels: this.data.map(category => category.dvcat),
        datasets: [
          {
            label: 'DVCAT',
            data: this.data.map(category => category.count),
            borderWidth: 1,
            backgroundColor: this.data.map(category => category.colour)
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
          title: {
            display: true,
            text: `Total number of PDs per category (DVCAT) for ${this.team?.teamName ?? "team"}`,
          },
        }
      },
    });
  }

  constructor
    (
      private dataVisualisationService: DataVisualisationService,
      private userService: UserService
    ) { }
}