import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoggerService } from './Services/logger.service';
import { AlertrService } from './Services/alert.service';
import { WordCounterPipe } from './Pipes/word-counter.pipe';
import { FileProcessorService } from './Services/file-processor.service';


@NgModule({
  declarations: [
    AppComponent,
    WordCounterPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [LoggerService,AlertrService,FileProcessorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
