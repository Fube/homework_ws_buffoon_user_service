const sessionRepo = require('../repos/SessionRepo');
const nano = require('nanoid');
const MongoLessSession = require('../dtos/MongoLessSession');
const softAssign = require('../utils/softAssign');

/**
 * @typedef {({ uuid:String, token:String })} Session 
 */

/**
 * 
 * @param {String} uuid 
 * @returns {Promise<String>}
 */
async function createSession(uuid) {

    const token = nano.nanoid(16);
    await sessionRepo.create({
        uuid,
        token,
    });
    
    return token;
}

/**
 * 
 * @param {String} uuid 
 */
async function deleteSessionForUUID(uuid) {

    await sessionRepo.deleteSessionForUUID(uuid);
}

/**
 * 
 * @param {String} token 
 */
async function deleteSessionForToken(token) {

    await sessionRepo.deleteSessionForToken(uuid);
}

/**
 * 
 * @param {String} uuid 
 * @param {String} token 
 */
async function matches(uuid, token) {

    const doc = await sessionRepo.findOne({ uuid });

    if(!doc) {
        throw new ReferenceError("Session not found");
    }

    return doc.token === token;
}

/**
 * 
 * @param {String} token 
 */
async function exists(token) {

    const exists = await sessionRepo.findOne({ token });

    return !!exists;
}

/**
 * 
 * @param {String} uuid 
 * @returns {Session}
 */
async function findSessionByUUID(uuid) {

    const doc = await sessionRepo.findOne({ uuid });

    if(!doc) {
        throw new ReferenceError("Session not found");
    }

    const dto = new MongoLessSession();

    softAssign(dto, doc);

    return dto;
}

/**
 * 
 * @param {String} token 
 * @returns {Session}
 */
async function findSessionByToken(token) {

    const doc = await sessionRepo.findOne({ token });

    if(!doc) {
        throw new ReferenceError("Session not found");
    }

    const dto = new MongoLessSession();

    softAssign(dto, doc);

    return dto;
}

module.exports = {

    createSession,
    deleteSessionForUUID,
    deleteSessionForToken,
    matches,
    exists,
    findSessionByUUID,
    findSessionByToken,
};