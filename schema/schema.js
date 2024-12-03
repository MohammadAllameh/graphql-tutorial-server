const graphql = require('graphql');
const lodash = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;

const lessons = [
    { id: '1', name: 'computer-vison', group: 'ai', teaherId: '1' },
    { id: '2', name: 'NLP', group: 'ai', teaherId: '1' },
    { id: '3', name: 'ML', group: 'ai', teaherId: '1' },
    { id: '4', name: 'Web Developer', group: 'software', teaherId: '2' },
    { id: '5', name: 'Desctop Developer', group: 'software', teaherId: '2' },
    { id: '6', name: 'Mobile Developer', group: 'software', teaherId: '2' },
    { id: '7', name: 'TV Developer', group: 'software', teaherId: '2' },
    { id: '8', name: 'IOT Developer', group: 'software', teaherId: '2' },
    { id: '9', name: 'Unrailer Developer', group: 'game', teaherId: '3' },
    { id: '10', name: 'Unity Devloper', group: 'game', teaherId: '4' },
];
const teahers = [
    { id: '1', name: 'Mr. A', age: 23 },
    { id: '2', name: 'Mr. B', age: 46 },
    { id: '3', name: 'Mr. C', age: 32 },
    { id: '4', name: 'Ms. D', age: 42 },
];
const LessonType = new GraphQLObjectType({
    name: 'lesson',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        group: { type: GraphQLString },
        teaher: {
            type: TeaherType,
            resolve(parent, args) {
                return lodash.find(teahers, { id: parent.teaherId });
            },
        },
    }),
});

const TeaherType = new GraphQLObjectType({
    name: 'teaher',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        lessons: {
            type: new GraphQLList(LessonType),
            resolve(parent, args) {
                return lodash.filter(lessons, { teaherId: parent.id });
            },
        },
    }),
});

// const AuthorType = new GraphQLObjectType({
//     name: 'author',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         group: { type: GraphQLString },
//         book: {
//             type: TeaherType,
//             resolve(parent, args) {
//                 return lodash.find(teahers, { id: parent.teaherId });
//             },
//         },
//     }),
// });

// const bookType = new GraphQLObjectType({
//     name: 'book',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         age: { type: GraphQLInt },
//         author: {
//             type: new GraphQLList(LessonType),
//             resolve(parent, args) {
//                 return lodash.filter(lessons, { teaherId: parent.id });
//             },
//         },
//     }),
// });

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        lesson: {
            type: LessonType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return lodash.find(lessons, { id: args.id });
            },
        },
        teaher: {
            type: TeaherType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return lodash.find(teahers, { id: args.id });
            },
        },
        lessons: {
            type: new GraphQLList(LessonType),
            resolve(parent, args) {
                return lessons;
            },
        },
        teahers: {
            type: new GraphQLList(TeaherType),
            resolve(parent, args) {
                return teahers;
            },
        },
        // add conversanl type
        // author: {},
        // book: {
        //     type,
        //     resolve(parent, args) {
        //         return lodash.find(books, { id: args.id });
        //     },
        // },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
