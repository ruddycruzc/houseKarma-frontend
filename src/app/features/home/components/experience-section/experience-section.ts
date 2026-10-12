import { Component } from '@angular/core';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  templateUrl: './experience-section.html',
  styleUrl: './experience-section.css',
})
export class ExperienceSectionComponent {
  readonly experience = {
    reference: '0248',
    status: 'Finalizada',
    property: {
      address: 'Calle del Olmo, 24',
      city: 'Madrid',
      duration: '2 años y 3 meses',
    },
    tenant: 'Elena M.',
    landlord: 'Marcos R.',
    startDate: '12 Sep 2022',
    endDate: '18 Dic 2024',
    canBeRated: true,
  };
}