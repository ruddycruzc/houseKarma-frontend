
import { Component } from '@angular/core';

import { LandingHero } from '../../components/landing-hero/landing-hero';
import { RentalStorySectionComponent } from '../../components/rental-story-section/rental-story-section';
import { HowItWorksSectionComponent } from '../../components/how-it-works-section/how-it-works-section';
import { AudiencesSectionComponent } from '../../components/audiences-section/audiences-section';
import { ReputationSectionComponent } from '../../components/reputation-section/reputation-section';
import { ExperienceSectionComponent } from '../../components/experience-section/experience-section';
import { FinalCtaSectionComponent } from '../../components/final-cta-section/final-cta-section';

@Component({
  selector: 'app-home',
  imports: [
    LandingHero,
    RentalStorySectionComponent,
    HowItWorksSectionComponent,
    AudiencesSectionComponent,
    ReputationSectionComponent,
    ExperienceSectionComponent,
    FinalCtaSectionComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
