import { Input, Output, EventEmitter, Component } from "@angular/core";

@Component({
    selector: 'app-select',
    template: '',
    styleUrls: []
})
export class Select<T> {
    /**
    * Array of items to display and select from.
    * @type {T[]}
    */
    @Input() items: T[] = [];

    /**
    * Key field to be used for displaying or searching items.
    * If null, the item itself will be used.
    * @type {keyof T | null}
    */
    @Input() keyField: keyof T | null = null;

    /**
     * Flag indicating whether a search input should be displayed.
     * 
     * @type {boolean}
     */
    @Input() search: boolean = false;

    /**
     * Placeholder text for the search input field.
     * 
     * @type {string}
     */
    @Input() searchPlaceholder: string = "";

    protected searchTerm: string = "";

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

    getFieldValue(item: T): T[keyof T] | T {
        return this.keyField ? item[this.keyField] : item;
    }

    toString(item: T): string {
        return JSON.stringify(item);
    }

    compare(obj1: any, obj2: any) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
}
