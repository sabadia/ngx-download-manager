const app = require('./file-service')
const { DownloaderHelper } = require('node-downloader-helper');
const File = require("./models/file");
const {dialog, BrowserWindow} = require('electron');
const db = require('./database/sqlite-database');
const Queue = require("./models/queue");

// app.post("/downloads", (req, res) => {
//   res.json({"message":"working"})
// });

app.post("/downloads/save", (req, res) => {

});

app.post("/downloads/start", (req, res) => {

});

app.post("/downloads/pause", (req, res) => {

});

app.post("/queues", (req, res, next) => {
  db.all(...Queue.QueuesGetQuery, (err, queues) => {
    if (err) {
      res.status(400).json({
        Result: {
          IsValid: false
        }
      })
    }

    res.json({
      Result: {
        IsValid: true,
        Queues: Array.isArray(queues) ? queues.map(queue => new Queue(queue)): []
      }
    })
  });
});

app.post("/queues/add", (req, res) => {
  const queue = new Queue(req.body);
  db.run(...queue.QueueAddQuery, err => !err? res.json({
    Result: {
      IsValid: true
    }
  }): res.status(400).json({
    Result: {
      IsValid: false
    }
  }) );
});

app.post("/queues/update", (req, res) => {
  const queue = new Queue(req.body);
  db.run(...queue.QueueUpdateQuery, err => !err? res.json({
    Result: {
      IsValid: true
    }
  }): res.status(400).json({
    Result: {
      IsValid: false
    }
  }));
});

app.post("/dir/select", async (req, res) => {
  console.log('/dir/select');
  var path = await dialog.showOpenDialog({
    properties: ['openDirectory'],

  });
  console.log(26, path);
  res.status((path.canceled? 400: 200)).json({
    Result: {
      IsValid: !path.canceled ,
      DestinationPath: path?.filePaths?.length >= 1 && path?.filePaths[0] || undefined
    }
  })
});

app.post("/downloads", async (req, res) => {
  console.log('here')
  try {
    const {Id , DownloadUrl, DestinationPath } = req.body
    res.json(await new File({Id, DownloadUrl, DestinationPath}).getInfo())
  }
  catch(err) {
    // console.log(err);
    res.status(400).json({
      Result: {
        IsValid: false
      }
    })
  }
});
