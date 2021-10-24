import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {File, IFile} from "../models/file";
import {IQueue, Queue} from "../models/queue";

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private readonly fileServiceApiPath = 'http://localhost:4569/';
  private readonly Headers = {
    'Content-Type': 'application/json',
  }

  constructor(private http: HttpClient) { }

  public get(model: Partial<IFile>): Observable<File | undefined> {
    return this.http.post<{
      Result: {
        IsValid: boolean,
        File?: IFile
      }
    }>(
      this.fileServiceApiPath + 'downloads',
      model,
      {headers: this.Headers}
    ).pipe(map(res => res?.Result?.IsValid && res?.Result?.File
      && new File(res?.Result?.File) || undefined))
  }
  public getDestinationPath(): Observable<string | undefined> {
    return this.http.post<{
      Result: {
        IsValid: boolean,
        DestinationPath?: string
      }
    }>(
      this.fileServiceApiPath + 'dir/select',
      {},
      {headers: this.Headers}
    ).pipe(map(res =>
        res?.Result?.IsValid && res?.Result?.DestinationPath  || undefined))
  }


  public getQueues() {
      const model: { Filter?: {[id: string]: string}} = {};
    return this.http.post<{
      Result: {
        IsValid: boolean,
        Queues?: Array<IQueue>
      }
    }>(
      this.fileServiceApiPath + 'queues',
      model,
      {headers: this.Headers}
    ).pipe(map(res => res?.Result?.IsValid && Array.isArray(res?.Result?.Queues) ?
        res.Result.Queues?.map(queue => new Queue(queue)): undefined)
    )
  }

  public addOrUpdateQueue(model: IQueue,isUpdate = false) {
    const endApi = isUpdate ? 'update': 'add';
    return this.http.post<{
      Result: {
        IsValid: boolean
      }
    }>(
      this.fileServiceApiPath + `queues/${endApi}`,
      model,
      {headers: this.Headers}
    ).pipe(map(res => !!res?.Result?.IsValid))
  }

  public addNewDownload(model: File) {

  }

  public updateExistingDownload(id: string, model: File) {

  }

  public deleteDownload(id: string) {

  }

  public getDownloadListByStatus(status: string) {

  }
}
