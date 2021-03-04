const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        unique: false, // Two users can have the same password
    }
});

const UserModel = mongoose.model('User', UserSchema);

/**
 *
 * @param email {String}
 * @returns {Promise<Query<Document | null, Document>>}
 */
UserModel.findByEmail = async function (email) {
    return UserModel.findOne({ email });
};

/**
 *
 * @param username {String}
 * @returns {Promise<void>}
 */
UserModel.findByUsername = async function (username) {
    return UserModel.findOne({ name: username });
};

module.exports = UserModel;