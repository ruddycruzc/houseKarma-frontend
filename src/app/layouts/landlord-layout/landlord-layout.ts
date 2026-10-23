import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandlordHeader } from '../../features/landlord/components/landlord-header/landlord-header';

@Component({
  selector: 'app-landlord-layout',
  standalone: true,
  imports: [RouterOutlet, LandlordHeader],
  templateUrl: './landlord-layout.html',
  styleUrl: './landlord-layout.css',
})
export class LandlordLayout {}