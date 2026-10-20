
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'dark';
export type ButtonSize = 'compact' | 'default' | 'large';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './app-button.html',
  styleUrl: './app-button.css',
  host: {
    '[class.app-button-host--full-width]': 'fullWidth()',
  },
})
export class AppButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('default');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly fullWidth = input(false);
  readonly routerLink = input<string | readonly string[] | null>(null);
}
