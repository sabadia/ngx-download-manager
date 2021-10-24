import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAddUrlModalComponent } from './download-add-url-modal.component';

describe('DownloadAddUrlModalComponent', () => {
  let component: DownloadAddUrlModalComponent;
  let fixture: ComponentFixture<DownloadAddUrlModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadAddUrlModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadAddUrlModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
