import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Jonathan Simmons | Full-Stack Software Engineer';
  mobileMenuOpen = false;
  isWordleMinigame = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkCurrentRoute(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects || event.url;
        this.checkCurrentRoute(url);
      });
  }

  private checkCurrentRoute(url: string): void {
    const cleanUrl = (url || '').toLowerCase();
    this.isWordleMinigame =
      cleanUrl.includes('/wordle') ||
      cleanUrl.includes('/wordliest') ||
      cleanUrl.includes('/wordoom');
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
