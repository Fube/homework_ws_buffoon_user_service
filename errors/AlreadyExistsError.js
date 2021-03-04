class AlreadyExistsError extends Error {

    /**
     * 
     * @param {String} msg 
     */
    constructor(msg) {
        super(msg);
    }
}

module.exports = AlreadyExistsError;