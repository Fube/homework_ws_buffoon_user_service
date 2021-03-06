const bcrypt = require('bcrypt');
const userRepo = require('../repos/UserRepo');
const MongoLessUser = require('../dtos/MongoLessUser.js');
const PasswordLessUser = require('../dtos/PasswordLessUser.js');
const softAssign = require('../utils/softAssign');
const AlreadyExistsError = require('../errors/AlreadyExistsError');
const { findById } = require('../repos/UserRepo');


/**
 * 
 * @param {String} guid 
 * @returns {Promise<PasswordLessUser>}
 */
async function findUserById(guid) {

    const user = await userRepo.findById(guid);

    if(!user) {
        throw new ReferenceError("User not found");
    }

    const dto = new PasswordLessUser();
    softAssign(dto, user);
    
    return dto;
}

/**
 *
 * @param email {String}
 * @returns {Promise<PasswordLessUser>}
 */
async function findUserByEmail(email) {

    const dto = new PasswordLessUser();
    const doc = await userRepo.findByEmail(email);

    if(!doc) {
        throw new ReferenceError("User not found");
    }

    softAssign(dto, doc);
    return dto;
}

/**
 *
 * @param username {String}
 * @returns {Promise<PasswordLessUser>}
 */
async function findByUsername(username) {

    const dto = new PasswordLessUser();
    const doc = await userRepo.findByUsername(username);

    if(!doc) {
        throw new ReferenceError("User not found");
    }

    softAssign(dto, doc);
    return dto;
}

/**
 *
 * @returns {Promise<PasswordLessUser[]>}
 */
async function findAll() {

    return [...userRepo.find()].map(n => {
        const dto = new PasswordLessUser();
        softAssign(dto, n);
        return dto;
    });
}

/**
 *
 * @param email {String}
 * @param username {String}
 * @param password {String}
 * @returns {Promise<PasswordLessUser>}
 */
async function createUser({ email, username, password }) {

    const exists = await userRepo.exists({ $or: [
        { username },
        { email },
    ] });

    if(exists){
        throw new AlreadyExistsError("Email or username already in use");
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const created = await userRepo.create({ username, email, password: hashedPass });
    const dto = new PasswordLessUser();
    softAssign(dto, created);
    return dto;
}

/**
 * 
 * @param {String} guid 
 * @param {{ username:String, email:String, password:String }} newUser
 * @returns {Promise<PasswordLessUser>}
 */
async function updateUser(guid, newUser) {

    const user = await userRepo.findById(guid);

    if(!user) {
        throw new ReferenceError("User not found");
    }

    softAssign(user, newUser);
    await user.save();

    const dto = new PasswordLessUser();
    softAssign(dto, user);

    return dto;
}

/**
 * 
 * @param {String} guid 
 * @returns {Promise<PasswordLessUser>}
 */
async function deleteUserById(guid) {

    const user = await userRepo.findById(guid);

    if(!user) {
        throw new ReferenceError("User not found");
    }

    await user.delete();

    const dto = new PasswordLessUser();
    softAssign(dto, user);

    return dto;
}

/**
 * 
 * @param {String} guid 
 * @param {String} password 
 * @returns {Promise<Boolean>}
 */
async function comparePasswords(email, password) {

    const user = await userRepo.findByEmail(email);

    if(!user) {
        throw new ReferenceError("User not found");
    }

    const match = bcrypt.compareSync(password, user.password);

    return match;
}

module.exports = {
    findAll,
    findUserById,
    findUserByEmail,
    findByUsername,
    createUser,
    updateUser,
    deleteUserById,
    comparePasswords,
}