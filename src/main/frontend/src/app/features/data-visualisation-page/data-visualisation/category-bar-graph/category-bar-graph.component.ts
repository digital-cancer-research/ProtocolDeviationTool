import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataVisualisationService } from '../../data-visualisation.service';
import { CategoryBarGraphService } from 'src/app/category-bar-graph/category-bar-graph.service';
import { EntryCountPerCategoryDTO } from 'src/app/category-bar-graph/category-bar-graph.model';

@Component({
  selector: 'app-category-bar-graph',
  templateUrl: './category-bar-graph.component.html',
  styleUrl: './category-bar-graph.component.css'
})
export class CategoryBarGraphComponent implements OnInit {
  chart!: Chart;
  colours: string[] = [];
  data$ = this.categoryBarGraphService.getEntryCountPerCategory().pipe();
  data: EntryCountPerCategoryDTO[] = [];

  ngOnInit(): void {
    this.chart = this.createChart()
  }

  createChart(): Chart {
    return new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.data.map(category => category.dvcat),
        datasets: [
          {
            label: 'DVCAT',
            data: this.data.map(category => category.entryCount),
            borderWidth: 1,
            backgroundColor: this.colours
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Total number of PDs per category',
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Category for Protocol Deviation'
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

  constructor(
    private dataVisualisationService: DataVisualisationService,
    private categoryBarGraphService: CategoryBarGraphService
  ) {
    this.data$.subscribe((data) => {
      this.data = data;
    })
    this.dataVisualisationService.categoryColours$.subscribe((colours) => {
      this.colours = colours
    });
  }
}
