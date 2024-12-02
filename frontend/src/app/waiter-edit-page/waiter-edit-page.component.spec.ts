import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterEditPageComponent } from './waiter-edit-page.component';

describe('WaiterEditPageComponent', () => {
  let component: WaiterEditPageComponent;
  let fixture: ComponentFixture<WaiterEditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaiterEditPageComponent]
    });
    fixture = TestBed.createComponent(WaiterEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
