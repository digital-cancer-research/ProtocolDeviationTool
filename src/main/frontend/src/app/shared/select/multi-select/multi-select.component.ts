import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Select } from '../select';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent<T> extends Select<T> implements OnInit {
  selectedItems: T[] = [];
  @Input() defaultValues: T[] = [];
  @Output() confirmedItems: EventEmitter<T[]> = new EventEmitter();

  ngOnInit(): void {
    this.defaultValues.forEach((item) => {
      this.selectedItems.push(item);
    });
  }

  onChange(item: T, event: MatCheckboxChange) {
    if (event.checked) {
      this.selectedItems.push(item);
    } else {
      const index = this.selectedItems
        .map(selectedItem => this.toString(selectedItem))
        .indexOf(this.toString(item));
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      }
    }
    this.confirmedItems.emit(this.selectedItems);
  }

  isChecked(item: T) {
    return this.defaultValues.some(value => this.compare(item, value));
  }
}
