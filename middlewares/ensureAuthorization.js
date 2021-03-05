const sessionService = require('../services/SessionService');

/**
 *
 * @param req {Request}
 * @param res {Response}
 * @param next {Function}
 */
async function ensureAuthorization(req, res, next) {

    const { token } = req.body;

    if(!token)return res.status(400).send("Missing token");

    const exists = await sessionService.exists(token);

    if(!exists)return res.status(401).send("Unauthorizaed");

    next();
}

module.exports = ensureAuthorization;