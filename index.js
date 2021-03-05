require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userController = require('./controllers/UserController');
const sessionController = require('./controllers/SessionController');

const {
    PORT,
    DB_URI,
} = process.env;

(async () => {

    const app = express();
    app.use(bodyParser.json());

    await mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    app.use('/api/user', userController);
    app.use('/api/session', sessionController);

    app.listen(PORT || 8080, () => console.log('LMG MOUNTED N LOADED'));
})();