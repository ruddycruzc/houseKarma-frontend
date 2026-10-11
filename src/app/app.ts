import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingHeader } from './features/home/components/landing-header/landing-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LandingHeader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('houseKarma');
}
