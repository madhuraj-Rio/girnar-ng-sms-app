import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsConfigurationsComponent } from './sms-configurations.component';

describe('SmsConfigurationsComponent', () => {
  let component: SmsConfigurationsComponent;
  let fixture: ComponentFixture<SmsConfigurationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsConfigurationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
