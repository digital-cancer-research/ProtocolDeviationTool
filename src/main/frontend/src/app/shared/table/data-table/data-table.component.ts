import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { DataTableEntry } from 'src/app/core/models/data/data-table-entry.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['studyId', 'dvspondes', 'dvcat', 'dvdecod', 'actions'];
  // displayedColumns: string[] = ['studyId', 'dvspondes', 'dvcat', 'actions'];

  dvcats: string[] = ['FAILURE TO REPORT SAFETY EVENTS PER PROTOCOL',
    'ASSESSMENT OR TIME POINT COMPLETION',
    'ELIGIBILITY CRITERIA NOT MET',
    'WRONG STUDY TREATMENT/ADMINISTRATION/DOSE',
    'INFORMED CONSENT',
    'SITE LEVEL ERROR',
    'EXCLUDED MEDICATION, VACCINE OR DEVICE',
    'NOT WITHDRAWN AFTER DEVELOPING WITHDRAWAL CRITERIA',
    'VISIT COMPLETION',
    'STUDY PROCEDURE'];
  dvdecods: string[] = [
    "WRONG INFORMED CONSENT/ASSENT VERSION SIGNED",
    "MISSED ASSESMENT - EFFICACY ASSESSMENT",
    "OUT OF WINDOW - ECG",
    "EXPIRED STUDY TREATMENT ADMINISTERED",
    "STUDY TREATMENT NOT AVAILABLE AT SITE FOR ADMINISTRATION",
    "BIOLOGICAL SAMPLE SPECIMEN PROCEDURE",
    "OTHER",
    "INFORMED CONSENT/ASSENT NOT SIGNED AND/OR DATED BY SUBJECT (PARENT/LEGAL REPRESENTATIVE, IF APPLICABLE)",
    "MISSED ASSESMENT - ECG",
    "MISSED ASSESMENT - TREATMENT ADMINISTRATION",
    "STUDY BLINDING/UNBLINDING PROCEDURE",
    "AES OF SPECIAL INTEREST",
    "OTHER EXCLUDED MEDICATION, VACCINE OR DEVICE DEVIATION",
    "DEVICE, EXCLUDED BY THE PROTOCOL, WAS ADMINISTERED",
    "DIARY PROCEDURE",
    "OTHER DEVIATION OF NOT BEING WITHDRAWN AFTER DEVELOPING WITHDRAWAL CRITERIA",
    "WRONG STUDY TREATMENT OR ASSIGNMENT ADMINISTERED",
    "MISSED ASSESMENT - BLOODS CENTRAL",
    "OUT OF WINDOW - EFFICACY ASSESSMENT",
    "INFORMED CONSENT/ASSENT NOT SIGNED AND/OR DATED BY APPROPRIATE SITE STAFF",
    "INCOMPLETE ASSESSMENT",
    "MISSED VISIT/PHONE CONTACT",
    "OUT OF WINDOW - TREATMENT ADMINISTRATION",
    "STUDY TREATMENT NOT ADMINISTERED PER PROTOCOL",
    "ASSESSMENT NOT PROPERLY PERFORMED",
    "ERRORS IN SITE FILE COMPLETION",
    "STUDY TREATMENT ADMINISTERED WHILE CONTRAINDICATION",
    "OUT OF WINDOW - VITAL SIGNS",
    "VACCINE, EXCLUDED BY THE PROTOCOL, WAS ADMINISTERED",
    "OTHER DEVIATION FROM STUDY PROCEDURE",
    "ELIGIBILITY CRITERIA NOT MET",
    "MISSED ASSESMENT - PK COLLECTION",
    "OUT OF WINDOW - VISIT/PHONE CONTACT",
    "MISSED ASSESMENT - BLOODS LOCAL",
    "DISCONTINUED PARTICIPATION IN STUDY PROCEDURE",
    "OUT OF WINDOW - BLOODS LOCAL",
    "OUT OF WINDOW - BIOMARKER COLLECTION OR EXPLORATORY ASSESSMENT",
    "OTHER SITE LEVEL DOCUMENTATION ERRORS",
    "POST STUDY TREATMENT OBSERVATION NOT DONE",
    "MISSED ASSESMENT - BIOMARKER COLLECTION OR EXPLORATORY ASSESSMENT",
    "STUDY TREATMENT NOT PREPARED AS PER PROTOCOL (E.G. RECONSTITUTION)",
    "MEDICATION, EXCLUDED BY THE PROTOCOL, WAS ADMINISTERED",
    "USE OF STUDY TREATMENT IMPACTED BY TEMPERATURE EXCURSION - NOT REPORTED/APPROVED/DISAPPROVED FOR FURTHER USE",
    "DECLINED PARTICIPATION IN STUDY PROCEDURE",
    "NOT WITHDRAWN FROM STUDY",
    "OTHER DEVIATION RELATED TO WRONG STUDY TREATMENT/ADMINISTRATION/DOSE",
    "PREGNANCY",
    "LIVER FUNCTION ABNORMALITIES PER PROTOCOL",
    "ACTIVITY LEVEL ABOVE PROTOCOL SPECIFICATION",
    "NOT DISCONTINUED FROM STUDY TREATMENT",
    "MISSED ASSESSMENT - OTHER",
    "MISSED ASSESMENT - VITAL SIGNS",
    "OUT OF WINDOW - BLOODS CENTRAL",
    "OTHER INFORMED CONSENT/ASSENT DEVIATION",
    "SAE NOT REPORTED WITHIN THE EXPECTED TIME FRAME",
    "FAILURE TO CONFIRM CAUSALITY ASSESSMENT WITHIN THE EXPECTED TIME FRAME",
    "OTHER VISIT WINDOW DEVIATION",
    "ERRORS IN DOCUMENTATION FOR TRAINING",
    "ERRORS IN DELEGATION LOG COMPLETION",
    "RANDOMIZATION PROCEDURE (E.G. SUBJECT ASSIGNED TO WRONG STRATUM, SUBJECT RANDOMIZED OUT OF ORDER)",
    "INFORMED CONSENT/ASSENT NOT SIGNED PRIOR TO ANY STUDY PROCEDURE",
    "EQUIPMENT PROCEDURE",
    "OTHER ASSESSMENT OR TIME POINT WINDOW",
    "OUT OF WINDOW - OTHER",
    "NONCOMPLIANCE WITH STUDY PROCEDURE",
    "NON STUDY TREATMENT SUPPLY PROCEDURE",
    "OUT OF WINDOW - PK COLLECTION",
    "SIGNED INFORMED CONSENT/ASSENT NOT AVAILABLE ON SITE",
    "ASSESSMENT PERFORMED OUT OF ORDER"
  ];
  data: DataTableEntry[] = mockData;
  dataSource!: MatTableDataSource<DataTableEntry>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChildren('studyIdInput') studyIdInputFields!: QueryList<ElementRef>;
  @ViewChildren('dvspondesInput') dvspondesInputFields!: QueryList<ElementRef>;
  @ViewChildren('dvcatInput') dvcatInputFields!: QueryList<ElementRef>;
  @ViewChildren('dvdecodInput') dvdecodInputFields!: QueryList<ElementRef>;

  ngOnInit() {
    this.setUpFilters();
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  private setUpFilters(): void {
    this.data.forEach((row, index) => {

      this.dvcatControls[index] = new FormControl(row.dvcat);
      this.dvdecodControls[index] = new FormControl(row.dvdecod);

      this.filteredDvcatOptions$[index] = this.dvcatControls[index].valueChanges.pipe(
        startWith(''),
        map(value => this._filterDvcat(value || ''))
      );

      this.filteredDvdecodOptions$[index] = this.dvdecodControls[index].valueChanges.pipe(
        startWith(''),
        map(value => this._filterDvdecod(value || ''))
      );

    });
  }

  private _filterDvcat(value: string): string[] {
    const filterValue = value.trim().toLowerCase();
    return this.dvcats.filter(dvcat => dvcat.toLowerCase().includes(filterValue));
  }

  private _filterDvdecod(value: string): string[] {
    const filterValue = value.trim().toLowerCase();
    return this.dvdecods.filter(dvdecods => dvdecods.toLowerCase().includes(filterValue));
  }

  getDvcatControl(index: number): FormControl {
    return this.dvcatControls[index];
  }

  getDvdecodControl(index: number): FormControl {
    return this.dvdecodControls[index];
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
    const studyIdField: ElementRef<HTMLInputElement> = this.getStudyIdField(rowIndex);
    if (studyIdField) {
      studyIdField.nativeElement.focus();
    }
  }

  onConfirmAll() {
    this.data.forEach(entry => entry.isEdited = false);
  }

  onConfirm(entry: DataTableEntry, rowIndex: number) {
    const fieldValues = this.getRowElements(rowIndex)
      .map(field => field.nativeElement.value);

    const index = this.data.indexOf(entry);
    if (index !== -1) {
      this.data[index] = {
        ...entry,
        studyId: fieldValues[0],
        dvspondes: fieldValues[1],
        dvcat: fieldValues[2],
        dvdecod: fieldValues[3],
        isEdited: false
      };
      this.dataSource.data = this.data;
    }
  }


  onCancelAll() {
    this.data.forEach((entry, index) => {
      if (entry.isEdited === true) {
        this.onCancel(entry, index);
      }
    });
  }

  onCancel(entry: DataTableEntry, rowIndex: number) {
    const values = Object.values(entry);
    entry.isEdited = false;
    const fields = this.getRowElements(rowIndex)
      .map((field, index) => field.nativeElement.value = values[index + 1]);
  }

  onFieldChange(entry: DataTableEntry, rowIndex: number) {
    entry.isEdited = true;
  }

  onSort() {
    this.onCancelAll();
  }

  private changeEntry(entryId: number, rowIndex: number) {
    const newValues = this.getRowValues(rowIndex);
    const index = this.data
      .map(entry => entry.entryId)
      .indexOf(entryId);

    if (index !== -1) {
      this.data[index] = newValues;
      this.dataSource.data = this.data;
    }
  }

  private getRowValues(rowIndex: number) {
    const rowElements = this.getRowElements(rowIndex)
      .map(element => element.nativeElement.value);
    return {
      studyId: rowElements[0],
      dvspondes: rowElements[1],
      dvcat: rowElements[2],
      dvdecod: rowElements[3],
    } as DataTableEntry;
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

  dvcatControls: FormControl[] = [];

  filteredDvcatOptions$: Observable<string[]>[] = [];

  dvdecodControls: FormControl[] = [];

  filteredDvdecodOptions$: Observable<string[]>[] = [];


}

const mockData: DataTableEntry[] = [{ "entryId": 794, "studyId": "1", "dvspondes": "Cycle 9 CT scan was done 2 weeks out of the assessment window as there was suspicion of progression due to rapidly increasing PSA. Confirmed with CMO at SRC to do CT early.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "OUT OF WINDOW - EFFICACY ASSESSMENT", "dvterm": "Protocol deviation where the subject's efficacy assessment was conducted outside of the protocol-specified time window" }, { "entryId": 795, "studyId": "Trial A", "dvspondes": "C9 Bone Scan not done. C9 CT done early which showed progression. Patient was not known to have bone mets so site missed bone scan as patient to be withdrawn from study shortly after C9 visit-23Oct.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESMENT - EFFICACY ASSESSMENT", "dvterm": "Protocol deviation where the subject's EFFICACY ASSESSMENT was not performed" }, { "entryId": 796, "studyId": "Trial A", "dvspondes": "Incomplete PK profile. 10hr post dose and 24hr post dose time points were missed to reduce patient time in hospital during COVID-19 pandemic.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESMENT - PK COLLECTION", "dvterm": "Protocol deviation where the subject's PK collection assessment was not performed" }, { "entryId": 797, "studyId": "Trial A", "dvspondes": "Incomplete PK profile. 10hr post dose and 24hr post dose time points were missed to reduce patient time in hospital during COVID-19 pandemic.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESMENT - PK COLLECTION", "dvterm": "Protocol deviation where the subject's PK collection assessment was not performed" }, { "entryId": 798, "studyId": "Trial A", "dvspondes": "Due to long period of dosing interruption (AEs/SAE) patient visits and CT scans have deviated from the protocol study plan. CMO confirmed not to revert to C1D1 schedule. See File Note dated 08Dec2020.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "OUT OF WINDOW - TREATMENT ADMINISTRATION", "dvterm": "Protocol deviation where the subject was administered treatment outside of the protocol-specified time window" }, { "entryId": 799, "studyId": "Trial A", "dvspondes": "28-Day FU visit was conducted by telephone due to patient being unwell and fatigued and to minimise risk due to COVID-19 situation in UK.", "dvcat": "VISIT COMPLETION", "dvdecod": "MISSED VISIT/PHONE CONTACT", "dvterm": "Protocol deviation where the subject's protocol-specified visit or phone contact was missed" }, { "entryId": 800, "studyId": "Trial A", "dvspondes": "Telephone visit (missed assessments) due to COVID 19 and associated risks of coming into clinic weekly", "dvcat": "VISIT COMPLETION", "dvdecod": "MISSED VISIT/PHONE CONTACT", "dvterm": "Protocol deviation where the subject's protocol-specified visit or phone contact was missed" }, { "entryId": 801, "studyId": "Trial A", "dvspondes": "Patient incorrectly dosed on C2D14 (4d on/3d off schedule) should have been 'off day'. Study team and sponsor made aware on C2D15. Patient informed to dose D14, D15, D16 and D17 so no extra dose taken", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "OUT OF WINDOW - TREATMENT ADMINISTRATION", "dvterm": "Protocol deviation where the subject was administered treatment outside of the protocol-specified time window" }, { "entryId": 802, "studyId": "Trial A", "dvspondes": "28-day FU visit was conducted via telephone due to COVID restrictions - subject unwilling to travel.", "dvcat": "VISIT COMPLETION", "dvdecod": "MISSED VISIT/PHONE CONTACT", "dvterm": "Protocol deviation where the subject's protocol-specified visit or phone contact was missed" }, { "entryId": 1059, "studyId": "Categorised Study", "dvspondes": "Cycle 9 CT scan was done 2 weeks out of the assessment window as there was suspicion of progression due to rapidly increasing PSA. Confirmed with CMO at SRC to do CT early.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "OUT OF WINDOW - EFFICACY ASSESSMENT", "dvterm": "Protocol deviation where the subject's efficacy assessment was conducted outside of the protocol-specified time window" }, { "entryId": 1060, "studyId": "Categorised Study", "dvspondes": "C9 Bone Scan not done. C9 CT done early which showed progression. Patient was not known to have bone mets so site missed bone scan as patient to be withdrawn from study shortly after C9 visit-23Oct.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESMENT - EFFICACY ASSESSMENT", "dvterm": "Protocol deviation where the subject's EFFICACY ASSESSMENT was not performed" }, { "entryId": 1061, "studyId": "Categorised Study", "dvspondes": "Incomplete PK profile. 10hr post dose and 24hr post dose time points were missed to reduce patient time in hospital during COVID-19 pandemic.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESMENT - PK COLLECTION", "dvterm": "Protocol deviation where the subject's PK collection assessment was not performed" }, { "entryId": 1062, "studyId": "Categorised Study", "dvspondes": "Due to long period of dosing interruption (AEs/SAE) patient visits and CT scans have deviated from the protocol study plan. CMO confirmed not to revert to C1D1 schedule. See File Note dated 08Dec2020.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "OUT OF WINDOW - TREATMENT ADMINISTRATION", "dvterm": "Protocol deviation where the subject was administered treatment outside of the protocol-specified time window" }, { "entryId": 1063, "studyId": "Categorised Study", "dvspondes": "28-Day FU visit was conducted by telephone due to patient being unwell and fatigued and to minimise risk due to COVID-19 situation in UK.", "dvcat": "VISIT COMPLETION", "dvdecod": "MISSED VISIT/PHONE CONTACT", "dvterm": "Protocol deviation where the subject's protocol-specified visit or phone contact was missed" }, { "entryId": 1064, "studyId": "Categorised Study", "dvspondes": "Telephone visit (missed assessments) due to COVID 19 and associated risks of coming into clinic weekly", "dvcat": "VISIT COMPLETION", "dvdecod": "MISSED VISIT/PHONE CONTACT", "dvterm": "Protocol deviation where the subject's protocol-specified visit or phone contact was missed" }, { "entryId": 1065, "studyId": "Categorised Study", "dvspondes": "Patient incorrectly dosed on C2D14 (4d on/3d off schedule) should have been 'off day'. Study team and sponsor made aware on C2D15. Patient informed to dose D14, D15, D16 and D17 so no extra dose taken", "dvcat": "VISIT COMPLETION", "dvdecod": "MISSED VISIT/PHONE CONTACT", "dvterm": "Protocol deviation where the subject's protocol-specified visit or phone contact was missed" }, { "entryId": 1066, "studyId": "Categorised Study", "dvspondes": "28-day FU visit was conducted via telephone due to COVID restrictions - subject unwilling to travel.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "OUT OF WINDOW - TREATMENT ADMINISTRATION", "dvterm": "Protocol deviation where the subject was administered treatment outside of the protocol-specified time window" }, { "entryId": 1067, "studyId": "Uncategorised Study", "dvspondes": "Cycle 9 CT scan was done 2 weeks out of the assessment window as there was suspicion of progression due to rapidly increasing PSA. Confirmed with CMO at SRC to do CT early.", "dvcat": "WRONG STUDY TREATMENT/ADMINISTRATION/DOSE", "dvdecod": "STUDY TREATMENT NOT ADMINISTERED PER PROTOCOL", "dvterm": "Protocol Deviation where a subject was not administered study treatment per protocol requirements." }, { "entryId": 1068, "studyId": "Uncategorised Study", "dvspondes": "C9 Bone Scan not done. C9 CT done early which showed progression. Patient was not known to have bone mets so site missed bone scan as patient to be withdrawn from study shortly after C9 visit-23Oct.", "dvcat": "VISIT COMPLETION", "dvdecod": "OUT OF WINDOW - VISIT/PHONE CONTACT", "dvterm": "Protocol deviation where the subject's protocol-specified visit or phone contact was conducted outside of the time window specified in the protocol" }, { "entryId": 1069, "studyId": "Uncategorised Study", "dvspondes": "Incomplete PK profile. 10hr post dose and 24hr post dose time points were missed to reduce patient time in hospital during COVID-19 pandemic.", "dvcat": "VISIT COMPLETION", "dvdecod": "MISSED VISIT/PHONE CONTACT", "dvterm": "Protocol deviation where the subject's protocol-specified visit or phone contact was missed" }, { "entryId": 1070, "studyId": "Uncategorised Study", "dvspondes": "Due to long period of dosing interruption (AEs/SAE) patient visits and CT scans have deviated from the protocol study plan. CMO confirmed not to revert to C1D1 schedule. See File Note dated 08Dec2020.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESSMENT - OTHER", "dvterm": "Protocol deviation where the subject's protocol-specified study assessment was not performed" }, { "entryId": 1071, "studyId": "Uncategorised Study", "dvspondes": "28-Day FU visit was conducted by telephone due to patient being unwell and fatigued and to minimise risk due to COVID-19 situation in UK.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESSMENT - OTHER", "dvterm": "Protocol deviation where the subject's protocol-specified study assessment was not performed" }, { "entryId": 1072, "studyId": "Uncategorised Study", "dvspondes": "Telephone visit (missed assessments) due to COVID 19 and associated risks of coming into clinic weekly", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESSMENT - OTHER", "dvterm": "Protocol deviation where the subject's protocol-specified study assessment was not performed" }, { "entryId": 1073, "studyId": "Uncategorised Study", "dvspondes": "Patient incorrectly dosed on C2D14 (4d on/3d off schedule) should have been 'off day'. Study team and sponsor made aware on C2D15. Patient informed to dose D14, D15, D16 and D17 so no extra dose taken", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "ASSESSMENT NOT PROPERLY PERFORMED", "dvterm": "Protocol deviation where the subject's protocol-specified study assessment was not properly performed" }, { "entryId": 1074, "studyId": "Uncategorised Study", "dvspondes": "28-day FU visit was conducted via telephone due to COVID restrictions - subject unwilling to travel.", "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESSMENT - OTHER", "dvterm": "Protocol deviation where the subject's protocol-specified study assessment was not performed" }]
  .map(entry => {
    return {
      ...entry,
      isEdited: false
    }
  })