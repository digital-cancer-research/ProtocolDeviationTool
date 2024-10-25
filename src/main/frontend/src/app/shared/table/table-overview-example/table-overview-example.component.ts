import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'table-overview-example',
  styleUrl: 'table-overview-example.component.scss',
  templateUrl: 'table-overview-example.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatMenuModule],
  encapsulation: ViewEncapsulation.None
})
export class TableOverviewExample implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit', 'actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}

const mockData = [{"studyId":"1","dvspondes":"Cycle 9 CT scan was done 2 weeks out of the assessment window as there was suspicion of progression due to rapidly increasing PSA. Confirmed with CMO at SRC to do CT early.","dvcat":"ASSESSMENT OR TIME POINT COMPLETION","dvdecod":"OUT OF WINDOW - EFFICACY ASSESSMENT","dvterm":"Protocol deviation where the subject's efficacy assessment was conducted outside of the protocol-specified time window"},{"studyId":"Trial A","dvspondes":"C9 Bone Scan not done. C9 CT done early which showed progression. Patient was not known to have bone mets so site missed bone scan as patient to be withdrawn from study shortly after C9 visit-23Oct.","dvcat":"ASSESSMENT OR TIME POINT COMPLETION","dvdecod":"MISSED ASSESMENT - EFFICACY ASSESSMENT","dvterm":"Protocol deviation where the subject's EFFICACY ASSESSMENT was not performed"},{"studyId":"Trial A","dvspondes":"Incomplete PK profile. 10hr post dose and 24hr post dose time points were missed to reduce patient time in hospital during COVID-19 pandemic.","dvcat":"ASSESSMENT OR TIME POINT COMPLETION","dvdecod":"MISSED ASSESMENT - PK COLLECTION","dvterm":"Protocol deviation where the subject's PK collection assessment was not performed"},{"studyId":"Trial A","dvspondes":"Incomplete PK profile. 10hr post dose and 24hr post dose time points were missed to reduce patient time in hospital during COVID-19 pandemic.","dvcat":"ASSESSMENT OR TIME POINT COMPLETION","dvdecod":"MISSED ASSESMENT - PK COLLECTION","dvterm":"Protocol deviation where the subject's PK collection assessment was not performed"},{"studyId":"Trial A","dvspondes":"Due to long period of dosing interruption (AEs/SAE) patient visits and CT scans have deviated from the protocol study plan. CMO confirmed not to revert to C1D1 schedule. See File Note dated 08Dec2020.","dvcat":"ASSESSMENT OR TIME POINT COMPLETION","dvdecod":"OUT OF WINDOW - TREATMENT ADMINISTRATION","dvterm":"Protocol deviation where the subject was administered treatment outside of the protocol-specified time window"},{"studyId":"Trial A","dvspondes":"28-Day FU visit was conducted by telephone due to patient being unwell and fatigued and to minimise risk due to COVID-19 situation in UK.","dvcat":"VISIT COMPLETION","dvdecod":"MISSED VISIT/PHONE CONTACT","dvterm":"Protocol deviation where the subject's protocol-specified visit or phone contact was missed"},{"studyId":"Trial A","dvspondes":"Telephone visit (missed assessments) due to COVID 19 and associated risks of coming into clinic weekly","dvcat":"VISIT COMPLETION","dvdecod":"MISSED VISIT/PHONE CONTACT","dvterm":"Protocol deviation where the subject's protocol-specified visit or phone contact was missed"},{"studyId":"Trial A","dvspondes":"Patient incorrectly dosed on C2D14 (4d on/3d off schedule) should have been 'off day'. Study team and sponsor made aware on C2D15. Patient informed to dose D14, D15, D16 and D17 so no extra dose taken","dvcat":"ASSESSMENT OR TIME POINT COMPLETION","dvdecod":"OUT OF WINDOW - TREATMENT ADMINISTRATION","dvterm":"Protocol deviation where the subject was administered treatment outside of the protocol-specified time window"},{"studyId":"Trial A","dvspondes":"28-day FU visit was conducted via telephone due to COVID restrictions - subject unwilling to travel.","dvcat":"VISIT COMPLETION","dvdecod":"MISSED VISIT/PHONE CONTACT","dvterm":"Protocol deviation where the subject's protocol-specified visit or phone contact was missed"}]