import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertrService {

  //you can implement any awosem library for displaying errors
  alertifyError(errorMessage: string) {
    alert(errorMessage);
  }

  constructor() { }
}
