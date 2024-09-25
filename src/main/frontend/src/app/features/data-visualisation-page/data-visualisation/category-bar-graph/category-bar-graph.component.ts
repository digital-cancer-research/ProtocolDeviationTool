import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataVisualisationService } from '../../data-visualisation.service';
import { CategoryBarGraphData } from '../../models/category-bar-graph-data.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-category-bar-graph',
  templateUrl: './category-bar-graph.component.html',
  styleUrl: './category-bar-graph.component.css'
})
export class CategoryBarGraphComponent implements OnInit {
  chart!: Chart;
  data: CategoryBarGraphData[] = [];

  ngOnInit(): void {
    this.userService.currentUserSelectedTeam$.subscribe((team) => {
      if (team !== null) {
        this.dataVisualisationService.getCategoryBarGraphData$(team.teamId)
          .subscribe(data => {
            console.log(data);
            this.data = data
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
            text: 'Total number of PDs per category (DVCAT) for team',
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