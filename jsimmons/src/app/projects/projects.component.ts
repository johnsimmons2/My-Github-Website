import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Project {
  url: string;
  name: string;
  description: string;
  languages?: string;
  languageList?: string[];
  forkUrl?: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  private GITHUB_API: string = 'https://api.github.com/users/johnsimmons2/repos';
  projects: Project[] = [];
  isLoadingRepos: boolean = true;

  // Curated list ensuring repos always display even if GitHub API is rate-limited
  fallbackProjects: Project[] = [
    {
      name: 'CytherNet',
      url: 'https://github.com/johnsimmons2/CytherNet',
      description: 'A VTT (Virtual Tabletop) and character (CRUD) manager for tabletop campaigns. Built with Python, Flask, Alembic, Angular, Node, and PostgreSQL with custom JWT authentication.',
      languageList: ['TypeScript', 'Python', 'PostgreSQL', 'HTML/SCSS']
    },
    {
      name: 'My-Github-Website',
      url: 'https://github.com/johnsimmons2/My-Github-Website',
      description: 'Source code for personal developer portfolio and 3D graphics applications built using Angular, TypeScript, Three.js, and SCSS.',
      languageList: ['TypeScript', 'SCSS', 'HTML', 'Three.js']
    },
    {
      name: 'johnsimmons2.github.io',
      url: 'https://github.com/johnsimmons2/johnsimmons2.github.io',
      description: 'Production static deployment repository for the portfolio website hosted on GitHub Pages.',
      languageList: ['JavaScript', 'HTML', 'CSS']
    }
  ];

  constructor(private httpService: HttpClient, public router: Router) {}

  ngOnInit(): void {
    this.fetchRepos();
  }

  fetchRepos(): void {
    this.isLoadingRepos = true;
    this.httpService.get<any[]>(this.GITHUB_API).subscribe({
      next: (data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.projects = data.map((item: any) => ({
            url: item.html_url,
            name: item.name,
            description: item.description || 'Personal software engineering project on GitHub.',
            languages: item.languages_url,
            forkUrl: item.forks_url
          })).sort((a, b) => a.name.localeCompare(b.name));
        } else {
          this.projects = this.fallbackProjects;
        }
        this.isLoadingRepos = false;
      },
      error: (err) => {
        console.warn('GitHub API rate limited or unreachable, using fallback list', err);
        this.projects = this.fallbackProjects;
        this.isLoadingRepos = false;
      }
    });
  }
}
