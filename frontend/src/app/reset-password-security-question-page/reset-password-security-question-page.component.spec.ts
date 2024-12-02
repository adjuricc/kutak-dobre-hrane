import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordSecurityQuestionPageComponent } from './reset-password-security-question-page.component';

describe('ResetPasswordSecurityQuestionPageComponent', () => {
  let component: ResetPasswordSecurityQuestionPageComponent;
  let fixture: ComponentFixture<ResetPasswordSecurityQuestionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordSecurityQuestionPageComponent]
    });
    fixture = TestBed.createComponent(ResetPasswordSecurityQuestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
