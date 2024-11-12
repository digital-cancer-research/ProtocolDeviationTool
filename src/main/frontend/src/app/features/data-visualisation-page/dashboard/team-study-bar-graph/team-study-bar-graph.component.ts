import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { StudyBarGraphService } from './study-bar-graph.service';
import { UserService } from 'src/app/core/services/user.service';
import { mergeMap, Observable, of } from 'rxjs';
import { StudyBarGraphData } from '../../models/study-bar-graph-data.model';

@Component({
  selector: 'app-team-study-bar-graph',
  templateUrl: './team-study-bar-graph.component.html',
  styleUrl: './team-study-bar-graph.component.css'
})
export class TeamStudyBarGraphComponent implements OnInit {
  data: StudyBarGraphData = {
    studies: [],
    data: []
  }
  colours: string[] = [];
  chart!: Chart;
  private readonly API_REQUEST: Observable<StudyBarGraphData> = this.userService.currentUserSelectedTeam$.pipe(
    mergeMap(team => {
      if (team != null) {
        return this.studyBarGraphService.getStudyBarGraphDataByTeam$(team.teamId);
      } else {
        return of({
          studies: [],
          data: []
        })
      }
    })
  );

  constructor(
    private studyBarGraphService: StudyBarGraphService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.API_REQUEST.subscribe(data => {
      this.data = data;
      this.chart = this.createChart();
    })
  }

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
            text: 'Total number of PDs per category (DVCAT) per study for team',
          },
        }
      },
    });
  }
}