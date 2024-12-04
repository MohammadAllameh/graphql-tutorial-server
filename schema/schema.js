const graphql = require('graphql');
const lodash = require('lodash');
const Teacher = require('../models/teacher.model');
const Lesson = require('../models/lesson.model');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;

// const lessons = [
//     { id: '1', name: 'computer-vison', group: 'ai', teacherId: '1' },
//     { id: '2', name: 'NLP', group: 'ai', teacherId: '1' },
//     { id: '3', name: 'ML', group: 'ai', teacherId: '1' },
//     { id: '4', name: 'Web Developer', group: 'software', teacherId: '2' },
//     { id: '5', name: 'Desctop Developer', group: 'software', teacherId: '2' },
//     { id: '6', name: 'Mobile Developer', group: 'software', teacherId: '2' },
//     { id: '7', name: 'TV Developer', group: 'software', teacherId: '2' },
//     { id: '8', name: 'IOT Developer', group: 'software', teacherId: '2' },
//     { id: '9', name: 'Unrailer Developer', group: 'game', teacherId: '3' },
//     { id: '10', name: 'Unity Devloper', group: 'game', teacherId: '4' },
// ];
// const teachers = [
//     { id: '1', name: 'Mr. A', age: 23 },
//     { id: '2', name: 'Mr. B', age: 46 },
//     { id: '3', name: 'Mr. C', age: 32 },
//     { id: '4', name: 'Ms. D', age: 42 },
// ];
const LessonType = new GraphQLObjectType({
    name: 'lesson',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        group: { type: GraphQLString },
        teacher: {
            type: TeacherType,
            resolve(parent, args) {
                return Teacher.findById(parent.teacherId);
                // return lodash.find(teachers, { id: parent.teacherId });
            },
        },
    }),
});

const TeacherType = new GraphQLObjectType({
    name: 'teacher',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        lessons: {
            type: new GraphQLList(LessonType),
            resolve(parent, args) {
                return Teacher.findById(parent.id);
                // return lodash.filter(lessons, { teacherId: parent.id });
            },
        },
    }),
});

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
        teacher: {
            type: TeacherType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return lodash.find(teachers, { id: args.id });
            },
        },
        lessons: {
            type: new GraphQLList(LessonType),
            resolve(parent, args) {
                return lessons;
            },
        },
        teachers: {
            type: new GraphQLList(TeacherType),
            resolve(parent, args) {
                return teachers;
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        addteacher: {
            type: TeacherType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parent, args) {
                var teacher = new Teacher({
                    name: args.name,
                    age: args.age,
                });
                return teacher.save();
            },
        },
        addlesson: {
            type: LessonType,
            args: {
                name: { type: GraphQLString },
                group: { type: GraphQLString },
                teaherId: { type: GraphQLID },
            },
            resolve(parent, args) {
                var lesson = new Lesson({
                    name: args.name,
                    group: args.group,
                    teaherId: args.teaherId,
                });
                return lesson.save();
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

// const AuthorType = new GraphQLObjectType({
//     name: 'author',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         group: { type: GraphQLString },
//         book: {
//             type: TeacherType,
//             resolve(parent, args) {
//                 return lodash.find(teachers, { id: parent.teacherId });
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
//                 return lodash.filter(lessons, { teacherId: parent.id });
//             },
//         },
//     }),
// });
// add conversanl type
// author: {},
// book: {
//     type,
//     resolve(parent, args) {
//         return lodash.find(books, { id: args.id });
//     },
// },
