const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = require('graphql');

const users = [
    { id : '1', name : 'John Gang', email : 'gang@gmail.com', age : 14 },
    { id : '2', name : 'John Kim', email : 'kim@gmail.com', age : 15 },
    { id : '3', name : 'John Min', email : 'min@gmail.com', age : 18 },
    { id : '4', name : 'John Yu', email : 'yu@gmail.com', age : 18 }            
];

const UserType = new GraphQLObjectType({
    name : 'User',
    fields : () => ({
        id    : { type : GraphQLString },
        name  : { type : GraphQLString },
        email : { type : GraphQLString },
        age   : { type : GraphQLInt}
    })
});


const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields: {
        /*
            /graphql?query={ user(id : "1") { id, name, email, age } }
        */
        user :{
            type : UserType,
            args : {
                id : { type : GraphQLString }
            },
            resolve(parentValue, args){
                return users.filter(e => e.id === args.id)[0];
            }
        },
        /* 
            /graphql?query={ users{ id, name, email, age } }
        */
        users : {
            type : new GraphQLList(UserType),
            resolve(parentValue, args){
                return users;
            }
        }
    } 
});


module.exports = new GraphQLSchema({
    query : RootQuery
});