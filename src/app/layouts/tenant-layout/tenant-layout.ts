
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TenantHeader } from '../../features/tenant/components/tenant-header/tenant-header';

@Component({
  selector: 'app-tenant-layout',
  standalone: true,
  imports: [RouterOutlet, TenantHeader],
  templateUrl: './tenant-layout.html',
  styleUrl: './tenant-layout.css',
})
export class TenantLayout {}
