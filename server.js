const app = require('express')();
const schema = require('./schema/schema');
const { createHandler } = require('graphql-http/lib/use/express');

const mongoose = require('mongoose');

// mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/graphql-tutorial');
// .then((res) => {
//     console.log('\x1b[32m conect databse. \x1b[0m');
//     // فراخوانی تابع بررسی و ایجاد کاربران سیستمی پس از اتصال موفق به دیتابیس
// })
// .catch((err) =>
//     console.error('\x1b[31m Error conect databse: \x1b[0m', err),
// );

// mongoose.Connection.once('open', () => {
//     console.log('\x1b[32m conect databse2. \x1b[0m');
// });
mongoose.connection.once('open', () => {
    console.log('\x1b[32m conect databse2. \x1b[0m');
});
// mongoose.Promise = global.Promise;

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
