import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestEditProfilePageComponent } from './guest-edit-profile-page.component';

describe('GuestEditProfilePageComponent', () => {
  let component: GuestEditProfilePageComponent;
  let fixture: ComponentFixture<GuestEditProfilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestEditProfilePageComponent]
    });
    fixture = TestBed.createComponent(GuestEditProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
