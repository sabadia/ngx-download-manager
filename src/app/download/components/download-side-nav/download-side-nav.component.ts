import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {SubscriptionHandler} from "../../../common/classes/subscription-handler";
import {DownloadConstant} from "../../constants/download-constant";
import {Navigation} from "../../models/navigation";
import {Queue} from "../../models/queue";
import {DownloadService} from "../../services/download.service";
import {DownloadQueueEditModalComponent} from "../download-queue-edit-modal/download-queue-edit-modal.component";

@Component({
  selector: 'app-download-side-nav',
  templateUrl: './download-side-nav.component.html',
  styleUrls: ['./download-side-nav.component.scss']
})
export class DownloadSideNavComponent implements OnInit,OnDestroy {
  public defaultNavigationList: Navigation[];
  private subs = new SubscriptionHandler();
  queues$ : BehaviorSubject<Array<Queue>> = new BehaviorSubject<Array<Queue>>([]);
  constructor(
    public dialog: MatDialog,
    private readonly downloadService: DownloadService
  ) {
    this.defaultNavigationList = DownloadConstant.DEFAULT_DOWNLOAD_NAVIGATION_LIST;
    this.getQueueList();
  }
  ngOnInit(): void {
    this.getQueueList();
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  openAddQueueModal(queue?: Queue) {
    this.subs.subList = this.dialog.open(DownloadQueueEditModalComponent, {
      minWidth: '480px',
      width: '40%',
      restoreFocus: false,
      backdropClass: 'modalBgClass',
      disableClose: true,
      autoFocus: false,
      data: queue
    })
      .afterClosed().subscribe(result => {
        if(result) {
          const newQueue = new Queue(result);
          !!queue ? this.queues$.value[this.queues$.value.findIndex(res => res.Id === queue.Id)] = newQueue:
          this.queues$.value.push(newQueue);
        }
      });
  }

  private getQueueList() {
    this.subs.subList = this.downloadService.getQueues().subscribe(queue => queue && this.queues$.next(queue));
  }


}
