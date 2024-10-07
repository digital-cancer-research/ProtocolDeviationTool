import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  /**
   * Returns the closest number in a sorted number array.
   * Uses binary search like appraoch.
   * @param array 
   * @param target 
   * @returns 
   */
  public static findClosestNumberInSortedNumberArray(array: number[], target: number): number {
    let size = array.length;
    if (size == 1) {
      return array[0];
    }
    if (size == 2) {
      if (target < array[0]) {
        return array[0];
      } else if (target > array[1]) {
        return array[1];
      } else {
        let diffLow = target - array[0];
        let diffHigh = array[1] - target;
        if (diffLow < diffHigh) {
          return array[0];
        } else {
          return array[1];
        }
      }
    }

    let pivot = Math.floor(size / 2);
    let pivotValue = array[pivot];
    if (target > pivotValue) {
      return this.findClosestNumberInSortedNumberArray(array.slice(pivot), target)
    } else {
      return this.findClosestNumberInSortedNumberArray(array.slice(0, pivot + 1), target)
    }
  }
}
