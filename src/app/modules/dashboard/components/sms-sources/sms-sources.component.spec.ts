import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSourcesComponent } from './sms-sources.component';

describe('SmsSourcesComponent', () => {
  let component: SmsSourcesComponent;
  let fixture: ComponentFixture<SmsSourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsSourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
