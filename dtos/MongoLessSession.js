class MongoLessSession {

    /**
     * 
     * @param {String} token 
     * @param {String} uuid 
     */
    constructor(token, uuid) {

        this.token = token;
        this.uuid = uuid;
    }
}

module.exports = MongoLessSession;