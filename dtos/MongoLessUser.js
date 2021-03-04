class MongoLessUser {

    constructor(email, username, password, _id){

        this.email = email;
        this.username = username;
        this.password = password;
        this._id = _id;
    }
}

module.exports = MongoLessUser;