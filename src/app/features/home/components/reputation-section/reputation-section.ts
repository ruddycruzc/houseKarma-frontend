import { Component } from '@angular/core';

interface ReputationCategory {
  name: string;
  score: number;
}

@Component({
  selector: 'app-reputation-section',
  standalone: true,
  templateUrl: './reputation-section.html',
  styleUrl: './reputation-section.css',
})
export class ReputationSectionComponent {
  readonly overallScore = 4.9;
  readonly experienceCount = 12;

  readonly categories: ReputationCategory[] = [
    { name: 'Comunicación', score: 4.9 },
    { name: 'Transparencia', score: 4.8 },
    { name: 'Mantenimiento', score: 4.7 },
    { name: 'Gestión de la fianza', score: 5.0 },
    { name: 'Respeto', score: 4.9 },
  ];
}