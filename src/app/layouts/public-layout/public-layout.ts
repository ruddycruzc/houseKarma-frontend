
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LandingHeader } from '../../features/home/components/landing-header/landing-header';
import { LandingFooterComponent } from '../../features/home/components/landing-footer/landing-footer';

@Component({
  selector: 'app-public-layout',
  imports: [
    RouterOutlet,
    LandingHeader,
    LandingFooterComponent,
  ],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class PublicLayout {}
