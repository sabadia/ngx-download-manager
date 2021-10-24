import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedDataModule} from "../common/modules/shared-data.module";

import { DownloadRoutingModule } from './download-routing.module';
import { DownloadDefaultComponent } from './components/download-default/download-default.component';
import { DownloadViewListComponent } from './components/download-view-list/download-view-list.component';
import { DownloadViewComponent } from './components/download-view/download-view.component';
import { DownloadSideNavComponent } from './components/download-side-nav/download-side-nav.component';
import { DownloadTopBarComponent } from './components/download-top-bar/download-top-bar.component';
import { DownloadAddUrlModalComponent } from './components/download-add-url-modal/download-add-url-modal.component';
import { DownloadQueueEditModalComponent } from './components/download-queue-edit-modal/download-queue-edit-modal.component';


@NgModule({
  declarations: [
    DownloadDefaultComponent,
    DownloadViewListComponent,
    DownloadViewComponent,
    DownloadSideNavComponent,
    DownloadTopBarComponent,
    DownloadAddUrlModalComponent,
    DownloadQueueEditModalComponent
  ],
  imports: [
    CommonModule,
    DownloadRoutingModule,
    SharedDataModule
  ],
  providers: []
})
export class DownloadModule { }
