import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly navLinks = [
    { path: '', label: 'Home', exact: true },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/games', label: 'Games' },
  ];
}
