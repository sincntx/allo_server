var systemLib = require("../lib/system");
var vogels = require('vogels');
var Joi    = require('joi');
vogels.AWS.config.update({accessKeyId: systemLib.DefineAWSKey, secretAccessKey: systemLib.DefineAWSSecret,  region: systemLib.DefineAWSRegion});

exports.Store = vogels.define('Store', {
    hashKey : 'uid',
    schema : {
        uid : vogels.types.uuid(),
        uploader_id : Joi.string(),
        downloads : Joi.number().default(0),
        title : Joi.string(),
        artist : Joi.string(),
        image : Joi.string(),
        url : Joi.string(),
        thumbs : Joi.string(),
        desc : Joi.string(),
        created : Joi.number(),
        duration : Joi.number().default(0),
        price : Joi.number().default(0),
        is_open : Joi.boolean().default(true),
        is_ucc : Joi.boolean().default(true)
    },
    tableName: 'allo_store'
});


