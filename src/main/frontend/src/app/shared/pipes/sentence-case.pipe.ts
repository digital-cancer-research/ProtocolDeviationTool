import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentenceCase',
})
export class SentenceCasePipe implements PipeTransform {

  /**
   * Transforms a given string into sentence case. The first character is capitalised, and the rest of the string is converted to lowercase.
   * 
   * @param value - The input string to be transformed.
   * @returns The input string in sentence case. If the input string is empty, it returns the original string.
   */
  transform(value: string): string {
    let numOfChars = value.length;
    if (numOfChars > 0) {
      let capitalisedLetter = value[0].toUpperCase();
      if (numOfChars === 1) {
        return capitalisedLetter;
      } else {
        return capitalisedLetter + value.substring(1).toLowerCase();
      }
    } else {
      return value;
    }
  }
}
