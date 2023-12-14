import { Component } from '@angular/core';
import { Observable, startWith, fromEvent, map, debounceTime } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jsimmons';
}
