const app = require('express')();
const schema = require('./schema/schema');
const { createHandler } = require('graphql-http/lib/use/express');

var root = {
    hello() {
        return 'Hello world!';
    },
};

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
