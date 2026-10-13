import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TenantHeader } from '../../features/tenant/pages/tenant-dashboard/components/tenant-header/tenant-header';

@Component({
  selector: 'app-tenant-layout',
  imports: [RouterOutlet, TenantHeader],
  templateUrl: './tenant-layout.html',
  styleUrl: './tenant-layout.css',
})
export class TenantLayout {}
