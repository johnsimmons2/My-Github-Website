import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Project {
  url: string;
  name: string;
  description: string;
  languages: string;
  forkUrl?: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  private GITHUB_ADDRESS: string = 'https://api.github.com/users/';

  loading = true;
  projects: Project[] = [
    {
      url: 'https://github.com/johnsimmons2/CytherNet',
      name: 'CytherNet',
      description: 'Virtual tabletop and character manager with custom JWT authentication, Angular front end, and Postgres-backed API.',
      languages: 'https://api.github.com/repos/johnsimmons2/CytherNet/languages'
    },
    {
      url: 'https://github.com/johnsimmons2/Mynt',
      name: 'Mynt',
      description: 'Lexer, parser, and compiler for generating Minecraft datapacks with a lean scripting language.',
      languages: 'https://api.github.com/repos/johnsimmons2/Mynt/languages'
    },
    {
      url: 'https://github.com/johnsimmons2/MathViz',
      name: 'MathViz',
      description: 'Particle simulation and data visualization experiments for mathematical exploration.',
      languages: 'https://api.github.com/repos/johnsimmons2/MathViz/languages'
    }
  ];

  constructor(private httpService: HttpClient, public router: Router) {
  }

  /**
   * Sort the list of projects first by alphabetical order, then sort that by whether there is a description.
   * @param projects
   * @returns
   */
  sortByNotEmpty(projects: Project[]) {
    return projects.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => {
      if (!this.nullOrEmpty(a.description) && this.nullOrEmpty(b.description)) {
        return -1;
      } else if (this.nullOrEmpty(a.description) && !this.nullOrEmpty(b.description)) {
        return 1;
      }
      return 0;
    });
  }

  nullOrEmpty(str: string | undefined): boolean {
    return str == null || str == '';
  }

  ngOnInit() {
    this.httpService.get(this.GITHUB_ADDRESS + 'johnsimmons2/repos').subscribe({
      next: (data: any) => {
        const tmpProjects: Project[] = [];
        Array.from(data).forEach((element: any) => {
          tmpProjects.push({
            url: element['html_url'],
            name: element['name'],
            description: element['description'],
            languages: element['languages_url'],
            forkUrl: element['forks_url']
          });
        });
        this.projects = this.sortByNotEmpty(tmpProjects);
        this.loading = false;
      },
      error: () => {
        this.projects = this.sortByNotEmpty(this.projects);
        this.loading = false;
      }
    });
  }


}
