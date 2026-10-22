import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantHeader } from './tenant-header';

describe('TenantHeader', () => {
  let component: TenantHeader;
  let fixture: ComponentFixture<TenantHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
