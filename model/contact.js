var systemLib = require("../lib/system");
var vogels = require('vogels');
var Joi    = require('joi');
vogels.AWS.config.update({accessKeyId: systemLib.DefineAWSKey, secretAccessKey: systemLib.DefineAWSSecret,  region: systemLib.DefineAWSRegion});

exports.Contact = vogels.define('Contact', {
    hashKey : 'uid',
    schema : {
        uid : vogels.types.uuid(),
        type : Joi.number().default(0),
        writer_id : Joi.string(),
        title : Joi.string(),
        desc : Joi.string(),
        created : Joi.number(),
        is_answer : Joi.boolean().default(false)
    },
    tableName: 'allo_contact'
});
