import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadQueueEditModalComponent } from './download-queue-edit-modal.component';

describe('DownloadQueueEditModalComponent', () => {
  let component: DownloadQueueEditModalComponent;
  let fixture: ComponentFixture<DownloadQueueEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadQueueEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadQueueEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
