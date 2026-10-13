import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type ExperienceStatus = 'ACTIVA' | 'FINALIZADA' | 'VALORADA';

interface RentalExperience {
  id: number;
  property: string;
  location: string;
  landlord: string;
  startDate: string;
  endDate: string;
  status: ExperienceStatus;
  action: 'Ver experiencia' | 'Valorar experiencia';
}

@Component({
  selector: 'app-tenant-dashboard',
  imports: [RouterLink],
  templateUrl: './tenant-dashboard.html',
  styleUrl: './tenant-dashboard.css',
})
export class TenantDashboard {
  protected readonly user = {
    firstName: 'Lucía',
    fullName: 'Lucía Martínez',
    initials: 'LM',
    city: 'Gijón, Asturias',
    reputation: 4.8,
    totalExperiences: 8,
  };
  
  protected readonly reputationCriteria = [
    { label: 'Comunicación', score: 4.9 },
    { label: 'Transparencia', score: 4.8 },
    { label: 'Mantenimiento', score: 4.7 },
    { label: 'Gestión de la fianza', score: 4.8 },
    { label: 'Respeto', score: 5.0 },
  ];

  protected readonly experiences = signal<RentalExperience[]>([
    {
      id: 1,
      property: 'Piso en Gijón',
      location: 'Gijón, Asturias',
      landlord: 'María García',
      startDate: '12 MAR 2026',
      endDate: '30 SEP 2026',
      status: 'ACTIVA',
      action: 'Ver experiencia',
    },
    {
      id: 2,
      property: 'Apartamento en Oviedo',
      location: 'Oviedo, Asturias',
      landlord: 'Álvaro Díaz',
      startDate: '03 FEB 2024',
      endDate: '14 ENE 2026',
      status: 'FINALIZADA',
      action: 'Valorar experiencia',
    },
    {
      id: 3,
      property: 'Estudio en Santander',
      location: 'Santander, Cantabria',
      landlord: 'Nuria Soler',
      startDate: '08 SEP 2022',
      endDate: '22 DIC 2023',
      status: 'VALORADA',
      action: 'Ver experiencia',
    },
  ]);

  protected readonly pendingExperiences = () =>
    this.experiences().filter((experience) => experience.action === 'Valorar experiencia');

  protected readonly formatScore = (score: number) => score.toFixed(1).replace('.', ',');
}
