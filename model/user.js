var systemLib = require("../lib/system");
var vogels = require('vogels');
var Joi    = require('joi');
vogels.AWS.config.update({accessKeyId: systemLib.DefineAWSKey, secretAccessKey: systemLib.DefineAWSSecret, region: systemLib.DefineAWSRegion});

exports.User = vogels.define('User', {
    hashKey : 'id',
    schema : {
        id : Joi.string(),
        phone_number : Joi.string(),
        nickname : Joi.string(),
        pw : Joi.string(),
        endpoint : Joi.string(),
        platform : Joi.string(),
        device_type : Joi.string(),
        phone_number_list : Joi.string(),
        gift_list : Joi.string().default("[]"),
        cash : Joi.number().default(3),
        gift : Joi.number().default(0),
        my_allo : Joi.string().default("[]"),
        my_allo_list : Joi.string().default("[]"),
        friend_allo_list : Joi.string().default("[]"),
        friend_list : Joi.string().default("[]"),
        friend_reload_time : Joi.number().default(0),
        charge_time : Joi.number()
    },
    tableName: 'allo_user'
});
