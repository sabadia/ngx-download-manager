import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: "",
  redirectTo: "download",
  pathMatch: "full",
},
  {
    path: 'download',
    loadChildren: () => import('./download/download.module').then(m => m.DownloadModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
