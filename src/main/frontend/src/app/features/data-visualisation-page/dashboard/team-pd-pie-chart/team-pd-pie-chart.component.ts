import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { EntryCountPerStudyDTO } from 'src/app/category-pie-graph/category-pie-graph.model';
import { CategoryPieGraphService } from 'src/app/category-pie-graph/category-pie-graph.service';
import { Team } from 'src/app/core/models/team.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-team-pd-pie-chart',
  templateUrl: './team-pd-pie-chart.component.html',
  styleUrl: './team-pd-pie-chart.component.css'
})
export class TeamPdPieChartComponent implements OnInit {
  chart!: Chart<'pie', number[], string>;
  data: EntryCountPerStudyDTO[] = [];
  team: Team | null = null;

  constructor(
    private categoryPieGraphService: CategoryPieGraphService,
    private userService: UserService
  ) { 
    userService.currentUserSelectedTeam$.subscribe(team => this.team = team);
  }

  ngOnInit(): void {
    this.categoryPieGraphService.getEntryCountPerStudy().subscribe((data) => {
      this.data = data;
      this.chart = this.createChart();
    });
  }

  createChart(): Chart<'pie', number[], string> {
    if (this.chart !== undefined) {
      this.chart.destroy();
    }

    const chartData = {
      labels: this.data.map(study => study.studyId),
      datasets: [
        {
          data: this.data.map(study => study.entryCount),
          hoverOffset: 4,
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
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
            text: `Total number of PDs per study for ${this.team? this.team.teamName : 'team'}`,
          },
        },
      },
    });
  }
}