const { DownloaderHelper } = require('node-downloader-helper');
const Queue = require("./queue");
const Proxy = require("./proxy");
class File {
  constructor(data) {
    this.Id = data?.Id
    this.Name = data?.Name
    this.TotalSize = data?.TotalSize
    this.DownloadedSize = data?.DownloadedSize
    this.IsResumable = data?.IsResumable
    this.Progress = data?.Progress
    this.SiteUrl = data?.SiteUrl
    this.DownloadUrl = data?.DownloadUrl
    this.DestinationPath = data?.DestinationPath
    this.Status = data?.Status
    this.LastTry = data?.LastTry
    this.Bandwidth = data?.Bandwidth
    this.RemainingTime = data?.RemainingTime
    this.QueueId = data?.QueueId
    this.NumberOfConnections = data?.NumberOfConnections
    this.Proxy = data?.Proxy && new Proxy(data.Proxy)
    this.Extension = data?.Extension
    this.Type = data?.Type
  }
  static TableName = 'Files'

  static CreateTableQuery =
    `CREATE TABLE ${File.TableName} (
      Id TEXT PRIMARY KEY ,
      Name TEXT,
      TotalSize INTEGER,
      DownloadedSize INTEGER,
      IsResumable INTEGER,
      Progress INTEGER,
      SiteUrl TEXT,
      DownloadUrl TEXT,
      DestinationPath TEXT,
      Status TEXT,
      LastTry TEXT,
      Bandwidth INTEGER,
      RemainingTime TEXT,
      NumberOfConnections INTEGER,
      QueueId REFERENCES ${Queue.TableName}(Id),
      Proxy REFERENCES ${Proxy.TableName}(Type),
      Extension TEXT,
      Type TEXT
    )
    `

  checkIsValidURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
      '((\\d{1,3}\\.){3}\\d{1,3}))'+
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
      '(\\?[;&a-z\\d%_.~+=-]*)?'+
      '(\\#[-a-z\\d_]*)?$','i');
    return !!pattern.test(str);
  }

  async getInfo() {
    if(!this.checkIsValidURL(this.DownloadUrl)) {
      throw 'File Not Found'
    }
    const file = new DownloaderHelper(this.DownloadUrl, this.DestinationPath);
    const size = await file.getTotalSize()
    this.Name = size?.name
    this.TotalSize = size?.total
    this.IsResumable = await file.isResumable()

    const stats = await file.getStats()
    this.DownloadedSize = stats?.downloaded
    this.Bandwidth = stats?.speed
    this.DestinationPath = await file.getDownloadPath()
    return {
      Result: {
        IsValid: true,
        File: {
          ...this
        }
      }
    }
  }

}

module.exports = File
