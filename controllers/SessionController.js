const { Router } = require('express');
const { deleteSessionForToken } = require('../repos/SessionRepo');
const sessionService = require('../services/SessionService');

const router = Router();

router.get('/:token', async (req, res) => {
    
    const { token } = req.params;

    try{
        
        const session = await sessionService.findSessionByToken(token);
        return res.status(200).json(session);
    }
    catch(e) {

        if(e instanceof ReferenceError){
            return res.status(404).send(e.message);
        }

        console.log(e);
    }

    res.status(500).send("Server error");
});

router.post('/', async (req, res) => {

    const { body: { uuid } } = req;

    if(!uuid) {
        return res.status(400).send('Missing uuid');
    }

    const token = await sessionService.createSession(uuid);

    res.status(200).json({ token });
});

router.delete('/', async (req, res) => {

    const { body: { token } } = req;

    if(!token) {
        return res.status(400).send('Missing token');
    }

    await deleteSessionForToken(token);

    res.status(200).send("Deleted");
});

module.exports = router;