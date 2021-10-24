import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSideNavComponent } from './download-side-nav.component';

describe('DownloadSideNavComponent', () => {
  let component: DownloadSideNavComponent;
  let fixture: ComponentFixture<DownloadSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
