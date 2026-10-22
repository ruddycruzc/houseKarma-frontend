import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantHero } from './tenant-hero';

describe('TenantHero', () => {
  let component: TenantHero;
  let fixture: ComponentFixture<TenantHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantHero],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantHero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
