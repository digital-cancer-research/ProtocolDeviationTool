import { Input, Component } from "@angular/core";
import { MatFormFieldAppearance } from "@angular/material/form-field";

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

    @Input() appearance: MatFormFieldAppearance = "fill";

    protected searchTerm: string = "";

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
    
    compare(obj1: any, obj2: any) {
        return this.toString(obj1) === this.toString(obj2);
    }

    protected toString(item: T): string {
        return JSON.stringify(item);
    }
}
