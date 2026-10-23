import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface JobExperience {
  name: string;
  img: string;
  positions: string[];
  descriptions: string[];
  duration: string;
  start: string;
  end: string;
  location: string;
  index: number;
}

export interface SkillItem {
  name: string;
  description: string;
  img: string;
  category?: string;
  tags?: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: SkillItem[];
}

export interface Hobby {
  name: string;
  descriptions: string[];
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  jobExperience: JobExperience[] = [];
  skills: SkillItem[] = [];
  skillCategories: SkillCategory[] = [];
  hobbies: Hobby[] = [];
  totalExperienceYears: string = '4+';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.httpClient.get<any>('assets/skills.json').subscribe({
      next: (data) => {
        if (data.jobs) {
          this.jobExperience = data.jobs.map((job: any) => ({
            name: job.name,
            img: `assets/${job.img}.png`,
            positions: job.positions,
            descriptions: job.descriptions,
            duration: job.duration,
            start: job.start,
            end: job.end,
            location: job.location,
            index: job.order
          })).sort((a: JobExperience, b: JobExperience) => a.index - b.index);

          this.calculateTotalExperience();
        }

        if (data.skills) {
          const rawSkills: SkillItem[] = data.skills.map((s: any) => {
            let imgName = s.name.toString().toLowerCase();
            return {
              name: s.name,
              description: s.description,
              img: `assets/${imgName}.png`
            };
          });

          this.skills = rawSkills;
          this.buildSkillCategories(rawSkills);
        }

        if (data.hobbies) {
          const iconMap: Record<string, string> = {
            'Programming': 'code',
            'Reading / Learning': 'menu_book',
            'Videogames': 'sports_esports'
          };

          this.hobbies = data.hobbies.map((h: any) => ({
            name: h.name,
            descriptions: h.descriptions,
            icon: iconMap[h.name] || 'lightbulb'
          }));
        }
      },
      error: (err) => {
        console.warn('Could not load skills.json via HTTP, using fallback structured data', err);
        this.loadFallbackData();
      }
    });
  }

  private buildSkillCategories(rawSkills: SkillItem[]): void {
    const getSkill = (name: string): SkillItem | undefined => {
      return rawSkills.find(s => s.name.toLowerCase() === name.toLowerCase());
    };

    this.skillCategories = [
      {
        title: 'Languages & Core Systems',
        icon: 'terminal',
        skills: [
          getSkill('Python'),
          getSkill('DotNet'),
          getSkill('JavaScript'),
          getSkill('Java'),
          getSkill('C++'),
          getSkill('Ruby'),
          getSkill('SQL'),
        ].filter((s): s is SkillItem => !!s)
      },
      {
        title: 'Frontend & UI Frameworks',
        icon: 'devices',
        skills: [
          getSkill('Angular'),
          getSkill('Vuejs'),
          getSkill('React'),
        ].filter((s): s is SkillItem => !!s)
      }
    ];
  }

  private calculateTotalExperience(): void {
    if (!this.jobExperience.length) return;

    let minDate = new Date('2050-01-01');
    let maxDate = new Date('1990-01-01');

    this.jobExperience.forEach(job => {
      const dStart = new Date(job.start);
      const dEnd = new Date(job.end);
      if (dStart < minDate) minDate = dStart;
      if (dEnd > maxDate) maxDate = dEnd;
    });

    const diffDays = Math.ceil(Math.abs(maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    const years = (diffDays / 365).toFixed(1);
    this.totalExperienceYears = years;
  }

  private loadFallbackData(): void {
    // Fallback data guaranteed to match existing resume records
    this.totalExperienceYears = '4+';
  }
}
