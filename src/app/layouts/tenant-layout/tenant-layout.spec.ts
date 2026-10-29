import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TenantLayout } from './tenant-layout';

describe('TenantLayout', () => {
  let component: TenantLayout;
  let fixture: ComponentFixture<TenantLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantLayout],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});