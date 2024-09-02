import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
import _ from 'lodash';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrl: './single-select.component.css'
})
export class SingleSelectComponent<T> implements OnInit {
  @Input() items: T[] = [];
  @Input() keyField: keyof T | null = null;
  @Input() search: boolean = false;
  @Input() searchPlaceholder: string = "";
  @Input() defaultValue: T | null = null;
  @Output() confirmedItem: EventEmitter<T | null> = new EventEmitter();
  isConfirmed: boolean = false;
  searchTerm: string = "";
  selectedItem: T | null = null;
  selectedItemStringify: string = "";

  ngOnInit(): void {
    this.selectedItemStringify = JSON.stringify(this.defaultValue);
    console.log("Selected item");
    console.log(this.selectedItem);

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

  isEqual(item1: T, item2: T | null) {  
      return _.isEqual(item1, item2);
  }
}
