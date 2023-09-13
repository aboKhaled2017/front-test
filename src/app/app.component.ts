import { Component } from '@angular/core';
import { AlertrService } from './Services/alert.service';
import { LoggerService } from './Services/logger.service';
import { FileProcessorService } from './Services/file-processor.service';
import { Observable, Subscription } from 'rxjs';
import { WordCounterPipe } from './Pipes/word-counter.pipe';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[WordCounterPipe],
})
export class AppComponent {
  title = 'front-test';

  public uploadedText:string="";
  public wordFrequency:Map<string,number>=new Map<string,number>();
  private mySubscriptions: Subscription[]=[]; //aggrgated subscriptions to observable services

  
  constructor(
              private alertService:AlertrService,
              private loggerService:LoggerService,
              private fileProcessor:FileProcessorService,
              private wordCountPipe:WordCounterPipe){

  }
  
  onFileSelected(event: any): void {
    const file: File = event?.target?.files[0];
   
    if (this.isValidFile(file)) {
   
        this.loggerService.logInfo(`new file has been uploaded ${file.name} with length ${file.size}`);
        
      var observableFileProcessor=  this.fileProcessor.readTextFileAsync(file)
                                      .subscribe(
                                        text=>{
                                          debugger
                                          this.uploadedText=text;
                                          
                                          this.wordCountPipe.transform(text).subscribe(val=>{
                                            this.wordFrequency=val;
                                          });

                                          this.loggerService.logInfo(`the file ${file.name} has been read successfully`);
                                        }
                                        ,error=>{
                                          debugger
                                          this.loggerService.logeError(error);
                                          this.alertService.alertifyError(error);
                                        },
                                        ()=>{});
      this.mySubscriptions.push(observableFileProcessor);                           
    } 
    else {
        this.alertService.alertifyError('Please select a .txt file.');
        this.loggerService.logeError('not valid file, pease select .txt file');
    }
  }

  private isValidFile(file:File):boolean{
    return file && file.type === 'text/plain' && file.name.endsWith('.txt');
  }

  ngOnDestroy(): void {

    //unsubscribe all observable services
    if(this.mySubscriptions.length>0)
     this.mySubscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
