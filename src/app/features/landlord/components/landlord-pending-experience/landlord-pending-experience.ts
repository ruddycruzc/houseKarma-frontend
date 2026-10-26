
import { Component, computed, input, output } from '@angular/core';

export interface PendingExperienceViewModel {
  id: number | string;
  tenantName: string;
  propertyName: string;
  propertyLocation: string;
  experienceDateLabel: string;
}

@Component({
  selector: 'app-landlord-pending-experience',
  standalone: true,
  templateUrl: './landlord-pending-experience.html',
  styleUrl: './landlord-pending-experience.css',
})
export class LandlordPendingExperience {
  readonly experiences = input.required<PendingExperienceViewModel[]>();

  readonly reviewRequested = output<number | string>();

  readonly pendingCountLabel = computed(() =>
    String(this.experiences().length).padStart(2, '0'),
  );

  reviewExperience(id: number | string): void {
    this.reviewRequested.emit(id);
  }
}
