import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Common} from "../../../common/classes/common";
import {SubscriptionHandler} from "../../../common/classes/subscription-handler";
import {DownloadConstant} from "../../constants/download-constant";
import {IQueue, Queue} from "../../models/queue";
import {DownloadService} from "../../services/download.service";

@Component({
  selector: 'app-download-queue-edit-modal',
  templateUrl: './download-queue-edit-modal.component.html',
  styleUrls: ['./download-queue-edit-modal.component.scss']
})
export class DownloadQueueEditModalComponent implements OnInit, OnDestroy {
  queueForm: FormGroup;
  loading = false;
  private subs = new SubscriptionHandler();
  DownloadConstant = DownloadConstant
  Number = Number
  constructor(
    private downloadService: DownloadService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DownloadQueueEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public queue?: IQueue
  ) {
    this.queueForm = this.initQueueForm(queue);
  }

  ngOnInit(): void {
  }

  private initQueueForm(data?: IQueue) {
    return this.formBuilder.group({
      Id: [data?.Id || Common.NewRandomGuid, []],
      Name: [data?.Name || null, [Validators.required]],
      DestinationPath: [data?.DestinationPath || null, [Validators.required]],
      NumberOfConnections: [data?.NumberOfConnections || 8, [Validators.required]],
      Proxy: [data?.Proxy || null, []],
    })
  }

  closeModal(data?: IQueue ) {
    this.dialogRef.close(data);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  save() {
    this.loading = true;
    this.queueForm.markAllAsTouched();
    if(!this.queueForm.valid){
      return
    }
    console.log(this.queueForm.value);
    const queue: IQueue = this.queueForm.getRawValue();
    this.downloadService.addOrUpdateQueue(queue, !!this.queue).subscribe(data => {
      this.loading = false;
      this.closeModal(data ? queue : undefined);
    });
  }

  selectDir() {
    this.subs.subList = this.downloadService.getDestinationPath().subscribe(data => {
      data &&
      this.queueForm.get('DestinationPath')?.setValue(data)
      }
    )
  }

  getDefaultConnection() {
    return DownloadConstant.CONNECTION_SELECT_LIST.find(connection => connection === 8);
  }
}
