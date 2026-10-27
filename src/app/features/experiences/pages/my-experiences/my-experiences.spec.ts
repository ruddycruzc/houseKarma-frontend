import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExperiences } from './my-experiences';

describe('MyExperiences', () => {
  let component: MyExperiences;
  let fixture: ComponentFixture<MyExperiences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyExperiences],
    }).compileComponents();

    fixture = TestBed.createComponent(MyExperiences);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
