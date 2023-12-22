import { NgTemplateOutlet } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

export interface CaroselData {
  name: string;
  descriptions: string[];
}

@Component({
  selector: 'app-carosel',
  templateUrl: './carosel.component.html',
  styleUrls: ['./carosel.component.scss']
})
export class AppCarosel implements OnInit {

  currentIndex: number = 0;

  @Input() data!: CaroselData[];
  @Input() interval: number = 5000;
  @Input() label: string = '';

  @Input() template: NgTemplateOutlet | undefined;

  ngOnInit(): void {
    const interval = setInterval(() => {
      this.currentIndex++;
      if (this.currentIndex >= this.data.length) {
        this.currentIndex = 0;
      }
    }, this.interval);
  }

  openAttrb(event: any): void {
    const subsc = event.openedChange.subscribe((open: boolean) => {
      if (open) {
        event.panel.nativeElement.addEventListener('mouseleave', () => {
          event.close();
          subsc.unsubscribe();
        });
      }
    });
    event.open();
  }
}
