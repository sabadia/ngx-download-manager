var sqlite3 = require('sqlite3').verbose()
const Proxy =require('../models/proxy')
const Queue  =require('../models/queue')
const File =require('../models/file')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message)
    throw err
  }else{
    console.log('Connected to the SQLite database.')
    CreateDB()
  }
});

const CreateDB = _ => {
  db.run(Proxy.CreateTableQuery, _ => {});
  db.run(Queue.CreateTableQuery, _ => {});
  db.run(File.CreateTableQuery, _ => {});
}


module.exports = db
