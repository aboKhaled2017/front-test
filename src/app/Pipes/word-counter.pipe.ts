import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'wordCounter'
})
export class WordCounterPipe implements PipeTransform {

  transform(text: string): Observable<Map<string, number>> {
    if (!text) {
      return of(new Map<string, number>());
    }

    const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    const wordFreqent = new Map<string, number>();

    for (const word of words) {
      if (wordFreqent.has(word)) {
        // Increment the frequency count if the word exists in the map
        wordFreqent.set(word, wordFreqent.get(word)! + 1);
      } else {
        // Initialize the frequency count to 1 for a new word
        wordFreqent.set(word, 1);
      }
    }

    return of(wordFreqent);
  }

}
