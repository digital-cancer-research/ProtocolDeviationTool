import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * A generic single-select radio button component for selecting and confirming items.
 * 
 * This component allows the user to select a single item from a list, optionally filter
 * the items using a search input, and emit the selected item when confirmed. It also allows
 * the user to set a default radio button to be selected on initialisation.
 * It uses Angular Material for styling. As a result (of radio buttons in general),
 * this class converts each item to a JSON string for comparisons.
 * 
 * @export
 * @class SingleSelectComponent
 * @template T - The type of items to be displayed and selected.
 */
@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrl: './single-select.component.css'
})
export class SingleSelectComponent<T> implements OnInit {

  /**
  * Array of items to display and select from.
  * @type {T[]}
  */
  @Input() items: T[] = [];

  @Input() keyField: keyof T | null = null;
  /**
  * Key field to be used for displaying or searching items.
  * If null, the item itself will be used.
  * @type {keyof T | null}
  */
  @Input() search: boolean = false;

  /**
   * Flag indicating whether a search input should be displayed.
   * 
   * @type {boolean}
   */
  @Input() searchPlaceholder: string = "";

  /**
   * Placeholder text for the search input field.
   * 
   * @type {string}
   */
  @Input() defaultValue: T | null = null;

  /**
   * The default selected item.
   * 
   * @type {T | null}
   */
  @Output() confirmedItem: EventEmitter<T | null> = new EventEmitter();

  protected isConfirmed: boolean = false;
  protected searchTerm: string = "";
  protected selectedItem: T | null = null;
  protected selectedItemStringify: string = "";

  ngOnInit(): void {
    this.selectedItemStringify = JSON.stringify(this.defaultValue);
  }

  getFieldValue(item: T): T[keyof T] | T {
    return this.keyField ? item[this.keyField] : item;
  }

  getFilteredItems(): T[] {
    if (!this.searchTerm.trim()) {
      return this.items;
    }
    else {
      return this.items.filter(item => {
        const fieldValue = this.getFieldValue(item);
        const fieldValueStr = String(fieldValue).toLowerCase();
        return fieldValueStr.includes(this.searchTerm.toLowerCase());
      });
    }
  }

  onConfirm() {
    if (this.selectedItemStringify) {
      this.selectedItem = JSON.parse(this.selectedItemStringify);
      this.confirmedItem.emit(this.selectedItem);
      this.isConfirmed = true;
    }
  }

  toString(item: T): string {
    return JSON.stringify(item);
  }
}
