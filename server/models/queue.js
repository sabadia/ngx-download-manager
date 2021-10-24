const File = require("./file");
const Proxy = require("./proxy");

class Queue {
  constructor(data) {
    this.Id = data.Id
    this.Name = data.Name
    this.Files = data.Files && data.Files.map(file => new File(file)) || [];
    this.DestinationPath = data.DestinationPath
    this.NumberOfConnections = data.NumberOfConnections
    this.Proxy = data.Proxy && new Proxy(data.proxy);
  }

  static TableName = 'Queues'

  static CreateTableQuery =
    `CREATE TABLE ${Queue.TableName} (
      Id TEXT PRIMARY KEY ,
      Name TEXT,
      DestinationPath TEXT,
      NumberOfConnections INTEGER,
      Proxy REFERENCES ${Proxy.TableName}(Type)
    )
    `

  get QueueAddQuery() {
    return [`INSERT INTO ${Queue.TableName} (Id, Name, DestinationPath, NumberOfConnections, Proxy)
                VALUES (?,?,?,?,?)
            `, [this.Id, this.Name, this.DestinationPath, this.NumberOfConnections, this.Proxy]
    ]
  }

  static get QueuesGetQuery() {
    return [`select * from ${Queue.TableName}`, []]
  }
  get QueueUpdateQuery() {
    return [`UPDATE ${Queue.TableName} SET
               Name = ?, DestinationPath = ?, NumberOfConnections = ?, Proxy = ?
               WHERE Id = ?
            `, [this.Name, this.DestinationPath, this.NumberOfConnections, this.Proxy, this.Id]
    ]
  }
}

module.exports = Queue;
