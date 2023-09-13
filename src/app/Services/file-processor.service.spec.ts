import { TestBed } from '@angular/core/testing';
import { FileProcessorService } from './file-processor.service';



describe('FileProcessorService', () => {
    let service: FileProcessorService;
  
    beforeEach(() => {
      service = new FileProcessorService();
    });
  
    it('should return the text content of a valid file', (done) => {
        const mockFile = new File(['Hello, World!'], 'test.txt', { type: 'text/plain' });
        
        service.readTextFileAsync(mockFile).subscribe((content) => {
          expect(content).toBe('Hello, World!');
          done();
        });
      });
      
      it('should return an error if the file is null', (done) => {
        service.readTextFileAsync(null as any).subscribe({
          error: (error) => {
            expect(error).toBe("file shouldn't be null");
            done();
          }
        });
      });
      
      // You can add more test cases to cover other scenarios
      
  });