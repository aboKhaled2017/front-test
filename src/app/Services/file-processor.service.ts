
import { Observable, throwError } from 'rxjs';


export class FileProcessorService {

  //read file and get text
  readTextFileAsync(file: File): Observable<string> {
    
    //check file is not null
    if(!file) return throwError("file shouldn't be null");

    return new Observable<string>((observer) => {
      const reader = new FileReader();

      reader.onload = () => {
        const content = reader.result as string;
        observer.next(content);
        observer.complete();
      };

      reader.onerror = (error) => {
        observer.error(error);
      };

      reader.readAsText(file);
    });
  }
}
