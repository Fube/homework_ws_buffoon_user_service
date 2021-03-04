const { Request, Response } = require('express');

/**
 *
 * @param req {Request}
 * @param res {Response}
 * @param next {Function}
 */
module.exports = function(req, res, next) {

    const { body } = req;

    if(!body) {
        return res.status(400).send("Malformed");
    }

    const fieldNames = [ 'username', 'email', 'password' ];
    for(const field of fieldNames) {

        if(!(field in body) || !body[field] || !body[field].length) {
            return res.status(400).send(`Malformed, missing ${field}`);
        }
    }
    next();
}