import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataVisualisationService } from '../../data-visualisation.service';

@Component({
  selector: 'app-category-bar-graph',
  templateUrl: './category-bar-graph.component.html',
  styleUrl: './category-bar-graph.component.css'
})
export class CategoryBarGraphComponent implements OnInit {
  chart: Chart;
  colours: string[] = [];

  ngOnInit(): void {
    this.dataVisualisationService.categoryColours$.subscribe((colours) => {
      this.colours = colours
      this.chart.destroy();
      this.chart = this.createChart()
    });

  }

  createChart(): Chart {
    return new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
            backgroundColor: this.colours
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        indexAxis: 'y',
      },
    });
  }

  constructor(private dataVisualisationService: DataVisualisationService) { 
    this.chart = this.createChart();
  }
}
