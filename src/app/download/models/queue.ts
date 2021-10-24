import {IFile, IProxy, Proxy, File} from "./file";

export class Queue implements IQueue{
  public Id: string;
  public Name: string;
  public Files: Array<File>;
  public DestinationPath: string;
  public NumberOfConnections: number;
  public Proxy?: Proxy;
  constructor(data: IQueue) {
    this.Id = data.Id
    this.Name = data.Name
    this.Files = data.Files && data.Files.map(file => new File(file)) || [];
    this.DestinationPath = data.DestinationPath
    this.NumberOfConnections = data.NumberOfConnections
    this.Proxy = data.Proxy && new Proxy(data.Proxy);
  }
}

export interface IQueue{
  Id: string;
  Name: string;
  Files?: Array<IFile>;
  DestinationPath: string;
  NumberOfConnections: number;
  Proxy?: IProxy;
}
