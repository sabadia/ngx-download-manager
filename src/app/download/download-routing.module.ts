import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DownloadDefaultComponent} from "./components/download-default/download-default.component";
import {DownloadViewListComponent} from "./components/download-view-list/download-view-list.component";

const routes: Routes = [
  {
    path: "",
    component: DownloadDefaultComponent,
    children: [
      {
        path: '',
        redirectTo: 'all-downloads',
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: DownloadViewListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadRoutingModule { }
