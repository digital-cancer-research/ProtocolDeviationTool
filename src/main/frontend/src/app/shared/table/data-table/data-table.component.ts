import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataTableEntry } from 'src/app/core/models/data/data-table-entry.model';
import { DataTableService } from './data-table.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements OnInit, AfterViewInit {

  @Input() data: DataTableEntry[] = mockData;
  dataSource!: MatTableDataSource<DataTableEntry>;
  displayedColumns: string[] = ['studyId', 'dvspondes', 'dvcat', 'dvdecod', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChildren(DataTableService.studyIdCellIdentifier) studyIdInputFields!: QueryList<ElementRef>;
  @ViewChildren(DataTableService.dvspondesInputCellIdentifier) dvspondesInputFields!: QueryList<ElementRef>;
  @ViewChildren(DataTableService.dvcatInputCellIdentifier) dvcatInputFields!: QueryList<ElementRef>;
  @ViewChildren(DataTableService.dvdecodInputCellIdentifier) dvdecodInputFields!: QueryList<ElementRef>;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public get hasActiveEdits() {
    return !this.data.some(entry => entry.isEdited === true);
  }

  onEdit(entry: DataTableEntry, rowIndex: number) {
    entry.isEdited = true;

  }

  onConfirmAll() {
    this.data.forEach((entry) => {
      if (entry.isEdited === true) {
        this.onConfirm(entry);
      }
    });
  }

  onConfirm(entry: DataTableEntry) {
    entry.isEdited = false;
  }


  onCancelAll() {
    this.data.forEach((entry) => {
      if (entry.isEdited === true) {
        this.onCancel(entry);
      }
    });
  }

  onCancel(entry: DataTableEntry) {
    entry.isEdited = false;
  }

  private getRowElements(rowIndex: number) {
    return [
      this.getStudyIdField(rowIndex),
      this.getDvspondesField(rowIndex),
      this.getDvcatField(rowIndex),
      this.getDvdecodField(rowIndex),
    ]
  }

  private getStudyIdField(rowIndex: number): ElementRef<HTMLInputElement> {
    return this.studyIdInputFields.toArray()[rowIndex];
  }

  private getDvspondesField(rowIndex: number): ElementRef<HTMLInputElement> {
    return this.dvspondesInputFields.toArray()[rowIndex];
  }

  private getDvcatField(rowIndex: number): ElementRef<HTMLInputElement> {
    return this.dvcatInputFields.toArray()[rowIndex];
  }

  private getDvdecodField(rowIndex: number): ElementRef<HTMLInputElement> {
    return this.dvdecodInputFields.toArray()[rowIndex];
  }
}

const mockData: DataTableEntry[] = [{ "entryId": 794, "studyId": "1", "dvspondes": "Cycle 9 CT scan was done 2 weeks out of the assessment window as there was suspicion of progression due to rapidly increasing PSA. Confirmed with CMO at SRC to do CT early.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "OUT OF WINDOW - EFFICACY ASSESSMENT", "dvterm": "Protocol deviation where the subject's efficacy assessment was conducted outside of the protocol-specified time window" }, { "entryId": 795, "studyId": "Trial A", "dvspondes": "C9 Bone Scan not done. C9 CT done early which showed progression. Patient was not known to have bone mets so site missed bone scan as patient to be withdrawn from study shortly after C9 visit-23Oct.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESMENT - EFFICACY ASSESSMENT", "dvterm": "Protocol deviation where the subject's EFFICACY ASSESSMENT was not performed" }, { "entryId": 796, "studyId": "Trial A", "dvspondes": "Incomplete PK profile. 10hr post dose and 24hr post dose time points were missed to reduce patient time in hospital during COVID-19 pandemic.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESMENT - PK COLLECTION", "dvterm": "Protocol deviation where the subject's PK collection assessment was not performed" }, { "entryId": 797, "studyId": "Trial A", "dvspondes": "Incomplete PK profile. 10hr post dose and 24hr post dose time points were missed to reduce patient time in hospital during COVID-19 pandemic.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESMENT - PK COLLECTION", "dvterm": "Protocol deviation where the subject's PK collection assessment was not performed" }, { "entryId": 798, "studyId": "Trial A", "dvspondes": "Due to long period of dosing interruption (AEs/SAE) patient visits and CT scans have deviated from the protocol study plan. CMO confirmed not to revert to C1D1 schedule. See File Note dated 08Dec2020.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "OUT OF WINDOW - TREATMENT ADMINISTRATION", "dvterm": "Protocol deviation where the subject was administered treatment outside of the protocol-specified time window" }, { "entryId": 799, "studyId": "Trial A", "dvspondes": "28-Day FU visit was conducted by telephone due to patient being unwell and fatigued and to minimise risk due to COVID-19 situation in UK.", "dvcat": "VISIT COMPLETION", "dvdecod": "MISSED VISIT/PHONE CONTACT", "dvterm": "Protocol deviation where the subject's protocol-specified visit or phone contact was missed" }, { "entryId": 800, "studyId": "Trial A", "dvspondes": "Telephone visit (missed assessments) due to COVID 19 and associated risks of coming into clinic weekly", "dvcat": "VISIT COMPLETION", "dvdecod": "MISSED VISIT/PHONE CONTACT", "dvterm": "Protocol deviation where the subject's protocol-specified visit or phone contact was missed" }, { "entryId": 801, "studyId": "Trial A", "dvspondes": "Patient incorrectly dosed on C2D14 (4d on/3d off schedule) should have been 'off day'. Study team and sponsor made aware on C2D15. Patient informed to dose D14, D15, D16 and D17 so no extra dose taken", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "OUT OF WINDOW - TREATMENT ADMINISTRATION", "dvterm": "Protocol deviation where the subject was administered treatment outside of the protocol-specified time window" }, { "entryId": 802, "studyId": "Trial A", "dvspondes": "28-day FU visit was conducted via telephone due to COVID restrictions - subject unwilling to travel.", "dvcat": "VISIT COMPLETION", "dvdecod": "MISSED VISIT/PHONE CONTACT", "dvterm": "Protocol deviation where the subject's protocol-specified visit or phone contact was missed" }, { "entryId": 1059, "studyId": "Categorised Study", "dvspondes": "Cycle 9 CT scan was done 2 weeks out of the assessment window as there was suspicion of progression due to rapidly increasing PSA. Confirmed with CMO at SRC to do CT early.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "OUT OF WINDOW - EFFICACY ASSESSMENT", "dvterm": "Protocol deviation where the subject's efficacy assessment was conducted outside of the protocol-specified time window" }, { "entryId": 1060, "studyId": "Categorised Study", "dvspondes": "C9 Bone Scan not done. C9 CT done early which showed progression. Patient was not known to have bone mets so site missed bone scan as patient to be withdrawn from study shortly after C9 visit-23Oct.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESMENT - EFFICACY ASSESSMENT", "dvterm": "Protocol deviation where the subject's EFFICACY ASSESSMENT was not performed" }, { "entryId": 1061, "studyId": "Categorised Study", "dvspondes": "Incomplete PK profile. 10hr post dose and 24hr post dose time points were missed to reduce patient time in hospital during COVID-19 pandemic.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESMENT - PK COLLECTION", "dvterm": "Protocol deviation where the subject's PK collection assessment was not performed" }, { "entryId": 1062, "studyId": "Categorised Study", "dvspondes": "Due to long period of dosing interruption (AEs/SAE) patient visits and CT scans have deviated from the protocol study plan. CMO confirmed not to revert to C1D1 schedule. See File Note dated 08Dec2020.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "OUT OF WINDOW - TREATMENT ADMINISTRATION", "dvterm": "Protocol deviation where the subject was administered treatment outside of the protocol-specified time window" }, { "entryId": 1063, "studyId": "Categorised Study", "dvspondes": "28-Day FU visit was conducted by telephone due to patient being unwell and fatigued and to minimise risk due to COVID-19 situation in UK.", "dvcat": "VISIT COMPLETION", "dvdecod": "MISSED VISIT/PHONE CONTACT", "dvterm": "Protocol deviation where the subject's protocol-specified visit or phone contact was missed" }, { "entryId": 1064, "studyId": "Categorised Study", "dvspondes": "Telephone visit (missed assessments) due to COVID 19 and associated risks of coming into clinic weekly", "dvcat": "VISIT COMPLETION", "dvdecod": "MISSED VISIT/PHONE CONTACT", "dvterm": "Protocol deviation where the subject's protocol-specified visit or phone contact was missed" }, { "entryId": 1065, "studyId": "Categorised Study", "dvspondes": "Patient incorrectly dosed on C2D14 (4d on/3d off schedule) should have been 'off day'. Study team and sponsor made aware on C2D15. Patient informed to dose D14, D15, D16 and D17 so no extra dose taken", "dvcat": "VISIT COMPLETION", "dvdecod": "MISSED VISIT/PHONE CONTACT", "dvterm": "Protocol deviation where the subject's protocol-specified visit or phone contact was missed" }, { "entryId": 1066, "studyId": "Categorised Study", "dvspondes": "28-day FU visit was conducted via telephone due to COVID restrictions - subject unwilling to travel.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "OUT OF WINDOW - TREATMENT ADMINISTRATION", "dvterm": "Protocol deviation where the subject was administered treatment outside of the protocol-specified time window" }, { "entryId": 1067, "studyId": "Uncategorised Study", "dvspondes": "Cycle 9 CT scan was done 2 weeks out of the assessment window as there was suspicion of progression due to rapidly increasing PSA. Confirmed with CMO at SRC to do CT early.", "dvcat": "WRONG STUDY TREATMENT/ADMINISTRATION/DOSE", "dvdecod": "STUDY TREATMENT NOT ADMINISTERED PER PROTOCOL", "dvterm": "Protocol Deviation where a subject was not administered study treatment per protocol requirements." }, { "entryId": 1068, "studyId": "Uncategorised Study", "dvspondes": "C9 Bone Scan not done. C9 CT done early which showed progression. Patient was not known to have bone mets so site missed bone scan as patient to be withdrawn from study shortly after C9 visit-23Oct.", "dvcat": "VISIT COMPLETION", "dvdecod": "OUT OF WINDOW - VISIT/PHONE CONTACT", "dvterm": "Protocol deviation where the subject's protocol-specified visit or phone contact was conducted outside of the time window specified in the protocol" }, { "entryId": 1069, "studyId": "Uncategorised Study", "dvspondes": "Incomplete PK profile. 10hr post dose and 24hr post dose time points were missed to reduce patient time in hospital during COVID-19 pandemic.", "dvcat": "VISIT COMPLETION", "dvdecod": "MISSED VISIT/PHONE CONTACT", "dvterm": "Protocol deviation where the subject's protocol-specified visit or phone contact was missed" }, { "entryId": 1070, "studyId": "Uncategorised Study", "dvspondes": "Due to long period of dosing interruption (AEs/SAE) patient visits and CT scans have deviated from the protocol study plan. CMO confirmed not to revert to C1D1 schedule. See File Note dated 08Dec2020.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESSMENT - OTHER", "dvterm": "Protocol deviation where the subject's protocol-specified study assessment was not performed" }, { "entryId": 1071, "studyId": "Uncategorised Study", "dvspondes": "28-Day FU visit was conducted by telephone due to patient being unwell and fatigued and to minimise risk due to COVID-19 situation in UK.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESSMENT - OTHER", "dvterm": "Protocol deviation where the subject's protocol-specified study assessment was not performed" }, { "entryId": 1072, "studyId": "Uncategorised Study", "dvspondes": "Telephone visit (missed assessments) due to COVID 19 and associated risks of coming into clinic weekly", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESSMENT - OTHER", "dvterm": "Protocol deviation where the subject's protocol-specified study assessment was not performed" }, { "entryId": 1073, "studyId": "Uncategorised Study", "dvspondes": "Patient incorrectly dosed on C2D14 (4d on/3d off schedule) should have been 'off day'. Study team and sponsor made aware on C2D15. Patient informed to dose D14, D15, D16 and D17 so no extra dose taken", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "ASSESSMENT NOT PROPERLY PERFORMED", "dvterm": "Protocol deviation where the subject's protocol-specified study assessment was not properly performed" }, { "entryId": 1074, "studyId": "Uncategorised Study", "dvspondes": "28-day FU visit was conducted via telephone due to COVID restrictions - subject unwilling to travel.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESSMENT - OTHER", "dvterm": "Protocol deviation where the subject's protocol-specified study assessment was not performed" }]
  .map(entry => {
    return {
      ...entry,
      isEdited: false
    }
  })