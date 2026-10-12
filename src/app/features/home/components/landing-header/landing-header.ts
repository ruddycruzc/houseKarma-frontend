import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideUserRound } from '@lucide/angular';

@Component({
  selector: 'app-landing-header',
  
  imports: [RouterLink ,LucideUserRound],
  templateUrl: './landing-header.html',
  styleUrl: './landing-header.css',
})
export class LandingHeader {
  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}