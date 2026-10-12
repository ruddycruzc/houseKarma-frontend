
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PublicLayout } from './public-layout';

describe('PublicLayout', () => {
  let fixture: ComponentFixture<PublicLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicLayout],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicLayout);
    await fixture.whenStable();
  });

  it('should create the public layout', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the shared header, outlet and footer', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('app-landing-header')).not.toBeNull();
    expect(element.querySelector('router-outlet')).not.toBeNull();
    expect(element.querySelector('app-landing-footer')).not.toBeNull();
  });
});
