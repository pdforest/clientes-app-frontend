import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Angular & Spring';
  curso: string = 'Curso de Angular 7 & Spring 5';
  profesor: string = 'Andrés Guzman';
}
