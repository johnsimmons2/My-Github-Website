import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class ProjectsComponent implements AfterViewInit {

  private GITHUB_ADDRESS: string = 'https://api.github.com/users/';

  projects: Project[] = [];

  constructor(private httpService: HttpClient, public router: Router) {
  }

  /**
   * Sort the list of projects first by alphabetical order, then sort that by whether there is a description.
   * @param projects
   * @returns
   */
  sortByNotEmpty(projects: Project[]) {
    return projects.sort((a,b) => a.name.localeCompare(b.name)).sort((a, b) => {
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

  ngAfterViewInit() {
    let tmpProjects: Project[] = [];
    this.httpService.get(this.GITHUB_ADDRESS + 'johnsimmons2/repos').subscribe((data: any) => {
      console.log(data);
      Array.from(data).forEach((element: any) => {
        tmpProjects.push({
          url: element['html_url'],
          name: element['name'],
          description: element['description'],
          languages: element['languages_url'],
          forkUrl: element['forks_url']
        });
      });
    });

    this.projects = tmpProjects;
  }


}
