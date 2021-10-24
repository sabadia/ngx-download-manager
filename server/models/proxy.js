class Proxy {

  constructor(data) {
    this.Type = data?.Type;
    this.Url = data?.Url;
  }
  static TableName = 'Proxies'
  static CreateTableQuery =
    `CREATE TABLE ${Proxy.TableName} (
      Type TEXT PRIMARY KEY ,
      Url TEXT
    )
    `
}
module.exports = Proxy
