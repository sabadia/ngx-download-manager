import {Common} from "../../common/classes/common";

export class File implements IFile{
  public Id: string
  public Name: string
  public TotalSize: number
  public DownloadedSize: number
  public IsResumable: boolean
  public Progress: number
  public SiteUrl?: string
  public DownloadUrl: string
  public DestinationPath: string
  public Status: FileStatus
  public LastTry: string = new Date().toISOString();
  public Bandwidth?: number;
  public RemainingTime?: string
  public QueueId?: string
  public NumberOfConnections: number;
  public proxy?: Proxy
  public Extension: string
  public Type?: string
  constructor(data: IFile) {
    this.Id = data.Id || Common.NewRandomGuid
    this.Name = data.Name
    this.TotalSize = data.TotalSize
    this.DownloadedSize = data.DownloadedSize || 0
    this.IsResumable = data.IsResumable
    this.Progress = data.Progress
    this.SiteUrl = data.SiteUrl
    this.DownloadUrl = data.DownloadUrl
    this.DestinationPath = data.DestinationPath
    this.Status = data.Status
    this.LastTry = data.LastTry || new Date().toISOString();
    this.Bandwidth = data.Bandwidth
    this.RemainingTime = data.RemainingTime
    this.QueueId = data.QueueId
    this.NumberOfConnections = data.NumberOfConnections
    this.proxy = data?.proxy && new Proxy(data.proxy);
    this.Extension = data.Extension;
    this.Type = data?.Type
  }
}

export interface IFile{
  Id?: string;
  TotalSize: number;
  DownloadedSize?: number;
  IsResumable: boolean;
  Progress: number
  Name: string;
  SiteUrl?: string;
  DownloadUrl: string;
  DestinationPath: string;
  Status: FileStatus;
  LastTry: string;
  Bandwidth?: number;
  RemainingTime?: string;
  QueueId?: string;
  NumberOfConnections: number;
  proxy?: IProxy;
  Extension: string
  Type?: string
}
export class Proxy implements IProxy {
  public Type: string
  public Url: string
  constructor(data: IProxy) {
    this.Type = data.Type;
    this.Url = data.Url;

  }
}
export interface IProxy {
  Type: string,
  Url: string
}
export type FileStatus = 'Paused' | 'Downloading' | 'Pending' | 'Completed'
