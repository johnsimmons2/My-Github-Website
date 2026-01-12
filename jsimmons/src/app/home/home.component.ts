import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  rating?: number;
}

interface Hobby {
  name: string;
  descriptions: string[];
}

interface Highlight {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  jobExperience: JobExperience[] = [];
  skills: Skill[] = [];
  hobbies: Hobby[] = [];
  highlights: Highlight[] = [
    {
      title: 'Product-minded delivery',
      description: 'Pair user empathy with strong engineering fundamentals to ship features that balance quality, timelines, and measurable outcomes.',
      icon: 'auto_awesome'
    },
    {
      title: 'Data-rich experiences',
      description: 'Turn complex datasets into clear, actionable visuals with Angular, Material, and modern web performance practices.',
      icon: 'analytics'
    },
    {
      title: 'Reliable platforms',
      description: 'Design APIs, automate CI/CD, and harden production systems so teams can move faster without sacrificing stability.',
      icon: 'security'
    }
  ];
  heroHighlights: string[] = [
    'Full-stack web delivery',
    'Enterprise Angular & .NET',
    'Data visualization & UX',
    'Mentorship & enablement'
  ];

  totalExperience = 'Loading…';
  firstWorkDay: Date = new Date();
  lastWorkDay: Date = new Date();

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getJobExperience();
  }

  private getJobExperience(): void {
    this.httpClient.get('../assets/skills.json').subscribe((data: any) => {
      this.jobExperience = data.jobs
        .map((job: any) => ({
          name: job.name,
          positions: job.positions,
          descriptions: job.descriptions,
          start: job.start,
          end: job.end,
          index: job.order
        }))
        .sort((a: JobExperience, b: JobExperience) => a.index - b.index);

      this.skills = data.skills
        .map((skill: any) => ({
          name: skill.name,
          description: skill.description,
          img: '/assets/' + skill.name.toString().toLowerCase() + '.png',
          rating: skill.rating
        }))
        .sort((a: Skill, b: Skill) => (b.rating || 0) - (a.rating || 0));

      this.hobbies = data.hobbies.map((hobby: any) => ({
        name: hobby.name,
        descriptions: hobby.descriptions
      }));

      this.updateExperienceTotals();
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

  private updateExperienceTotals(): void {
    if (!this.jobExperience.length) {
      this.totalExperience = '—';
      return;
    }

    let start = new Date('4000-01-01');
    let end = new Date();
    this.jobExperience.forEach((job: JobExperience) => {
      const date1 = new Date(job.start);
      const date2 = new Date(job.end);

      if (date1 < start) {
        start = date1;
      }

      if (date2 > end) {
        end = date2;
      }

    });
    const diffTime = Math.abs(start.getTime() - end.getTime());
    const diffTimeInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffTimeInYears = diffTimeInDays / 365;

    this.lastWorkDay = end;
    this.firstWorkDay = start;

    this.totalExperience = diffTimeInYears.toFixed(1) + ' years';
  }

}
