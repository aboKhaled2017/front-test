# FrontTest
This is a  reactive web application that allows users to load .txt files from their desktop, display the contents on the screen, and then calculate the count of repeated words within the loaded file. T

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Project Structure
 1- Components 
     - AppComponent for displaying the demo
 2- Services 
     - AlertService =>a very basic implementation for alerting and notifying the user (it could be implemenetd by any bootstrap   library for alertion)
    
     - FileprocessorService => it's for processing the file liek (reading file and retrive a text) , more functionality can be added here which is related to file processing logic
    
     - LoggerService => a very basic implementing which using consol provider to sink messages , (it could be integrated with a third party for logging)

3- Pipes 
     - WordCountPipe => A Pipe for counting the word frequency in a specific text
  
