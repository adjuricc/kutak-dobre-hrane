import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGuestRequestsComponent } from './admin-guest-requests.component';

describe('AdminGuestRequestsComponent', () => {
  let component: AdminGuestRequestsComponent;
  let fixture: ComponentFixture<AdminGuestRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGuestRequestsComponent]
    });
    fixture = TestBed.createComponent(AdminGuestRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
