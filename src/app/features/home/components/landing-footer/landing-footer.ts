
import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-footer',
  standalone: true,
  templateUrl: './landing-footer.html',
  styleUrl: './landing-footer.css',
})
export class LandingFooterComponent {
  readonly currentYear = new Date().getFullYear();
}
