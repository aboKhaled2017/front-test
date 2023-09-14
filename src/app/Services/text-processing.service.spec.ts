import { TestBed } from '@angular/core/testing';

import { TextProcessingService } from './text-processing.service';

describe('TextProcessingService', () => {
  let service: TextProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[TextProcessingService]
    });
    service = TestBed.inject(TextProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should transform a string into a word frequency map', () => {
    const inputText = 'test1 test2 test1 test1 test3';
    const expectedMap = new Map<string, number>([
      ['test1', 3],
      ['test2', 1],
      ['test3', 1]
    ]);

    const result$ = service.CreateWordsFrequencyMapAsync(inputText);

    result$.subscribe((result) => {
      expect(result).toHaveSize(3);
      result.forEach((freq,word)=>{
        expect(expectedMap.get(word)).toBe(freq);
      });
    });
  });

  it('should handle empty input', () => {
    const emptyInput = '';
    const expectedEmptyMap = new Map<string, number>();

    const result$ = service.CreateWordsFrequencyMapAsync(emptyInput);

    result$.subscribe((result) => {
      expect(result).toEqual(expectedEmptyMap);
    });
  });
});
