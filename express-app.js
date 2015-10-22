"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var hub = require('clusterhub');
var dynamoBackup = require('dynamo-backup-to-s3');
var schedule = require('node-schedule');
var cluster = require('cluster');
var session = require('express-session');

var systemLib = require('./lib/system');
var userRoute = require('./routes/user');
var storeRoute = require('./routes/store');
var contactRoute = require('./routes/contact');
var systemRoute = require('./routes/system');

var app = express();
var multer  = require('multer');

app.set('views', 'views');
app.set('view engine', 'jade');
app.use(express.static('public'));

app.use(session({secret : '', saveUninitialized : 'true', resave : 'true'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
    }
}));

app.use('/user', userRoute);
app.use('/store', storeRoute);
app.use('/contact', contactRoute);
app.use('/system', systemRoute);

var backup = new dynamoBackup({
    excludedTables: [],
    readPercentage: 0.1,
    bucket: '',
    stopOnFailure: true,
    awsAccessKey: systemLib.DefineAWSKey,
    awsSecretKey: systemLib.DefineAWSSecret,
    awsRegion: systemLib.DefineAWSRegion
});

if (cluster.isMaster) {
    schedule.scheduleJob({hour: 19, minute: 0}, function () {
        backup.backupAllTables(function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Finished backing up DynamoDB');
            }
        });
    });

    var j = schedule.scheduleJob('0 * * * * *', function () {
        hub.emit('cache_load');
    });
}

app.get('/cache_load', function () {
    hub.emit('cache_load');
    res.send({ status : "success" });
});

module.exports = app;
