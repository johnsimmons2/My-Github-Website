import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSelect } from '@angular/material/select';
import { CaroselData } from './carosel/carosel.component';

interface JobExperience {
  name: string;
  positions: string[];
  descriptions: string[];
  start: string;
  end: string;
  index: number;
}

interface Skill {
  name: string;
  description: string;
  img: string;
}

interface Hobby {
  name: string;
  descriptions: string[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  educationOpen = false;
  workOpen = false;
  jobExperience: JobExperience[] = [];
  skills: Skill[] = [];
  hobbies: Hobby[] = [];

  currentAttribute: number = 0;
  attributesOpen: boolean = false;
  attributes: CaroselData[] = [
    {
      name: "Software Engineer",
      descriptions: ["Full Stack", "Front End", "Back End", "DevOps", "Cloud", "Mobile", "Desktop", "Embedded"]
    },
    {
      name: "Dungeon Master",
      descriptions: ["Check out 'Projects' for more..."]
    }
  ];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getJobExperience();
  }

  get summary(): string {
    return this.educationOpen ? "Bachelor of Science in Computer Science with a minor in Mathematics, Summa Cum Laude, 4.0" : "BS CS, Minor in Math";
  }

  private getJobExperience(): void {
    this.httpClient.get('../assets/skills.json').subscribe((data: any) => {
      data.jobs.forEach((job: any) => {
        const experience = {
          name: job.name,
          positions: job.positions,
          descriptions: job.descriptions,
          start: job.start,
          end: job.end,
          index: job.order
        }
        this.jobExperience.push(experience);
      });
      this.jobExperience.sort((a: JobExperience, b: JobExperience) => {
        if (a.index < b.index) {
          return -1;
        } else {
          return 1;
        }
      });
      data.skills.forEach((skill: any) => {
        const skillx = {
          name: skill.name,
          description: skill.description,
          img: '/assets/' + skill.name.toString().toLowerCase() + '.png'
        };
        this.skills.push(skillx);
      });
      data.hobbies.forEach((hobby: any) => {
        const hobbyx = {
          name: hobby.name,
          descriptions: hobby.descriptions
        };
        this.hobbies.push(hobbyx);
      });
    });
  }

  getJobDuration(start: string, end: string): string {
    const date1 = new Date(start);
    const date2 = new Date(end);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffTimeInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffTimeInYears = diffTimeInDays / 365;
    const diffTimeInMonths = Math.ceil(diffTimeInDays / 30);

    if (diffTimeInYears >= 1) {
      return diffTimeInYears.toFixed(1) + ' years';
    } else if (diffTimeInMonths >= 1) {
      return diffTimeInMonths + ' months';
    } else if (diffTimeInDays >= 1) {
      return diffTimeInDays + ' days';
    }
    return '1 billion years!!!';
  }

  getTotalExperience(): string {
    let days = 0;
    this.jobExperience.forEach((job: JobExperience) => {
      const date1 = new Date(job.start);
      const date2 = new Date(job.end);
      const diffTime = Math.abs(date2.getTime() - date1.getTime());
      const diffTimeInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      days += diffTimeInDays;
    });

    const diffTimeInYears = days / 365;
    return diffTimeInYears.toFixed(2) + ' years';
  }

}
