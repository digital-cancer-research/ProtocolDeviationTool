import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { dvdecodData } from '../../models/team-pd-dvdecod-bar-graph-data.model';
import { Chart } from 'chart.js';
import { DataVisualisationService } from '../../data-visualisation.service';

@Component({
  selector: 'app-dvdecod-bar-graph',
  templateUrl: './dvdecod-bar-graph.component.html',
  styleUrl: './dvdecod-bar-graph.component.css'
})
export class DvdecodBarGraphComponent implements OnChanges {
  @Input() data: dvdecodData[] = [];
  @Input() isColourModeDefault: boolean = true;
  chart!: Chart;
  colours: string[] = this.dataVisualisation.dvdecodColours;

  constructor(private dataVisualisation: DataVisualisationService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data && this.data.length > 0) {
      this.createChart(this.data);
    }
  }

  private createChart(data: dvdecodData[]): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = data.map(dataEntry => dataEntry.dvdecod)
    const dataFormatted = data.map(dataEntry => dataEntry.count);
    let colours: string[] = [];
    if (this.isColourModeDefault) {
      colours = this.colours;
    } else {
      colours = data.map(dataEntry => dataEntry.backgroundColor)
    }
    console.log(colours);

    this.chart = new Chart('dvdecodGraph', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: dataFormatted,
          backgroundColor: colours
        }]
      },
      options: this.chartOptions,
    })
  }

  private get chartOptions(): any {
    const dvcat = this.data[0].dvcat;
    return {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Total number of PDs',
          },
        },
        x: {
          title: {
            display: true,
            text: 'DVDECOD',
          },
        },
      },
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: `Total number of PD coded terms (DVDECOD) for ${dvcat} at site`
        },

      }
    };
  }
}
