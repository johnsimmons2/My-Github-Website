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
export class ProjectCardComponent implements OnInit {

  @Input() url!: string;
  @Input() name!: string;
  @Input() description!: string;
  @Input() languagesUrl?: string;
  @Input() forkUrl?: string = '';
  @Input() languageList?: string[] = [];

  languages: LanguageCount[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    if (this.languageList && this.languageList.length > 0) {
      this.languages = this.languageList.map(l => ({ language: l, count: 1 }));
    } else if (this.languagesUrl) {
      this.fetchLanguages();
    }
  }

  fetchLanguages(): void {
    if (!this.languagesUrl) return;

    this.httpClient.get<Record<string, number>>(this.languagesUrl).subscribe({
      next: (data) => {
        if (data && typeof data === 'object') {
          this.languages = Object.keys(data).map(key => ({
            language: key,
            count: data[key]
          })).sort((a, b) => b.count - a.count);
        }
      },
      error: () => {
        // Silently ignore GitHub API rate limit for language breakdown
      }
    });
  }

  navigate(): void {
    if (this.url) {
      window.open(this.url, '_blank');
    }
  }
}
