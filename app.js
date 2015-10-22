"use strict";

var cluster = require('cluster'),
    //https = require('https'),
    fs = require('fs'),
    app = require('./express-app'),
    hub = require('clusterhub');

var workers = {},
    count = require('os').cpus().length;

var systemLib = require('./lib/system');

GLOBAL = {};

var options = {
};

var i;

function spawn() {
  var worker = cluster.fork();
  workers[worker.process.pid] = worker;
  return worker;
}

if (cluster.isMaster) {
  for (i = 0; i < count; i++) {
    spawn();
  }

  cluster.on('death', function (worker) {
    delete workers[worker.process.pid];
    spawn();
  });

  cluster.on('exit', function (worker) {
    delete workers[worker.process.pid];
    spawn();
  });
} else {
  hub.on('cache_load', function () {
    systemLib.getDBCache(function (err) {
      if (err) {
        console.log(err);
      }
    });
  });

  systemLib.getDBCache(function (err) {
    if (err) {
      console.log(err);
    }

    //https.globalAgent.maxSockets = Infinity;
    //https.createServer(options, app).listen(process.env.PORT || 8001);

    app.listen(process.env.PORT || 8002);
  });
}
