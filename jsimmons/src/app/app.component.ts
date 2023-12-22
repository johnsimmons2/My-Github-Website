import { Component, OnInit } from '@angular/core';
import { Observable, startWith, fromEvent, map, debounceTime } from 'rxjs';
import { ScrollService } from './shared/service/scroll-service/scroll-service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0})),
      transition(':enter, :leave', [animate(300)])
    ])
  ]
})
export class AppComponent implements OnInit{
  title = 'jsimmons';
  
  public sectionTitle: string = '';
  
  constructor(private scrollService: ScrollService) {

  }

  /**
   * TODO: Get the section title and update
   */
  ngOnInit(): void {
    this.scrollService.getScrollPosition().subscribe((scrollPos) => {
      document.querySelectorAll("h1").forEach(head => {
        var y = 0;
        var l = head.parentElement;
        while (l) {
          y += l.offsetTop;
          l = l.parentElement;
        }
        if (scrollPos >= y) {
          // this.sectionTitle = head.innerHTML;
        }
      })
    })  
  }

  getSectionName() {
    return 'Hello';
  }
}
