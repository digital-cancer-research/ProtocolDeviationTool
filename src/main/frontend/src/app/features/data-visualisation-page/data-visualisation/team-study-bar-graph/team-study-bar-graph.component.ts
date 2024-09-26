import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { EntryCountPerCategoryPerStudyDTO } from 'src/app/category-bar-graph-segmented/category-bar-graph-segmented.model';
import { CategoryBarGraphSegmentedService } from 'src/app/category-bar-graph-segmented/category-bar-graph-segmented.service';

@Component({
  selector: 'app-team-study-bar-graph',
  templateUrl: './team-study-bar-graph.component.html',
  styleUrl: './team-study-bar-graph.component.css'
})
export class TeamStudyBarGraphComponent implements OnInit {
  data: EntryCountPerCategoryPerStudyDTO[] = [];
  transformedData: TransformedData[] = [];
  chart!: Chart;
  labels: string[] = [];
  constructor(
    private categoryBarGraphSegmentedService: CategoryBarGraphSegmentedService
  ) { }

  ngOnInit(): void {
    this.categoryBarGraphSegmentedService.getEntryCountPerCategoryPerStudy()
      .subscribe(data => {
        this.data = data;
        this.transformedData = this.formatData();
        this.chart = this.createChart();
      })
  }

  formatData() {
    return this.data.reduce((acc: TransformedData[], item) => {
      let existing = acc.find(obj => obj.label === item.dvcat);

      if (!existing) {
        existing = {
          label: item.dvcat,
          data: Array(this.labels.length).fill(0)
        };
        acc.push(existing);
      }

      const studyIndex = this.labels.indexOf(item.studyId);
      existing.data[studyIndex] = item.entryCount;

      return acc;
    }, [] as TransformedData[]);
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    this.labels = [...new Set(this.data.map(item => item.studyId))]
    this.transformedData = this.formatData();

    return new Chart('teamStudyBarGraphCanvas', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: this.transformedData
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            stacked: true,
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
            text: 'Total number of PDs per category (DVCAT) per study for team',
          },
        }
      },
    });
  }
}

interface TransformedData {
  label: string;
  data: number[];
}