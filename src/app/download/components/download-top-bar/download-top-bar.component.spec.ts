import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadTopBarComponent } from './download-top-bar.component';

describe('DownloadTopBarComponent', () => {
  let component: DownloadTopBarComponent;
  let fixture: ComponentFixture<DownloadTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadTopBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
