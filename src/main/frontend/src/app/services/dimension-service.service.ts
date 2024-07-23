import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DimensionService {
  public static getHTMLDimensions(selection: any) {
    var dimensions = null;
    var node = selection.node();
    dimensions = node.getBoundingClientRect();
    return dimensions;
    }
}
