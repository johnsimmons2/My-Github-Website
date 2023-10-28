import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";

export interface LanguageCount {
  language: string;
  count: number;
}

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {

  @Input() url!: string;
  @Input() name!: string;
  @Input() description!: string;
  @Input() languagesUrl!: string;
  @Input() forkUrl?: string = '';

  languages: LanguageCount[] = [];

  constructor(private httpClient: HttpClient) {
  }

  orderByCount(languages: LanguageCount[]) {
    return languages.sort((a, b) => b.count - a.count);
  }

  navigate() {
    window.open(this.url, '_blank')
  }

  ngAfterViewInit() {
    this.httpClient.get(this.languagesUrl).subscribe((data: any) => {
      Object.keys(data).forEach((key: string) => {
        this.languages.push({
          language: key,
          count: data[key]
        });
      });
    });
  }

}
