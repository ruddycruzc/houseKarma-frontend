import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingHeader } from './features/home/components/landing-header/landing-header';
import { LandingHero } from './features/home/components/landing-hero/landing-hero';
import { RentalStorySectionComponent } from './features/home/components/rental-story-section/rental-story-section';
import { HowItWorksSectionComponent } from './features/home/components/how-it-works-section/how-it-works-section';
import { AudiencesSectionComponent } from './features/home/components/audiences-section/audiences-section';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    LandingHeader,
    LandingHero,
    RentalStorySectionComponent,
    HowItWorksSectionComponent,
    AudiencesSectionComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('houseKarma');
}
