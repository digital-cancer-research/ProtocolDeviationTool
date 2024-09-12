import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Select } from '../select';

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
export class SingleSelectComponent<T> extends Select<T> implements OnInit {

  protected isConfirmed: boolean = false;
  protected selectedItem: T | null = null;
  protected selectedItemStringify: string = "";

  /**
  * The default selected item.
  * 
  * @type {T | null}
  */
  @Input() defaultValue: T | null = null;

  /**
  * The selected item.
  */
  @Output() confirmedItem: EventEmitter<T | null> = new EventEmitter();

  ngOnInit(): void {
    this.selectedItemStringify = JSON.stringify(this.defaultValue);
  }

  onConfirm() {
    if (this.selectedItemStringify) {
      this.selectedItem = JSON.parse(this.selectedItemStringify);
      this.confirmedItem.emit(this.selectedItem);
      this.isConfirmed = true;
    }
  }
}