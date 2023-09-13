import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  //you can integrate any third party to log your important messages
  logeError(error: string) { 
    console.error(this.convertToMessageWithTime(error));
  }

  logInfo(message:string){
    console.log(this.convertToMessageWithTime(message));
  }

  private convertToMessageWithTime(mess:string):string{
    return `${new Date().toLocaleString()} ${mess}`;
  }
  constructor() { }
}
