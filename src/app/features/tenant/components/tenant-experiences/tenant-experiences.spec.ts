import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantExperiences } from './tenant-experiences';

describe('TenantExperiences', () => {
  let component: TenantExperiences;
  let fixture: ComponentFixture<TenantExperiences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantExperiences],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantExperiences);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
