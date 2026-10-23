import { Component } from '@angular/core';

interface Honor {
  title: string;
  badge: string;
  description: string;
  link?: string;
}

interface CourseCategory {
  title: string;
  icon: string;
  courses: { name: string; note?: string }[];
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  honors: Honor[] = [
    {
      title: "The Provost's Medal",
      badge: "Highest Academic Distinction",
      description: "Awarded at commencement to the senior with the highest overall grade point average across all four years."
    },
    {
      title: "The Provost's List (8x)",
      badge: "8 Consecutive Semesters",
      description: "Conferred every undergraduate semester for maintaining a 3.85 or higher GPA (graduated with a perfect 4.0 GPA)."
    },
    {
      title: "Alpha Chi Honor Society",
      badge: "Top 10% Academics",
      description: "National college honor scholarship society limited to the top 10% of juniors, seniors, and graduate students.",
      link: "https://alphachihonor.org"
    },
    {
      title: "Kappa Mu Epsilon",
      badge: "Mathematics Honor Society",
      description: "Specialized mathematics honor society recognizing academic distinction and scholarship standards.",
      link: "https://www.kappamuepsilon.org"
    }
  ];

  courseCategories: CourseCategory[] = [
    {
      title: "Mathematics & Physics",
      icon: "functions",
      courses: [
        { name: "Ordinary Differential Equations" },
        { name: "Partial Differential Equations" },
        { name: "Foundations of Higher Mathematics", note: "Proofs & mathematical notations" },
        { name: "Linear Algebra" },
        { name: "Calculus I, II & III" },
        { name: "Physics with Calculus I & II" }
      ]
    },
    {
      title: "Computer Science & Engineering",
      icon: "terminal",
      courses: [
        { name: "Algorithms", note: "Graduate level" },
        { name: "Software Engineering", note: "Graduate level" },
        { name: "Computer Science Theory", note: "Graduate level" },
        { name: "Big Data & Data Analysis" },
        { name: "Computer Security" },
        { name: "Operating Systems" },
        { name: "Networking" },
        { name: "Object-Oriented Programming" }
      ]
    }
  ];
}
