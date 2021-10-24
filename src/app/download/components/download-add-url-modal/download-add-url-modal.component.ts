import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {BehaviorSubject} from "rxjs";
import {debounceTime, distinctUntilChanged, mergeMap} from "rxjs/operators";
import {SubscriptionHandler} from "../../../common/classes/subscription-handler";
import {DownloadConstant} from "../../constants/download-constant";
import {File} from "../../models/file";
import {Queue} from "../../models/queue";
import {DownloadService} from "../../services/download.service";

@Component({
  selector: 'app-download-add-url-modal',
  templateUrl: './download-add-url-modal.component.html',
  styleUrls: ['./download-add-url-modal.component.scss']
})
export class DownloadAddUrlModalComponent implements OnInit, OnDestroy {
  addUrlForm: FormGroup;
  loading = false;
  private subs = new SubscriptionHandler();
  public file?: File;
  queues$: BehaviorSubject<Array<Queue>> = new BehaviorSubject<Array<Queue>>([]);
  constructor(
    private downloadService: DownloadService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DownloadAddUrlModalComponent>
  ) {
    this.addUrlForm = this.initAddUrlForm();
  }
  private initAddUrlForm() {
    return this.formBuilder.group({
      DownloadUrl : ['',[Validators.required]],
      Queue: [null, []]
    })
  }

  ngOnInit(): void {
    this.onFormUrlChange();
    this.getQueueList();
  }
  closeModal(data = null , commandUrl?: string) {
    if (commandUrl) {
      this.dialogRef.close({RequestedData: data, CommandUrl: commandUrl});
    } else {
      this.dialogRef.close(commandUrl);
    }
  }

  downloadNow() {
    this.loading = true;
    this.closeModal(this.addUrlForm.value, DownloadConstant.ADD_DOWNLOAD_TYPES.DOWNLOAD_NOW);
  }
  downloadLetter() {
    this.loading = true;
    this.closeModal(this.addUrlForm.value,DownloadConstant.ADD_DOWNLOAD_TYPES.DOWNLOAD_LETTER);
  }

  initFileData(value?: string) {
    if(value) {
      this.subs.subList = this.downloadService.get({DownloadUrl: value, DestinationPath: './'})
        .subscribe(data => console.log(data));
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private onFormUrlChange() {
    this.addUrlForm.get('DownloadUrl')?.valueChanges
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(mergeMap(url => this.downloadService.get({DownloadUrl: url, DestinationPath: './'})))
      .subscribe(file => {
        this.file = file;
        console.log(this.file);
      });
  }

  private getQueueList() {
    this.subs.subList = this.downloadService.getQueues().subscribe(queue => queue && this.queues$.next(queue));
  }
  comparefn(obj1: any, obj2: any) {
    console.log(obj1, obj2);
    return true;
  }
}
