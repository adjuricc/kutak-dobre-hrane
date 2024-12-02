import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordFromPageComponent } from './new-password-from-page.component';

describe('NewPasswordFromPageComponent', () => {
  let component: NewPasswordFromPageComponent;
  let fixture: ComponentFixture<NewPasswordFromPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPasswordFromPageComponent]
    });
    fixture = TestBed.createComponent(NewPasswordFromPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
