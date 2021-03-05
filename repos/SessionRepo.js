const e = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SessionSchema = new Schema({

    uuid: {
        type: String,
        required: true,
        unique: true,
    },

    token: {
        type: String,
        required: true,
        unique: true,
    }

});

const SessionModel = mongoose.model('Session', SessionSchema);

/**
 * 
 * @param {String} uuid 
 */
SessionModel.deleteSessionForUUID = async function(uuid) {

    const exists = await SessionModel.findOne({ uuid });

    if(!exists) {
        throw new ReferenceError("Session not found");
    }
    await exists.delete();
}

/**
 * 
 * @param {String} token 
 */
SessionModel.deleteSessionForToken = async function(token) {

    const exists = await SessionModel.findOne({ token });

    if(!exists) {
        throw new ReferenceError("Session not found");
    }
    await exists.delete();
}

module.exports = SessionModel;