import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import distinctColors from 'distinct-colors';
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
  colours: string[] = []

  constructor(
    private categoryPieGraphService: CategoryPieGraphService,
    private userService: UserService
  ) {
    userService.currentUserSelectedTeam$.subscribe(team => this.team = team);
    this.data = [];
  }

  ngOnInit(): void {
    this.categoryPieGraphService.getEntryCountPerStudy().subscribe((data) => {
      this.data = data;
      this.colours = distinctColors({
        count: data.length
      }).map(colour => colour.hex('rgba'));
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
          backgroundColor: this.colours,
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
            text: `Total number of PDs per study for ${this.team ? this.team.teamName : 'team'}`,
          },
        },
      },
    });
  }
}