
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingHeader } from './landing-header';

describe('LandingHeader', () => {
  let fixture: ComponentFixture<LandingHeader>;
  let component: LandingHeader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the HouseKarma logo', () => {
    const logo = fixture.nativeElement.querySelector('.logo');

    expect(logo.textContent).toContain('House');
    expect(logo.textContent).toContain('Karma');
  });

  it('should start with the mobile menu closed', () => {
    const navigation = fixture.nativeElement.querySelector('nav');

    expect(navigation.classList.contains('navigation--open')).toBe(false);
  });

  it('should open and close the mobile menu', () => {
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('.menu-toggle');

    button.click();
    fixture.detectChanges();

    expect(component['menuOpen']()).toBe(true);
    expect(button.getAttribute('aria-expanded')).toBe('true');

    button.click();
    fixture.detectChanges();

    expect(component['menuOpen']()).toBe(false);
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });
});
