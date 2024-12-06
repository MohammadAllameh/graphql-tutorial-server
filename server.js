const app = require('express')();
const schema = require('./schema/schema');
const { createHandler } = require('graphql-http/lib/use/express');
const cors = require('cors');
const mongoose = require('mongoose');

// mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/graphql-tutorial');
mongoose.connection.once('open', () => {
    console.log('\x1b[32m conect databse2. \x1b[0m');
});
// mongoose.Promise = global.Promise;

var root = {
    hello() {
        return 'Hello world!';
    },
};

app.use(cors({ origin: 'http://localhost:3001', optionsSuccessStatus: 200 }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(
    '/graphql',
    createHandler({
        rootValue: root,
        schema: schema,

        // rootValue,
        // context,
        // formatError,
        // validationRules,
    }),
);

app.listen(3000, () => {
    console.log('app in Listen port localhost:3000');
});
