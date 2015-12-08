var systemLib = require("../lib/system");
var vogels = require('vogels');
var Joi    = require('joi');
vogels.AWS.config.update({accessKeyId: systemLib.DefineAWSKey, secretAccessKey: systemLib.DefineAWSSecret,  region: systemLib.DefineAWSRegion});

exports.Notice = vogels.define('Notice', {
    hashKey : 'uid',
    schema : {
        uid : vogels.types.uuid(),
        img : Joi.string(),
        value : Joi.string()
    },
    tableName: 'allo_notice'
});
