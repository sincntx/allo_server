var systemLib = require("../lib/system");
var vogels = require('vogels');
var Joi    = require('joi');
vogels.AWS.config.update({accessKeyId: systemLib.DefineAWSKey, secretAccessKey: systemLib.DefineAWSSecret, region: systemLib.DefineAWSRegion});

exports.Invite = vogels.define('Invite', {
    hashKey : 'phone_number',
    schema : {
        phone_number : Joi.string(),
        msg : Joi.string(),
        allo : Joi.string(),
        host_id : Joi.string(),
        created : Joi.number()
    },
    tableName: 'allo_invite'
});
