import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadViewListComponent } from './download-view-list.component';

describe('DownloadViewListComponent', () => {
  let component: DownloadViewListComponent;
  let fixture: ComponentFixture<DownloadViewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadViewListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
