import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadDefaultComponent } from './download-default.component';

describe('DownloadDefaultComponent', () => {
  let component: DownloadDefaultComponent;
  let fixture: ComponentFixture<DownloadDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
