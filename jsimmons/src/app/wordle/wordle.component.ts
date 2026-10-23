import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.scss']
})
export class WordleComponent implements OnInit {

  public gameUrl!: SafeResourceUrl;
  public rawUrl: string = 'assets/wordliest.html';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.gameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.rawUrl);
  }

  reloadGame(): void {
    const iframe = document.getElementById('wordle-frame') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = this.rawUrl;
    }
  }
}
