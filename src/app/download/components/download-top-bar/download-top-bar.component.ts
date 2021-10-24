import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SubscriptionHandler} from "../../../common/classes/subscription-handler";
import {DownloadAddUrlModalComponent} from "../download-add-url-modal/download-add-url-modal.component";

@Component({
  selector: 'app-download-top-bar',
  templateUrl: './download-top-bar.component.html',
  styleUrls: ['./download-top-bar.component.scss']
})
export class DownloadTopBarComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionHandler();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openAddUrlModal(): void {
     this.subs.subList = this.dialog.open(DownloadAddUrlModalComponent, {
      width: '50%',
      restoreFocus: false,
      backdropClass: 'modalBgClass',
       disableClose: true
    })
      .afterClosed().subscribe(result => {
      if(result) {

      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
