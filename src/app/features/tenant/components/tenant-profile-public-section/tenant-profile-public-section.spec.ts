import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantProfilePublicSection } from './tenant-profile-public-section';

describe('TenantProfilePublicSection', () => {
  let component: TenantProfilePublicSection;
  let fixture: ComponentFixture<TenantProfilePublicSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantProfilePublicSection],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantProfilePublicSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
