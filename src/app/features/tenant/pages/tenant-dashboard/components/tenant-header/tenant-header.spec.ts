import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TenantHeader } from './tenant-header';
import { AuthService } from '../../../../../../core/services/auth.service';

describe('TenantHeader', () => {
  let component: TenantHeader;
  let fixture: ComponentFixture<TenantHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantHeader],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            logout: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});