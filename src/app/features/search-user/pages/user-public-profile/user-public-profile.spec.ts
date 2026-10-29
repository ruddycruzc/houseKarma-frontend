import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { UserPublicProfile } from './user-public-profile';

describe('UserPublicProfile', () => {
  let component: UserPublicProfile;
  let fixture: ComponentFixture<UserPublicProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPublicProfile],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPublicProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
