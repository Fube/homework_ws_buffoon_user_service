const { Router } = require('express');
const { Error: { CastError } } = require('mongoose');
const AlreadyExistsError = require('../errors/AlreadyExistsError');
const ensureUser = require('../middlewares/ensureUser');
const userService = require('../services/UserService');

const router = Router();

router.post('/', ensureUser, async (req, res) => {

    const { body } = req;
    try{

        const response = await userService.createUser(body);
        res.status(200).json(response);
    }
    catch(e) {

        if(e instanceof AlreadyExistsError) {
            res.status(400).send(e.message);
        }
    }
});

router.get('/:guid', async (req, res) => {

    const { guid } = req.params;

    try{
        const user = await userService.findUserById(guid);
        return res.status(200).json(user);
    }
    catch(e) {

        if(e instanceof ReferenceError) {
            return res.status(404).send(e.message);
        }
        if(e instanceof CastError) {
            return res.status(400).send(e.message);
        }
        console.log(e);
    }

    return res.status(500).send("Server error");
});

router.get('/email/:email', async(req, res) => {

    const { email } = req.params;

    try{
        const user = await userService.findUserByEmail(email);
        return res.status(200).json(user);
    }
    catch(e) {

        if(e instanceof ReferenceError) {
            return res.status(404).send(e.message);
        }
        if(e instanceof CastError) {
            return res.status(400).send(e.message);
        }
        console.log(e);
    }

    return res.status(500).send("Server error");
});

router.delete("/:guid", async(req, res) => {

    const { guid } = req.params;

    try{
        const user = await userService.deleteUserById(guid);
        return res.status(200).json(user);
    }
    catch(e) {

        if(e instanceof ReferenceError) {
            return res.status(404).send(e.message);
        }
        if(e instanceof CastError) {
            return res.status(400).send(e.message);
        }
        console.log(e);
    }

    return res.status(500).send("Server error");
});

router.post("/compare/:email", async(req, res) => {

    const { params: { email }, body: { password } } = req;

    if(!password){
        return res.status(400).send("Missing password");
    }

    try{
        const match = await userService.comparePasswords(email, password);
        return res.status(200).json({ match });
    }
    catch(e) {

        if(e instanceof ReferenceError) {
            return res.status(404).send(e.message);
        }
        if(e instanceof CastError) {
            return res.status(400).send(e.message);
        }
        console.log(e);
    }

    return res.status(500).send("Server error");
});

module.exports = router;