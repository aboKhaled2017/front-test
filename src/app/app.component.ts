import { Component } from '@angular/core';
import { AlertrService } from './Services/alert.service';
import { LoggerService } from './Services/logger.service';
import { FileProcessorService } from './Services/file-processor.service';
import { Observable, Subscription } from 'rxjs';
import { TextProcessingService } from './Services/text-processing.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[TextProcessingService,FileProcessorService],
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
              private textProcessingService:TextProcessingService){

  }
  
  //triggered when a file input is clicked and a file been uploaded
  onFileSelected(event: any): void {
    const file: File = event?.target?.files[0];
   
    if (this.isValidFile(file)) {
   
        this.loggerService.logInfo(`new file has been uploaded ${file.name} with length ${file.size}`);
        
      var observableFileProcessor=  this.fileProcessor.readTextFileAsync(file).subscribe(
                                         text=>{ //on finish reading a text
                                          this.uploadedText=text;
                                          
                                          this.textProcessingService.CreateWordsFrequencyMapAsync(text).subscribe(
                                            frequencyMap=>{//on finish counting the word frequency
                                             this.wordFrequency=frequencyMap;
                                          },
                                          error=>{//error during calculating the word frequency
                                            this.loggerService.logInfo("faild to calculate the word frequency");
                                            this.alertService.alertifyError("faild to calculate the word frequency");
                                          });

                                          this.loggerService.logInfo(`the file ${file.name} has been read successfully`);
                                        }
                                        ,error=>{ //on error during reading the text
                                          this.loggerService.logeError(error);
                                          this.alertService.alertifyError(error);
                                        },
                                        ()=>{});

      this.mySubscriptions.push(observableFileProcessor);  //it will be disposed once component destroyed                        
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
