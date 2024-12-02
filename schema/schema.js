const graphql = require('graphql');
const lodash = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const lessons = [
    { id: '1', name: 'computer-vison', group: 'ai' },
    { id: '2', name: 'NLP', group: 'ai' },
    { id: '3', name: 'ML', group: 'ai' },
    { id: '4', name: 'Web Developer', group: 'software' },
    { id: '5', name: 'Desctop Developer', group: 'software' },
    { id: '6', name: 'Mobile Developer', group: 'software' },
    { id: '7', name: 'TV Developer', group: 'software' },
    { id: '8', name: 'IOT Developer', group: 'software' },
    { id: '9', name: 'Unrailer Developer', group: 'game' },
    { id: '10', name: 'Unity Devloper', group: 'game' },
];

const LessonType = new GraphQLObjectType({
    name: 'lesson',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        group: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        lesson: {
            type: LessonType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return lodash.find(lessons, { id: args.id });
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
