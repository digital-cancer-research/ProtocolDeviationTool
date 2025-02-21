import { AfterViewInit, Component, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataTableEntry } from 'src/app/core/models/data/data-table-entry.model';
import { DataTableService } from './data-table.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDataDialogueComponent } from '../edit-data/edit-data-dialogue.component';
import { EditDataModel, EditType } from '../models/edit-data-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SentenceCasePipe } from '../../pipes/sentence-case.pipe';
import { UserService } from 'src/app/core/new/services/user.service';
import { DataUpdate } from 'src/app/core/models/data/data-update.model';

/**
 * DataTableComponent handles displaying a table of data entries with features such as
 * sorting, filtering, pagination, and editing entries via dialogs.
 */
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent implements AfterViewInit, OnChanges {

  private _snackBar = inject(MatSnackBar);
  private readonly userService = inject(UserService);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  /** Dialog service for handling data entry edits. */
  readonly editDialog = inject(MatDialog);

  /** Input data entries fetched for the table from the database. */
  @Input() fetchedData: DataTableEntry[] = [];

  @Input() fetchData: Observable<DataTableEntry[]> = new Observable();

  /** Table data entries (cloned from fetchedData) representing real-time edits. */
  tableData: DataTableEntry[] = [];

  /** Data source for MatTable, used to handle filtering and sorting. */
  dataSource!: MatTableDataSource<DataTableEntry>;

  /** Columns displayed in the table. */
  displayedColumns: string[] = ['studyId', 'dvspondes', 'dvcat', 'dvdecod', 'actions'];

  /** Paginator for the data table. */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /** Sort feature for the data table. */
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataTableService: DataTableService) { }

  /**
   * Initialises the table data and data source.
  */
  ngAfterViewInit() {
    this.updateData(this.fetchedData);
  }

  /**
   * Updates the data if the data has been changed.
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.fetchedData) {
      this.updateData(this.fetchedData);
    }
  }

  updateData(data: DataTableEntry[]) {
    this.fetchedData = data;
    this.tableData = structuredClone(data);
    this.dataSource = new MatTableDataSource(this.tableData);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 100);
  }

  /**
   * Opens the dialog for editing a data entry.
   * @param enterAnimationDuration - Duration of the enter animation for the dialog.
   * @param exitAnimationDuration - Duration of the exit animation for the dialog.
   * @param entry - The data entry being edited.
   */
  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string, entry: DataTableEntry): void {
    this.editDialog.open(EditDataDialogueComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        entry: entry
      }
    })
      .afterClosed()
      .subscribe((editedData: EditDataModel) => {
        this.handleEdit(editedData, entry);
      });
  }

  /**
   * Applies a filter to the table based on user input.
   * @param event - The event triggered by the filter input field.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Returns a boolean indicating whether there are any active edits.
   * @returns true if no entry has active edits, false otherwise.
   */
  public get hasActiveEdits(): boolean {
    return !this.tableData.some(entry => entry.isEdited === true);
  }

  /**
   * Handles refresh event.
   * Fetches data from the database and 
   * sets appropriate variables as a result.
   */
  onRefresh() {
    this.fetchData.subscribe(
      {
        next: (data) => {
          this.updateData(data);
        },
        error: (error) => {
          this.openSnackBar("There was an error when trying to fetch the data", error.message);
        }
      }
    );
  }

  /**
   * Confirms all edited entries in the table.
   */
  onConfirmAll() {
    this.tableData.forEach((entry) => {
      if (entry.isEdited === true) {
        this.onConfirm(entry);
      }
    });
  }

  /**
   * Confirms a specific data entry.
   * Makes an api request to update the entry and 
   * displays status of request in snackbar.
   * @param entry - The data entry to confirm.
   */
  onConfirm(entry: DataTableEntry) {
    this.userService.currentUser$.subscribe(user => {
      if (user !== null) {
        const updateData: DataUpdate = {
          ...entry,
          adminId: user.id
        }
        this.dataTableService.updateEntry$(updateData).subscribe(
          {
            complete: () => {
              entry.isEdited = false;
              const index = this.fetchedData
                .map(entry => entry.id)
                .indexOf(entry.id);
              this.fetchedData[index] = entry;
              this.openSnackBar("Data successfully updated", "");
            },
            error: (error) => {
              console.error(error);
              this.openSnackBar("There was an error updating the data.", error.message);
            }
          }
        )
      } else {
        this.openSnackBar("You must be signed in to edit entries.", "dismiss");
      }
    })
  }

  /**
   * Cancels all active edits in the table.
   */
  onCancelAll() {
    this.tableData.forEach((entry) => {
      if (entry.isEdited === true) {
        this.onCancel(entry);
      }
    });
  }

  /**
   * Cancels an active edit on a specific data entry, reverting it to its original state.
   * @param entry - The data entry to cancel editing.
   */
  onCancel(entry: DataTableEntry) {
    const index = this.tableData.indexOf(entry);
    const oldData = this.fetchedData[index];
    oldData.isEdited = false;
    this.tableData[index] = oldData;
    this.dataSource.data = this.tableData;
  }

  /**
   * Marks a data entry as being edited and opens the edit dialog.
   * @param entry - The data entry to edit.
   */
  onEdit(entry: DataTableEntry) {
    entry.isEdited = true;
    this.openEditDialog('1000', '1000', entry);
  }

  /**
   * Handles the result of the edit dialog.
   * @param editedData - The data returned from the edit dialog.
   * @param entry - The original data entry being edited.
   */
  handleEdit(editedData: EditDataModel, entry: DataTableEntry) {
    switch (editedData.type) {
      case EditType.CANCEL: {
        this.onCancel(entry);
        break;
      }
      case EditType.CLOSE: {
        this.handleClose(editedData, entry);
        break;
      }
      case EditType.CONFIRM: {
        const index = this.tableData.indexOf(entry);
        this.tableData[index] = editedData.data;
        this.dataSource.data = this.tableData
        this.onConfirm(editedData.data);
        break;
      }
    }
  }

  /**
   * Handles closing event from dialog.
   * @param editedData - The data returned from the edit dialog.
   * @param entry - The original data entry being edited.
   */
  handleClose(editedData: EditDataModel, entry: DataTableEntry) {
    const index = this.tableData.indexOf(entry);
    const originalData = structuredClone(this.fetchedData[index]);
    originalData.isEdited = false;

    const newData = structuredClone(editedData.data);
    newData.isEdited = false;

    const isThereNoChangeInData = JSON.stringify(newData) === JSON.stringify(originalData);

    if (isThereNoChangeInData) {
      this.onCancel(entry);
    } else {
      const index = this.tableData.indexOf(entry);
      this.tableData[index] = editedData.data;
      this.dataSource.data = this.tableData;
    }
  }
}